from datetime import datetime
from sqlalchemy import Column, Integer, String, Text, Float, Boolean, DateTime, ForeignKey
from sqlalchemy.orm import relationship
from backend.database.connection import Base

class Institution(Base):
    __tablename__ = "institutions"

    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id", ondelete="CASCADE"), unique=True, nullable=False)
    institution_name = Column(String(255), nullable=False)
    institution_code = Column(String(50), default="INST-2026-NIT")
    institution_type = Column(String(100), default="Autonomous Engineering Institute")
    address = Column(String(255), default="Academic City, Bengaluru")
    state = Column(String(100), default="Karnataka")
    contact_email = Column(String(100), default="dean.academics@institution.edu")
    accredited = Column(Boolean, default=True)
    created_at = Column(DateTime, default=datetime.utcnow)

    user = relationship("User", back_populates="institution_profile")
    skill_analytics = relationship("StudentSkillAnalytics", back_populates="institution", cascade="all, delete-orphan")
    placement_analytics = relationship("PlacementAnalytics", back_populates="institution", cascade="all, delete-orphan")
    curriculum_feedbacks = relationship("CurriculumFeedback", back_populates="institution", cascade="all, delete-orphan")

class StudentSkillAnalytics(Base):
    __tablename__ = "student_skill_analytics"

    id = Column(Integer, primary_key=True, index=True)
    institution_id = Column(Integer, ForeignKey("institutions.id", ondelete="CASCADE"), nullable=False)
    department = Column(String(100), nullable=False)
    batch_year = Column(Integer, default=2026)
    total_students = Column(Integer, default=120)
    assessed_students = Column(Integer, default=95)
    avg_readiness_score = Column(Float, default=74.2)
    top_demanded_skills = Column(Text, default="[]")  # JSON list
    common_skill_gaps = Column(Text, default="[]")  # JSON list
    updated_at = Column(DateTime, default=datetime.utcnow)

    institution = relationship("Institution", back_populates="skill_analytics")

class PlacementAnalytics(Base):
    __tablename__ = "placement_analytics"

    id = Column(Integer, primary_key=True, index=True)
    institution_id = Column(Integer, ForeignKey("institutions.id", ondelete="CASCADE"), nullable=False)
    academic_year = Column(String(20), default="2025-2026")
    total_eligible = Column(Integer, default=350)
    placed_count = Column(Integer, default=298)
    higher_studies_count = Column(Integer, default=32)
    entrepreneurship_count = Column(Integer, default=8)
    avg_package_lpa = Column(Float, default=9.8)
    highest_package_lpa = Column(Float, default=44.0)
    top_recruiters = Column(Text, default="[]")  # JSON list
    updated_at = Column(DateTime, default=datetime.utcnow)

    institution = relationship("Institution", back_populates="placement_analytics")

class CurriculumFeedback(Base):
    __tablename__ = "curriculum_feedbacks"

    id = Column(Integer, primary_key=True, index=True)
    institution_id = Column(Integer, ForeignKey("institutions.id", ondelete="CASCADE"), nullable=False)
    department = Column(String(100), nullable=False)
    target_domain = Column(String(100), nullable=False)
    rag_gap_analysis = Column(Text, nullable=False)  # JSON or text
    suggested_revisions = Column(Text, nullable=False)  # JSON list of actionable course revisions
    industry_benchmark_sources = Column(Text, default="[]")  # JSON list of cited frameworks
    created_at = Column(DateTime, default=datetime.utcnow)

    institution = relationship("Institution", back_populates="curriculum_feedbacks")
