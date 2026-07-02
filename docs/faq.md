# Frequently Asked Questions

Find answers to common questions about VeriLearn.

## General Questions

### Q: What is Verilog HDL?
**A:** Verilog is a Hardware Description Language used to design digital circuits. It allows you to describe the behavior and structure of electronic systems that can be simulated and synthesized into actual hardware.

### Q: Do I need to buy VeriLearn?
**A:** No! VeriLearn is completely free and open-source under the MIT License.

### Q: Can I use VeriLearn online without installation?
**A:** Currently, VeriLearn requires local installation. We're working on a cloud version for future release.

### Q: Is my code secure?
**A:** Yes! Your code is stored in your local database. Only you can access your projects unless you share them.

### Q: Can I share my projects with others?
**A:** Currently, projects are private. We're adding collaboration features in future updates.

---

## Installation Questions

### Q: Do I need to install anything?
**A:** Yes, you need:
1. Python 3.8+
2. Icarus Verilog (iverilog)
3. pip (comes with Python)

See [Installation Guide](./installation.md) for details.

### Q: What if I get "iverilog not found"?
**A:** Make sure Icarus Verilog is installed and in your system PATH.
- Windows: Reinstall and check "Add to PATH"
- Linux: `sudo apt-get install iverilog`
- Mac: `brew install icarus-verilog`

### Q: Can I use a different port than 5000?
**A:** Yes! Edit `app.py` and change:
```python
app.run(debug=True, host='127.0.0.1', port=5001)
```

### Q: Do I need a virtual environment?
**A:** No, but it's highly recommended. Virtual environments keep dependencies isolated and prevent conflicts.

---

## Usage Questions

### Q: How do I create my first project?
**A:** 
1. Log in to VeriLearn
2. Click "+ New Project"
3. Fill in name and description
4. Click "Create"
5. Follow [Getting Started Guide](./getting-started.md)

### Q: What's the difference between design and testbench?
**A:** 
- **Design** (left pane): The actual Verilog module you're creating
- **Testbench** (right pane): Code that tests your design by providing inputs and checking outputs

### Q: How do I see simulation results?
**A:** Click "▶️ Simulate" button. Results appear in the bottom console with timing information and signal values.

### Q: Can I modify code while simulating?
**A:** No. Finish simulation first, then modify code and simulate again.

### Q: How often are projects auto-saved?
**A:** Every 30 seconds. You'll see a "✓ Saved" indicator.

### Q: Can I have multiple versions of the same project?
**A:** Currently, no. You can create new projects instead. Versioning features coming soon!

---

## Coding Questions

### Q: What Verilog features are supported?
**A:** Most standard Verilog features including:
- ✓ Combinational logic
- ✓ Sequential logic
- ✓ Modules
- ✓ Always blocks
- ✓ Initial blocks
- ✓ System tasks ($monitor, $display, etc.)

### Q: Can I use generate statements?
**A:** Yes, generate blocks and generate for loops are supported.

### Q: Can I use parameters?
**A:** Yes, you can define and use parameters in your modules.

### Q: How do I add delays?
**A:** Use the `#` operator:
```verilog
#10  // Wait 10 time units
#20  // Wait 20 time units
```

The time unit is defined by `timescale`:
```verilog
`timescale 1ns / 1ps  // 1ns per unit
```

### Q: Can I use multiple modules?
**A:** Yes! Define one as main and instantiate others inside it.

### Q: What about arrays and vectors?
**A:** Fully supported:
```verilog
wire [7:0] byte_array;      // 8-bit vector
reg [15:0] memory [255:0];  // 2D array
```

---

## Simulation Questions

### Q: Why is my simulation not producing output?
**A:** Check if you have:
- ✓ `$monitor` or `$display` statements
- ✓ `$finish` to end simulation
- ✓ Test inputs provided
- ✓ No compilation errors

### Q: How do I know simulation is correct?
**A:** Verify:
1. No compilation errors
2. Output matches expected behavior
3. All test cases pass
4. Edge cases handled correctly

### Q: Can I simulate for a long time?
**A:** Yes, but it may be slow. Consider breaking into smaller simulations.

### Q: What if my design has infinite loops?
**A:** Add `$finish` or `#timeout` to prevent infinite simulation.

### Q: How do I use timescale?
**A:** 
```verilog
`timescale 1ns / 1ps
// 1ns = 1 time unit
// 1ps = precision for rounding
```

---

## Project Management

### Q: How do I delete a project?
**A:** 
1. Go to Dashboard
2. Hover over project
3. Click "🗑️ Delete"
4. Confirm deletion

### Q: Can I recover deleted projects?
**A:** Currently, no. Deletion is permanent. Save important projects elsewhere.

### Q: How do I export my code?
**A:** Copy from editor and save to your computer, or use your browser's developer tools.

### Q: Can I import existing Verilog files?
**A:** Currently, no. You can copy/paste code into the editor.

### Q: How do I organize many projects?
**A:** Use descriptive project names and descriptions to help organize and search.

---

## Performance & Troubleshooting

### Q: Why is simulation slow?
**A:** 
- Large time ranges
- Complex designs
- Long test cases
- Try breaking into smaller sims

### Q: What if I get "Port already in use"?
**A:** 
1. Check if another VeriLearn instance is running
2. Kill the process: `lsof -i :5000` (Linux/Mac) or Task Manager (Windows)
3. Or change port in `app.py`

### Q: Why won't my code compile?
**A:** Check for:
- Missing semicolons
- Typos in signal names
- Mismatched port names
- Invalid Verilog syntax
- Check error message for clues

### Q: Database errors?
**A:** Delete `verilog_hub.db` to reset database on next run.

### Q: How do I clear cache?
**A:** 
- Browser: Ctrl+Shift+Delete
- Restart browser
- Restart application

---

## Account & Security

### Q: Is my password safe?
**A:** Passwords are hashed before storing. However, for production use, enable HTTPS and use proper security practices.

### Q: Can I change my password?
**A:** Coming in future updates. Currently, delete account and create new one.

### Q: What if I forget my password?
**A:** Password reset feature coming soon. For now, contact support@verilearn.com

### Q: Can multiple users use VeriLearn?
**A:** Yes, each user creates their own account with separate projects.

---

## Advanced Topics

### Q: Can I design a CPU?
**A:** Yes! You can design complex systems including ALUs, controllers, and state machines.

### Q: Can I simulate PLDs/FPGAs?
**A:** Yes, VeriLearn supports all synthesizable Verilog constructs.

### Q: How do I use always blocks effectively?
**A:** 
- `always @(*)` for combinational logic
- `always @(posedge clk)` for synchronous logic
- Use `<=` for sequential, `=` for combinational

### Q: What about blocking vs non-blocking assignments?
**A:**
- `=` (blocking) - Executes immediately
- `<=` (non-blocking) - Executes at end of time step
- Use `<=` in sequential blocks for correct behavior

---

## Getting Help

### Q: Where can I get help?
**A:** 
- 📚 Check [Learning Guides](../guides/)
- 📖 Read [Documentation](./installation.md)
- 🐛 [GitHub Issues](https://github.com/DINESHPAVAN40/verilearn/issues)
- 📧 Email: support@verilearn.com

### Q: How do I report bugs?
**A:** 
1. Go to [GitHub Issues](https://github.com/DINESHPAVAN40/verilearn/issues)
2. Click "New Issue"
3. Describe the problem
4. Include steps to reproduce
5. Attach error screenshots

### Q: Can I suggest features?
**A:** Yes! [GitHub Discussions](https://github.com/DINESHPAVAN40/verilearn/discussions)

### Q: How can I contribute?
**A:** Check [Contributing Guide](../CONTRIBUTING.md)

---

## Still Have Questions?

📧 Email us at: **support@verilearn.com**

We're here to help! Don't hesitate to reach out. 🚀
