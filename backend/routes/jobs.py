import json
from datetime import datetime
from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from backend.database.connection import get_db
from backend.models.user import User
from backend.models.student import Student, StudentSkill
from backend.models.industry import Job, JobApplication
from backend.security import get_current_user
from ai.rag.rag_pipeline import rag_pipeline

router = APIRouter(prefix="/jobs", tags=["Jobs"])

@router.get("")
def list_jobs(db: Session = Depends(get_db)):
    jobs = db.query(Job).filter(Job.is_active == True).all()
    results = []
    for item in jobs:
        company_name = item.industry.company_name if item.industry else "Tech Partner"
        results.append({
            "id": item.id,
            "title": item.title,
            "company_name": company_name,
            "job_type": item.job_type,
            "location": item.location,
            "experience_required": item.experience_required,
            "salary_range": item.salary_range,
            "eligibility": item.eligibility,
            "required_skills": json.loads(item.required_skills or "[]"),
            "preferred_skills": json.loads(item.preferred_skills or "[]"),
            "deadline": item.deadline,
            "description": item.description,
            "created_at": item.created_at
        })
    return results

@router.get("/{job_id}")
def get_job_detail(job_id: int, db: Session = Depends(get_db)):
    item = db.query(Job).filter(Job.id == job_id).first()
    if not item:
        raise HTTPException(status_code=404, detail="Job not found")
    return {
        "id": item.id,
        "title": item.title,
        "company_name": item.industry.company_name if item.industry else "Partner",
        "job_type": item.job_type,
        "location": item.location,
        "experience_required": item.experience_required,
        "salary_range": item.salary_range,
        "eligibility": item.eligibility,
        "required_skills": json.loads(item.required_skills or "[]"),
        "preferred_skills": json.loads(item.preferred_skills or "[]"),
        "deadline": item.deadline,
        "description": item.description
    }

@router.post("/{job_id}/apply")
def apply_job(job_id: int, current_user: User = Depends(get_current_user), db: Session = Depends(get_db)):
    student = db.query(Student).filter(Student.user_id == current_user.id).first()
    if not student:
        raise HTTPException(status_code=404, detail="Student profile not found")
    job = db.query(Job).filter(Job.id == job_id).first()
    if not job:
        raise HTTPException(status_code=404, detail="Job not found")

    existing = db.query(JobApplication).filter(JobApplication.student_id == student.id, JobApplication.job_id == job_id).first()
    if existing:
        return {"message": "Already applied", "status": existing.status, "match_score": existing.match_score}

    student_skills = [s.skill_name for s in db.query(StudentSkill).filter(StudentSkill.student_id == student.id).all()]
    req_skills = json.loads(job.required_skills or "[]")
    rag_match = rag_pipeline.match_job(student_skills, job.title, req_skills)

    application = JobApplication(
        job_id=job.id,
        student_id=student.id,
        status="Applied",
        match_score=rag_match.get("readiness_score", 70.0),
        why_matched=json.dumps(rag_match.get("matched_skills", [])),
        skill_gaps=json.dumps(rag_match.get("skill_gaps", [])),
        notes=rag_match.get("explanation", "")
    )
    db.add(application)
    db.commit()
    db.refresh(application)

    return {
        "message": "Job application submitted successfully",
        "application_id": application.id,
        "match_score": application.match_score,
        "why_matched": json.loads(application.why_matched),
        "skill_gaps": json.loads(application.skill_gaps),
        "explanation": application.notes
    }

@router.get("/my-applications/list")
def get_my_job_applications(current_user: User = Depends(get_current_user), db: Session = Depends(get_db)):
    student = db.query(Student).filter(Student.user_id == current_user.id).first()
    if not student:
        raise HTTPException(status_code=404, detail="Student profile not found")
    apps = db.query(JobApplication).filter(JobApplication.student_id == student.id).all()
    results = []
    for a in apps:
        results.append({
            "id": a.id,
            "job_id": a.job_id,
            "title": a.job.title,
            "company_name": a.job.industry.company_name if a.job.industry else "Partner",
            "applied_at": a.applied_at,
            "status": a.status,
            "match_score": a.match_score,
            "why_matched": json.loads(a.why_matched or "[]"),
            "skill_gaps": json.loads(a.skill_gaps or "[]"),
            "notes": a.notes
        })
    return results
