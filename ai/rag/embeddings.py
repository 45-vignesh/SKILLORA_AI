import numpy as np
from sklearn.feature_extraction.text import TfidfVectorizer
from typing import List

class EmbeddingModel:
    def __init__(self):
        self.vectorizer = TfidfVectorizer(
            ngram_range=(1, 2),
            max_features=5000,
            sublinear_tf=True,
            stop_words="english"
        )
        self.is_fitted = False

    def fit_transform(self, corpus: List[str]) -> np.ndarray:
        if not corpus:
            return np.empty((0, 0))
        vectors = self.vectorizer.fit_transform(corpus).toarray()
        self.is_fitted = True
        # Normalize
        norms = np.linalg.norm(vectors, axis=1, keepdims=True)
        norms[norms == 0] = 1.0
        return vectors / norms

    def transform(self, texts: List[str]) -> np.ndarray:
        if not self.is_fitted:
            return self.fit_transform(texts)
        vectors = self.vectorizer.transform(texts).toarray()
        norms = np.linalg.norm(vectors, axis=1, keepdims=True)
        norms[norms == 0] = 1.0
        return vectors / norms
