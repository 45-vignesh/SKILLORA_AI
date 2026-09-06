import json
from datetime import datetime
from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from backend.database.connection import get_db
from backend.models.user import User
from backend.models.student import Student, StudentSkill, Project, Certification, DailyChallenge
from backend.schemas import StudentProfileUpdate, SkillCreate
from backend.security import get_current_user

router = APIRouter(prefix="/students", tags=["Students"])

@router.get("/me")
def get_my_profile(current_user: User = Depends(get_current_user), db: Session = Depends(get_db)):
    student = db.query(Student).filter(Student.user_id == current_user.id).first()
    if not student:
        raise HTTPException(status_code=404, detail="Student profile not found")
    skills = db.query(StudentSkill).filter(StudentSkill.student_id == student.id).all()
    projects = db.query(Project).filter(Project.student_id == student.id).all()
    certifications = db.query(Certification).filter(Certification.student_id == student.id).all()
    return {
        "id": student.id,
        "user_id": current_user.id,
        "full_name": current_user.full_name,
        "email": current_user.email,
        "roll_number": student.roll_number,
        "institution_name": student.institution_name,
        "department": student.department,
        "year_of_study": student.year_of_study,
        "cgpa": student.cgpa,
        "phone": student.phone,
        "bio": student.bio,
        "target_role": student.target_role,
        "github_url": student.github_url,
        "linkedin_url": student.linkedin_url,
        "portfolio_url": student.portfolio_url,
        "readiness_score": student.readiness_score,
        "top_skills": json.loads(student.top_skills or "[]"),
        "missing_skills": json.loads(student.missing_skills or "[]"),
        "skills": [{"id": s.id, "name": s.skill_name, "level": s.proficiency_level, "category": s.category} for s in skills],
        "projects": [{"id": p.id, "title": p.title, "description": p.description, "tech_stack": json.loads(p.tech_stack or "[]"), "github_url": p.github_url, "live_url": p.live_url} for p in projects],
        "certifications": [{"id": c.id, "title": c.title, "issuing_org": c.issuing_org, "issue_date": c.issue_date, "credential_url": c.credential_url, "verified": c.verified} for c in certifications]
    }

@router.put("/me")
def update_profile(req: StudentProfileUpdate, current_user: User = Depends(get_current_user), db: Session = Depends(get_db)):
    student = db.query(Student).filter(Student.user_id == current_user.id).first()
    if not student:
        raise HTTPException(status_code=404, detail="Student profile not found")
    for field, val in req.dict(exclude_unset=True).items():
        setattr(student, field, val)
    db.commit()
    return {"message": "Profile updated successfully"}

@router.get("/skills")
def get_skills(current_user: User = Depends(get_current_user), db: Session = Depends(get_db)):
    student = db.query(Student).filter(Student.user_id == current_user.id).first()
    if not student:
        raise HTTPException(status_code=404, detail="Student profile not found")
    skills = db.query(StudentSkill).filter(StudentSkill.student_id == student.id).all()
    return [{"id": s.id, "skill_name": s.skill_name, "proficiency_level": s.proficiency_level, "category": s.category, "verified": s.verified} for s in skills]

@router.post("/skills")
def add_skill(req: SkillCreate, current_user: User = Depends(get_current_user), db: Session = Depends(get_db)):
    student = db.query(Student).filter(Student.user_id == current_user.id).first()
    if not student:
        raise HTTPException(status_code=404, detail="Student profile not found")
    skill = StudentSkill(student_id=student.id, skill_name=req.skill_name, proficiency_level=req.proficiency_level, category=req.category, verified=True)
    db.add(skill)
    existing_skills = json.loads(student.top_skills or "[]")
    if req.skill_name not in existing_skills:
        existing_skills.append(req.skill_name)
        student.top_skills = json.dumps(existing_skills)
    db.commit()
    return {"message": "Skill added successfully", "id": skill.id}

@router.delete("/skills/{skill_id}")
def delete_skill(skill_id: int, current_user: User = Depends(get_current_user), db: Session = Depends(get_db)):
    student = db.query(Student).filter(Student.user_id == current_user.id).first()
    skill = db.query(StudentSkill).filter(StudentSkill.id == skill_id, StudentSkill.student_id == student.id).first()
    if not skill:
        raise HTTPException(status_code=404, detail="Skill not found")
    db.delete(skill)
    db.commit()
    return {"message": "Skill deleted"}

@router.get("/daily-challenges")
def get_daily_challenges(current_user: User = Depends(get_current_user), db: Session = Depends(get_db)):
    student = db.query(Student).filter(Student.user_id == current_user.id).first()
    today_str = datetime.utcnow().strftime("%Y-%m-%d")
    challenges = db.query(DailyChallenge).filter(DailyChallenge.student_id == student.id).all()
    return [{"id": c.id, "title": c.title, "category": c.category, "description": c.description, "points": c.points, "is_completed": c.is_completed} for c in challenges]

@router.post("/daily-challenges/{challenge_id}/complete")
def complete_challenge(challenge_id: int, current_user: User = Depends(get_current_user), db: Session = Depends(get_db)):
    student = db.query(Student).filter(Student.user_id == current_user.id).first()
    challenge = db.query(DailyChallenge).filter(DailyChallenge.id == challenge_id, DailyChallenge.student_id == student.id).first()
    if not challenge:
        raise HTTPException(status_code=404, detail="Challenge not found")
    challenge.is_completed = True
    challenge.completed_at = datetime.utcnow()
    db.commit()
    return {"message": "Challenge completed!", "points_earned": challenge.points}

@router.get("/projects")
def get_projects(current_user: User = Depends(get_current_user), db: Session = Depends(get_db)):
    student = db.query(Student).filter(Student.user_id == current_user.id).first()
    projects = db.query(Project).filter(Project.student_id == student.id).all()
    return [{"id": p.id, "title": p.title, "description": p.description, "tech_stack": json.loads(p.tech_stack or "[]"), "github_url": p.github_url, "live_url": p.live_url, "duration": p.duration, "role": p.role} for p in projects]

@router.post("/projects")
def add_project(payload: dict, current_user: User = Depends(get_current_user), db: Session = Depends(get_db)):
    student = db.query(Student).filter(Student.user_id == current_user.id).first()
    project = Project(student_id=student.id, title=payload.get("title", "Project"), description=payload.get("description", ""), tech_stack=json.dumps(payload.get("tech_stack", ["Python", "React"])), github_url=payload.get("github_url"), live_url=payload.get("live_url"), duration=payload.get("duration", "1 Month"), role=payload.get("role", "Developer"))
    db.add(project)
    db.commit()
    return {"message": "Project added", "id": project.id}

@router.get("/certifications")
def get_certifications(current_user: User = Depends(get_current_user), db: Session = Depends(get_db)):
    student = db.query(Student).filter(Student.user_id == current_user.id).first()
    certs = db.query(Certification).filter(Certification.student_id == student.id).all()
    return [{"id": c.id, "title": c.title, "issuing_org": c.issuing_org, "issue_date": c.issue_date, "credential_id": c.credential_id, "credential_url": c.credential_url, "verified": c.verified} for c in certs]

@router.post("/certifications")
def add_certification(payload: dict, current_user: User = Depends(get_current_user), db: Session = Depends(get_db)):
    student = db.query(Student).filter(Student.user_id == current_user.id).first()
    cert = Certification(student_id=student.id, title=payload.get("title", "Certification"), issuing_org=payload.get("issuing_org", "Global Tech"), issue_date=payload.get("issue_date", "2026-01-15"), credential_id=payload.get("credential_id", "CERT-10928"), credential_url=payload.get("credential_url", "https://example.com/cert"), verified=True)
    db.add(cert)
    db.commit()
    return {"message": "Certification added", "id": cert.id}
