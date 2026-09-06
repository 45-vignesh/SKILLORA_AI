from typing import List, Dict, Any
from ai.rag.rag_pipeline import rag_pipeline

class CareerRecommender:
    @staticmethod
    def recommend(student_skills: List[str]) -> Dict[str, Any]:
        return rag_pipeline.analyze_student(student_skills, "Recommended Career Pathways")

class LearningRecommender:
    @staticmethod
    def recommend_learning_path(student_skills: List[str], target_role: str) -> Dict[str, Any]:
        return rag_pipeline.analyze_skill_gap(student_skills, target_role)

class JobRecommender:
    @staticmethod
    def match(student_skills: List[str], job_title: str, required_skills: List[str]) -> Dict[str, Any]:
        return rag_pipeline.match_job(student_skills, job_title, required_skills)
