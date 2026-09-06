import json
from datetime import datetime
from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from backend.database.connection import get_db
from backend.models.user import User
from backend.models.academician import Academician, ResearchProject, MentorshipProgram, ConsultancyOpportunity
from backend.models.industry import FacultyTraining
from backend.security import get_current_user

router = APIRouter(prefix="/academician", tags=["Academician"])

@router.get("/profile")
def get_faculty_profile(current_user: User = Depends(get_current_user), db: Session = Depends(get_db)):
    acad = db.query(Academician).filter(Academician.user_id == current_user.id).first()
    if not acad:
        acad = Academician(
            user_id=current_user.id,
            faculty_name=current_user.full_name,
            institution_name="National Institute of Technology",
            department="Computer Science & Engineering",
            designation="Associate Professor",
            specialization="Distributed Systems & Machine Learning",
            experience_years=12,
            research_interests=json.dumps(["Cloud Orchestration", "AI/ML Pipelines", "IoT Edge Security"])
        )
        db.add(acad)
        db.commit()
        db.refresh(acad)
    return {
        "id": acad.id,
        "faculty_name": acad.faculty_name,
        "institution_name": acad.institution_name,
        "department": acad.department,
        "designation": acad.designation,
        "specialization": acad.specialization,
        "experience_years": acad.experience_years,
        "research_interests": json.loads(acad.research_interests or "[]"),
        "bio": acad.bio
    }

@router.put("/profile")
def update_faculty_profile(payload: dict, current_user: User = Depends(get_current_user), db: Session = Depends(get_db)):
    acad = db.query(Academician).filter(Academician.user_id == current_user.id).first()
    for k, v in payload.items():
        if hasattr(acad, k):
            if k == "research_interests" and isinstance(v, list):
                setattr(acad, k, json.dumps(v))
            else:
                setattr(acad, k, v)
    db.commit()
    return {"message": "Faculty profile updated"}

@router.get("/opportunities")
def get_opportunities(db: Session = Depends(get_db)):
    trainings = db.query(FacultyTraining).all()
    results = []
    for t in trainings:
        results.append({
            "id": t.id,
            "title": t.title,
            "company_name": t.industry.company_name if t.industry else "TechNova Systems",
            "domain": t.domain,
            "duration": t.duration,
            "mode": t.mode,
            "start_date": t.start_date,
            "eligibility": t.eligibility,
            "stipend_or_fee": t.stipend_or_fee,
            "vacancies": t.vacancies,
            "description": t.description
        })
    return results

@router.get("/research")
def get_research_projects(db: Session = Depends(get_db)):
    projects = db.query(ResearchProject).all()
    return [
        {
            "id": p.id,
            "title": p.title,
            "domain": p.domain,
            "abstract": p.abstract,
            "lead_institution": p.lead_institution,
            "industry_partner": p.industry_partner,
            "funding_amount": p.funding_amount,
            "status": p.status,
            "duration": p.duration,
            "open_positions": p.open_positions
        }
        for p in projects
    ]

@router.post("/research")
def create_research_project(payload: dict, current_user: User = Depends(get_current_user), db: Session = Depends(get_db)):
    acad = db.query(Academician).filter(Academician.user_id == current_user.id).first()
    proj = ResearchProject(
        academician_id=acad.id if acad else 1,
        title=payload.get("title", "Next-Gen AI Research"),
        domain=payload.get("domain", "Machine Learning"),
        abstract=payload.get("abstract", "Investigating explainable intelligence architectures."),
        lead_institution=acad.institution_name if acad else "NIT",
        industry_partner=payload.get("industry_partner", "HealthAI Labs"),
        funding_amount=payload.get("funding_amount", "₹20,00,000"),
        status="Active",
        open_positions=int(payload.get("open_positions", 2)),
        duration=payload.get("duration", "18 Months")
    )
    db.add(proj)
    db.commit()
    return {"message": "Research project created successfully", "id": proj.id}

@router.get("/consultancy")
def get_consultancy(db: Session = Depends(get_db)):
    items = db.query(ConsultancyOpportunity).all()
    return [
        {
            "id": c.id,
            "title": c.title,
            "industry_partner": c.industry_partner,
            "domain": c.domain,
            "budget": c.budget,
            "duration": c.duration,
            "description": c.description,
            "status": c.status
        }
        for c in items
    ]

@router.get("/mentorships")
def get_mentorships(db: Session = Depends(get_db)):
    items = db.query(MentorshipProgram).all()
    return [
        {
            "id": m.id,
            "faculty_name": m.faculty_name,
            "topic": m.topic,
            "domain": m.domain,
            "max_mentees": m.max_mentees,
            "current_mentees": m.current_mentees,
            "duration_weeks": m.duration_weeks,
            "status": m.status
        }
        for m in items
    ]
