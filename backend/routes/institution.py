import json
from typing import Optional
from datetime import datetime
from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from backend.database.connection import get_db
from backend.models.user import User
from backend.models.student import Student
from backend.models.institution import Institution, StudentSkillAnalytics, PlacementAnalytics, CurriculumFeedback
from backend.models.industry import Industry
from backend.security import get_current_user, require_roles
from ai.rag.rag_pipeline import rag_pipeline

router = APIRouter(prefix="/institution", tags=["Institution"])


def _resolve_institution(
    current_user: User,
    db: Session,
    requested_institution_id: Optional[int] = None,
    create_if_missing: bool = False,
) -> Optional[Institution]:
    if current_user.role == "ADMIN":
        if requested_institution_id is not None:
            inst = db.query(Institution).filter(Institution.id == requested_institution_id).first()
            if not inst:
                raise HTTPException(status_code=404, detail="Institution not found")
            return inst
        return None

    inst = db.query(Institution).filter(Institution.user_id == current_user.id).first()
    if not inst and create_if_missing:
        inst = Institution(user_id=current_user.id, institution_name=current_user.full_name)
        db.add(inst)
        db.commit()
        db.refresh(inst)
    if not inst:
        raise HTTPException(status_code=404, detail="Institution profile not found")
    if requested_institution_id is not None and requested_institution_id != inst.id:
        raise HTTPException(status_code=403, detail="Cross-institution access denied")
    return inst


@router.get("/profile")
def get_institution_profile(
    institution_id: Optional[int] = None,
    current_user: User = Depends(require_roles(["INSTITUTION", "ADMIN"])),
    db: Session = Depends(get_db),
):
    inst = _resolve_institution(current_user, db, institution_id, create_if_missing=True)
    return inst if inst else db.query(Institution).all()


@router.get("/students")
def list_institution_students(
    institution_id: Optional[int] = None,
    current_user: User = Depends(require_roles(["INSTITUTION", "ADMIN"])),
    db: Session = Depends(get_db),
):
    inst = _resolve_institution(current_user, db, institution_id)
    query = db.query(Student)
    if inst is not None:
        query = query.filter(Student.institution_id == inst.id)
    students = query.all()
    results = []
    for s in students:
        results.append({
            "id": s.id,
            "institution_id": s.institution_id,
            "roll_number": s.roll_number,
            "full_name": s.user.full_name if s.user else "Student",
            "email": s.user.email if s.user else "",
            "department": s.department,
            "year_of_study": s.year_of_study,
            "cgpa": s.cgpa,
            "readiness_score": s.readiness_score,
            "target_role": s.target_role,
            "assessments_count": len(s.assessments),
            "top_skills": json.loads(s.top_skills or "[]"),
            "missing_skills": json.loads(s.missing_skills or "[]"),
            "has_resume": len(s.resumes) > 0,
        })
    return results


@router.get("/departments")
def get_department_stats(
    institution_id: Optional[int] = None,
    current_user: User = Depends(require_roles(["INSTITUTION", "ADMIN"])),
    db: Session = Depends(get_db),
):
    inst = _resolve_institution(current_user, db, institution_id)
    departments = [
        "Computer Science & Engineering",
        "Information Technology",
        "Artificial Intelligence & Data Science",
        "Electronics & Communication",
    ]
    stats = []
    for dept in departments:
        query = db.query(Student).filter(Student.department == dept)
        if inst is not None:
            query = query.filter(Student.institution_id == inst.id)
        students = query.all()
        count = len(students)
        assessed = len([s for s in students if (s.readiness_score or 0) > 0])
        avg_score = round(sum(s.readiness_score for s in students) / count, 1) if count else 0.0
        stats.append({
            "department": dept,
            "total_students": count,
            "assessed_students": assessed,
            "avg_readiness": avg_score,
            "placement_ready_pct": round(avg_score * 0.95, 1) if count else 0.0,
        })
    return stats


@router.get("/partners")
def list_industry_partners(current_user: User = Depends(get_current_user), db: Session = Depends(get_db)):
    industries = db.query(Industry).all()
    return [
        {
            "id": ind.id,
            "company_name": ind.company_name,
            "industry_type": ind.industry_type,
            "location": ind.location,
            "website": ind.website,
            "verified": ind.verified,
            "active_postings": len(ind.jobs) + len(ind.internships),
        }
        for ind in industries
    ]


@router.post("/curriculum-feedback")
def generate_curriculum_feedback(
    payload: dict,
    current_user: User = Depends(require_roles(["INSTITUTION", "ADMIN"])),
    db: Session = Depends(get_db),
):
    department = payload.get("department", "Computer Science & Engineering")
    requested_inst_id = payload.get("institution_id")
    inst = _resolve_institution(current_user, db, requested_inst_id)
    if inst is None:
        raise HTTPException(status_code=400, detail="institution_id is required for admin curriculum feedback")

    rag_feedback = rag_pipeline.generate_curriculum_insights(department, ["C++", "Java", "DBMS", "OS"])

    record = CurriculumFeedback(
        institution_id=inst.id,
        department=department,
        target_domain="Full Stack & Cloud Infrastructure",
        rag_gap_analysis=json.dumps(rag_feedback),
        suggested_revisions=json.dumps(rag_feedback.get("recommendations", [])),
        industry_benchmark_sources=json.dumps(rag_feedback.get("sources", [])),
    )
    db.add(record)
    db.commit()
    db.refresh(record)

    return {
        "id": record.id,
        "institution_id": inst.id,
        "department": department,
        "rag_insights": rag_feedback,
    }


@router.get("/curriculum-feedback")
def list_curriculum_feedback(
    institution_id: Optional[int] = None,
    current_user: User = Depends(require_roles(["INSTITUTION", "ADMIN"])),
    db: Session = Depends(get_db),
):
    inst = _resolve_institution(current_user, db, institution_id)
    query = db.query(CurriculumFeedback)
    if inst is not None:
        query = query.filter(CurriculumFeedback.institution_id == inst.id)
    records = query.order_by(CurriculumFeedback.created_at.desc()).all()
    return [
        {
            "id": r.id,
            "institution_id": r.institution_id,
            "department": r.department,
            "target_domain": r.target_domain,
            "suggested_revisions": json.loads(r.suggested_revisions or "[]"),
            "industry_benchmark_sources": json.loads(r.industry_benchmark_sources or "[]"),
            "created_at": r.created_at,
        }
        for r in records
    ]
