import json
import numpy as np
from pathlib import Path
from typing import List, Dict, Any, Optional
from ai.rag.embeddings import EmbeddingModel

class VectorStore:
    def __init__(self):
        self.embedding_model = EmbeddingModel()
        self.documents: List[Dict[str, Any]] = []
        self.embeddings: Optional[np.ndarray] = None

    def build_index(self, documents: List[Dict[str, Any]]):
        if not documents:
            return
        self.documents = documents
        corpus = [doc["content"] for doc in documents]
        self.embeddings = self.embedding_model.fit_transform(corpus)

    def search(self, query: str, top_k: int = 5, category: Optional[str] = None) -> List[Dict[str, Any]]:
        if not self.documents or self.embeddings is None:
            return []
        
        query_vec = self.embedding_model.transform([query])
        similarities = np.dot(self.embeddings, query_vec.T).flatten()
        
        scored_docs = []
        for idx, score in enumerate(similarities):
            doc = self.documents[idx]
            if category and doc.get("metadata", {}).get("category") != category:
                continue
            scored_docs.append({
                "score": float(score),
                "content": doc["content"],
                "metadata": doc.get("metadata", {})
            })
            
        scored_docs.sort(key=lambda x: x["score"], reverse=True)
        return scored_docs[:top_k]
