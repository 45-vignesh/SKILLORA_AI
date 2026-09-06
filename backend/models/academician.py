from datetime import datetime
from sqlalchemy import Column, Integer, String, Text, Float, Boolean, DateTime, ForeignKey
from sqlalchemy.orm import relationship
from backend.database.connection import Base

class Academician(Base):
    __tablename__ = "academicians"

    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id", ondelete="CASCADE"), unique=True, nullable=False)
    faculty_name = Column(String(255), nullable=False)
    institution_name = Column(String(255), default="National Institute of Technology")
    department = Column(String(100), default="Computer Science & Engineering")
    designation = Column(String(100), default="Associate Professor")
    specialization = Column(String(200), default="Distributed Systems & Machine Learning")
    experience_years = Column(Integer, default=12)
    research_interests = Column(Text, default="[]")  # JSON list
    phone = Column(String(20), nullable=True)
    bio = Column(Text, nullable=True)
    created_at = Column(DateTime, default=datetime.utcnow)

    user = relationship("User", back_populates="academician_profile")
    research_projects = relationship("ResearchProject", back_populates="academician", cascade="all, delete-orphan")

class ResearchProject(Base):
    __tablename__ = "research_projects"

    id = Column(Integer, primary_key=True, index=True)
    academician_id = Column(Integer, ForeignKey("academicians.id", ondelete="CASCADE"), nullable=False)
    title = Column(String(255), nullable=False)
    domain = Column(String(100), default="AI in Healthcare")
    abstract = Column(Text, nullable=False)
    lead_institution = Column(String(255), default="NIT")
    industry_partner = Column(String(255), default="HealthAI Labs")
    funding_amount = Column(String(100), default="₹25,00,000")
    status = Column(String(50), default="Active")  # Active, Proposed, Completed
    open_positions = Column(Integer, default=2)
    duration = Column(String(50), default="18 Months")
    created_at = Column(DateTime, default=datetime.utcnow)

    academician = relationship("Academician", back_populates="research_projects")

class MentorshipProgram(Base):
    __tablename__ = "mentorship_programs"

    id = Column(Integer, primary_key=True, index=True)
    faculty_name = Column(String(100), nullable=False)
    topic = Column(String(200), nullable=False)
    domain = Column(String(100), default="Cloud Computing")
    max_mentees = Column(Integer, default=10)
    current_mentees = Column(Integer, default=6)
    duration_weeks = Column(Integer, default=8)
    status = Column(String(50), default="Open")
    created_at = Column(DateTime, default=datetime.utcnow)

class ConsultancyOpportunity(Base):
    __tablename__ = "consultancy_opportunities"

    id = Column(Integer, primary_key=True, index=True)
    title = Column(String(255), nullable=False)
    industry_partner = Column(String(255), default="CyberArmor Security")
    domain = Column(String(100), default="Zero-Trust Architecture")
    budget = Column(String(100), default="₹6,50,000")
    duration = Column(String(50), default="3 Months")
    description = Column(Text, nullable=False)
    status = Column(String(50), default="Open")
    created_at = Column(DateTime, default=datetime.utcnow)
