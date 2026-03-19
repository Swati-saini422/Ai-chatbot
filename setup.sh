#!/bin/bash
# Quick Start Script for AI Chatbot

echo "🤖 AI Chatbot - Quick Start Setup"
echo "=================================="
echo ""

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo "❌ Node.js is not installed. Please install Node.js first."
    exit 1
fi

echo "✓ Node.js version: $(node --version)"
echo ""

# Setup Backend
echo "📦 Setting up backend..."
cd backend

# Copy .env file
if [ ! -f .env ]; then
    echo "Creating .env file from template..."
    cp .env.example .env
    echo "⚠️  Please edit backend/.env and add your GOOGLE_API_KEY"
    echo "   Get one from: https://makersuite.google.com/app/apikey"
fi

# Install dependencies
if [ ! -d "node_modules" ]; then
    echo "Installing backend dependencies..."
    npm install
else
    echo "✓ Backend dependencies already installed"
fi

echo ""
echo "✓ Backend setup complete!"
echo ""

# Setup Frontend
echo "📦 Setting up frontend..."
cd ../frontend

# Install dependencies
if [ ! -d "node_modules" ]; then
    echo "Installing frontend dependencies..."
    npm install
else
    echo "✓ Frontend dependencies already installed"
fi

cd ..

echo ""
echo "✓ Frontend setup complete!"
echo ""
echo "=================================="
echo "🚀 Ready to start!"
echo "=================================="
echo ""
echo "To start the application:"
echo ""
echo "Terminal 1 (Backend):"
echo "  cd backend"
echo "  npm start"
echo ""
echo "Terminal 2 (Frontend):"
echo "  cd frontend"
echo "  npm start"
echo ""
echo "Then open http://localhost:3000 in your browser"
echo ""
echo "📝 Configuration:"
echo "  - Backend API Key → Settings ⚙️ → API Configuration"
echo "  - Get key from: https://makersuite.google.com/app/apikey"
echo ""
