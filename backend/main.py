import logging
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles
from backend.config import settings
from backend.database.connection import engine, Base
import backend.models # Ensure models are loaded
from backend.routes import (
    auth_router,
    students_router,
    resume_router,
    assessment_router,
    courses_router,
    internships_router,
    jobs_router,
    industry_router,
    institution_router,
    academician_router,
    analytics_router,
    ai_router
)

logging.basicConfig(level=logging.INFO)
logger = logging.getLogger("skillora")

# Create tables
Base.metadata.create_all(bind=engine)

app = FastAPI(
    title=settings.PROJECT_NAME,
    description="Intelligent Academia–Industry Career Collaboration Platform (SIH26044) - BYTE SQUAD",
    version="1.0.0"
)

# CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Mount static uploads
app.mount("/uploads", StaticFiles(directory=str(settings.UPLOAD_DIR)), name="uploads")

# Include Routers
api_v1 = settings.API_V1_STR
app.include_router(auth_router, prefix=api_v1)
app.include_router(students_router, prefix=api_v1)
app.include_router(resume_router, prefix=api_v1)
app.include_router(assessment_router, prefix=api_v1)
app.include_router(courses_router, prefix=api_v1)
app.include_router(internships_router, prefix=api_v1)
app.include_router(jobs_router, prefix=api_v1)
app.include_router(industry_router, prefix=api_v1)
app.include_router(institution_router, prefix=api_v1)
app.include_router(academician_router, prefix=api_v1)
app.include_router(analytics_router, prefix=api_v1)
app.include_router(ai_router, prefix=api_v1)

@app.get("/")
def root():
    return {
        "platform": settings.PROJECT_NAME,
        "problem_id": settings.PROJECT_CODE,
        "team": settings.TEAM_NAME,
        "status": "online",
        "rag_intelligence": "operational",
        "docs_url": "/docs"
    }

@app.get("/health")
def health():
    return {"status": "healthy", "timestamp": "2026-09-06"}
