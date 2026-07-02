# VeriLearn - Master Verilog HDL

Welcome to **VeriLearn**, an interactive learning platform for mastering **Verilog Hardware Description Language** with real-time compilation and simulation.

## 🎯 What is VeriLearn?

VeriLearn is a modern, web-based platform designed to help you learn Verilog HDL through:
- 💻 **Interactive Code Editor** - Write and test code in your browser
- ⚡ **Real-time Compilation** - Instant feedback on your code
- 🧪 **Live Simulation** - See your designs in action
- 📚 **Guided Tutorials** - Learn from beginner to advanced topics
- 🎨 **Professional UI** - Clean and intuitive interface

---

## ✨ Key Features

### 🔐 User Authentication
- Create your account and save all your work
- Access your projects anytime, anywhere
- Secure project management

### 💾 Project Management
- Save your Verilog designs
- Load previous projects
- Organize your learning journey
- Delete projects you no longer need

### 🎯 Split-Pane Editor
- **Left Pane:** Write your Verilog design module
- **Right Pane:** Write your testbench code
- See your code side-by-side for easy reference

### 📊 Real-time Compilation & Simulation
- Compile your Verilog code instantly
- View simulation output in real-time
- Get detailed error messages for debugging
- Perfect for learning and experimentation

### 📚 Interactive Learning Guides
The platform includes 4 comprehensive guides:
1. **Logic Gates** - AND, OR, NOT, XOR operations
2. **Flip-Flops** - Sequential logic and memory elements
3. **State Machines** - FSM design patterns
4. **Testbenches** - Writing effective test cases

---

## 🚀 Quick Start

### Prerequisites
- Python 3.8 or higher
- Icarus Verilog (iverilog) installed on your system
- pip (Python package manager)

### Installation

1. **Clone the Repository**
   ```bash
   git clone https://github.com/DINESHPAVAN40/verilearn.git
   cd verilearn
   ```

2. **Create Virtual Environment** (Optional but Recommended)
   ```bash
   python -m venv venv
   # Activate it
   # Windows:
   venv\Scripts\activate
   # Linux/Mac:
   source venv/bin/activate
   ```

3. **Install Dependencies**
   ```bash
   pip install -r requirements.txt
   ```

4. **Run the Application**
   ```bash
   python app.py
   ```

5. **Open in Browser**
   - Navigate to `http://localhost:5000`
   - Create an account and start learning!

---

## 📖 Learning Path

### Beginner
Start here if you're new to Verilog:
- [Getting Started](./docs/getting-started.md)
- [Basic Syntax](./docs/basic-syntax.md)
- [Your First Design](./docs/first-design.md)

### Intermediate
Expand your knowledge:
- [Combinational Logic](./docs/combinational-logic.md)
- [Sequential Logic](./docs/sequential-logic.md)
- [Testbench Writing](./docs/testbenches.md)

### Advanced
Master advanced concepts:
- [State Machines](./docs/state-machines.md)
- [Memory Modules](./docs/memory-modules.md)
- [Design Patterns](./docs/design-patterns.md)

---

## 💡 Example: Simple AND Gate

Here's a quick example to get you started:

### Design Module
```verilog
module and_gate(
    input a,
    input b,
    output y
);
    assign y = a & b;
endmodule
```

### Testbench
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

**Output:**
```
Time=                   0 | a=0 b=0 y=0
Time=                  10 | a=0 b=1 y=0
Time=                  20 | a=1 b=0 y=0
Time=                  30 | a=1 b=1 y=1
```

---

## 🎓 Learning Guides

### [Logic Gates Tutorial](./guides/logic-gates.md)
Learn the fundamentals of digital logic with AND, OR, NOT, and XOR gates.

### [Flip-Flops Guide](./guides/flip-flops.md)
Understand sequential logic and how flip-flops store state.

### [State Machines](./guides/state-machines.md)
Design finite state machines for complex digital systems.

### [Writing Testbenches](./guides/testbenches.md)
Master the art of writing effective test cases for your designs.

---

## 📚 Documentation

- [Installation Guide](./docs/installation.md)
- [Usage Guide](./docs/usage.md)
- [API Reference](./docs/api-reference.md)
- [Troubleshooting](./docs/troubleshooting.md)
- [FAQ](./docs/faq.md)

---

## 🔧 API Endpoints

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

---

## 🛠️ Technology Stack

- **Backend:** Python Flask
- **Frontend:** HTML5, CSS3, JavaScript
- **Database:** SQLite
- **Compiler:** Icarus Verilog (iverilog)
- **Hosting:** GitHub Pages + Flask Server

---

## 📝 License

This project is licensed under the **MIT License** - feel free to use and modify!

---

## 💬 Support & Community

### Get Help
- 📧 Email: support@verilearn.com
- 🐛 [Report Issues](https://github.com/DINESHPAVAN40/verilearn/issues)
- 💡 [Suggest Features](https://github.com/DINESHPAVAN40/verilearn/discussions)

### Contribute
We welcome contributions! Check out our [Contributing Guide](./CONTRIBUTING.md)

---

## 🎯 Future Enhancements

We're constantly improving VeriLearn! Upcoming features include:
- 📊 Code statistics and complexity metrics
- 🔄 Collaborative editing for group learning
- 📤 Export simulation waveforms
- 🎓 Assignment submission system
- 💬 Student/mentor chat
- 🏆 Achievement badges
- 📈 Progress tracking dashboard

---

## 🚀 Get Started Now!

Ready to master Verilog? **[Launch the Platform](http://localhost:5000)** and start learning today!

**Happy Learning!** 🎓✨

---

*VeriLearn - Learn Verilog. Build Digital Systems. Become an Expert.*
