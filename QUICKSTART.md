# VeriLearn - Quick Start Guide

## 🚀 Getting Started in 3 Steps

### Step 1: Install Prerequisites

**Install Icarus Verilog (Verilog compiler):**

**Windows:**
- Download from: http://bleyer.org/icarus/
- Or use: `choco install iverilog`

**Linux/macOS:**
```bash
sudo apt-get install iverilog    # Ubuntu/Debian
brew install icarus-verilog      # macOS
```

### Step 2: Install Python Dependencies

```bash
# Navigate to project directory
cd verilog

# Install all required packages
pip install -r requirements.txt
```

### Step 3: Run the Application

**Windows:**
```bash
run.bat
```

**Linux/macOS:**
```bash
chmod +x run.sh
./run.sh
```

Then open your browser to: **http://localhost:5000**

---

## 📚 Platform Features

### 1. **User Authentication**
- Create account with email and password
- Secure login system with session management
- Personal project dashboard

### 2. **Code Editor with Split Panes**
```
┌─────────────────────┬─────────────────────┐
│  Design Module      │  Testbench Module   │
│  (.v files)         │  (.v files)         │
├─────────────────────┼─────────────────────┤
│  Write your design  │  Test your design   │
│  code here          │  code here          │
└─────────────────────┴─────────────────────┘
```

### 3. **Real-time Compilation**
- Uses **iverilog** to compile Verilog code
- Uses **vvp** to simulate compiled code
- Instant error reporting

### 4. **Project Management**
- Save projects to database
- Load previously saved projects
- Delete projects you no longer need
- Auto-timestamp all changes

### 5. **Interactive Guides**
Built-in tutorials for:
- Logic Gates (AND, OR, NOT, XOR)
- Flip-Flops & Latches
- State Machines (FSM)
- Testbench Writing

---

## 💻 Example Projects to Try

### Example 1: AND Gate
**Design:**
```verilog
module and_gate(input a, input b, output y);
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
        $display("Truth Table for AND Gate:");
        $display("A | B | Y");
        $display("--|---|--");
        
        a=0; b=0; #10; $display("%b | %b | %b", a, b, y);
        a=0; b=1; #10; $display("%b | %b | %b", a, b, y);
        a=1; b=0; #10; $display("%b | %b | %b", a, b, y);
        a=1; b=1; #10; $display("%b | %b | %b", a, b, y);
        
        $finish;
    end
endmodule
```

### Example 2: 4-bit Counter
**Design:**
```verilog
module counter_4bit(
    input clk,
    input reset,
    output [3:0] count
);
    reg [3:0] count_reg;
    
    always @(posedge clk or posedge reset)
        if (reset)
            count_reg <= 0;
        else
            count_reg <= count_reg + 1;
    
    assign count = count_reg;
endmodule
```

**Testbench:**
```verilog
`timescale 1ns / 1ps

module counter_tb;
    reg clk, reset;
    wire [3:0] count;
    
    counter_4bit uut(.clk(clk), .reset(reset), .count(count));
    
    initial clk = 0;
    always #5 clk = ~clk;
    
    initial begin
        reset = 1;
        #10 reset = 0;
        
        $monitor("Time=%t | Count=%d", $time, count);
        
        #200 $finish;
    end
endmodule
```

---

## 🔧 Troubleshooting

| Issue | Solution |
|-------|----------|
| `iverilog not found` | Install Icarus Verilog and add to PATH |
| `Port 5000 in use` | Change port in app.py to 5001, 5002, etc. |
| `Database errors` | Delete `verilog_hub.db` and restart |
| `Import errors` | Run `pip install -r requirements.txt` again |
| `Module not found` | Ensure testbench instantiates correct module name |

---

## 📁 Project File Structure

```
verilog/
├── app.py                       # Flask server (300+ lines)
├── requirements.txt             # Python dependencies
├── verilog_hub.db              # SQLite database (auto-created)
├── run.bat / run.sh            # Startup scripts
├── README.md                    # Detailed documentation
├── QUICKSTART.md              # This file
├── templates/
│   ├── login.html             # Login page
│   ├── register.html          # Registration page
│   └── workspace.html         # Main editor interface
└── static/
    ├── css/
    │   └── style.css          # Professional styling
    └── js/
        └── workspace.js       # Interactive features
```

---

## 🎯 Workflow Example

1. **Start the server** → Run `run.bat` or `run.sh`
2. **Open browser** → Go to `http://localhost:5000`
3. **Register** → Create your account
4. **Login** → Enter your credentials
5. **Create project** → Click "+ New Project"
6. **Write code** → Use split pane editor
7. **Review guide** → Check tutorial on right sidebar
8. **Simulate** → Click "▶️ Simulate" button
9. **Save** → Click "💾 Save Project"
10. **Test again** → Modify and re-simulate

---

## 🔐 Security & Best Practices

**What's Implemented:**
- ✅ Password hashing (Werkzeug)
- ✅ User authentication with sessions
- ✅ Database access control
- ✅ Input validation on backend

**What to Add for Production:**
- 🔒 HTTPS/SSL encryption
- 🛡️ Rate limiting & DDoS protection
- 📝 Comprehensive logging
- 🔑 API key authentication
- 🗄️ Database backups
- ♻️ Code review system

---

## 📊 API Documentation

### Authentication Endpoints
```
POST   /register               Register new user
POST   /login                 Login user
GET    /logout                Logout user
```

### Project Endpoints
```
GET    /api/projects          List user's projects
POST   /api/project/save      Save/update project
GET    /api/project/<id>      Get project details
DELETE /api/project/<id>      Delete project
```

### Compilation Endpoint
```
POST   /api/compile           Compile & simulate code
Body: {design: "...", testbench: "..."}
```

---

## 🎓 Learning Path

**Week 1: Fundamentals**
- Day 1: Logic Gates (AND, OR, NOT)
- Day 2: XOR gate and combinational logic
- Day 3: Truth tables and Boolean algebra
- Day 4-5: Mini projects with gates

**Week 2: Sequential Logic**
- Day 1-2: Flip-flops (D, SR, JK)
- Day 3-4: Latches and clock synchronization
- Day 5: Mini project: Counter

**Week 3: Advanced Topics**
- Day 1-2: State Machines (FSM)
- Day 3: Mealy vs Moore machines
- Day 4: Traffic light controller
- Day 5: Capstone project

---

## 💡 Tips & Tricks

1. **Always write testbenches** - Never code design without testing
2. **Use $display** - Print debugging information during simulation
3. **Check sensitivity lists** - Include all signals that affect output
4. **Initialize signals** - Set all reg values in `initial` block
5. **Test edge cases** - Test boundary and unusual input conditions

---

## 🆘 Need Help?

Check the **Live Guides** in the platform:
- Click the guide buttons on the left sidebar
- Each guide has working code examples
- Guides show best practices and patterns

---

## 📝 Notes

- All code is compiled and run server-side for security
- Temporary files are auto-deleted after simulation
- Database stores all projects indefinitely
- Multiple users can run simulations simultaneously

---

**Happy Learning! 🚀 You're ready to master Verilog!**
