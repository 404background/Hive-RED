@echo off

REM Move to the script's directory
call cd %~dp0

REM Install Node-RED and Express
call npm install node-red
call npm install express

REM Start Node-RED
start node node-red.js
