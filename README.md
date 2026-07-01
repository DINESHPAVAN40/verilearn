# VeriLearn - Verilog AI Learning & Simulation Platform

A modern, web-based platform for learning Verilog hardware description language with real-time compilation and simulation.

## Features

✨ **Core Features:**
- 🔐 User Authentication (Login/Signup)
- 💾 Project Management (Save, Load, Delete)
- 🎯 Split-Pane Editor (Design & Testbench)
- ⚡ Real-time Verilog Compilation
- 🧪 Live Simulation Output
- 📚 Interactive Learning Guides
- 🎨 Modern, Professional UI/UX

## Project Structure

```
verilog/
├── app.py                    # Flask backend server
├── requirements.txt          # Python dependencies
├── verilog_hub.db           # SQLite database (auto-created)
├── templates/               # HTML templates
│   ├── login.html
│   ├── register.html
│   └── workspace.html
└── static/                  # Static files
    ├── css/
    │   └── style.css
    └── js/
        └── workspace.js
```

## Prerequisites

- **Python 3.8+**
- **Icarus Verilog (iverilog)** - Installed and in PATH
- **pip** (Python package manager)

### Installing Icarus Verilog

**Windows:**
```bash
# Using Chocolatey (if installed)
choco install iverilog

# Or download from:
# http://bleyer.org/icarus/
```

**Linux (Ubuntu/Debian):**
```bash
sudo apt-get install iverilog
```

**macOS:**
```bash
brew install icarus-verilog
```

## Installation & Setup

### 1. Clone/Download the Project
```bash
cd verilog
```

### 2. Create Virtual Environment (Optional but Recommended)
```bash
python -m venv venv
# Activate it
# Windows:
venv\Scripts\activate
# Linux/Mac:
source venv/bin/activate
```

### 3. Install Dependencies
```bash
pip install -r requirements.txt
```

### 4. Run the Application
```bash
python app.py
```

The server will start on `http://localhost:5000`

## Usage

### 1. **Register/Login**
   - Visit http://localhost:5000
   - Create a new account or login with existing credentials

### 2. **Create a Project**
   - Click "+ New Project" button
   - Enter project name and description

### 3. **Write Verilog Code**
   - **Left Pane:** Write your design module (.v file)
   - **Right Pane:** Write your testbench module
   - See the **Live Guides** on the right for examples

### 4. **Simulate**
   - Click "▶️ Simulate" button
   - View compilation status and output below

### 5. **Save Projects**
   - Click "💾 Save Project" to store your work
   - Projects are saved to the database and linked to your account

## Example: Simple AND Gate

**Design Module:**
```verilog
module and_gate(
    input a,
    input b,
    output y
);
    assign y = a & b;
endmodule
```

**Testbench:**
```verilog
`timescale 1ns / 1ps

module testbench;
    reg a, b;
    wire y;
    
    and_gate uut(.a(a), .b(b), .y(y));
    
    initial begin
        $monitor("Time=%t | a=%b b=%b y=%b", $time, a, b, y);
        
        a = 0; b = 0; #10;
        a = 0; b = 1; #10;
        a = 1; b = 0; #10;
        a = 1; b = 1; #10;
        
        $finish;
    end
endmodule
```

## API Endpoints

### Authentication
- `POST /register` - Register new user
- `POST /login` - Login user
- `GET /logout` - Logout user

### Projects
- `GET /api/projects` - List all user projects
- `POST /api/project/save` - Save/update project
- `GET /api/project/<id>` - Get project details
- `DELETE /api/project/<id>` - Delete project

### Compilation
- `POST /api/compile` - Compile and simulate Verilog code

## Learning Guides

The platform includes 4 built-in guides:

1. **Logic Gates** - AND, OR, NOT, XOR operations
2. **Flip-Flops** - Sequential logic and memory elements
3. **State Machines** - FSM design patterns
4. **Testbenches** - Writing effective test cases

Access guides by clicking on them in the left sidebar.

## Troubleshooting

### iverilog Not Found
Make sure Icarus Verilog is installed and added to your system PATH.

### Database Errors
Delete `verilog_hub.db` to reset the database on next run.

### Port 5000 Already in Use
Change the port in `app.py`:
```python
app.run(debug=True, host='127.0.0.1', port=5001)  # Use 5001 instead
```

## Security Notes

⚠️ **For Production:**
- Change `SECRET_KEY` in app.py
- Use proper database (PostgreSQL, MySQL)
- Enable HTTPS
- Implement rate limiting
- Add input validation
- Use environment variables for config

## Future Enhancements

- 📊 Code statistics and complexity metrics
- 🔄 Collaborative editing
- 📤 Export simulation waveforms
- 🎓 Assignment submission system
- 💬 Student/mentor chat
- 🏆 Achievement badges
- 📈 Progress tracking dashboard

## License

MIT License - Feel free to use and modify!

## Support

For issues or questions, contact: support@verilearn.com

---

**Happy Learning!** 🚀 Master Verilog with VeriLearn
