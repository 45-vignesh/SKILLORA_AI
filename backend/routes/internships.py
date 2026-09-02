from fastapi import APIRouter

router = APIRouter()

@router.get("/")
def list_internships():
    return {"internships": []}

@router.post("/{internship_id}/apply")
def apply(internship_id: int):
    return {"internship_id": internship_id, "message": "Application endpoint"}
