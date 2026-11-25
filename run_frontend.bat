@echo off
title Skillora AI - Frontend Server (Port 5173)
cd /d "%~dp0\frontend"
echo ========================================================
echo Starting Skillora AI Frontend (Vite + React)
echo Portal URL: http://localhost:5173
echo ========================================================
npm run dev
pause
