import json
from datetime import datetime
from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from backend.database.connection import get_db
from backend.models.user import User
from backend.models.student import Student, StudentSkill
from backend.models.industry import Internship, InternshipApplication
from backend.security import get_current_user
from ai.rag.rag_pipeline import rag_pipeline

router = APIRouter(prefix="/internships", tags=["Internships"])

@router.get("")
def list_internships(db: Session = Depends(get_db)):
    internships = db.query(Internship).filter(Internship.is_active == True).all()
    results = []
    for item in internships:
        company_name = item.industry.company_name if item.industry else "Enterprise Partner"
        results.append({
            "id": item.id,
            "title": item.title,
            "company_name": company_name,
            "department": item.department,
            "location": item.location,
            "duration": item.duration,
            "stipend": item.stipend,
            "vacancies": item.vacancies,
            "eligibility": item.eligibility,
            "required_skills": json.loads(item.required_skills or "[]"),
            "preferred_skills": json.loads(item.preferred_skills or "[]"),
            "deadline": item.deadline,
            "description": item.description,
            "created_at": item.created_at
        })
    return results

@router.get("/{internship_id}")
def get_internship_detail(internship_id: int, db: Session = Depends(get_db)):
    item = db.query(Internship).filter(Internship.id == internship_id).first()
    if not item:
        raise HTTPException(status_code=404, detail="Internship not found")
    return {
        "id": item.id,
        "title": item.title,
        "company_name": item.industry.company_name if item.industry else "Partner",
        "department": item.department,
        "location": item.location,
        "duration": item.duration,
        "stipend": item.stipend,
        "vacancies": item.vacancies,
        "eligibility": item.eligibility,
        "required_skills": json.loads(item.required_skills or "[]"),
        "preferred_skills": json.loads(item.preferred_skills or "[]"),
        "deadline": item.deadline,
        "description": item.description
    }

@router.post("/{internship_id}/apply")
def apply_internship(internship_id: int, current_user: User = Depends(get_current_user), db: Session = Depends(get_db)):
    student = db.query(Student).filter(Student.user_id == current_user.id).first()
    if not student:
        raise HTTPException(status_code=404, detail="Student profile not found")
    internship = db.query(Internship).filter(Internship.id == internship_id).first()
    if not internship:
        raise HTTPException(status_code=404, detail="Internship not found")

    existing = db.query(InternshipApplication).filter(
        InternshipApplication.student_id == student.id,
        InternshipApplication.internship_id == internship_id
    ).first()
    if existing:
        return {"message": "Already applied", "status": existing.status, "match_score": existing.match_score}

    student_skills = [s.skill_name for s in db.query(StudentSkill).filter(StudentSkill.student_id == student.id).all()]
    req_skills = json.loads(internship.required_skills or "[]")
    rag_match = rag_pipeline.match_internship(student_skills, internship.title, req_skills)

    application = InternshipApplication(
        internship_id=internship.id,
        student_id=student.id,
        status="Applied",
        match_score=rag_match.get("readiness_score", 75.0),
        why_matched=json.dumps(rag_match.get("matched_skills", [])),
        skill_gaps=json.dumps(rag_match.get("skill_gaps", [])),
        notes=rag_match.get("explanation", "")
    )
    db.add(application)
    db.commit()
    db.refresh(application)

    return {
        "message": "Internship application submitted successfully",
        "application_id": application.id,
        "match_score": application.match_score,
        "why_matched": json.loads(application.why_matched),
        "skill_gaps": json.loads(application.skill_gaps),
        "explanation": application.notes
    }

@router.get("/my-applications/list")
def get_my_internship_applications(current_user: User = Depends(get_current_user), db: Session = Depends(get_db)):
    student = db.query(Student).filter(Student.user_id == current_user.id).first()
    if not student:
        raise HTTPException(status_code=404, detail="Student profile not found")
    apps = db.query(InternshipApplication).filter(InternshipApplication.student_id == student.id).all()
    results = []
    for a in apps:
        results.append({
            "id": a.id,
            "internship_id": a.internship_id,
            "title": a.internship.title,
            "company_name": a.internship.industry.company_name if a.internship.industry else "Partner",
            "applied_at": a.applied_at,
            "status": a.status,
            "match_score": a.match_score,
            "why_matched": json.loads(a.why_matched or "[]"),
            "skill_gaps": json.loads(a.skill_gaps or "[]"),
            "notes": a.notes
        })
    return results
