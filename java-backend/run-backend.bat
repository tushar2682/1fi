@echo off
echo ===================================================
echo  Compiling and Starting 1Fi Java REST Backend
echo ===================================================
cd /d %~dp0
javac -d bin src\com\onefi\marketplace\model\*.java src\com\onefi\marketplace\util\*.java src\com\onefi\marketplace\repository\*.java src\com\onefi\marketplace\service\*.java src\com\onefi\marketplace\Main.java
if %errorlevel% neq 0 (
    echo [ERROR] Java Compilation Failed!
    pause
    exit /b %errorlevel%
)
java -cp bin com.onefi.marketplace.Main
pause
