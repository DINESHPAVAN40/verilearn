#!/usr/bin/env bash

# VeriLearn Quick Deployment Script
# This script helps deploy VeriLearn to Vercel

set -e

echo "🚀 VeriLearn Deployment Assistant"
echo "===================================="
echo ""

# Check if git is available
if ! command -v git &> /dev/null; then
    echo "❌ Git is required but not installed."
    exit 1
fi

echo "✅ Git detected"
echo ""

# Get current branch
CURRENT_BRANCH=$(git rev-parse --abbrev-ref HEAD)
echo "🌟 Current branch: $CURRENT_BRANCH"
echo ""

# Check if changes are staged
if git diff-index --quiet HEAD --; then
    echo "✅ Working directory clean"
else
    echo "⚠️  You have uncommitted changes"
    echo "💡 Consider committing before pushing"
fi

echo ""
echo "🔗 Deployment Steps:"
echo ""
echo "1. Firebase Setup"
echo "   - Create Firebase project"
echo "   - Enable Authentication & Firestore"
echo "   - Copy credentials"
echo ""
echo "2. Push to GitHub"
echo "   git push origin $CURRENT_BRANCH"
echo ""
echo "3. Deploy to Vercel"
echo "   - Go to https://vercel.com/dashboard"
echo "   - Import repository"
echo "   - Add environment variables"
echo "   - Deploy"
echo ""
echo "4. Configure Firebase Rules"
echo "   - Go to Firestore Rules"
echo "   - Update with proper rules"
echo ""
echo "5. Test Deployment"
echo "   - Sign up"
echo "   - Create project"
echo "   - Save code"
echo ""
echo "🙋 Need help? Check DEPLOYMENT.md"
echo ""
