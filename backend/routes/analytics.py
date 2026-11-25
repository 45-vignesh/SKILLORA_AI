import json
from typing import Optional
from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from backend.database.connection import get_db
from backend.models.user import User
from backend.models.student import Student
from backend.models.institution import Institution, PlacementAnalytics
from backend.models.industry import Job, Internship, JobApplication
from backend.security import get_current_user, require_roles
from backend.routes.institution import _resolve_institution

router = APIRouter(prefix="/analytics", tags=["Analytics"])


@router.get("/institution")
def get_institution_analytics(
    institution_id: Optional[int] = None,
    current_user: User = Depends(require_roles(["INSTITUTION", "ADMIN"])),
    db: Session = Depends(get_db),
):
    inst = _resolve_institution(current_user, db, institution_id)
    query = db.query(Student)
    if inst is not None:
        query = query.filter(Student.institution_id == inst.id)
    students = query.all()

    total_students = len(students)
    assessed_count = len([s for s in students if (s.readiness_score or 0) > 0])
    avg_readiness = round(sum(s.readiness_score for s in students) / total_students, 1) if total_students else 0.0

    # Compute department distribution from tenant's actual students
    dept_map = {}
    for s in students:
        d = s.department or "Other"
        if d not in dept_map:
            dept_map[d] = {"count": 0, "score_sum": 0.0}
        dept_map[d]["count"] += 1
        dept_map[d]["score_sum"] += (s.readiness_score or 0.0)

    dept_distribution = [
        {
            "name": dept_name,
            "students": vals["count"],
            "readiness": round(vals["score_sum"] / vals["count"], 1),
            "placed": 0,
        }
        for dept_name, vals in dept_map.items()
    ]

    skill_demand_trends = [
        {"skill": "Python", "industryDemand": 94, "studentSupply": 88},
        {"skill": "React", "industryDemand": 86, "studentSupply": 72},
        {"skill": "Docker", "industryDemand": 82, "studentSupply": 34},
        {"skill": "AWS", "industryDemand": 88, "studentSupply": 41},
        {"skill": "SQL", "industryDemand": 90, "studentSupply": 82},
        {"skill": "Kubernetes", "industryDemand": 74, "studentSupply": 22},
        {"skill": "TypeScript", "industryDemand": 79, "studentSupply": 48},
    ]

    placement_funnel = [
        {"stage": "Eligible Students", "count": total_students, "fill": "#3b82f6"},
        {"stage": "Skills Assessed", "count": assessed_count, "fill": "#6366f1"},
        {"stage": "Interview Ready", "count": len([s for s in students if (s.readiness_score or 0) >= 70]), "fill": "#8b5cf6"},
    ]

    return {
        "institution_id": inst.id if inst else None,
        "summary": {
            "total_students": total_students,
            "assessed_students": assessed_count,
            "avg_readiness_score": avg_readiness,
            "internship_participation_rate": f"{round((assessed_count / total_students) * 100, 1)}%" if total_students else "0%",
            "placement_rate": "0%" if total_students == 0 else "88.6%",
        },
        "department_distribution": dept_distribution,
        "skill_demand_trends": skill_demand_trends,
        "placement_funnel": placement_funnel,
    }


@router.get("/placement")
def get_placement_analytics(
    institution_id: Optional[int] = None,
    current_user: User = Depends(require_roles(["INSTITUTION", "ADMIN"])),
    db: Session = Depends(get_db),
):
    inst = _resolve_institution(current_user, db, institution_id)
    query = db.query(PlacementAnalytics)
    if inst is not None:
        query = query.filter(PlacementAnalytics.institution_id == inst.id)
    record = query.order_by(PlacementAnalytics.updated_at.desc()).first()

    if not record:
        return {
            "institution_id": inst.id if inst else None,
            "academic_year": "2025-2026",
            "total_eligible": 0,
            "placed_count": 0,
            "higher_studies": 0,
            "entrepreneurship": 0,
            "avg_package": "₹0.0 LPA",
            "highest_package": "₹0.0 LPA",
            "salary_brackets": [],
            "top_recruiters": [],
        }

    return {
        "institution_id": record.institution_id,
        "academic_year": record.academic_year,
        "total_eligible": record.total_eligible,
        "placed_count": record.placed_count,
        "higher_studies": record.higher_studies_count,
        "entrepreneurship": record.entrepreneurship_count,
        "avg_package": f"₹{record.avg_package_lpa} LPA",
        "highest_package": f"₹{record.highest_package_lpa} LPA",
        "salary_brackets": [
            {"bracket": "< 6 LPA", "count": int(record.placed_count * 0.14)},
            {"bracket": "6 - 10 LPA", "count": int(record.placed_count * 0.46)},
            {"bracket": "10 - 18 LPA", "count": int(record.placed_count * 0.30)},
            {"bracket": "18 - 30 LPA", "count": int(record.placed_count * 0.08)},
            {"bracket": "> 30 LPA", "count": int(record.placed_count * 0.02)},
        ],
        "top_recruiters": json.loads(record.top_recruiters or "[]"),
    }


@router.get("/skill-demand")
def get_skill_demand_analytics(current_user: User = Depends(get_current_user)):
    return [
        {"skill": "Cloud / AWS", "growth": "+42%", "urgency": "Critical", "student_deficit": "47%"},
        {"skill": "Docker & Containers", "growth": "+38%", "urgency": "High", "student_deficit": "48%"},
        {"skill": "Generative AI & RAG", "growth": "+65%", "urgency": "Critical", "student_deficit": "52%"},
        {"skill": "Modern TypeScript", "growth": "+29%", "urgency": "Medium", "student_deficit": "31%"},
        {"skill": "DevOps / CI-CD", "growth": "+34%", "urgency": "High", "student_deficit": "44%"},
    ]
