import os
import json
import logging
from typing import List, Dict, Any, Optional
from backend.config import settings

logger = logging.getLogger("skillora.ai.generator")

class RAGGenerator:
    def __init__(self):
        self.api_key = settings.GEMINI_API_KEY
        self.client = None
        if self.api_key:
            try:
                from google import genai
                self.client = genai.Client(api_key=self.api_key)
                logger.info("Initialized Gemini Client for RAG Generation")
            except Exception as e:
                logger.warning(f"Could not initialize Gemini Client: {e}")

    def generate(
        self,
        prompt: str,
        retrieved_context: List[Dict[str, Any]],
        student_skills: Optional[List[str]] = None,
        target_role: Optional[str] = None
    ) -> Dict[str, Any]:
        student_skills = student_skills or []
        target_role = target_role or "Full Stack Developer"
        sources = [doc.get("metadata", {}).get("source", "Industry Competency Framework") for doc in retrieved_context]
        sources = list(dict.fromkeys(sources))  # deduplicate

        # 1. Try Gemini API if available
        if self.client:
            try:
                context_str = "\n\n".join([
                    f"[Source: {doc.get('metadata', {}).get('source', 'Unknown')}]\n{doc.get('content', '')}"
                    for doc in retrieved_context
                ])
                system_instruction = (
                    "You are the SKILLORA AI Academic-Industry Career Collaboration Engine. "
                    "Analyze the provided retrieved context documents and the student profile. "
                    "You must output STRICT JSON matching this schema:\n"
                    "{\n"
                    '  "answer": "Summary of analysis",\n'
                    '  "recommendations": ["step 1", "step 2", ...],\n'
                    '  "matched_skills": ["skill1", "skill2"],\n'
                    '  "skill_gaps": ["gap1", "gap2"],\n'
                    '  "readiness_score": 75.0,\n'
                    '  "sources": ["source1", "source2"],\n'
                    '  "explanation": "Detailed explainable paragraph on why skills matched and why gaps matter."\n'
                    "}"
                )
                user_content = (
                    f"TARGET ROLE / QUERY: {target_role}\n"
                    f"STUDENT SKILLS: {', '.join(student_skills)}\n\n"
                    f"RETRIEVED KNOWLEDGE BASE CONTEXT:\n{context_str}\n\n"
                    f"TASK: {prompt}\n"
                    "Return only pure JSON without markdown code fences."
                )
                response = self.client.models.generate_content(
                    model=settings.GEMINI_MODEL,
                    contents=user_content,
                    config={"system_instruction": system_instruction}
                )
                raw_text = response.text.strip()
                if raw_text.startswith("```json"):
                    raw_text = raw_text[7:-3].strip()
                elif raw_text.startswith("```"):
                    raw_text = raw_text[3:-3].strip()
                parsed = json.loads(raw_text)
                return parsed
            except Exception as e:
                logger.warning(f"Gemini API call failed ({e}), falling back to deterministic synthesizer")

        # 2. Deterministic Knowledge Synthesizer (Contextual RAG Fallback)
        return self._synthesize_deterministic_rag(
            prompt=prompt,
            retrieved_context=retrieved_context,
            student_skills=student_skills,
            target_role=target_role,
            sources=sources
        )

    def _synthesize_deterministic_rag(
        self,
        prompt: str,
        retrieved_context: List[Dict[str, Any]],
        student_skills: List[str],
        target_role: str,
        sources: List[str]
    ) -> Dict[str, Any]:
        # Extract required competencies from retrieved context
        context_text = " ".join([doc.get("content", "") for doc in retrieved_context]).lower()
        student_skills_lower = {s.strip().lower(): s.strip() for s in student_skills}

        # Benchmark standard skills associated with target role / retrieved docs
        benchmark_map = {
            "cloud": ["linux", "networking", "aws", "docker", "terraform", "ci/cd", "kubernetes", "python"],
            "full stack": ["javascript", "typescript", "react", "node.js", "sql", "mongodb", "rest apis", "docker", "git"],
            "ai": ["python", "pytorch", "tensorflow", "scikit-learn", "vector databases", "sql", "data preprocessing"],
            "data": ["python", "sql", "pandas", "numpy", "statistics", "data visualization", "tableau", "machine learning"],
            "devops": ["linux", "docker", "kubernetes", "ci/cd", "bash", "terraform", "git", "aws"],
            "security": ["networking", "linux", "cryptography", "owasp", "vulnerability assessment", "python", "siem"],
            "qa": ["selenium", "python", "java", "cypress", "ci/cd", "postman", "api testing"]
        }

        matched_lower = set()
        matched_display = []
        
        # Check matched against student skills
        role_key = next((k for k in benchmark_map if k in target_role.lower()), "full stack")
        expected_skills = benchmark_map[role_key]

        for s_lower, s_orig in student_skills_lower.items():
            for exp in expected_skills:
                if exp in s_lower or s_lower in exp:
                    matched_lower.add(exp)
                    matched_display.append(s_orig)
                    break
        
        matched_display = list(dict.fromkeys(matched_display))
        gaps = [exp.title() for exp in expected_skills if exp not in matched_lower]

        total_req = max(len(expected_skills), 1)
        score = round((len(matched_lower) / total_req) * 100, 1)
        score = min(max(score, 30.0 if matched_display else 15.0), 95.0)

        # Generate explainable recommendations
        recs = []
        for gap in gaps[:3]:
            recs.append(f"Complete hands-on laboratory modules and projects for {gap}")
        recs.append(f"Deploy one end-to-end capstone project aligned with {target_role}")

        why_matched = []
        if matched_display:
            why_matched.append(f"Your proficiency in {', '.join(matched_display[:3])} aligns directly with {target_role} expectations.")
        if "python" in student_skills_lower or "javascript" in student_skills_lower:
            why_matched.append("Strong foundational scripting and algorithmic problem-solving demonstrated.")
        if not why_matched:
            why_matched.append(f"Academic coursework demonstrates interest in {target_role} fundamentals.")

        explanation = (
            f"Based on retrieved competency frameworks for '{target_role}', candidates require strong command "
            f"over {', '.join([s.title() for s in expected_skills[:4]])}. "
            f"You have demonstrated strong alignment in: {', '.join(matched_display) if matched_display else 'Foundational concepts'}. "
            f"To achieve placement readiness, prioritize closing the critical gaps in: {', '.join(gaps[:3])}."
        )

        return {
            "answer": f"Skillora AI RAG Evaluation for {target_role}: Readiness index is {score}%.",
            "recommendations": recs,
            "matched_skills": matched_display,
            "skill_gaps": gaps,
            "readiness_score": score,
            "sources": sources if sources else ["Industry Competency Framework", f"{target_role} Benchmark"],
            "explanation": explanation
        }
