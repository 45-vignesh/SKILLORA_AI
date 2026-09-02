from fastapi import APIRouter

router = APIRouter()

@router.get("/opportunities")
def opportunities():
    return {"opportunities": []}

@router.get("/industrial-training")
def industrial_training():
    return {"training": []}

@router.get("/research-projects")
def research_projects():
    return {"projects": []}
