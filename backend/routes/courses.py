import json
from datetime import datetime
from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from backend.database.connection import get_db
from backend.models.user import User
from backend.models.student import Student, Course, CourseProgress
from backend.security import get_current_user

router = APIRouter(prefix="/courses", tags=["Courses"])

@router.get("")
def list_courses(level: str = None, category: str = None, db: Session = Depends(get_db)):
    query = db.query(Course)
    if level and level != "All":
        query = query.filter(Course.level == level)
    courses = query.all()
    return [{"id": c.id, "title": c.title, "provider": c.provider, "instructor": c.instructor, "duration": c.duration, "level": c.level, "description": c.description, "rating": c.rating, "syllabus": json.loads(c.syllabus or "[]"), "skills_covered": json.loads(c.skills_covered or "[]"), "image_url": c.image_url, "url": c.url} for c in courses]

@router.get("/{course_id}")
def get_course_detail(course_id: int, db: Session = Depends(get_db)):
    course = db.query(Course).filter(Course.id == course_id).first()
    if not course:
        raise HTTPException(status_code=404, detail="Course not found")
    return {"id": course.id, "title": course.title, "provider": course.provider, "instructor": course.instructor, "duration": course.duration, "level": course.level, "description": course.description, "rating": course.rating, "syllabus": json.loads(course.syllabus or "[]"), "skills_covered": json.loads(course.skills_covered or "[]"), "url": course.url}

@router.post("/{course_id}/enroll")
def enroll_course(course_id: int, current_user: User = Depends(get_current_user), db: Session = Depends(get_db)):
    student = db.query(Student).filter(Student.user_id == current_user.id).first()
    if not student:
        raise HTTPException(status_code=404, detail="Student profile not found")
    existing = db.query(CourseProgress).filter(CourseProgress.student_id == student.id, CourseProgress.course_id == course_id).first()
    if existing:
        return {"message": "Already enrolled", "progress_percent": existing.progress_percent}
    progress = CourseProgress(student_id=student.id, course_id=course_id, status="In Progress", progress_percent=10.0)
    db.add(progress)
    db.commit()
    return {"message": "Enrolled successfully", "progress_percent": 10.0}

@router.put("/{course_id}/progress")
def update_progress(course_id: int, payload: dict, current_user: User = Depends(get_current_user), db: Session = Depends(get_db)):
    student = db.query(Student).filter(Student.user_id == current_user.id).first()
    progress = db.query(CourseProgress).filter(CourseProgress.student_id == student.id, CourseProgress.course_id == course_id).first()
    if not progress:
        progress = CourseProgress(student_id=student.id, course_id=course_id)
        db.add(progress)
    new_pct = payload.get("progress_percent", 50.0)
    progress.progress_percent = min(max(float(new_pct), 0.0), 100.0)
    if progress.progress_percent >= 100.0:
        progress.status = "Completed"
        progress.completed_at = datetime.utcnow()
    else:
        progress.status = "In Progress"
    db.commit()
    return {"message": "Progress updated", "status": progress.status, "progress_percent": progress.progress_percent}

@router.get("/my-courses/enrolled")
def get_my_courses(current_user: User = Depends(get_current_user), db: Session = Depends(get_db)):
    student = db.query(Student).filter(Student.user_id == current_user.id).first()
    if not student:
        raise HTTPException(status_code=404, detail="Student profile not found")
    enrolled = db.query(CourseProgress).filter(CourseProgress.student_id == student.id).all()
    return [{"id": ep.course.id, "title": ep.course.title, "provider": ep.course.provider, "level": ep.course.level, "duration": ep.course.duration, "status": ep.status, "progress_percent": ep.progress_percent, "started_at": ep.started_at, "completed_at": ep.completed_at} for ep in enrolled]
