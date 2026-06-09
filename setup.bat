@echo off
REM =====================================================
REM CMS Setup Script for Windows
REM Climate Carbon Alliance - Automated Setup
REM =====================================================

echo.
echo ======================================
echo    CMS Setup - Climate Carbon Alliance
echo ======================================
echo.

REM Check if Node.js is installed
where node >nul 2>nul
if %ERRORLEVEL% NEQ 0 (
    echo [ERROR] Node.js is not installed. Please install Node.js first.
    pause
    exit /b 1
)

echo [OK] Node.js found
node --version

REM Check if MySQL is installed
where mysql >nul 2>nul
if %ERRORLEVEL% NEQ 0 (
    echo [WARNING] MySQL command not found. Make sure MySQL is installed and in PATH.
)

echo.
echo ======================================
echo Step 1: Installing Dependencies
echo ======================================
echo.

call npm install

echo.
echo Installing CMS-specific packages...
call npm install mysql2 @types/mysql2
call npm install bcryptjs @types/bcryptjs
call npm install next-auth
call npm install @tanstack/react-query
call npm install react-hook-form zod
call npm install @tiptap/react @tiptap/starter-kit @tiptap/extension-image @tiptap/extension-link
call npm install date-fns
call npm install sharp
call npm install recharts
call npm install react-dropzone
call npm install react-sortablejs sortablejs
call npm install @dnd-kit/core @dnd-kit/sortable
call npm install react-hot-toast

echo [OK] Dependencies installed

echo.
echo ======================================
echo Step 2: Setting Up Environment
echo ======================================
echo.

if exist .env.local (
    echo [WARNING] .env.local already exists. Skipping...
) else (
    copy .env.example .env.local
    echo [OK] Created .env.local file
    echo [IMPORTANT] Please update .env.local with your database credentials
)

echo.
echo ======================================
echo Step 3: Database Configuration
echo ======================================
echo.

set /p DB_HOST="MySQL Host [localhost]: "
if "%DB_HOST%"=="" set DB_HOST=localhost

set /p DB_USER="MySQL User [root]: "
if "%DB_USER%"=="" set DB_USER=root

set /p DB_PASSWORD="MySQL Password: "

set /p DB_NAME="Database Name [climate_cms]: "
if "%DB_NAME%"=="" set DB_NAME=climate_cms

echo.
echo Creating database...
mysql -h %DB_HOST% -u %DB_USER% -p%DB_PASSWORD% -e "CREATE DATABASE IF NOT EXISTS %DB_NAME% CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;"

if %ERRORLEVEL% EQU 0 (
    echo [OK] Database created successfully
) else (
    echo [ERROR] Failed to create database
    pause
    exit /b 1
)

echo.
echo Importing database schema...
mysql -h %DB_HOST% -u %DB_USER% -p%DB_PASSWORD% %DB_NAME% < schema.sql

if %ERRORLEVEL% EQU 0 (
    echo [OK] Database schema imported successfully
) else (
    echo [ERROR] Failed to import schema
    pause
    exit /b 1
)

echo.
echo ======================================
echo Step 4: Creating Upload Directory
echo ======================================
echo.

if not exist "public\uploads" mkdir public\uploads
if not exist "public\uploads\images" mkdir public\uploads\images
if not exist "public\uploads\documents" mkdir public\uploads\documents
if not exist "public\uploads\videos" mkdir public\uploads\videos

echo [OK] Upload directories created

echo.
echo ======================================
echo Setup Complete!
echo ======================================
echo.
echo Next steps:
echo 1. Update .env.local with your database credentials
echo 2. Run 'npm run dev' to start the development server
echo 3. Visit http://localhost:3000/admin
echo 4. Login with:
echo    Email: admin@example.com
echo    Password: admin123
echo 5. IMPORTANT: Change the default admin password immediately!
echo.
echo Documentation:
echo - Implementation Plan: IMPLEMENTATION_PLAN.md
echo - Admin Guide: ADMIN_PANEL_GUIDE.md
echo - Database Schema: schema.sql
echo.
echo Happy coding!
echo.
pause
