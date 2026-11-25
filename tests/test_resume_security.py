import io
import os
import sys
from pathlib import Path
import pytest
from fastapi.testclient import TestClient
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
from reportlab.pdfgen import canvas
import PyPDF2

ROOT_DIR = Path(__file__).resolve().parent.parent
sys.path.insert(0, str(ROOT_DIR))

from backend.main import app
from backend.database.connection import Base, get_db
from backend.models.user import User, RoleEnum
from backend.models.student import Student, Resume
from backend.security import create_access_token, get_password_hash
from backend.config import settings


def _make_valid_pdf_bytes(text: str = "Synthetic Test Candidate - Skills: Python, FastAPI, React, SQL, Docker") -> bytes:
    buf = io.BytesIO()
    c = canvas.Canvas(buf)
    c.drawString(72, 720, text)
    c.save()
    return buf.getvalue()


def _make_encrypted_pdf_bytes() -> bytes:
    valid_bytes = _make_valid_pdf_bytes("Encrypted Resume Content")
    reader = PyPDF2.PdfReader(io.BytesIO(valid_bytes))
    writer = PyPDF2.PdfWriter()
    for page in reader.pages:
        writer.add_page(page)
    writer.encrypt("secret_test_pwd")
    out = io.BytesIO()
    writer.write(out)
    return out.getvalue()


@pytest.fixture()
def isolated_env(tmp_path, monkeypatch):
    # Isolated SQLite database
    db_file = tmp_path / "test_resume_sec.db"
    test_engine = create_engine(f"sqlite:///{db_file}", connect_args={"check_same_thread": False})
    TestingSessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=test_engine)
    Base.metadata.create_all(bind=test_engine)

    # Isolated upload directory
    upload_dir = tmp_path / "uploads"
    upload_dir.mkdir(parents=True, exist_ok=True)
    monkeypatch.setattr(settings, "UPLOAD_DIR", upload_dir)

    def override_get_db():
        db = TestingSessionLocal()
        try:
            yield db
        finally:
            db.close()

    app.dependency_overrides[get_db] = override_get_db

    # Seed two synthetic students and one industry user
    db = TestingSessionLocal()
    u1 = User(email="stu1@test.local", hashed_password=get_password_hash("Test1234!"), full_name="Test Student One", role=RoleEnum.STUDENT.value)
    u2 = User(email="stu2@test.local", hashed_password=get_password_hash("Test1234!"), full_name="Test Student Two", role=RoleEnum.STUDENT.value)
    u_ind = User(email="ind1@test.local", hashed_password=get_password_hash("Test1234!"), full_name="Test Industry", role=RoleEnum.INDUSTRY.value)
    db.add_all([u1, u2, u_ind])
    db.commit()
    db.refresh(u1)
    db.refresh(u2)
    db.refresh(u_ind)

    s1 = Student(user_id=u1.id, department="CSE")
    s2 = Student(user_id=u2.id, department="IT")
    db.add_all([s1, s2])
    db.commit()
    db.refresh(s1)
    db.refresh(s2)

    tok1 = create_access_token({"sub": u1.email, "role": u1.role, "user_id": u1.id})
    tok_ind = create_access_token({"sub": u_ind.email, "role": u_ind.role, "user_id": u_ind.id})

    yield {
        "client": TestClient(app),
        "db": db,
        "upload_dir": upload_dir,
        "student1": s1,
        "student2": s2,
        "tok1": tok1,
        "tok_ind": tok_ind,
    }

    db.close()
    app.dependency_overrides.clear()


def test_01_valid_pdf_upload_succeeds(isolated_env):
    env = isolated_env
    pdf_bytes = _make_valid_pdf_bytes()
    res = env["client"].post(
        "/api/v1/resume/upload",
        files={"file": ("synthetic_resume.pdf", pdf_bytes, "application/pdf")},
        headers={"Authorization": f"Bearer {env['tok1']}"},
    )
    assert res.status_code == 200
    data = res.json()
    assert data["ats_score"] > 0
    assert "Python" in data["extracted_skills"]


def test_02_png_renamed_to_pdf_rejected(isolated_env):
    env = isolated_env
    png_bytes = b"\x89PNG\r\n\x1a\n\x00\x00\x00\rIHDRfake_png_data"
    res = env["client"].post(
        "/api/v1/resume/upload",
        files={"file": ("photo.pdf", png_bytes, "application/pdf")},
        headers={"Authorization": f"Bearer {env['tok1']}"},
    )
    assert res.status_code == 400
    assert "signature" in res.json()["detail"].lower()


def test_03_txt_renamed_to_pdf_rejected(isolated_env):
    env = isolated_env
    txt_bytes = b"Plain text resume claiming Python and AWS skills"
    res = env["client"].post(
        "/api/v1/resume/upload",
        files={"file": ("notes.pdf", txt_bytes, "application/pdf")},
        headers={"Authorization": f"Bearer {env['tok1']}"},
    )
    assert res.status_code == 400
    assert "signature" in res.json()["detail"].lower()


def test_04_invalid_mime_type_rejected(isolated_env):
    env = isolated_env
    pdf_bytes = _make_valid_pdf_bytes()
    res = env["client"].post(
        "/api/v1/resume/upload",
        files={"file": ("resume.pdf", pdf_bytes, "text/html")},
        headers={"Authorization": f"Bearer {env['tok1']}"},
    )
    assert res.status_code == 400
    assert "mime" in res.json()["detail"].lower()


def test_05_empty_file_rejected(isolated_env):
    env = isolated_env
    res = env["client"].post(
        "/api/v1/resume/upload",
        files={"file": ("empty.pdf", b"", "application/pdf")},
        headers={"Authorization": f"Bearer {env['tok1']}"},
    )
    assert res.status_code == 400
    assert "empty" in res.json()["detail"].lower()


def test_06_corrupted_pdf_rejected(isolated_env):
    env = isolated_env
    corrupt_bytes = b"%PDF-1.4\n%%corrupted-binary-garbage-without-eof-or-xref"
    res = env["client"].post(
        "/api/v1/resume/upload",
        files={"file": ("corrupt.pdf", corrupt_bytes, "application/pdf")},
        headers={"Authorization": f"Bearer {env['tok1']}"},
    )
    assert res.status_code == 400
    detail = res.json()["detail"].lower()
    assert "corrupted" in detail or "invalid" in detail
    assert "traceback" not in detail


def test_07_password_protected_pdf_handled_safely(isolated_env):
    env = isolated_env
    enc_bytes = _make_encrypted_pdf_bytes()
    res = env["client"].post(
        "/api/v1/resume/upload",
        files={"file": ("locked.pdf", enc_bytes, "application/pdf")},
        headers={"Authorization": f"Bearer {env['tok1']}"},
    )
    assert res.status_code == 400
    assert "password-protected" in res.json()["detail"].lower()


def test_08_file_larger_than_5mb_rejected_with_413(isolated_env):
    env = isolated_env
    oversized_bytes = b"%PDF-1.4\n" + (b"A" * (5 * 1024 * 1024 + 1024))
    res = env["client"].post(
        "/api/v1/resume/upload",
        files={"file": ("huge.pdf", oversized_bytes, "application/pdf")},
        headers={"Authorization": f"Bearer {env['tok1']}"},
    )
    assert res.status_code == 413


def test_09_path_traversal_filename_safely_handled(isolated_env):
    env = isolated_env
    pdf_bytes = _make_valid_pdf_bytes()
    res = env["client"].post(
        "/api/v1/resume/upload",
        files={"file": ("../../evil/../../malicious.pdf", pdf_bytes, "application/pdf")},
        headers={"Authorization": f"Bearer {env['tok1']}"},
    )
    assert res.status_code == 200
    assert res.json()["filename"] == "malicious.pdf"
    stored_files = list(env["upload_dir"].iterdir())
    assert len(stored_files) == 1
    assert stored_files[0].parent.resolve() == env["upload_dir"].resolve()


def test_10_duplicate_filenames_do_not_overwrite(isolated_env):
    env = isolated_env
    pdf1 = _make_valid_pdf_bytes("Version 1 Python")
    pdf2 = _make_valid_pdf_bytes("Version 2 React")
    r1 = env["client"].post(
        "/api/v1/resume/upload",
        files={"file": ("resume.pdf", pdf1, "application/pdf")},
        headers={"Authorization": f"Bearer {env['tok1']}"},
    )
    r2 = env["client"].post(
        "/api/v1/resume/upload",
        files={"file": ("resume.pdf", pdf2, "application/pdf")},
        headers={"Authorization": f"Bearer {env['tok1']}"},
    )
    assert r1.status_code == 200 and r2.status_code == 200
    stored_files = list(env["upload_dir"].iterdir())
    assert len(stored_files) == 2
    assert stored_files[0].name != stored_files[1].name


def test_11_unauthenticated_upload_returns_401(isolated_env):
    env = isolated_env
    pdf_bytes = _make_valid_pdf_bytes()
    res = env["client"].post(
        "/api/v1/resume/upload",
        files={"file": ("resume.pdf", pdf_bytes, "application/pdf")},
    )
    assert res.status_code == 401


def test_12_student_cannot_upload_for_another_student_and_industry_blocked(isolated_env):
    env = isolated_env
    pdf_bytes = _make_valid_pdf_bytes()
    r_other = env["client"].post(
        f"/api/v1/resume/upload?student_id={env['student2'].id}",
        files={"file": ("resume.pdf", pdf_bytes, "application/pdf")},
        headers={"Authorization": f"Bearer {env['tok1']}"},
    )
    assert r_other.status_code == 403

    r_ind = env["client"].post(
        "/api/v1/resume/upload",
        files={"file": ("resume.pdf", pdf_bytes, "application/pdf")},
        headers={"Authorization": f"Bearer {env['tok_ind']}"},
    )
    assert r_ind.status_code == 403


def test_13_partial_files_cleaned_up_after_failure(isolated_env):
    env = isolated_env
    # Oversized file failure
    oversized = b"%PDF-1.4\n" + (b"B" * (5 * 1024 * 1024 + 512))
    r1 = env["client"].post(
        "/api/v1/resume/upload",
        files={"file": ("big.pdf", oversized, "application/pdf")},
        headers={"Authorization": f"Bearer {env['tok1']}"},
    )
    assert r1.status_code == 413
    # Corrupted file failure
    r2 = env["client"].post(
        "/api/v1/resume/upload",
        files={"file": ("bad.pdf", b"%PDF-1.4\nbad", "application/pdf")},
        headers={"Authorization": f"Bearer {env['tok1']}"},
    )
    assert r2.status_code == 400
    assert list(env["upload_dir"].iterdir()) == []


def test_14_existing_resume_analysis_works_after_upload(isolated_env):
    env = isolated_env
    pdf_bytes = _make_valid_pdf_bytes("Candidate proficient in Python, FastAPI, PostgreSQL, Docker")
    r_up = env["client"].post(
        "/api/v1/resume/upload",
        files={"file": ("analysis_test.pdf", pdf_bytes, "application/pdf")},
        headers={"Authorization": f"Bearer {env['tok1']}"},
    )
    assert r_up.status_code == 200
    body = r_up.json()
    assert "rag_analysis" in body
    assert "explanation" in body["rag_analysis"]
    assert len(body["strengths"]) > 0

    r_get = env["client"].get(
        "/api/v1/resume/my-resume",
        headers={"Authorization": f"Bearer {env['tok1']}"},
    )
    assert r_get.status_code == 200
    assert r_get.json()["has_resume"] is True
    assert "Python" in r_get.json()["extracted_skills"]


def test_15_valid_upload_associates_with_authenticated_student(isolated_env):
    env = isolated_env
    pdf_bytes = _make_valid_pdf_bytes()
    res = env["client"].post(
        "/api/v1/resume/upload",
        files={"file": ("owned.pdf", pdf_bytes, "application/pdf")},
        headers={"Authorization": f"Bearer {env['tok1']}"},
    )
    assert res.status_code == 200
    records = env["db"].query(Resume).all()
    assert len(records) == 1
    assert records[0].student_id == env["student1"].id
    assert records[0].student_id != env["student2"].id
