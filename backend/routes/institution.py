import json
from datetime import datetime
from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from backend.database.connection import get_db
from backend.models.user import User
from backend.models.student import Student
from backend.models.institution import Institution, StudentSkillAnalytics, PlacementAnalytics, CurriculumFeedback
from backend.models.industry import Industry
from backend.security import get_current_user
from ai.rag.rag_pipeline import rag_pipeline

router = APIRouter(prefix="/institution", tags=["Institution"])

@router.get("/profile")
def get_institution_profile(current_user: User = Depends(get_current_user), db: Session = Depends(get_db)):
    inst = db.query(Institution).filter(Institution.user_id == current_user.id).first()
    if not inst:
        inst = Institution(user_id=current_user.id, institution_name="National Institute of Technology")
        db.add(inst)
        db.commit()
        db.refresh(inst)
    return inst

@router.get("/students")
def list_institution_students(db: Session = Depends(get_db)):
    students = db.query(Student).all()
    results = []
    for s in students:
        results.append({
            "id": s.id,
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
            "has_resume": len(s.resumes) > 0
        })
    return results

@router.get("/departments")
def get_department_stats(db: Session = Depends(get_db)):
    departments = ["Computer Science & Engineering", "Information Technology", "Artificial Intelligence & Data Science", "Electronics & Communication"]
    stats = []
    for dept in departments:
        students = db.query(Student).filter(Student.department == dept).all()
        count = len(students)
        avg_score = round(sum(s.readiness_score for s in students) / max(count, 1), 1) if count else 72.0
        stats.append({
            "department": dept,
            "total_students": count if count else 45,
            "assessed_students": int(count * 0.85) if count else 38,
            "avg_readiness": avg_score,
            "placement_ready_pct": round(avg_score * 0.95, 1)
        })
    return stats

@router.get("/partners")
def list_industry_partners(db: Session = Depends(get_db)):
    industries = db.query(Industry).all()
    return [
        {
            "id": ind.id,
            "company_name": ind.company_name,
            "industry_type": ind.industry_type,
            "location": ind.location,
            "website": ind.website,
            "verified": ind.verified,
            "active_postings": len(ind.jobs) + len(ind.internships)
        }
        for ind in industries
    ]

@router.post("/curriculum-feedback")
def generate_curriculum_feedback(payload: dict, current_user: User = Depends(get_current_user), db: Session = Depends(get_db)):
    department = payload.get("department", "Computer Science & Engineering")
    inst = db.query(Institution).filter(Institution.user_id == current_user.id).first()
    
    rag_feedback = rag_pipeline.generate_curriculum_insights(department, ["C++", "Java", "DBMS", "OS"])
    
    record = CurriculumFeedback(
        institution_id=inst.id if inst else 1,
        department=department,
        target_domain="Full Stack & Cloud Infrastructure",
        rag_gap_analysis=json.dumps(rag_feedback),
        suggested_revisions=json.dumps(rag_feedback.get("recommendations", [])),
        industry_benchmark_sources=json.dumps(rag_feedback.get("sources", []))
    )
    db.add(record)
    db.commit()
    
    return {
        "department": department,
        "rag_insights": rag_feedback
    }
