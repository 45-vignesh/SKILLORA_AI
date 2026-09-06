import re
from pathlib import Path
from typing import Dict, Any, List
from ai.rag.document_processor import DocumentProcessor
from ai.rag.rag_pipeline import rag_pipeline

class ResumeParser:
    @staticmethod
    def parse_file(file_path: str | Path) -> Dict[str, Any]:
        file_path = Path(file_path)
        if file_path.suffix.lower() == ".pdf":
            raw_text = DocumentProcessor.extract_text_from_pdf(file_path)
        else:
            with open(file_path, "r", encoding="utf-8", errors="ignore") as f:
                raw_text = f.read()

        rag_analysis = rag_pipeline.analyze_resume(raw_text)
        return {
            "raw_text": raw_text,
            "extracted_skills": rag_analysis.get("extracted_skills", []),
            "rag_analysis": rag_analysis
        }
