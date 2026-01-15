@echo off
echo Starting portfolio...
echo.

REM Navigate to the project folder (modifica il percorso)
cd /d "C:\Users\ilysm\OneDrive\Desktop\GitHub\MyPortfolio-React"

REM Install dependencies if missing
if not exist node_modules (
    echo Installing dependencies...
    npm install
    echo.
)

REM Start the dev server
echo Launching Vite dev server...
npm run dev

pause