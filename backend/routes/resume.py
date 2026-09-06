import json
from pathlib import Path
from fastapi import APIRouter, Depends, HTTPException, UploadFile, File
from sqlalchemy.orm import Session
from backend.database.connection import get_db
from backend.models.user import User
from backend.models.student import Student, Resume, StudentSkill
from backend.security import get_current_user
from backend.config import settings
from ai.resume.parser import ResumeParser

router = APIRouter(prefix="/resume", tags=["Resume"])

@router.post("/upload")
async def upload_resume(file: UploadFile = File(...), current_user: User = Depends(get_current_user), db: Session = Depends(get_db)):
    student = db.query(Student).filter(Student.user_id == current_user.id).first()
    if not student:
        raise HTTPException(status_code=404, detail="Student profile not found")

    file_path = settings.UPLOAD_DIR / f"resume_{student.id}_{file.filename}"
    contents = await file.read()
    with open(file_path, "wb") as f:
        f.write(contents)

    parsed_info = ResumeParser.parse_file(file_path)
    extracted_skills = parsed_info.get("extracted_skills", [])
    rag_analysis = parsed_info.get("rag_analysis", {})

    resume_rec = Resume(
        student_id=student.id,
        filename=file.filename,
        file_path=str(file_path),
        parsed_text=parsed_info.get("raw_text", "")[:2000],
        extracted_skills=json.dumps(extracted_skills),
        rag_summary=rag_analysis.get("explanation", "")
    )
    db.add(resume_rec)

    for sk in extracted_skills:
        existing = db.query(StudentSkill).filter(StudentSkill.student_id == student.id, StudentSkill.skill_name == sk).first()
        if not existing:
            db.add(StudentSkill(student_id=student.id, skill_name=sk, proficiency_level="Intermediate", category="Technical", verified=True))

    student.top_skills = json.dumps(extracted_skills[:6])
    student.readiness_score = rag_analysis.get("readiness_score", 70.0)
    student.missing_skills = json.dumps(rag_analysis.get("skill_gaps", []))
    db.commit()

    return {"message": "Resume uploaded and analyzed using RAG pipeline successfully", "extracted_skills": extracted_skills, "rag_analysis": rag_analysis}

@router.get("/my-resume")
def get_my_resume(current_user: User = Depends(get_current_user), db: Session = Depends(get_db)):
    student = db.query(Student).filter(Student.user_id == current_user.id).first()
    if not student:
        raise HTTPException(status_code=404, detail="Student profile not found")
    latest_resume = db.query(Resume).filter(Resume.student_id == student.id).order_by(Resume.uploaded_at.desc()).first()
    if not latest_resume:
        return {"has_resume": False}
    return {
        "has_resume": True,
        "filename": latest_resume.filename,
        "uploaded_at": latest_resume.uploaded_at,
        "extracted_skills": json.loads(latest_resume.extracted_skills or "[]"),
        "rag_summary": latest_resume.rag_summary
    }
