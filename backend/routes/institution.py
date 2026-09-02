from fastapi import APIRouter

router = APIRouter()

@router.get("/students")
def students():
    return {"students": []}

@router.get("/placement-analysis")
def placement_analysis():
    return {"placement": {}}

@router.get("/industry-demands")
def industry_demands():
    return {"demands": []}
