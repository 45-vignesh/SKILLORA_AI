import json
from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from backend.database.connection import get_db
from backend.models.user import User, RoleEnum
from backend.models.student import Student
from backend.models.industry import Industry
from backend.models.institution import Institution
from backend.models.academician import Academician
from backend.schemas import LoginRequest, RegisterRequest, Token, UserResponse
from backend.security import verify_password, get_password_hash, create_access_token, get_current_user

router = APIRouter(prefix="/auth", tags=["Authentication"])

@router.post("/register", response_model=Token)
def register(req: RegisterRequest, db: Session = Depends(get_db)):
    existing = db.query(User).filter(User.email == req.email).first()
    if existing:
        raise HTTPException(status_code=400, detail="Email already registered")
    
    role = req.role.upper()
    if role not in [r.value for r in RoleEnum]:
        role = RoleEnum.STUDENT.value

    user = User(
        email=req.email,
        hashed_password=get_password_hash(req.password),
        full_name=req.full_name,
        role=role
    )
    db.add(user)
    db.commit()
    db.refresh(user)

    # Initialize role-specific profile
    if role == RoleEnum.STUDENT.value:
        student = Student(
            user_id=user.id,
            institution_name=req.institution_or_company or "National Institute of Technology",
            department=req.department_or_domain or "Computer Science & Engineering",
            target_role="Full Stack Developer",
            top_skills=json.dumps(["Python", "React", "SQL"]),
            missing_skills=json.dumps(["Docker", "AWS", "CI/CD"])
        )
        db.add(student)
    elif role == RoleEnum.INDUSTRY.value:
        industry = Industry(
            user_id=user.id,
            company_name=req.institution_or_company or "TechCorp Solutions",
            industry_type=req.department_or_domain or "Information Technology",
            location="Bengaluru, India"
        )
        db.add(industry)
    elif role == RoleEnum.INSTITUTION.value:
        institution = Institution(
            user_id=user.id,
            institution_name=req.institution_or_company or "Institute of Engineering & Technology",
            state="Karnataka"
        )
        db.add(institution)
    elif role == RoleEnum.ACADEMICIAN.value:
        academician = Academician(
            user_id=user.id,
            faculty_name=req.full_name,
            institution_name=req.institution_or_company or "National Institute of Technology",
            department=req.department_or_domain or "Computer Science & Engineering"
        )
        db.add(academician)
    
    db.commit()

    token = create_access_token({"sub": user.email, "role": user.role, "user_id": user.id})
    return {
        "access_token": token,
        "token_type": "bearer",
        "role": user.role,
        "user_id": user.id,
        "full_name": user.full_name,
        "email": user.email
    }

@router.post("/login", response_model=Token)
def login(req: LoginRequest, db: Session = Depends(get_db)):
    user = db.query(User).filter(User.email == req.email).first()
    if not user or not verify_password(req.password, user.hashed_password):
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Incorrect email or password"
        )
    
    token = create_access_token({"sub": user.email, "role": user.role, "user_id": user.id})
    return {
        "access_token": token,
        "token_type": "bearer",
        "role": user.role,
        "user_id": user.id,
        "full_name": user.full_name,
        "email": user.email
    }

@router.get("/me", response_model=UserResponse)
def get_me(current_user: User = Depends(get_current_user)):
    return current_user
