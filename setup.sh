#!/bin/bash
# AFC Auction System - Quick Setup Script

echo "🎯 AFC Tournament Auction System - Setup"
echo "========================================"

# Backend Setup
echo ""
echo "📦 Setting up Backend..."
if [ ! -d "node_modules" ]; then
  npm install
  echo "✅ Backend dependencies installed"
else
  echo "✅ Backend dependencies already installed"
fi

# Frontend Setup
echo ""
echo "📦 Setting up Frontend..."
cd client
if [ ! -d "node_modules" ]; then
  npm install
  echo "✅ Frontend dependencies installed"
else
  echo "✅ Frontend dependencies already installed"
fi
cd ..

echo ""
echo "✅ Setup Complete!"
echo ""
echo "🚀 To start the system:"
echo "   Terminal 1: npm start          (Backend on port 5000)"
echo "   Terminal 2: cd client && npm start  (Frontend on port 3000)"
echo ""
echo "🔑 Demo Credentials:"
echo "   Admin: admin123"
echo "   User:  user123"
