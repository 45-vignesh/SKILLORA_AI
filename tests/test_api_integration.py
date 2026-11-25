import sys
from datetime import timedelta
from pathlib import Path
import pytest
from fastapi.testclient import TestClient
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker

ROOT_DIR = Path(__file__).resolve().parent.parent
sys.path.insert(0, str(ROOT_DIR))

from backend.main import app
from backend.database.connection import Base, get_db
from backend.models.user import User, RoleEnum
from backend.models.student import Student, AssessmentQuestion
from backend.models.institution import Institution
from backend.models.industry import Industry
from backend.models.academician import Academician
from backend.security import create_access_token, get_password_hash


@pytest.fixture()
def api_env(tmp_path):
    db_file = tmp_path / "test_api_integration.db"
    test_engine = create_engine(f"sqlite:///{db_file}", connect_args={"check_same_thread": False})
    TestingSessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=test_engine)
    Base.metadata.create_all(bind=test_engine)

    def override_get_db():
        db = TestingSessionLocal()
        try:
            yield db
        finally:
            db.close()

    app.dependency_overrides[get_db] = override_get_db
    db = TestingSessionLocal()

    # Seed synthetic users for all 4 roles + a second empty institution
    pwd = get_password_hash("TestPass123!")
    u_stu = User(email="stu@test.local", hashed_password=pwd, full_name="Test Student", role=RoleEnum.STUDENT.value)
    u_inst_a = User(email="insta@test.local", hashed_password=pwd, full_name="Institute A", role=RoleEnum.INSTITUTION.value)
    u_inst_b = User(email="instb@test.local", hashed_password=pwd, full_name="Institute B", role=RoleEnum.INSTITUTION.value)
    u_ind = User(email="ind@test.local", hashed_password=pwd, full_name="Test Industry", role=RoleEnum.INDUSTRY.value)
    u_acad = User(email="acad@test.local", hashed_password=pwd, full_name="Test Faculty", role=RoleEnum.ACADEMICIAN.value)
    db.add_all([u_stu, u_inst_a, u_inst_b, u_ind, u_acad])
    db.commit()
    for u in (u_stu, u_inst_a, u_inst_b, u_ind, u_acad):
        db.refresh(u)

    inst_a = Institution(user_id=u_inst_a.id, institution_name="Institute A")
    inst_b = Institution(user_id=u_inst_b.id, institution_name="Institute B")
    ind = Industry(user_id=u_ind.id, company_name="Test Corp")
    db.add_all([inst_a, inst_b, ind])
    db.commit()
    db.refresh(inst_a)
    db.refresh(inst_b)
    db.refresh(ind)

    stu = Student(user_id=u_stu.id, institution_id=inst_a.id, institution_name="Institute A", department="Computer Science & Engineering", readiness_score=78.5)
    acad = Academician(user_id=u_acad.id, institution_id=inst_a.id, faculty_name="Test Faculty", institution_name="Institute A")
    q1 = AssessmentQuestion(
        category="Technical Skills",
        skill_tested="Python",
        difficulty="Medium",
        question_text="Which keyword defines a function in Python?",
        options='["func", "def", "fn", "lambda"]',
        correct_option=1,
    )
    db.add_all([stu, acad, q1])
    db.commit()
    db.refresh(q1)

    tokens = {
        "student": create_access_token({"sub": u_stu.email, "role": u_stu.role, "user_id": u_stu.id}),
        "inst_a": create_access_token({"sub": u_inst_a.email, "role": u_inst_a.role, "user_id": u_inst_a.id}),
        "inst_b": create_access_token({"sub": u_inst_b.email, "role": u_inst_b.role, "user_id": u_inst_b.id}),
        "industry": create_access_token({"sub": u_ind.email, "role": u_ind.role, "user_id": u_ind.id}),
        "academician": create_access_token({"sub": u_acad.email, "role": u_acad.role, "user_id": u_acad.id}),
        "expired": create_access_token({"sub": u_stu.email, "role": u_stu.role}, expires_delta=timedelta(minutes=-10)),
    }

    yield {
        "client": TestClient(app),
        "tokens": tokens,
        "inst_a": inst_a,
        "inst_b": inst_b,
        "question": q1,
    }

    db.close()
    app.dependency_overrides.clear()


def test_01_institution_dashboard_loads(api_env):
    c, tok = api_env["client"], api_env["tokens"]["inst_a"]
    r_prof = c.get("/api/v1/institution/profile", headers={"Authorization": f"Bearer {tok}"})
    r_ana = c.get("/api/v1/analytics/institution", headers={"Authorization": f"Bearer {tok}"})
    r_dept = c.get("/api/v1/institution/departments", headers={"Authorization": f"Bearer {tok}"})
    assert r_prof.status_code == 200
    assert r_ana.status_code == 200 and r_ana.json()["summary"]["total_students"] == 1
    assert r_dept.status_code == 200 and len(r_dept.json()) == 4


def test_02_institution_student_list_loads(api_env):
    c, tok = api_env["client"], api_env["tokens"]["inst_a"]
    r = c.get("/api/v1/institution/students", headers={"Authorization": f"Bearer {tok}"})
    assert r.status_code == 200
    assert len(r.json()) == 1
    assert r.json()[0]["full_name"] == "Test Student"


def test_03_curriculum_data_loads(api_env):
    c, tok = api_env["client"], api_env["tokens"]["inst_a"]
    r_trends = c.get("/api/v1/analytics/skill-demand", headers={"Authorization": f"Bearer {tok}"})
    r_hist = c.get("/api/v1/institution/curriculum-feedback", headers={"Authorization": f"Bearer {tok}"})
    assert r_trends.status_code == 200 and len(r_trends.json()) > 0
    assert r_hist.status_code == 200


def test_04_curriculum_feedback_submission_works(api_env):
    c, tok = api_env["client"], api_env["tokens"]["inst_a"]
    r = c.post(
        "/api/v1/institution/curriculum-feedback",
        json={"department": "Computer Science & Engineering"},
        headers={"Authorization": f"Bearer {tok}"},
    )
    assert r.status_code == 200
    assert "rag_insights" in r.json()
    assert "recommendations" in r.json()["rag_insights"]


def test_05_assessment_submission_valid_data(api_env):
    c, tok = api_env["client"], api_env["tokens"]["student"]
    q_res = c.get("/api/v1/assessment/questions?category=All", headers={"Authorization": f"Bearer {tok}"})
    assert q_res.status_code == 200 and len(q_res.json()) == 1
    qid = q_res.json()[0]["id"]

    sub_res = c.post(
        "/api/v1/assessment/submit",
        json={"title": "Python Diagnostic", "category": "Technical Skills", "answers": {str(qid): 1}},
        headers={"Authorization": f"Bearer {tok}"},
    )
    assert sub_res.status_code == 200
    assert sub_res.json()["percentage"] == 100.0
    assert "rag_feedback" in sub_res.json()


def test_06_invalid_assessment_payload_returns_422(api_env):
    c, tok = api_env["client"], api_env["tokens"]["student"]
    # Missing required 'title' and 'category'
    res = c.post(
        "/api/v1/assessment/submit",
        json={"answers": {"1": 0}, "score": 50},
        headers={"Authorization": f"Bearer {tok}"},
    )
    assert res.status_code == 422
    assert "detail" in res.json()


def test_07_student_dashboard_api_calls_work(api_env):
    c, tok = api_env["client"], api_env["tokens"]["student"]
    r_dash = c.get("/api/v1/students/dashboard", headers={"Authorization": f"Bearer {tok}"})
    r_me = c.get("/api/v1/students/me", headers={"Authorization": f"Bearer {tok}"})
    assert r_dash.status_code == 200
    assert r_dash.json()["readiness_score"] == 78.5
    assert r_me.status_code == 200


def test_08_industry_dashboard_api_calls_work(api_env):
    c, tok = api_env["client"], api_env["tokens"]["industry"]
    r_prof = c.get("/api/v1/industry/profile", headers={"Authorization": f"Bearer {tok}"})
    r_post = c.post(
        "/api/v1/industry/jobs",
        json={"title": "Backend Engineer", "required_skills": ["Python", "FastAPI"], "description": "Build APIs"},
        headers={"Authorization": f"Bearer {tok}"},
    )
    r_jobs = c.get("/api/v1/industry/jobs", headers={"Authorization": f"Bearer {tok}"})
    r_search = c.get("/api/v1/industry/students/search", headers={"Authorization": f"Bearer {tok}"})
    assert r_prof.status_code == 200
    assert r_post.status_code == 200
    assert r_jobs.status_code == 200 and len(r_jobs.json()) == 1
    assert r_search.status_code == 200 and len(r_search.json()) == 1


def test_09_faculty_dashboard_api_calls_work(api_env):
    c, tok = api_env["client"], api_env["tokens"]["academician"]
    r_prof = c.get("/api/v1/academician/profile", headers={"Authorization": f"Bearer {tok}"})
    r_opp = c.get("/api/v1/academician/opportunities", headers={"Authorization": f"Bearer {tok}"})
    r_res = c.get("/api/v1/academician/research", headers={"Authorization": f"Bearer {tok}"})
    assert r_prof.status_code == 200
    assert r_opp.status_code == 200
    assert r_res.status_code == 200


def test_10_unauthenticated_requests_return_401(api_env):
    c = api_env["client"]
    assert c.get("/api/v1/students/dashboard").status_code == 401
    assert c.get("/api/v1/institution/students").status_code == 401
    assert c.get("/api/v1/industry/jobs").status_code == 401


def test_11_unauthorized_roles_return_403(api_env):
    c = api_env["client"]
    assert c.get("/api/v1/institution/students", headers={"Authorization": f"Bearer {api_env['tokens']['student']}"}).status_code == 403
    assert c.get("/api/v1/students/dashboard", headers={"Authorization": f"Bearer {api_env['tokens']['industry']}"}).status_code == 403


def test_12_institution_a_cannot_retrieve_institution_b_data(api_env):
    c = api_env["client"]
    tok_a = api_env["tokens"]["inst_a"]
    inst_b_id = api_env["inst_b"].id
    assert c.get(f"/api/v1/institution/students?institution_id={inst_b_id}", headers={"Authorization": f"Bearer {tok_a}"}).status_code == 403
    assert c.get(f"/api/v1/analytics/institution?institution_id={inst_b_id}", headers={"Authorization": f"Bearer {tok_a}"}).status_code == 403


def test_13_expired_jwt_returns_401(api_env):
    c = api_env["client"]
    res = c.get("/api/v1/students/dashboard", headers={"Authorization": f"Bearer {api_env['tokens']['expired']}"})
    assert res.status_code == 401


def test_14_api_error_responses_include_detail(api_env):
    c, tok = api_env["client"], api_env["tokens"]["student"]
    res = c.get("/api/v1/institution/students", headers={"Authorization": f"Bearer {tok}"})
    assert res.status_code == 403
    assert isinstance(res.json().get("detail"), str)


def test_15_empty_datasets_do_not_crash_dashboards(api_env):
    c, tok_b = api_env["client"], api_env["tokens"]["inst_b"]
    # Institute B has 0 students, 0 analytics, 0 placement records
    r_stu = c.get("/api/v1/institution/students", headers={"Authorization": f"Bearer {tok_b}"})
    r_ana = c.get("/api/v1/analytics/institution", headers={"Authorization": f"Bearer {tok_b}"})
    r_place = c.get("/api/v1/analytics/placement", headers={"Authorization": f"Bearer {tok_b}"})
    assert r_stu.status_code == 200 and r_stu.json() == []
    assert r_ana.status_code == 200 and r_ana.json()["summary"]["total_students"] == 0
    assert r_place.status_code == 200 and r_place.json()["placed_count"] == 0
