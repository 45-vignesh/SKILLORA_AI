from typing import List, Dict, Any
from ai.rag.rag_pipeline import rag_pipeline

class StudentMatcher:
    @staticmethod
    def match_candidate(student_skills: List[str], required_skills: List[str], job_title: str) -> Dict[str, Any]:
        return rag_pipeline.match_job(student_skills, job_title, required_skills)

class RankingEngine:
    @staticmethod
    def rank_candidates(candidates: List[Dict[str, Any]], required_skills: List[str]) -> List[Dict[str, Any]]:
        scored = []
        for c in candidates:
            skills = c.get("skills", [])
            overlap = set(s.lower() for s in skills).intersection(set(r.lower() for r in required_skills))
            score = (len(overlap) / max(len(required_skills), 1)) * 100
            scored.append({**c, "match_score": round(score, 1)})
        return sorted(scored, key=lambda x: x["match_score"], reverse=True)
