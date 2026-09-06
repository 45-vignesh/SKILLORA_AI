from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from backend.database.connection import get_db
from backend.models.student import Student, StudentSkill
from backend.models.industry import Job, Internship
from backend.schemas import AIAnalysisRequest, AIResponse
from ai.rag.rag_pipeline import rag_pipeline

router = APIRouter(prefix="/ai", tags=["Explainable RAG AI"])

@router.post("/analyze-student", response_model=AIResponse)
def analyze_student(req: AIAnalysisRequest, db: Session = Depends(get_db)):
    skills = req.skills or []
    target_role = req.target_role or "Full Stack Developer"
    if req.student_id:
        student = db.query(Student).filter(Student.id == req.student_id).first()
        if student:
            skills = [s.skill_name for s in student.skills]
            target_role = student.target_role or target_role

    res = rag_pipeline.analyze_student(skills, target_role)
    return res

@router.post("/analyze-resume", response_model=AIResponse)
def analyze_resume(req: AIAnalysisRequest):
    resume_text = req.query or "Experienced in Python, SQL, Git, React, building full-stack web applications."
    res = rag_pipeline.analyze_resume(resume_text)
    return res

@router.post("/skill-gap", response_model=AIResponse)
def analyze_skill_gap(req: AIAnalysisRequest, db: Session = Depends(get_db)):
    skills = req.skills or ["Python", "Linux", "Networking"]
    target_role = req.target_role or "Cloud Engineer"
    if req.student_id:
        student = db.query(Student).filter(Student.id == req.student_id).first()
        if student:
            skills = [s.skill_name for s in student.skills]
            target_role = student.target_role or target_role
    return rag_pipeline.analyze_skill_gap(skills, target_role)

@router.post("/recommend-career", response_model=AIResponse)
def recommend_career(req: AIAnalysisRequest):
    skills = req.skills or ["Python", "React", "SQL"]
    return rag_pipeline.analyze_student(skills, "Top Career Suitability")

@router.post("/recommend-courses", response_model=AIResponse)
def recommend_courses(req: AIAnalysisRequest):
    skills = req.skills or ["Python", "JavaScript"]
    target_role = req.target_role or "Cloud Engineer"
    res = rag_pipeline.analyze_skill_gap(skills, target_role)
    res["recommendations"] = [
        "AWS Cloud Practitioner Essentials (Skillora Academy)",
        "Docker for Developers & Container Orchestration",
        "CI/CD with GitHub Actions & Infrastructure-as-Code"
    ]
    return res

@router.post("/match-job", response_model=AIResponse)
def match_job(req: AIAnalysisRequest, db: Session = Depends(get_db)):
    skills = req.skills or ["Python", "React", "PostgreSQL"]
    job_title = "Full Stack Engineer"
    required_skills = ["React", "Node.js", "PostgreSQL", "Docker", "AWS"]

    if req.job_id:
        job = db.query(Job).filter(Job.id == req.job_id).first()
        if job:
            job_title = job.title
            import json
            required_skills = json.loads(job.required_skills or "[]")

    if req.student_id:
        student = db.query(Student).filter(Student.id == req.student_id).first()
        if student:
            skills = [s.skill_name for s in student.skills]

    return rag_pipeline.match_job(skills, job_title, required_skills)

@router.post("/match-internship", response_model=AIResponse)
def match_internship(req: AIAnalysisRequest, db: Session = Depends(get_db)):
    skills = req.skills or ["Python", "Linux"]
    internship_title = "Cloud Operations Intern"
    required_skills = ["Linux", "Networking", "AWS", "Docker"]

    if req.internship_id:
        item = db.query(Internship).filter(Internship.id == req.internship_id).first()
        if item:
            internship_title = item.title
            import json
            required_skills = json.loads(item.required_skills or "[]")

    if req.student_id:
        student = db.query(Student).filter(Student.id == req.student_id).first()
        if student:
            skills = [s.skill_name for s in student.skills]

    return rag_pipeline.match_internship(skills, internship_title, required_skills)

@router.post("/curriculum-insights", response_model=AIResponse)
def curriculum_insights(req: AIAnalysisRequest):
    department = req.department or "Computer Science & Engineering"
    return rag_pipeline.generate_curriculum_insights(department, req.skills or [])
