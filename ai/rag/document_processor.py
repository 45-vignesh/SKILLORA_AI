import json
import re
from pathlib import Path
from typing import List, Dict, Any
import PyPDF2

class DocumentProcessor:
    @staticmethod
    def extract_text_from_pdf(pdf_path: str | Path) -> str:
        text = ""
        try:
            with open(pdf_path, "rb") as f:
                reader = PyPDF2.PdfReader(f)
                for page in reader.pages:
                    extracted = page.extract_text()
                    if extracted:
                        text += extracted + "\n"
        except Exception as e:
            text = f"Error reading PDF: {e}"
        return DocumentProcessor.clean_text(text)

    @staticmethod
    def extract_from_json(json_path: str | Path) -> Dict[str, Any]:
        with open(json_path, "r", encoding="utf-8") as f:
            data = json.load(f)
        return data

    @staticmethod
    def clean_text(text: str) -> str:
        text = re.sub(r"\s+", " ", text)
        return text.strip()
