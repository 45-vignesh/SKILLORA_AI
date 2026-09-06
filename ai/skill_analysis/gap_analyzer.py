from typing import List, Dict, Any
from ai.rag.rag_pipeline import rag_pipeline

class GapAnalyzer:
    @staticmethod
    def analyze(student_skills: List[str], target_role: str) -> Dict[str, Any]:
        return rag_pipeline.analyze_skill_gap(student_skills, target_role)

class SkillAnalyzer:
    @staticmethod
    def analyze_profile(student_skills: List[str], target_role: str) -> Dict[str, Any]:
        return rag_pipeline.analyze_student(student_skills, target_role)
