@echo off
title Skillora AI - Master Launcher
cd /d "%~dp0"
echo ========================================================
echo Launching Skillora AI Full Stack Environment
echo ========================================================
start "Skillora Backend" cmd /c "run_backend.bat"
start "Skillora Frontend" cmd /c "run_frontend.bat"
echo Both servers have been launched in separate windows!
echo Backend:  http://127.0.0.1:8000/docs
echo Frontend: http://localhost:5173
echo ========================================================
timeout /t 5
