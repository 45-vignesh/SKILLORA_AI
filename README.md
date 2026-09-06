# SKILLORA AI — Intelligent Academia–Industry Career Collaboration Platform

**Problem Statement:** SIH26044 | **Team:** Byte Squad | **Category:** Education & Skill Development

---

## Overview

SKILLORA AI is a production-grade full-stack web application that closes the critical gap between academic learning and real-world industry requirements. It connects **four key stakeholders** — Students, Industries, Institutions, and Academicians — through a shared **Retrieval-Augmented Generation (RAG)** intelligence layer.

## Quick Start (Zero Configuration)

### Backend
```bash
pip install fastapi uvicorn sqlalchemy psycopg2-binary google-genai bcrypt python-jose scikit-learn numpy PyPDF2 pydantic python-multipart
python backend/seed.py
uvicorn backend.main:app --reload --port 8000
```
Backend: http://localhost:8000 | Swagger UI: http://localhost:8000/docs

### Frontend
```bash
cd frontend
npm install
npm run dev
```
Frontend: http://localhost:5173

## Demo Credentials (all passwords: password123)

| Role | Email | Path |
|---|---|---|
| Student | student@skillora.ai | /student/dashboard |
| Industry | industry@skillora.ai | /industry/dashboard |
| Institution | institution@skillora.ai | /institution/dashboard |
| Academician | academician@skillora.ai | /academician/dashboard |
| Admin | admin@skillora.ai | /institution/dashboard |

> Use the "Demo Quick Switch" navbar button during SIH jury presentation for instant role switching.

## Tech Stack

- **Backend:** FastAPI + SQLAlchemy + Pydantic + JWT + bcrypt + SQLite/PostgreSQL
- **AI/RAG:** TF-IDF embeddings + cosine similarity + Gemini Flash (optional, offline fallback included)
- **Frontend:** React 18 + Vite 5 + Ant Design 5 + Material UI v5 + Recharts

## SIH Key Presentation Flow

1. Landing Page (/) - quad-stakeholder design
2. Student Portal (/student/skill-gap) - Run RAG Skill Gap Analysis
3. Industry Portal (/industry/student-search) - RAG Talent Semantic Search
4. Institution Portal (/institution/curriculum) - AI Curriculum Modernization Engine (star feature)
5. Academician Portal (/academician/dashboard) - Corporate sabbaticals & R&D grants
6. API Docs (localhost:8000/docs) - live Swagger backend demo

## Optional Gemini AI

```bash
set GEMINI_API_KEY=your-api-key-here
uvicorn backend.main:app --reload --port 8000
```

Without the key, the platform uses its built-in deterministic contextual synthesizer - fully functional offline.

## Team BYTE SQUAD | Smart India Hackathon 2026 | SIH26044
