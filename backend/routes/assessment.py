import json
from datetime import datetime
from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from backend.database.connection import get_db
from backend.models.user import User
from backend.models.student import Student, AssessmentQuestion, SkillAssessment, AssessmentResult, StudentSkill
from backend.schemas import AssessmentSubmission
from backend.security import get_current_user
from ai.rag.rag_pipeline import rag_pipeline

router = APIRouter(prefix="/assessment", tags=["Skill Assessment"])

@router.get("/questions")
def get_questions(category: str = "Technical Skills", db: Session = Depends(get_db)):
    query = db.query(AssessmentQuestion)
    if category != "All":
        query = query.filter(AssessmentQuestion.category == category)
    questions = query.limit(20).all()
    return [{"id": q.id, "category": q.category, "skill_tested": q.skill_tested, "difficulty": q.difficulty, "question_text": q.question_text, "options": json.loads(q.options or "[]")} for q in questions]

@router.post("/submit")
def submit_assessment(sub: AssessmentSubmission, current_user: User = Depends(get_current_user), db: Session = Depends(get_db)):
    student = db.query(Student).filter(Student.user_id == current_user.id).first()
    if not student:
        raise HTTPException(status_code=404, detail="Student profile not found")

    total_correct = 0
    total_questions = len(sub.answers)
    if total_questions == 0:
        raise HTTPException(status_code=400, detail="No answers provided")

    question_ids = list(sub.answers.keys())
    db_questions = db.query(AssessmentQuestion).filter(AssessmentQuestion.id.in_(question_ids)).all()
    q_map = {q.id: q for q in db_questions}

    skills_tested_correct = set()
    for q_id, selected in sub.answers.items():
        q = q_map.get(int(q_id))
        if q and q.correct_option == selected:
            total_correct += 1
            skills_tested_correct.add(q.skill_tested)

    percentage = round((total_correct / max(total_questions, 1)) * 100, 1)

    student_skills = [s.skill_name for s in db.query(StudentSkill).filter(StudentSkill.student_id == student.id).all()]
    student_skills = list(set(student_skills + list(skills_tested_correct)))
    
    rag_eval = rag_pipeline.analyze_student(student_skills, student.target_role or "Full Stack Developer")
    rag_eval["assessment_score"] = f"{total_correct}/{total_questions} ({percentage}%)"

    assessment = SkillAssessment(
        student_id=student.id,
        title=sub.title,
        category=sub.category,
        total_score=float(total_correct),
        max_score=float(total_questions),
        percentage=percentage,
        rag_feedback=json.dumps(rag_eval)
    )
    db.add(assessment)
    db.commit()
    db.refresh(assessment)

    for q_id, selected in sub.answers.items():
        q = q_map.get(int(q_id))
        is_corr = (q.correct_option == selected) if q else False
        res = AssessmentResult(assessment_id=assessment.id, question_id=int(q_id), selected_option=selected, is_correct=is_corr)
        db.add(res)

    student.readiness_score = rag_eval.get("readiness_score", percentage)
    student.top_skills = json.dumps(rag_eval.get("matched_skills", student_skills[:5]))
    student.missing_skills = json.dumps(rag_eval.get("skill_gaps", []))
    db.commit()

    return {"assessment_id": assessment.id, "score": total_correct, "total": total_questions, "percentage": percentage, "rag_feedback": rag_eval}

@router.get("/history")
def get_assessment_history(current_user: User = Depends(get_current_user), db: Session = Depends(get_db)):
    student = db.query(Student).filter(Student.user_id == current_user.id).first()
    if not student:
        raise HTTPException(status_code=404, detail="Student profile not found")
    assessments = db.query(SkillAssessment).filter(SkillAssessment.student_id == student.id).order_by(SkillAssessment.completed_at.desc()).all()
    return [{"id": a.id, "title": a.title, "category": a.category, "score": a.total_score, "max_score": a.max_score, "percentage": a.percentage, "rag_feedback": json.loads(a.rag_feedback or "{}"), "completed_at": a.completed_at} for a in assessments]
