@echo off
REM AFC Auction System - Quick Setup Script for Windows

echo.
echo 🎯 AFC Tournament Auction System - Setup
echo ========================================

REM Backend Setup
echo.
echo 📦 Setting up Backend...
if not exist "node_modules" (
  call npm install
  echo ✅ Backend dependencies installed
) else (
  echo ✅ Backend dependencies already installed
)

REM Frontend Setup
echo.
echo 📦 Setting up Frontend...
cd client
if not exist "node_modules" (
  call npm install
  echo ✅ Frontend dependencies installed
) else (
  echo ✅ Frontend dependencies already installed
)
cd ..

echo.
echo ✅ Setup Complete!
echo.
echo 🚀 To start the system:
echo    Terminal 1: npm start
echo    Terminal 2: cd client ^&^& npm start
echo.
echo 🔑 Demo Credentials:
echo    Admin: admin123
echo    User:  user123
echo.
pause
