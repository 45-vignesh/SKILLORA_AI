from typing import List, Dict, Any, Optional
from ai.rag.vector_store import VectorStore

class Retriever:
    def __init__(self, vector_store: VectorStore):
        self.vector_store = vector_store

    def retrieve(self, query: str, top_k: int = 5, category: Optional[str] = None) -> List[Dict[str, Any]]:
        return self.vector_store.search(query=query, top_k=top_k, category=category)

    def retrieve_for_skills(self, skills: List[str], target_role: str, top_k: int = 5) -> List[Dict[str, Any]]:
        combined_query = f"{target_role} requirements " + " ".join(skills)
        return self.vector_store.search(query=combined_query, top_k=top_k)
