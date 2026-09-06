import json
from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from backend.database.connection import get_db
from backend.models.student import Student
from backend.models.industry import Job, Internship, JobApplication

router = APIRouter(prefix="/analytics", tags=["Analytics"])

@router.get("/institution")
def get_institution_analytics(db: Session = Depends(get_db)):
    students = db.query(Student).all()
    total_students = len(students)
    assessed_count = len([s for s in students if s.readiness_score > 0])
    avg_readiness = round(sum(s.readiness_score for s in students) / max(total_students, 1), 1) if total_students else 74.5

    dept_distribution = [
        {"name": "CSE", "students": 85, "readiness": 78.4, "placed": 68},
        {"name": "IT", "students": 65, "readiness": 75.2, "placed": 52},
        {"name": "AI & DS", "students": 50, "readiness": 81.6, "placed": 44},
        {"name": "ECE", "students": 40, "readiness": 69.8, "placed": 28}
    ]

    skill_demand_trends = [
        {"skill": "Python", "industryDemand": 94, "studentSupply": 88},
        {"skill": "React", "industryDemand": 86, "studentSupply": 72},
        {"skill": "Docker", "industryDemand": 82, "studentSupply": 34},
        {"skill": "AWS", "industryDemand": 88, "studentSupply": 41},
        {"skill": "SQL", "industryDemand": 90, "studentSupply": 82},
        {"skill": "Kubernetes", "industryDemand": 74, "studentSupply": 22},
        {"skill": "TypeScript", "industryDemand": 79, "studentSupply": 48}
    ]

    placement_funnel = [
        {"stage": "Eligible Students", "count": 240, "fill": "#3b82f6"},
        {"stage": "Skills Assessed", "count": 204, "fill": "#6366f1"},
        {"stage": "Interview Ready", "count": 168, "fill": "#8b5cf6"},
        {"stage": "Shortlisted", "count": 142, "fill": "#ec4899"},
        {"stage": "Offers Received", "count": 128, "fill": "#10b981"}
    ]

    return {
        "summary": {
            "total_students": total_students if total_students else 240,
            "assessed_students": assessed_count if assessed_count else 204,
            "avg_readiness_score": avg_readiness,
            "internship_participation_rate": "84.2%",
            "placement_rate": "88.6%"
        },
        "department_distribution": dept_distribution,
        "skill_demand_trends": skill_demand_trends,
        "placement_funnel": placement_funnel
    }

@router.get("/placement")
def get_placement_analytics():
    return {
        "academic_year": "2025-2026",
        "total_eligible": 350,
        "placed_count": 298,
        "higher_studies": 32,
        "entrepreneurship": 8,
        "avg_package": "₹9.8 LPA",
        "highest_package": "₹44.0 LPA",
        "salary_brackets": [
            {"bracket": "< 6 LPA", "count": 42},
            {"bracket": "6 - 10 LPA", "count": 138},
            {"bracket": "10 - 18 LPA", "count": 88},
            {"bracket": "18 - 30 LPA", "count": 24},
            {"bracket": "> 30 LPA", "count": 6}
        ],
        "top_recruiters": [
            {"company": "TechNova Systems", "hires": 28},
            {"company": "CloudScale Networks", "hires": 22},
            {"company": "FinTech Dynamics", "hires": 19},
            {"company": "HealthAI Labs", "hires": 15},
            {"company": "CyberArmor Security", "hires": 12}
        ]
    }

@router.get("/skill-demand")
def get_skill_demand_analytics():
    return [
        {"skill": "Cloud / AWS", "growth": "+42%", "urgency": "Critical", "student_deficit": "47%"},
        {"skill": "Docker & Containers", "growth": "+38%", "urgency": "High", "student_deficit": "48%"},
        {"skill": "Generative AI & RAG", "growth": "+65%", "urgency": "Critical", "student_deficit": "52%"},
        {"skill": "Modern TypeScript", "growth": "+29%", "urgency": "Medium", "student_deficit": "31%"},
        {"skill": "DevOps / CI-CD", "growth": "+34%", "urgency": "High", "student_deficit": "44%"}
    ]
