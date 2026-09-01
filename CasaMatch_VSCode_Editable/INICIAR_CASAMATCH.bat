@echo off
title CasaMatch V10
cd /d "%~dp0"

where node >nul 2>&1
if errorlevel 1 (
  echo.
  echo ==============================================
  echo   CASAMATCH NECESITA NODE.JS
  echo ==============================================
  echo.
  echo Instala Node.js 20 o superior desde:
  echo https://nodejs.org/
  echo.
  pause
  exit /b 1
)

echo.
echo ==============================================
echo         INICIANDO CASAMATCH V10
echo ==============================================
echo.
echo No necesitas npm install.
echo No necesitas Live Server.
echo.
echo Se abrira en:
echo http://localhost:3000
echo.
start "" http://localhost:3000
node server.js

pause
