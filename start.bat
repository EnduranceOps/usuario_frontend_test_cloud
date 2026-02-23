@echo off
cd /d "%~dp0"

echo.
echo 🚀 Inicializando frontend...
echo.

echo 📦 Instalando dependencias...
call npm install
if %errorlevel% neq 0 (
    echo Error en instalacion de dependencias
    pause
    exit /b %errorlevel%
)

echo.
echo 🔥 Iniciando servidor de desarrollo...
call npm run dev

pause