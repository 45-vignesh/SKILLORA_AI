from backend.routes.auth import router as auth_router
from backend.routes.students import router as students_router
from backend.routes.resume import router as resume_router
from backend.routes.assessment import router as assessment_router
from backend.routes.courses import router as courses_router
from backend.routes.internships import router as internships_router
from backend.routes.jobs import router as jobs_router
from backend.routes.industry import router as industry_router
from backend.routes.institution import router as institution_router
from backend.routes.academician import router as academician_router
from backend.routes.analytics import router as analytics_router
from backend.routes.ai import router as ai_router

__all__ = [
    "auth_router",
    "students_router",
    "resume_router",
    "assessment_router",
    "courses_router",
    "internships_router",
    "jobs_router",
    "industry_router",
    "institution_router",
    "academician_router",
    "analytics_router",
    "ai_router"
]
