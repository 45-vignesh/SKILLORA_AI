# SKILLORA AI

A starter monorepo for the SKILLORA AI platform.

## Stack
- Frontend: React + Vite + Tailwind CSS
- Backend: Python + FastAPI
- AI: Python modules for resume parsing, skill extraction, skill-gap analysis and recommendations
- Database: PostgreSQL-ready schema

## Modules
1. Students
2. Industry
3. Institutions
4. Academicians
5. Extra: Breaks and Daily Challenges

## Run frontend
```bash
cd frontend
npm install
npm run dev
```

## Run backend
```bash
cd backend
python -m venv venv
# Windows: venv\Scripts\activate
# macOS/Linux: source venv/bin/activate
pip install -r requirements.txt
uvicorn main:app --reload
```

Backend docs: http://127.0.0.1:8000/docs

## Git workflow
- `main` = stable integrated code
- `team1-student`
- `team2-industry`
- `team3-institution`

Do not commit `.env`, `node_modules`, or Python virtual environments.
