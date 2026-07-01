@echo off
REM VeriLearn Startup Script for Windows

echo.
echo ====================================
echo  VeriLearn - Verilog Learning Hub
echo ====================================
echo.

REM Check if Python is installed
python --version >nul 2>&1
if errorlevel 1 (
    echo ERROR: Python is not installed or not in PATH
    pause
    exit /b 1
)

REM Check if iverilog is installed
iverilog -version >nul 2>&1
if errorlevel 1 (
    echo WARNING: Icarus Verilog (iverilog) not found in PATH
    echo Please install it from: http://bleyer.org/icarus/
    echo.
)

REM Check if venv exists
if not exist "venv\" (
    echo Creating virtual environment...
    python -m venv venv
)

REM Activate virtual environment
call venv\Scripts\activate.bat

REM Install requirements
echo Installing dependencies...
pip install -r requirements.txt -q

REM Run Flask app
echo.
echo Starting VeriLearn server...
echo.
echo ====================================
echo  Open your browser to:
echo  http://localhost:5000
echo ====================================
echo.

python app.py

pause
