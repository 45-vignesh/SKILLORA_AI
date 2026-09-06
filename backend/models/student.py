from datetime import datetime
from sqlalchemy import Column, Integer, String, Text, Float, Boolean, DateTime, ForeignKey
from sqlalchemy.orm import relationship
from backend.database.connection import Base

class Student(Base):
    __tablename__ = "students"

    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id", ondelete="CASCADE"), unique=True, nullable=False)
    roll_number = Column(String(50), nullable=True)
    institution_name = Column(String(255), default="National Institute of Technology")
    department = Column(String(100), default="Computer Science & Engineering")
    year_of_study = Column(Integer, default=3)
    cgpa = Column(Float, default=8.5)
    phone = Column(String(20), nullable=True)
    bio = Column(Text, nullable=True)
    target_role = Column(String(100), default="Full Stack Developer")
    github_url = Column(String(255), nullable=True)
    linkedin_url = Column(String(255), nullable=True)
    portfolio_url = Column(String(255), nullable=True)
    
    # AI/Readiness fields
    readiness_score = Column(Float, default=0.0)
    top_skills = Column(Text, default="[]")  # JSON encoded list
    missing_skills = Column(Text, default="[]")  # JSON encoded list
    rag_career_recommendation = Column(Text, nullable=True)  # JSON summary
    
    created_at = Column(DateTime, default=datetime.utcnow)
    updated_at = Column(DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)

    # Relationships
    user = relationship("User", back_populates="student_profile")
    skills = relationship("StudentSkill", back_populates="student", cascade="all, delete-orphan")
    assessments = relationship("SkillAssessment", back_populates="student", cascade="all, delete-orphan")
    courses_progress = relationship("CourseProgress", back_populates="student", cascade="all, delete-orphan")
    certifications = relationship("Certification", back_populates="student", cascade="all, delete-orphan")
    projects = relationship("Project", back_populates="student", cascade="all, delete-orphan")
    resumes = relationship("Resume", back_populates="student", cascade="all, delete-orphan")
    job_applications = relationship("JobApplication", back_populates="student", cascade="all, delete-orphan")
    internship_applications = relationship("InternshipApplication", back_populates="student", cascade="all, delete-orphan")
    daily_challenges = relationship("DailyChallenge", back_populates="student", cascade="all, delete-orphan")

class StudentSkill(Base):
    __tablename__ = "student_skills"

    id = Column(Integer, primary_key=True, index=True)
    student_id = Column(Integer, ForeignKey("students.id", ondelete="CASCADE"), nullable=False)
    skill_name = Column(String(100), nullable=False)
    proficiency_level = Column(String(50), default="Intermediate")  # Beginner, Intermediate, Advanced, Expert
    category = Column(String(50), default="Technical")  # Technical, Soft, Tools, Frameworks
    verified = Column(Boolean, default=False)
    created_at = Column(DateTime, default=datetime.utcnow)

    student = relationship("Student", back_populates="skills")

class AssessmentQuestion(Base):
    __tablename__ = "assessment_questions"

    id = Column(Integer, primary_key=True, index=True)
    category = Column(String(50), nullable=False)  # Technical Skills, Soft Skills, Problem Solving, Communication
    skill_tested = Column(String(100), nullable=False)
    difficulty = Column(String(50), default="Medium")
    question_text = Column(Text, nullable=False)
    options = Column(Text, nullable=False)  # JSON encoded list of 4 options
    correct_option = Column(Integer, nullable=False)  # 0, 1, 2, 3
    explanation = Column(Text, nullable=True)

class SkillAssessment(Base):
    __tablename__ = "skill_assessments"

    id = Column(Integer, primary_key=True, index=True)
    student_id = Column(Integer, ForeignKey("students.id", ondelete="CASCADE"), nullable=False)
    title = Column(String(200), nullable=False)
    category = Column(String(50), nullable=False)
    total_score = Column(Float, default=0.0)
    max_score = Column(Float, default=100.0)
    percentage = Column(Float, default=0.0)
    rag_feedback = Column(Text, nullable=True)  # JSON encoded explainable assessment results
    completed_at = Column(DateTime, default=datetime.utcnow)

    student = relationship("Student", back_populates="assessments")
    results = relationship("AssessmentResult", back_populates="assessment", cascade="all, delete-orphan")

class AssessmentResult(Base):
    __tablename__ = "assessment_results"

    id = Column(Integer, primary_key=True, index=True)
    assessment_id = Column(Integer, ForeignKey("skill_assessments.id", ondelete="CASCADE"), nullable=False)
    question_id = Column(Integer, ForeignKey("assessment_questions.id", ondelete="CASCADE"), nullable=False)
    selected_option = Column(Integer, nullable=False)
    is_correct = Column(Boolean, default=False)

    assessment = relationship("SkillAssessment", back_populates="results")
    question = relationship("AssessmentQuestion")

class Course(Base):
    __tablename__ = "courses"

    id = Column(Integer, primary_key=True, index=True)
    title = Column(String(255), nullable=False)
    provider = Column(String(100), default="Skillora Academy")
    instructor = Column(String(100), default="Industry Expert")
    duration = Column(String(50), default="6 Weeks")
    level = Column(String(50), default="Intermediate")
    description = Column(Text, nullable=False)
    syllabus = Column(Text, default="[]")  # JSON encoded list of modules
    skills_covered = Column(Text, default="[]")  # JSON encoded list of skills
    url = Column(String(255), default="https://skillora.ai/courses")
    rating = Column(Float, default=4.8)
    image_url = Column(String(255), nullable=True)
    created_at = Column(DateTime, default=datetime.utcnow)

    progress_records = relationship("CourseProgress", back_populates="course", cascade="all, delete-orphan")

class CourseProgress(Base):
    __tablename__ = "course_progress"

    id = Column(Integer, primary_key=True, index=True)
    student_id = Column(Integer, ForeignKey("students.id", ondelete="CASCADE"), nullable=False)
    course_id = Column(Integer, ForeignKey("courses.id", ondelete="CASCADE"), nullable=False)
    status = Column(String(50), default="In Progress")  # Not Started, In Progress, Completed
    progress_percent = Column(Float, default=0.0)
    started_at = Column(DateTime, default=datetime.utcnow)
    completed_at = Column(DateTime, nullable=True)

    student = relationship("Student", back_populates="courses_progress")
    course = relationship("Course", back_populates="progress_records")

class Certification(Base):
    __tablename__ = "certifications"

    id = Column(Integer, primary_key=True, index=True)
    student_id = Column(Integer, ForeignKey("students.id", ondelete="CASCADE"), nullable=False)
    title = Column(String(255), nullable=False)
    issuing_org = Column(String(100), nullable=False)
    issue_date = Column(String(50), nullable=False)
    credential_id = Column(String(100), nullable=True)
    credential_url = Column(String(255), nullable=True)
    verified = Column(Boolean, default=True)
    created_at = Column(DateTime, default=datetime.utcnow)

    student = relationship("Student", back_populates="certifications")

class Project(Base):
    __tablename__ = "projects"

    id = Column(Integer, primary_key=True, index=True)
    student_id = Column(Integer, ForeignKey("students.id", ondelete="CASCADE"), nullable=False)
    title = Column(String(255), nullable=False)
    description = Column(Text, nullable=False)
    tech_stack = Column(Text, default="[]")  # JSON list
    github_url = Column(String(255), nullable=True)
    live_url = Column(String(255), nullable=True)
    duration = Column(String(50), default="2 Months")
    role = Column(String(100), default="Lead Developer")
    created_at = Column(DateTime, default=datetime.utcnow)

    student = relationship("Student", back_populates="projects")

class Resume(Base):
    __tablename__ = "resumes"

    id = Column(Integer, primary_key=True, index=True)
    student_id = Column(Integer, ForeignKey("students.id", ondelete="CASCADE"), nullable=False)
    filename = Column(String(255), nullable=False)
    file_path = Column(String(500), nullable=False)
    parsed_text = Column(Text, nullable=True)
    extracted_skills = Column(Text, default="[]")  # JSON list
    extracted_experience = Column(Text, default="[]")  # JSON list
    extracted_education = Column(Text, default="[]")  # JSON list
    rag_summary = Column(Text, nullable=True)
    uploaded_at = Column(DateTime, default=datetime.utcnow)

    student = relationship("Student", back_populates="resumes")

class DailyChallenge(Base):
    __tablename__ = "daily_challenges"

    id = Column(Integer, primary_key=True, index=True)
    student_id = Column(Integer, ForeignKey("students.id", ondelete="CASCADE"), nullable=False)
    title = Column(String(255), nullable=False)
    category = Column(String(50), default="Algorithms")
    description = Column(Text, nullable=False)
    points = Column(Integer, default=50)
    is_completed = Column(Boolean, default=False)
    completed_at = Column(DateTime, nullable=True)
    date = Column(String(20), nullable=False)

    student = relationship("Student", back_populates="daily_challenges")
