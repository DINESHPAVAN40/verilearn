# Usage Guide

Learn how to use VeriLearn effectively for your Verilog learning journey.

## Dashboard Overview

When you first log in, you'll see your **Project Dashboard**.

### Dashboard Features
- **+ New Project** - Create a new Verilog project
- **Recent Projects** - List of your recent work
- **Search** - Find projects by name
- **Filters** - Sort by date, name, or status
- **Profile Settings** - Manage your account

---

## Creating a New Project

### Step 1: Click "+ New Project"
- Located at the top of the dashboard

### Step 2: Fill in Project Details
- **Project Name:** Enter a descriptive name
- **Description:** Brief description of what you'll do
- **Visibility:** Public or Private

### Step 3: Click "Create"
- You'll be taken to the editor

### Example Projects
- `AND Gate - Basic Logic`
- `4-bit Adder`
- `SR Flip-Flop`
- `Traffic Light FSM`
- `ALU Design`

---

## The Editor Interface

### Three Main Sections

#### 1. Left Pane - Design Module
Write your Verilog design here.

```verilog
module my_design(
    input [3:0] a,
    input [3:0] b,
    output [3:0] result
);
    // Your design logic
    assign result = a + b;
endmodule
```

**Tips:**
- Use meaningful names for signals
- Add comments to explain your code
- Test incrementally

#### 2. Right Pane - Testbench
Write your test code here.

```verilog
module testbench;
    reg [3:0] a, b;
    wire [3:0] result;
    
    my_design uut(.a(a), .b(b), .result(result));
    
    initial begin
        // Test cases here
    end
endmodule
```

**Tips:**
- Test all edge cases
- Use `$monitor` for output
- Verify expected behavior

#### 3. Bottom Pane - Output Console
- Compilation status
- Simulation results
- Error messages

---

## Writing Your Code

### Verilog Basics

#### Module Definition
```verilog
module module_name(port_list);
    // Port declarations
    input ...;
    output ...;
    
    // Logic
endmodule
```

#### Signal Types
```verilog
// Inputs (from outside)
input wire clock;
input reg [7:0] data;

// Outputs (to outside)
output wire result;
output reg [15:0] counter;

// Internal signals
wire temp;
reg state;
```

#### Assignments
```verilog
// Continuous assignment (combinational)
assign out = in1 & in2;

// Procedural (in always/initial)
reg_signal = input_value;
counter = counter + 1;
```

#### Always Blocks
```verilog
// Combinational logic
always @(*) begin
    y = a & b;
end

// Sequential logic (on clock edge)
always @(posedge clk) begin
    counter <= counter + 1;
end
```

---

## Running Simulations

### Step 1: Write Design and Testbench
- Left pane: Your design
- Right pane: Your testbench

### Step 2: Click "▶️ Simulate"
- Button at the top of editor
- Or press `Ctrl+Enter`

### Step 3: Check Output
- View in bottom console
- Look for compilation status
- Check simulation results

### Example Simulation Output
```
Compilation: SUCCESS ✓

=== SIMULATION OUTPUT ===
Time=                   0 | a=0 b=0 y=0
Time=                  10 | a=0 b=1 y=0
Time=                  20 | a=1 b=0 y=0
Time=                  30 | a=1 b=1 y=1

Simulation completed successfully.
```

---

## Monitoring and Display

### Using $monitor
Best for continuous monitoring throughout simulation:
```verilog
$monitor("Time=%t | a=%b b=%b result=%h", $time, a, b, result);
```

### Using $display
For specific outputs:
```verilog
$display("TEST PASSED");
```

### Using $write and $writeh
```verilog
$write("Result: ");
$writeh(result);
```

---

## Saving Projects

### Auto-Save
- Projects auto-save every 30 seconds
- You'll see a "✓ Saved" indicator

### Manual Save
- Click "💾 Save Project" button
- Or press `Ctrl+S`
- Confirmation message appears

### What Gets Saved
- ✓ Design module code
- ✓ Testbench code
- ✓ Project name and description
- ✓ Timestamp of last modification

---

## Managing Projects

### Viewing All Projects
1. Click "Dashboard" or "Home"
2. See all your projects listed

### Opening a Project
1. Click project name from dashboard
2. Your code loads in editor
3. Ready to continue working

### Deleting a Project
1. In dashboard, hover over project
2. Click "🗑️ Delete" button
3. Confirm deletion

### Project Information
- **Name:** Project title
- **Created:** Date project was created
- **Modified:** Last edit date
- **Status:** Active/Archived

---

## Keyboard Shortcuts

| Shortcut | Action |
|----------|--------|
| `Ctrl+S` | Save project |
| `Ctrl+Enter` | Run simulation |
| `Ctrl+/` | Comment/uncomment code |
| `Ctrl+A` | Select all |
| `Ctrl+Z` | Undo |
| `Ctrl+Y` | Redo |
| `Tab` | Indent |
| `Shift+Tab` | Unindent |

---

## Tips & Best Practices

### Code Organization
✅ **DO:**
- Use meaningful signal names
- Add comments to complex logic
- Organize code logically
- Separate concerns

❌ **DON'T:**
- Use cryptic variable names
- Skip comments
- Mix design and test code
- Hardcode magic numbers

### Testing
✅ **DO:**
- Test edge cases
- Use comprehensive testbenches
- Verify expected outputs
- Test incrementally

❌ **DON'T:**
- Assume design works
- Skip testing
- Test only happy paths
- Ignore error messages

### Performance
✅ **DO:**
- Use appropriate signal widths
- Optimize logic
- Avoid unnecessary complexity
- Document your designs

❌ **DON'T:**
- Use unnecessarily wide signals
- Over-complicate designs
- Ignore warnings
- Leave broken code

---

## Common Tasks

### Task 1: Debug a Design
1. Add `$monitor` to testbench
2. Run simulation
3. Check output for unexpected values
4. Modify design logic
5. Re-run simulation

### Task 2: Test Different Inputs
```verilog
initial begin
    // Test case 1
    a = 4'b0000; b = 4'b0000; #10;
    
    // Test case 2
    a = 4'b1111; b = 4'b0000; #10;
    
    // Test case 3
    a = 4'b1010; b = 4'b0101; #10;
    
    $finish;
end
```

### Task 3: Create Reusable Module
1. Design module in left pane
2. Test in testbench
3. Save project
4. Create new project
5. Include module as reference

---

## Keyboard Navigation

- **Tab** - Move to next code area
- **Arrow Keys** - Navigate code
- **Page Up/Down** - Scroll code
- **Home/End** - Jump to line start/end

---

## Need Help?

- 📚 [Learning Guides](../guides/)
- 📖 [API Reference](./api-reference.md)
- 🔧 [Troubleshooting](./troubleshooting.md)
- 📧 support@verilearn.com
