# Quick Start Script for AI Chatbot (Windows PowerShell)
# Run this script to set up the entire project

Write-Host "🤖 AI Chatbot - Quick Start Setup" -ForegroundColor Cyan
Write-Host "==================================" -ForegroundColor Cyan
Write-Host ""

# Check if Node.js is installed
try {
    $nodeVersion = node --version
    Write-Host "✓ Node.js version: $nodeVersion" -ForegroundColor Green
}
catch {
    Write-Host "❌ Node.js is not installed. Please install Node.js first." -ForegroundColor Red
    Write-Host "   Download from: https://nodejs.org/" -ForegroundColor Yellow
    exit 1
}

Write-Host ""

# Setup Backend
Write-Host "📦 Setting up backend..." -ForegroundColor Cyan
Push-Location backend

# Copy .env file
if (-not (Test-Path ".env")) {
    Write-Host "Creating .env file from template..." -ForegroundColor Yellow
    Copy-Item ".env.example" ".env"
    Write-Host "⚠️  Please edit backend\.env and add your GOOGLE_API_KEY" -ForegroundColor Yellow
    Write-Host "   Get one from: https://makersuite.google.com/app/apikey" -ForegroundColor Yellow
}

# Install dependencies
if (-not (Test-Path "node_modules")) {
    Write-Host "Installing backend dependencies..." -ForegroundColor Yellow
    npm install
} else {
    Write-Host "✓ Backend dependencies already installed" -ForegroundColor Green
}

Pop-Location
Write-Host ""
Write-Host "✓ Backend setup complete!" -ForegroundColor Green
Write-Host ""

# Setup Frontend
Write-Host "📦 Setting up frontend..." -ForegroundColor Cyan
Push-Location frontend

# Install dependencies
if (-not (Test-Path "node_modules")) {
    Write-Host "Installing frontend dependencies..." -ForegroundColor Yellow
    npm install
} else {
    Write-Host "✓ Frontend dependencies already installed" -ForegroundColor Green
}

Pop-Location

Write-Host ""
Write-Host "✓ Frontend setup complete!" -ForegroundColor Green
Write-Host ""
Write-Host "==================================" -ForegroundColor Cyan
Write-Host "🚀 Ready to start!" -ForegroundColor Cyan
Write-Host "==================================" -ForegroundColor Cyan
Write-Host ""
Write-Host "To start the application:" -ForegroundColor Yellow
Write-Host ""
Write-Host "PowerShell Terminal 1 (Backend):" -ForegroundColor Cyan
Write-Host "  cd backend" -ForegroundColor White
Write-Host "  npm start" -ForegroundColor White
Write-Host ""
Write-Host "PowerShell Terminal 2 (Frontend):" -ForegroundColor Cyan
Write-Host "  cd frontend" -ForegroundColor White
Write-Host "  npm start" -ForegroundColor White
Write-Host ""
Write-Host "Then open http://localhost:3000 in your browser" -ForegroundColor Green
Write-Host ""
Write-Host "📝 Configuration:" -ForegroundColor Yellow
Write-Host "  - Backend API Key → Settings ⚙️ → API Configuration" -ForegroundColor White
Write-Host "  - Get key from: https://makersuite.google.com/app/apikey" -ForegroundColor White
Write-Host ""
