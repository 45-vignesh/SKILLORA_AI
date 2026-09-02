from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from routes.auth import router as auth_router
from routes.students import router as students_router
from routes.industry import router as industry_router
from routes.institution import router as institution_router
from routes.academician import router as academician_router
from routes.jobs import router as jobs_router
from routes.internships import router as internships_router
from routes.analytics import router as analytics_router

app = FastAPI(title="SKILLORA AI API", version="0.1.0")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173", "http://127.0.0.1:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(auth_router, prefix="/api/auth", tags=["Auth"])
app.include_router(students_router, prefix="/api/students", tags=["Students"])
app.include_router(industry_router, prefix="/api/industry", tags=["Industry"])
app.include_router(institution_router, prefix="/api/institution", tags=["Institution"])
app.include_router(academician_router, prefix="/api/academician", tags=["Academician"])
app.include_router(jobs_router, prefix="/api/jobs", tags=["Jobs"])
app.include_router(internships_router, prefix="/api/internships", tags=["Internships"])
app.include_router(analytics_router, prefix="/api/analytics", tags=["Analytics"])

@app.get("/")
def root():
    return {"message": "SKILLORA AI Backend Running"}

@app.get("/api/health")
def health():
    return {"status": "ok"}
