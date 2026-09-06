from datetime import datetime
from sqlalchemy import Column, Integer, String, Boolean, DateTime, Enum as SQLEnum
from sqlalchemy.orm import relationship
import enum
from backend.database.connection import Base

class RoleEnum(str, enum.Enum):
    STUDENT = "STUDENT"
    INDUSTRY = "INDUSTRY"
    INSTITUTION = "INSTITUTION"
    ACADEMICIAN = "ACADEMICIAN"
    ADMIN = "ADMIN"

class User(Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True, index=True)
    email = Column(String(255), unique=True, index=True, nullable=False)
    hashed_password = Column(String(255), nullable=False)
    full_name = Column(String(255), nullable=False)
    role = Column(String(50), default=RoleEnum.STUDENT.value, nullable=False)
    is_active = Column(Boolean, default=True)
    created_at = Column(DateTime, default=datetime.utcnow)
    updated_at = Column(DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)

    # Relationships
    student_profile = relationship("Student", back_populates="user", uselist=False, cascade="all, delete-orphan")
    industry_profile = relationship("Industry", back_populates="user", uselist=False, cascade="all, delete-orphan")
    institution_profile = relationship("Institution", back_populates="user", uselist=False, cascade="all, delete-orphan")
    academician_profile = relationship("Academician", back_populates="user", uselist=False, cascade="all, delete-orphan")
    notifications = relationship("Notification", back_populates="user", cascade="all, delete-orphan")
    documents = relationship("Document", back_populates="user", cascade="all, delete-orphan")
