from pydantic import BaseModel, EmailStr, Field
from typing import Optional, List, Dict, Any
from datetime import datetime

# Token
class Token(BaseModel):
    access_token: str
    token_type: str
    role: str
    user_id: int
    full_name: str
    email: str

class TokenData(BaseModel):
    email: Optional[str] = None
    role: Optional[str] = None

# Auth
class LoginRequest(BaseModel):
    email: EmailStr
    password: str

class RegisterRequest(BaseModel):
    email: EmailStr
    password: str
    full_name: str
    role: str = "STUDENT"  # STUDENT, INDUSTRY, INSTITUTION, ACADEMICIAN
    institution_or_company: Optional[str] = None
    department_or_domain: Optional[str] = None

class UserResponse(BaseModel):
    id: int
    email: str
    full_name: str
    role: str
    is_active: bool
    created_at: datetime
    
    class Config:
        from_attributes = True

# Student
class StudentProfileUpdate(BaseModel):
    roll_number: Optional[str] = None
    institution_name: Optional[str] = None
    department: Optional[str] = None
    year_of_study: Optional[int] = None
    cgpa: Optional[float] = None
    phone: Optional[str] = None
    bio: Optional[str] = None
    target_role: Optional[str] = None
    github_url: Optional[str] = None
    linkedin_url: Optional[str] = None
    portfolio_url: Optional[str] = None

class SkillCreate(BaseModel):
    skill_name: str
    proficiency_level: str = "Intermediate"
    category: str = "Technical"

# Assessment
class AssessmentSubmission(BaseModel):
    title: str
    category: str
    answers: Dict[int, int]  # question_id -> selected_option index

# Jobs & Internships
class JobCreate(BaseModel):
    title: str
    job_type: str = "Full-time"
    location: str = "Bengaluru, India"
    experience_required: str = "0-2 Years"
    salary_range: str = "₹8,00,000 - ₹14,00,000 P.A."
    eligibility: str = "B.Tech/M.Tech in CS/IT or related, Min 7.0 CGPA"
    required_skills: List[str]
    preferred_skills: List[str] = []
    deadline: str = "2026-12-31"
    description: str

class InternshipCreate(BaseModel):
    title: str
    department: str = "Software Engineering"
    location: str = "Remote / Hybrid"
    duration: str = "6 Months"
    stipend: str = "₹30,000 / month"
    vacancies: int = 5
    eligibility: str = "Pre-final & Final year students"
    required_skills: List[str]
    preferred_skills: List[str] = []
    deadline: str = "2026-11-30"
    description: str

class ApplicationStatusUpdate(BaseModel):
    status: str  # Applied, Under Review, Shortlisted, Interview Scheduled, Selected, Rejected
    notes: Optional[str] = None

class InterviewCreate(BaseModel):
    application_id: int
    application_type: str = "Job"
    scheduled_time: str
    meeting_link: str
    interviewer: str = "Senior Technical Lead"

class FacultyTrainingCreate(BaseModel):
    title: str
    domain: str
    duration: str
    mode: str = "Hybrid"
    start_date: str
    description: str
    eligibility: str
    stipend_or_fee: str = "Sponsored"
    vacancies: int = 30

# RAG AI Schemas
class AIAnalysisRequest(BaseModel):
    student_id: Optional[int] = None
    target_role: Optional[str] = None
    skills: Optional[List[str]] = None
    job_id: Optional[int] = None
    internship_id: Optional[int] = None
    department: Optional[str] = None
    query: Optional[str] = None

class AIResponse(BaseModel):
    answer: str
    recommendations: List[Any] = []
    matched_skills: List[str] = []
    skill_gaps: List[str] = []
    readiness_score: float = 0.0
    sources: List[str] = []
    explanation: str = ""
