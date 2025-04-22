@echo off

REM Move to the script's directory
call cd %~dp0

REM Check if Node.js is installed
where node >nul 2>nul
if %errorlevel% neq 0 (
    echo Node.js is not installed. Downloading and installing Node.js...
    powershell -Command "Start-Process -FilePath 'https://nodejs.org/dist/v18.17.1/node-v18.17.1-x64.msi' -Wait"
) else (
    for /f "tokens=2 delims=v" %%i in ('node -v') do set NODE_VERSION=%%i
    for /f "tokens=1 delims=." %%i in ("%NODE_VERSION%") do set NODE_MAJOR=%%i
    if %NODE_MAJOR% lss 18 (
        echo Node.js version is less than 18. Updating Node.js...
        powershell -Command "Start-Process -FilePath 'https://nodejs.org/dist/v18.17.1/node-v18.17.1-x64.msi' -Wait"
    )
)

REM Install Node-RED and Express
call npm install node-red
call npm install express

REM Start Node-RED
start node node-red.js
