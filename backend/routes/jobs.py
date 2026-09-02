from fastapi import APIRouter

router = APIRouter()

@router.get("/")
def list_jobs():
    return {"jobs": []}

@router.get("/{job_id}")
def get_job(job_id: int):
    return {"job_id": job_id}
