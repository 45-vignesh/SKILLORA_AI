import json
from datetime import datetime
from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from backend.database.connection import get_db
from backend.models.user import User
from backend.models.student import Student, StudentSkill
from backend.models.industry import (
    Industry, Job, JobApplication, Internship, InternshipApplication,
    Interview, FacultyTraining
)
from backend.schemas import JobCreate, InternshipCreate, ApplicationStatusUpdate, InterviewCreate, FacultyTrainingCreate
from backend.security import get_current_user
from ai.rag.rag_pipeline import rag_pipeline

router = APIRouter(prefix="/industry", tags=["Industry"])

@router.get("/profile")
def get_industry_profile(current_user: User = Depends(get_current_user), db: Session = Depends(get_db)):
    ind = db.query(Industry).filter(Industry.user_id == current_user.id).first()
    if not ind:
        ind = Industry(user_id=current_user.id, company_name=current_user.full_name, industry_type="Technology")
        db.add(ind)
        db.commit()
        db.refresh(ind)
    return ind

@router.put("/profile")
def update_industry_profile(payload: dict, current_user: User = Depends(get_current_user), db: Session = Depends(get_db)):
    ind = db.query(Industry).filter(Industry.user_id == current_user.id).first()
    for k, v in payload.items():
        if hasattr(ind, k):
            setattr(ind, k, v)
    db.commit()
    return {"message": "Company profile updated"}

@router.post("/jobs")
def create_job(req: JobCreate, current_user: User = Depends(get_current_user), db: Session = Depends(get_db)):
    ind = db.query(Industry).filter(Industry.user_id == current_user.id).first()
    job = Job(
        industry_id=ind.id if ind else 1,
        title=req.title,
        job_type=req.job_type,
        location=req.location,
        experience_required=req.experience_required,
        salary_range=req.salary_range,
        eligibility=req.eligibility,
        required_skills=json.dumps(req.required_skills),
        preferred_skills=json.dumps(req.preferred_skills),
        deadline=req.deadline,
        description=req.description,
        is_active=True
    )
    db.add(job)
    db.commit()
    db.refresh(job)
    return {"message": "Job posted and indexed to RAG knowledge base", "job_id": job.id}

@router.get("/jobs")
def list_industry_jobs(current_user: User = Depends(get_current_user), db: Session = Depends(get_db)):
    ind = db.query(Industry).filter(Industry.user_id == current_user.id).first()
    query = db.query(Job)
    if ind:
        query = query.filter(Job.industry_id == ind.id)
    jobs = query.all()
    results = []
    for j in jobs:
        results.append({
            "id": j.id,
            "title": j.title,
            "job_type": j.job_type,
            "location": j.location,
            "salary_range": j.salary_range,
            "deadline": j.deadline,
            "applications_count": len(j.applications),
            "required_skills": json.loads(j.required_skills or "[]"),
            "is_active": j.is_active
        })
    return results

@router.post("/internships")
def create_internship(req: InternshipCreate, current_user: User = Depends(get_current_user), db: Session = Depends(get_db)):
    ind = db.query(Industry).filter(Industry.user_id == current_user.id).first()
    internship = Internship(
        industry_id=ind.id if ind else 1,
        title=req.title,
        department=req.department,
        location=req.location,
        duration=req.duration,
        stipend=req.stipend,
        vacancies=req.vacancies,
        eligibility=req.eligibility,
        required_skills=json.dumps(req.required_skills),
        preferred_skills=json.dumps(req.preferred_skills),
        deadline=req.deadline,
        description=req.description,
        is_active=True
    )
    db.add(internship)
    db.commit()
    db.refresh(internship)
    return {"message": "Internship opportunity posted successfully", "internship_id": internship.id}

@router.get("/internships")
def list_industry_internships(current_user: User = Depends(get_current_user), db: Session = Depends(get_db)):
    ind = db.query(Industry).filter(Industry.user_id == current_user.id).first()
    query = db.query(Internship)
    if ind:
        query = query.filter(Internship.industry_id == ind.id)
    internships = query.all()
    results = []
    for item in internships:
        results.append({
            "id": item.id,
            "title": item.title,
            "department": item.department,
            "location": item.location,
            "duration": item.duration,
            "stipend": item.stipend,
            "applications_count": len(item.applications),
            "required_skills": json.loads(item.required_skills or "[]"),
            "is_active": item.is_active
        })
    return results

@router.get("/applications")
def get_all_applications(current_user: User = Depends(get_current_user), db: Session = Depends(get_db)):
    ind = db.query(Industry).filter(Industry.user_id == current_user.id).first()
    industry_id = ind.id if ind else 1
    job_apps = db.query(JobApplication).join(Job).filter(Job.industry_id == industry_id).all()
    intern_apps = db.query(InternshipApplication).join(Internship).filter(Internship.industry_id == industry_id).all()
    results = []
    for a in job_apps:
        results.append({
            "id": a.id, "type": "Job", "position": a.job.title,
            "student_name": a.student.user.full_name if a.student and a.student.user else "Student",
            "institution": a.student.institution_name if a.student else "NIT",
            "department": a.student.department if a.student else "CSE",
            "cgpa": a.student.cgpa if a.student else 8.5,
            "match_score": a.match_score, "status": a.status,
            "why_matched": json.loads(a.why_matched or "[]"),
            "skill_gaps": json.loads(a.skill_gaps or "[]"),
            "applied_at": a.applied_at
        })
    for a in intern_apps:
        results.append({
            "id": a.id, "type": "Internship", "position": a.internship.title,
            "student_name": a.student.user.full_name if a.student and a.student.user else "Student",
            "institution": a.student.institution_name if a.student else "NIT",
            "department": a.student.department if a.student else "CSE",
            "cgpa": a.student.cgpa if a.student else 8.5,
            "match_score": a.match_score, "status": a.status,
            "why_matched": json.loads(a.why_matched or "[]"),
            "skill_gaps": json.loads(a.skill_gaps or "[]"),
            "applied_at": a.applied_at
        })
    return results

@router.put("/applications/{app_id}/status")
def update_application_status(app_id: int, req: ApplicationStatusUpdate, app_type: str = "Job", current_user: User = Depends(get_current_user), db: Session = Depends(get_db)):
    if app_type == "Job":
        app = db.query(JobApplication).filter(JobApplication.id == app_id).first()
    else:
        app = db.query(InternshipApplication).filter(InternshipApplication.id == app_id).first()
    if not app:
        raise HTTPException(status_code=404, detail="Application not found")
    app.status = req.status
    if req.notes:
        app.notes = req.notes
    db.commit()
    return {"message": f"Application status updated to {req.status}"}

@router.get("/students/search")
def search_students(skill: str = None, department: str = None, min_readiness: float = 0.0, db: Session = Depends(get_db)):
    students = db.query(Student).all()
    results = []
    for s in students:
        s_skills = [sk.skill_name for sk in s.skills]
        if skill and not any(skill.lower() in sk.lower() for sk in s_skills):
            continue
        if department and department.lower() not in (s.department or "").lower():
            continue
        if s.readiness_score < min_readiness:
            continue
        results.append({
            "id": s.id,
            "full_name": s.user.full_name if s.user else "Student",
            "email": s.user.email if s.user else "",
            "institution_name": s.institution_name,
            "department": s.department,
            "year_of_study": s.year_of_study,
            "cgpa": s.cgpa,
            "target_role": s.target_role,
            "readiness_score": s.readiness_score,
            "skills": s_skills[:8],
            "github_url": s.github_url,
            "linkedin_url": s.linkedin_url
        })
    return sorted(results, key=lambda x: x["readiness_score"], reverse=True)

@router.post("/interviews")
def schedule_interview(req: InterviewCreate, current_user: User = Depends(get_current_user), db: Session = Depends(get_db)):
    interview = Interview(
        application_id=req.application_id,
        application_type=req.application_type,
        scheduled_time=req.scheduled_time,
        meeting_link=req.meeting_link,
        interviewer=req.interviewer,
        status="Scheduled"
    )
    db.add(interview)
    if req.application_type == "Job":
        app = db.query(JobApplication).filter(JobApplication.id == req.application_id).first()
        if app:
            app.status = "Interview Scheduled"
    db.commit()
    return {"message": "Interview scheduled successfully", "interview_id": interview.id}

@router.get("/interviews")
def list_interviews(db: Session = Depends(get_db)):
    interviews = db.query(Interview).all()
    return [{"id": i.id, "application_id": i.application_id, "application_type": i.application_type, "scheduled_time": i.scheduled_time, "meeting_link": i.meeting_link, "interviewer": i.interviewer, "status": i.status, "feedback": i.feedback} for i in interviews]

@router.get("/training")
def list_trainings(db: Session = Depends(get_db)):
    trainings = db.query(FacultyTraining).all()
    results = []
    for t in trainings:
        results.append({
            "id": t.id,
            "title": t.title,
            "company_name": t.industry.company_name if t.industry else "Enterprise Partner",
            "domain": t.domain,
            "duration": t.duration,
            "mode": t.mode,
            "start_date": t.start_date,
            "eligibility": t.eligibility,
            "stipend_or_fee": t.stipend_or_fee,
            "vacancies": t.vacancies,
            "status": t.status,
            "description": t.description
        })
    return results

@router.post("/training")
def create_training(req: FacultyTrainingCreate, current_user: User = Depends(get_current_user), db: Session = Depends(get_db)):
    ind = db.query(Industry).filter(Industry.user_id == current_user.id).first()
    training = FacultyTraining(
        industry_id=ind.id if ind else 1,
        title=req.title,
        domain=req.domain,
        duration=req.duration,
        mode=req.mode,
        start_date=req.start_date,
        description=req.description,
        eligibility=req.eligibility,
        stipend_or_fee=req.stipend_or_fee,
        vacancies=req.vacancies,
        status="Open"
    )
    db.add(training)
    db.commit()
    return {"message": "Faculty training program posted", "id": training.id}
