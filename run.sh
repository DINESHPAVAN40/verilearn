#!/bin/bash

# VeriLearn Startup Script for Linux/macOS

echo ""
echo "===================================="
echo "  VeriLearn - Verilog Learning Hub"
echo "===================================="
echo ""

# Check if Python is installed
if ! command -v python3 &> /dev/null; then
    echo "ERROR: Python 3 is not installed"
    exit 1
fi

# Check if iverilog is installed
if ! command -v iverilog &> /dev/null; then
    echo "WARNING: Icarus Verilog (iverilog) not found"
    echo "Install with: sudo apt-get install iverilog (Linux)"
    echo "             brew install icarus-verilog (macOS)"
    echo ""
fi

# Create virtual environment if it doesn't exist
if [ ! -d "venv" ]; then
    echo "Creating virtual environment..."
    python3 -m venv venv
fi

# Activate virtual environment
source venv/bin/activate

# Install requirements
echo "Installing dependencies..."
pip install -r requirements.txt -q

# Run Flask app
echo ""
echo "Starting VeriLearn server..."
echo ""
echo "===================================="
echo "  Open your browser to:"
echo "  http://localhost:5000"
echo "===================================="
echo ""

python3 app.py
