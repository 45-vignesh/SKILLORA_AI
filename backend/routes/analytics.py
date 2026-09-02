from fastapi import APIRouter

router = APIRouter()

@router.get("/skills")
def skills():
    return {"labels": [], "values": []}

@router.get("/placement")
def placement():
    return {"labels": [], "values": []}
