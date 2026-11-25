@echo off
title Skillora AI - Backend Server (Port 8000)
cd /d "%~dp0"
echo ========================================================
echo Starting Skillora AI Backend (FastAPI + PostgreSQL)
echo API Documentation: http://127.0.0.1:8000/docs
echo ========================================================
python -m uvicorn backend.main:app --reload --port 8000
pause
