@echo off
call cd %~dp0

call npm install node-red
call npm install express
start node node-red.js
