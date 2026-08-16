#!/bin/bash

# VeriLearn Setup Script

echo "🚀 VeriLearn Setup"
echo "=================="

# Check Node version
echo "📦 Checking Node version..."
node_version=$(node -v)
echo "✅ Node version: $node_version"

# Install dependencies
echo "📥 Installing dependencies..."
npm install

# Create .env.local from .env.example
if [ ! -f .env.local ]; then
  echo "📋 Creating .env.local..."
  cp .env.example .env.local
  echo "⚠️  Please update .env.local with your Firebase credentials"
else
  echo "✅ .env.local already exists"
fi

echo ""
echo "✨ Setup complete!"
echo ""
echo "Next steps:"
echo "1. Update .env.local with your Firebase credentials"
echo "2. Run 'npm run dev' to start development server"
echo "3. Visit http://localhost:3000"
echo ""
echo "📚 Documentation: https://github.com/DINESHPAVAN40/verilearn"
