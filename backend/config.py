import os
from pathlib import Path
from pydantic_settings import BaseSettings

BASE_DIR = Path(__file__).resolve().parent
ROOT_DIR = BASE_DIR.parent

class Settings(BaseSettings):
    PROJECT_NAME: str = "SKILLORA AI"
    PROJECT_CODE: str = "SIH26044"
    TEAM_NAME: str = "BYTE SQUAD"
    API_V1_STR: str = "/api/v1"
    
    SECRET_KEY: str = os.getenv("SECRET_KEY", "skillora_super_secret_jwt_key_sih26044_byte_squad")
    ALGORITHM: str = "HS256"
    ACCESS_TOKEN_EXPIRE_MINUTES: int = 60 * 24 * 7  # 7 days
    
    # Database: Default to SQLite for zero-setup instant demo, or PostgreSQL when DATABASE_URL is provided
    DATABASE_URL: str = os.getenv("DATABASE_URL", f"sqlite:///{BASE_DIR}/skillora.db")
    
    # Gemini AI
    GEMINI_API_KEY: str = os.getenv("GEMINI_API_KEY", "")
    GEMINI_MODEL: str = os.getenv("GEMINI_MODEL", "gemini-2.5-flash")
    
    # Uploads & Knowledge base
    UPLOAD_DIR: Path = BASE_DIR / "uploads"
    KNOWLEDGE_BASE_DIR: Path = ROOT_DIR / "ai" / "knowledge_base"
    
    class Config:
        env_file = ".env"
        extra = "ignore"

settings = Settings()
settings.UPLOAD_DIR.mkdir(parents=True, exist_ok=True)
