@echo off
echo ===================================================
echo  Starting 1Fi Fullstack Application (Java + React)
echo ===================================================

echo [1/2] Launching Java REST Backend...
start "1Fi Java Backend" cmd /k "cd /d %~dp0java-backend && javac -d bin src\com\onefi\marketplace\model\*.java src\com\onefi\marketplace\util\*.java src\com\onefi\marketplace\repository\*.java src\com\onefi\marketplace\service\*.java src\com\onefi\marketplace\Main.java && java -cp bin com.onefi.marketplace.Main"

echo [2/2] Launching React Frontend...
start "1Fi React App" cmd /k "cd /d %~dp0frontend && npm run dev"

echo.
echo Application started!
echo Java Backend API: http://localhost:8085/api/v1/products
echo React Frontend UI: http://localhost:5173
echo.
