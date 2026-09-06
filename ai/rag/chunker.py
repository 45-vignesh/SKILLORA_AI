from typing import List, Dict, Any

class Chunker:
    def __init__(self, chunk_size: int = 400, overlap: int = 50):
        self.chunk_size = chunk_size
        self.overlap = overlap

    def chunk_text(self, text: str, metadata: Dict[str, Any]) -> List[Dict[str, Any]]:
        words = text.split()
        if not words:
            return []
        
        chunks = []
        start = 0
        while start < len(words):
            end = min(start + self.chunk_size, len(words))
            chunk_content = " ".join(words[start:end])
            chunks.append({
                "content": chunk_content,
                "metadata": {**metadata, "word_count": len(words[start:end])}
            })
            if end == len(words):
                break
            start += self.chunk_size - self.overlap
        return chunks
