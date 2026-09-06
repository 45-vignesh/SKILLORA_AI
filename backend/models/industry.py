from datetime import datetime
from sqlalchemy import Column, Integer, String, Text, Float, Boolean, DateTime, ForeignKey
from sqlalchemy.orm import relationship
from backend.database.connection import Base

class Industry(Base):
    __tablename__ = "industries"

    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id", ondelete="CASCADE"), unique=True, nullable=False)
    company_name = Column(String(255), nullable=False)
    industry_type = Column(String(100), default="Information Technology")
    company_size = Column(String(50), default="500-1000")
    website = Column(String(255), default="https://company.example.com")
    description = Column(Text, nullable=True)
    location = Column(String(255), default="Bengaluru, India")
    contact_person = Column(String(100), nullable=True)
    verified = Column(Boolean, default=True)
    created_at = Column(DateTime, default=datetime.utcnow)

    user = relationship("User", back_populates="industry_profile")
    jobs = relationship("Job", back_populates="industry", cascade="all, delete-orphan")
    internships = relationship("Internship", back_populates="industry", cascade="all, delete-orphan")
    faculty_trainings = relationship("FacultyTraining", back_populates="industry", cascade="all, delete-orphan")

class Job(Base):
    __tablename__ = "jobs"

    id = Column(Integer, primary_key=True, index=True)
    industry_id = Column(Integer, ForeignKey("industries.id", ondelete="CASCADE"), nullable=False)
    title = Column(String(255), nullable=False)
    job_type = Column(String(50), default="Full-time")  # Full-time, Part-time, Remote
    location = Column(String(255), default="Bengaluru, India")
    experience_required = Column(String(50), default="0-2 Years")
    salary_range = Column(String(100), default="₹8,00,000 - ₹14,00,000 P.A.")
    eligibility = Column(String(255), default="B.Tech/M.Tech in CS/IT or related, Min 7.0 CGPA")
    required_skills = Column(Text, default="[]")  # JSON list
    preferred_skills = Column(Text, default="[]")  # JSON list
    deadline = Column(String(50), default="2026-12-31")
    description = Column(Text, nullable=False)
    is_active = Column(Boolean, default=True)
    created_at = Column(DateTime, default=datetime.utcnow)

    industry = relationship("Industry", back_populates="jobs")
    applications = relationship("JobApplication", back_populates="job", cascade="all, delete-orphan")

class JobApplication(Base):
    __tablename__ = "job_applications"

    id = Column(Integer, primary_key=True, index=True)
    job_id = Column(Integer, ForeignKey("jobs.id", ondelete="CASCADE"), nullable=False)
    student_id = Column(Integer, ForeignKey("students.id", ondelete="CASCADE"), nullable=False)
    applied_at = Column(DateTime, default=datetime.utcnow)
    status = Column(String(50), default="Applied")  # Applied, Under Review, Shortlisted, Interview Scheduled, Selected, Rejected
    match_score = Column(Float, default=0.0)
    why_matched = Column(Text, default="[]")  # JSON list
    skill_gaps = Column(Text, default="[]")  # JSON list
    notes = Column(Text, nullable=True)

    job = relationship("Job", back_populates="applications")
    student = relationship("Student", back_populates="job_applications")
    interviews = relationship("Interview", back_populates="job_application", cascade="all, delete-orphan")

class Internship(Base):
    __tablename__ = "internships"

    id = Column(Integer, primary_key=True, index=True)
    industry_id = Column(Integer, ForeignKey("industries.id", ondelete="CASCADE"), nullable=False)
    title = Column(String(255), nullable=False)
    department = Column(String(100), default="Software Engineering")
    location = Column(String(255), default="Remote / Hybrid")
    duration = Column(String(50), default="6 Months")
    stipend = Column(String(100), default="₹25,000 - ₹40,000 / month")
    vacancies = Column(Integer, default=5)
    eligibility = Column(String(255), default="Pre-final & Final year students")
    required_skills = Column(Text, default="[]")  # JSON list
    preferred_skills = Column(Text, default="[]")  # JSON list
    deadline = Column(String(50), default="2026-11-30")
    description = Column(Text, nullable=False)
    is_active = Column(Boolean, default=True)
    created_at = Column(DateTime, default=datetime.utcnow)

    industry = relationship("Industry", back_populates="internships")
    applications = relationship("InternshipApplication", back_populates="internship", cascade="all, delete-orphan")

class InternshipApplication(Base):
    __tablename__ = "internship_applications"

    id = Column(Integer, primary_key=True, index=True)
    internship_id = Column(Integer, ForeignKey("internships.id", ondelete="CASCADE"), nullable=False)
    student_id = Column(Integer, ForeignKey("students.id", ondelete="CASCADE"), nullable=False)
    applied_at = Column(DateTime, default=datetime.utcnow)
    status = Column(String(50), default="Applied")  # Applied, Under Review, Shortlisted, Interview Scheduled, Selected, Rejected
    match_score = Column(Float, default=0.0)
    why_matched = Column(Text, default="[]")  # JSON list
    skill_gaps = Column(Text, default="[]")  # JSON list
    notes = Column(Text, nullable=True)

    internship = relationship("Internship", back_populates="applications")
    student = relationship("Student", back_populates="internship_applications")

class Interview(Base):
    __tablename__ = "interviews"

    id = Column(Integer, primary_key=True, index=True)
    application_id = Column(Integer, ForeignKey("job_applications.id", ondelete="CASCADE"), nullable=True)
    application_type = Column(String(50), default="Job")  # Job or Internship
    scheduled_time = Column(String(100), nullable=False)
    meeting_link = Column(String(255), default="https://meet.google.com/xyz-skillora-interview")
    interviewer = Column(String(100), default="Senior Engineering Manager")
    status = Column(String(50), default="Scheduled")  # Scheduled, Completed, Rescheduled, Cancelled
    feedback = Column(Text, nullable=True)
    created_at = Column(DateTime, default=datetime.utcnow)

    job_application = relationship("JobApplication", back_populates="interviews")

class FacultyTraining(Base):
    __tablename__ = "faculty_trainings"

    id = Column(Integer, primary_key=True, index=True)
    industry_id = Column(Integer, ForeignKey("industries.id", ondelete="CASCADE"), nullable=False)
    title = Column(String(255), nullable=False)
    domain = Column(String(100), default="Cloud & Generative AI")
    duration = Column(String(50), default="2 Weeks")
    mode = Column(String(50), default="Hybrid")  # Online, Hybrid, On-site
    start_date = Column(String(50), default="2026-10-15")
    description = Column(Text, nullable=False)
    eligibility = Column(String(255), default="Faculty in CS/IT/ECE with min 2 years experience")
    stipend_or_fee = Column(String(100), default="Sponsored / Free for Partner Colleges")
    vacancies = Column(Integer, default=30)
    status = Column(String(50), default="Open")  # Open, Ongoing, Closed
    created_at = Column(DateTime, default=datetime.utcnow)

    industry = relationship("Industry", back_populates="faculty_trainings")
