# Verilog Complete Learning Guide

Master Verilog from basics to advanced hardware design.

## 📚 Table of Contents

1. [Data Types](#data-types)
2. [Operators](#operators)
3. [Control Flow](#control-flow)
4. [Modules and Ports](#modules-and-ports)
5. [Combinational Logic](#combinational-logic)
6. [Sequential Logic](#sequential-logic)
7. [State Machines](#state-machines)
8. [Advanced Topics](#advanced-topics)

---

## Data Types

### Basic Data Types

#### 1. **Wire**
- Represents combinational connections
- Cannot store value (no memory)
- Updated continuously

```verilog
module example;
    wire result;           // 1-bit wire
    wire [7:0] byte_data;  // 8-bit wire
    wire [15:0] word;      // 16-bit wire
    
    assign result = input_a & input_b;  // Continuous assignment
endmodule
```

**Use Cases:**
- Connection between modules
- Combinational logic output
- Internal signal routing

#### 2. **Reg**
- Represents storage element
- Can hold value until next assignment
- Used in procedural blocks (always, initial)

```verilog
module counter(input clk, output reg [7:0] count);
    always @(posedge clk) begin
        count <= count + 1;  // Non-blocking assignment
    end
endmodule
```

**Use Cases:**
- Sequential logic
- Storing intermediate values
- Output from procedural blocks

#### 3. **Parameter**
- Constant value set at compile time
- Can be overridden during instantiation

```verilog
module generic_adder #(parameter WIDTH = 8) (
    input [WIDTH-1:0] a,
    input [WIDTH-1:0] b,
    output [WIDTH:0] sum
);
    assign sum = a + b;
endmodule

// Usage with custom width
generic_adder #(.WIDTH(16)) adder16(...);
```

#### 4. **Integer**
- 32-bit signed value
- Used in testbenches and loops
- Not synthesizable

```verilog
module testbench;
    integer count = 0;
    
    initial begin
        for (count = 0; count < 10; count = count + 1) begin
            $display("Count: %d", count);
        end
    end
endmodule
```

#### 5. **Real**
- Floating point number
- Non-synthesizable
- For simulations and testbenches

```verilog
module sim;
    real frequency = 50.0e6;  // 50 MHz
    real period = 20.0e-9;    // 20 ns
    
    initial $display("Period: %f ns", period);
endmodule
```

#### 6. **String**
- Text data
- Non-synthesizable
- For display purposes

```verilog
module display_example;
    string name = "VeriLearn";
    
    initial $display("Welcome to %s", name);
endmodule
```

### Vector Notation

```verilog
wire [7:0] byte_value;      // 8-bit: bits 0-7
wire [15:0] word_value;     // 16-bit: bits 0-15
wire [31:0] dword_value;    // 32-bit: bits 0-31

// Bit selection
bit0 = byte_value[0];       // Bit 0
bit7 = byte_value[7];       // Bit 7

// Range selection
lower_nibble = byte_value[3:0];  // Bits 0-3
upper_nibble = byte_value[7:4];  // Bits 4-7
```

### Multi-dimensional Arrays

```verilog
// 1D Array of registers
reg [7:0] memory [255:0];      // 256 bytes

// 2D Array
wire [31:0] matrix [3:0][3:0];  // 4x4 matrix of 32-bit values

// Accessing
data = memory[10];              // Byte 10
element = matrix[2][3];         // Element at [2,3]
```

---

## Operators

### 1. **Arithmetic Operators**

```verilog
module arithmetic;
    wire [7:0] a, b;
    wire [8:0] add_result = a + b;      // Addition
    wire [7:0] sub_result = a - b;      // Subtraction
    wire [15:0] mul_result = a * b;     // Multiplication
    wire [7:0] div_result = a / b;      // Division
    wire [7:0] mod_result = a % b;      // Modulo
endmodule
```

### 2. **Bitwise Operators**

```verilog
module bitwise;
    wire [7:0] a = 8'b1100_1010;
    wire [7:0] b = 8'b1010_0101;
    
    // AND
    wire [7:0] and_result = a & b;      // 1000_0000
    
    // OR
    wire [7:0] or_result = a | b;       // 1110_1111
    
    // XOR
    wire [7:0] xor_result = a ^ b;      // 0110_1111
    
    // NOT
    wire [7:0] not_result = ~a;         // 0011_0101
    
    // NAND
    wire [7:0] nand_result = a ~& b;    // 0111_1111
    
    // NOR
    wire [7:0] nor_result = a ~| b;     // 0001_0000
    
    // XNOR
    wire [7:0] xnor_result = a ~^ b;    // 1001_0000
endmodule
```

### 3. **Shift Operators**

```verilog
module shift;
    wire [7:0] data = 8'b1100_1010;
    
    // Left shift
    wire [7:0] left_shift = data << 2;   // 0010_1000
    
    // Right shift (arithmetic)
    wire [7:0] right_shift = data >> 1;  // 0110_0101
    
    // Left shift with variable
    wire [7:0] shifted = data << shift_amount;
endmodule
```

### 4. **Comparison Operators**

```verilog
module comparison;
    wire [7:0] a = 8'd100;
    wire [7:0] b = 8'd50;
    
    wire eq = (a == b);    // Equal (1 bit)
    wire ne = (a != b);    // Not equal
    wire lt = (a < b);     // Less than
    wire gt = (a > b);     // Greater than
    wire le = (a <= b);    // Less than or equal
    wire ge = (a >= b);    // Greater than or equal
endmodule
```

### 5. **Logical Operators**

```verilog
module logical;
    wire a, b, c;
    
    wire and_result = a && b;   // Logical AND (true if both)
    wire or_result = a || b;    // Logical OR (true if any)
    wire not_result = !a;       // Logical NOT
    
    // Complex expression
    wire result = (a && b) || (!c);
endmodule
```

### 6. **Ternary Operator (Multiplexer)**

```verilog
module mux;
    wire [7:0] a, b;
    wire select;
    
    // If select=1, output a; else output b
    wire [7:0] out = select ? a : b;
    
    // Nested ternary
    wire [7:0] out2 = sel[1:0] == 2'b00 ? data0 :
                      sel[1:0] == 2'b01 ? data1 :
                      sel[1:0] == 2'b10 ? data2 : data3;
endmodule
```

### 7. **Reduction Operators**

```verilog
module reduction;
    wire [7:0] value = 8'b1100_1010;
    
    wire and_all = &value;      // AND all bits: 0
    wire or_all = |value;       // OR all bits: 1
    wire xor_all = ^value;      // XOR all bits: 0
    wire nand_all = ~&value;    // NAND all bits: 1
    wire nor_all = ~|value;     // NOR all bits: 0
    wire xnor_all = ~^value;    // XNOR all bits: 1
endmodule
```

### 8. **Concatenation**

```verilog
module concatenation;
    wire [3:0] nibble1 = 4'hA;
    wire [3:0] nibble2 = 4'h5;
    wire [7:0] byte = {nibble1, nibble2};  // 1010_0101
    
    // Multiple values
    wire [15:0] word = {byte, 8'h00};      // 1010_0101_0000_0000
    
    // Repeat
    wire [7:0] all_ones = {8{1'b1}};       // 1111_1111
endmodule
```

---

## Control Flow

### 1. **If-Else Statements**

```verilog
module priority_encoder(
    input [7:0] priority,
    output reg [2:0] encoded
);
    always @(*) begin
        if (priority[7])
            encoded = 3'd7;
        else if (priority[6])
            encoded = 3'd6;
        else if (priority[5])
            encoded = 3'd5;
        else
            encoded = 3'd0;
    end
endmodule
```

### 2. **Case Statement**

```verilog
module mux_4to1(
    input [1:0] select,
    input [7:0] in0, in1, in2, in3,
    output reg [7:0] out
);
    always @(*) begin
        case(select)
            2'b00: out = in0;
            2'b01: out = in1;
            2'b10: out = in2;
            2'b11: out = in3;
            default: out = 8'h00;
        endcase
    end
endmodule
```

### 3. **For Loop**

```verilog
module loop_example;
    reg [7:0] result;
    integer i;
    
    initial begin
        result = 0;
        for (i = 0; i < 8; i = i + 1) begin
            result = result + i;
        end
        $display("Sum = %d", result);  // Result: 28
    end
endmodule
```

### 4. **While Loop**

```verilog
module while_example;
    integer count;
    
    initial begin
        count = 0;
        while (count < 10) begin
            $display("Count = %d", count);
            count = count + 1;
        end
    end
endmodule
```

### 5. **Generate Statement**

```verilog
module parallel_adders #(parameter WIDTH = 8) (
    input [WIDTH-1:0] a, b,
    output [WIDTH-1:0] sum
);
    // Generates WIDTH 1-bit adders
    genvar i;
    generate
        for (i = 0; i < WIDTH; i = i + 1) begin : adder_loop
            assign sum[i] = a[i] ^ b[i];
        end
    endgenerate
endmodule
```

---

## Modules and Ports

### 1. **Module Definition**

```verilog
module adder_4bit(
    input [3:0] a,
    input [3:0] b,
    input cin,
    output [3:0] sum,
    output cout
);
    assign {cout, sum} = a + b + cin;
endmodule
```

### 2. **Port Directions**

```verilog
module example(
    input clk,              // Input port
    input [7:0] data_in,    // 8-bit input
    output reg [7:0] data_out,  // Output register
    inout [7:0] bus         // Bidirectional port
);
endmodule
```

### 3. **Module Instantiation**

```verilog
module top_module;
    wire [3:0] a, b, sum;
    wire carry;
    
    // Instantiate adder_4bit
    adder_4bit adder_instance(
        .a(a),
        .b(b),
        .cin(1'b0),
        .sum(sum),
        .cout(carry)
    );
endmodule
```

### 4. **Parameterized Modules**

```verilog
module generic_mux #(parameter WIDTH = 8, INPUTS = 4) (
    input [WIDTH-1:0] data_in [INPUTS-1:0],
    input [$clog2(INPUTS)-1:0] select,
    output reg [WIDTH-1:0] data_out
);
    always @(*) begin
        data_out = data_in[select];
    end
endmodule
```

---

## Combinational Logic

### 1. **Logic Gates**

```verilog
module basic_gates(
    input a, b,
    output and_out, or_out, xor_out, not_out
);
    assign and_out = a & b;
    assign or_out = a | b;
    assign xor_out = a ^ b;
    assign not_out = ~a;
endmodule
```

### 2. **Multiplexer (MUX)**

```verilog
module mux_8to1(
    input [7:0] data_in,
    input [2:0] select,
    output out
);
    assign out = data_in[select];
endmodule

// Or with case statement
module mux_2to1(
    input a, b, select,
    output reg out
);
    always @(*) begin
        case(select)
            1'b0: out = a;
            1'b1: out = b;
        endcase
    end
endmodule
```

### 3. **Decoder**

```verilog
module decoder_3to8(
    input [2:0] address,
    output reg [7:0] decoded
);
    always @(*) begin
        decoded = 8'b0000_0000;
        decoded[address] = 1'b1;
    end
endmodule
```

### 4. **Encoder**

```verilog
module encoder_8to3(
    input [7:0] encoded,
    output reg [2:0] address
);
    always @(*) begin
        case(encoded)
            8'b0000_0001: address = 3'd0;
            8'b0000_0010: address = 3'd1;
            8'b0000_0100: address = 3'd2;
            8'b0000_1000: address = 3'd3;
            8'b0001_0000: address = 3'd4;
            8'b0010_0000: address = 3'd5;
            8'b0100_0000: address = 3'd6;
            8'b1000_0000: address = 3'd7;
            default: address = 3'd0;
        endcase
    end
endmodule
```

### 5. **Arithmetic Logic Unit (ALU)**

```verilog
module alu(
    input [7:0] a, b,
    input [2:0] operation,
    output reg [15:0] result
);
    always @(*) begin
        case(operation)
            3'b000: result = a + b;        // ADD
            3'b001: result = a - b;        // SUB
            3'b010: result = a * b;        // MUL
            3'b011: result = a / b;        // DIV
            3'b100: result = a & b;        // AND
            3'b101: result = a | b;        // OR
            3'b110: result = a ^ b;        // XOR
            3'b111: result = ~a;           // NOT
            default: result = 16'h0000;
        endcase
    end
endmodule
```

### 6. **Priority Encoder**

```verilog
module priority_encoder_8(
    input [7:0] request,
    output reg [2:0] priority,
    output reg valid
);
    always @(*) begin
        valid = 1'b1;
        if (request[7])
            priority = 3'd7;
        else if (request[6])
            priority = 3'd6;
        else if (request[5])
            priority = 3'd5;
        else if (request[4])
            priority = 3'd4;
        else if (request[3])
            priority = 3'd3;
        else if (request[2])
            priority = 3'd2;
        else if (request[1])
            priority = 3'd1;
        else if (request[0])
            priority = 3'd0;
        else
            valid = 1'b0;
    end
endmodule
```

---

## Sequential Logic

### 1. **SR Latch (NOR-based)**

```verilog
module sr_latch_nor(
    input set, reset,
    output reg q, q_bar
);
    always @(*) begin
        if (set & reset) begin
            q = 1'b0;
            q_bar = 1'b0;  // Invalid state
        end else if (set) begin
            q = 1'b1;
            q_bar = 1'b0;
        end else if (reset) begin
            q = 1'b0;
            q_bar = 1'b1;
        end
        // else: hold current state
    end
endmodule
```

### 2. **SR Flip-Flop (Clocked)**

```verilog
module sr_flipflop(
    input clk, set, reset,
    output reg q, q_bar
);
    always @(posedge clk) begin
        if (reset)
            {q, q_bar} <= {1'b0, 1'b1};
        else if (set)
            {q, q_bar} <= {1'b1, 1'b0};
        // else: hold current state
    end
endmodule
```

### 3. **D Flip-Flop**

```verilog
module d_flipflop(
    input clk, reset, d,
    output reg q, q_bar
);
    always @(posedge clk) begin
        if (reset) begin
            q <= 1'b0;
            q_bar <= 1'b1;
        end else begin
            q <= d;
            q_bar <= ~d;
        end
    end
endmodule
```

### 4. **JK Flip-Flop**

```verilog
module jk_flipflop(
    input clk, reset, j, k,
    output reg q, q_bar
);
    always @(posedge clk) begin
        if (reset) begin
            q <= 1'b0;
            q_bar <= 1'b1;
        end else begin
            case({j, k})
                2'b00: q <= q;              // No change
                2'b01: q <= 1'b0;           // Reset
                2'b10: q <= 1'b1;           // Set
                2'b11: q <= ~q;             // Toggle
            endcase
            q_bar <= ~q;
        end
    end
endmodule
```

### 5. **Binary Counter**

```verilog
module binary_counter(
    input clk, reset, enable,
    output reg [7:0] count
);
    always @(posedge clk) begin
        if (reset)
            count <= 8'h00;
        else if (enable)
            count <= count + 1;
    end
endmodule
```

### 6. **Shift Register**

```verilog
module shift_register(
    input clk, reset, serial_in,
    output reg [7:0] parallel_out
);
    always @(posedge clk) begin
        if (reset)
            parallel_out <= 8'h00;
        else
            parallel_out <= {serial_in, parallel_out[7:1]};
    end
endmodule
```

---

## State Machines

### 1. **Mealy Machine (Output depends on state and input)**

```verilog
module mealy_fsm(
    input clk, reset, input_signal,
    output reg output_signal
);
    reg [1:0] state, next_state;
    
    // State encoding
    localparam IDLE = 2'b00;
    localparam STATE1 = 2'b01;
    localparam STATE2 = 2'b10;
    
    // State transition (combinational)
    always @(*) begin
        case(state)
            IDLE: next_state = input_signal ? STATE1 : IDLE;
            STATE1: next_state = input_signal ? STATE2 : IDLE;
            STATE2: next_state = input_signal ? STATE2 : IDLE;
            default: next_state = IDLE;
        endcase
    end
    
    // Output (combinational - depends on state AND input)
    always @(*) begin
        case(state)
            IDLE: output_signal = 1'b0;
            STATE1: output_signal = input_signal;
            STATE2: output_signal = ~input_signal;
            default: output_signal = 1'b0;
        endcase
    end
    
    // State update (sequential)
    always @(posedge clk) begin
        if (reset)
            state <= IDLE;
        else
            state <= next_state;
    end
endmodule
```

### 2. **Moore Machine (Output depends only on state)**

```verilog
module moore_fsm(
    input clk, reset, button,
    output reg [1:0] led
);
    reg [1:0] state, next_state;
    
    // States
    localparam RED = 2'b00;
    localparam YELLOW = 2'b01;
    localparam GREEN = 2'b10;
    
    // Next state logic
    always @(*) begin
        case(state)
            RED: next_state = button ? YELLOW : RED;
            YELLOW: next_state = button ? GREEN : YELLOW;
            GREEN: next_state = button ? RED : GREEN;
            default: next_state = RED;
        endcase
    end
    
    // Output (depends only on state)
    always @(*) begin
        case(state)
            RED: led = 2'b00;     // Off
            YELLOW: led = 2'b01;  // Medium
            GREEN: led = 2'b10;   // Bright
            default: led = 2'b00;
        endcase
    end
    
    // State update
    always @(posedge clk) begin
        if (reset)
            state <= RED;
        else
            state <= next_state;
    end
endmodule
```

### 3. **Traffic Light Controller**

```verilog
module traffic_light(
    input clk, reset,
    output reg [1:0] light  // 00=Red, 01=Yellow, 10=Green
);
    reg [4:0] timer;
    reg [1:0] state, next_state;
    
    localparam RED = 2'b00;
    localparam GREEN = 2'b10;
    localparam YELLOW = 2'b01;
    
    // State transitions
    always @(*) begin
        case(state)
            RED: next_state = (timer == 5'd20) ? GREEN : RED;
            GREEN: next_state = (timer == 5'd15) ? YELLOW : GREEN;
            YELLOW: next_state = (timer == 5'd5) ? RED : YELLOW;
            default: next_state = RED;
        endcase
    end
    
    // Output
    always @(*) begin
        case(state)
            RED: light = 2'b00;
            GREEN: light = 2'b10;
            YELLOW: light = 2'b01;
            default: light = 2'b00;
        endcase
    end
    
    // Sequencing
    always @(posedge clk) begin
        if (reset) begin
            state <= RED;
            timer <= 5'd0;
        end else if (state != next_state) begin
            state <= next_state;
            timer <= 5'd0;
        end else begin
            timer <= timer + 1;
        end
    end
endmodule
```

---

## Advanced Topics

### 1. **Pipelining**

```verilog
module pipeline_adder(
    input clk, reset,
    input [7:0] a, b,
    output reg [8:0] result
);
    reg [7:0] a_reg, b_reg;
    reg [8:0] sum_reg;
    
    always @(posedge clk) begin
        if (reset) begin
            a_reg <= 8'h00;
            b_reg <= 8'h00;
            sum_reg <= 9'h000;
            result <= 9'h000;
        end else begin
            // Stage 1: Register inputs
            a_reg <= a;
            b_reg <= b;
            
            // Stage 2: Perform addition
            sum_reg <= a_reg + b_reg;
            
            // Stage 3: Output result
            result <= sum_reg;
        end
    end
endmodule
```

### 2. **Memory (RAM)**

```verilog
module ram_sync(
    input clk, we, re,
    input [7:0] addr,
    input [7:0] data_in,
    output reg [7:0] data_out
);
    reg [7:0] memory [255:0];
    
    always @(posedge clk) begin
        if (we)
            memory[addr] <= data_in;  // Write
        
        if (re)
            data_out <= memory[addr];  // Read
    end
endmodule
```

### 3. **FIFO (First-In-First-Out)**

```verilog
module fifo_4deep(
    input clk, reset, write_en, read_en,
    input [7:0] data_in,
    output reg [7:0] data_out,
    output reg full, empty
);
    reg [7:0] fifo [3:0];
    reg [1:0] write_ptr, read_ptr;
    reg [2:0] count;
    
    always @(posedge clk) begin
        if (reset) begin
            write_ptr <= 2'd0;
            read_ptr <= 2'd0;
            count <= 3'd0;
        end else begin
            if (write_en && !full) begin
                fifo[write_ptr] <= data_in;
                write_ptr <= write_ptr + 1;
                count <= count + 1;
            end
            
            if (read_en && !empty) begin
                data_out <= fifo[read_ptr];
                read_ptr <= read_ptr + 1;
                count <= count - 1;
            end
        end
    end
    
    always @(*) begin
        full = (count == 3'd4);
        empty = (count == 3'd0);
    end
endmodule
```

### 4. **Arithmetic Circuits**

#### 4-bit Adder with Carry Lookahead

```verilog
module cla_4bit(
    input [3:0] a, b,
    input cin,
    output [3:0] sum,
    output cout
);
    wire [3:0] g, p;
    wire [4:0] c;
    
    // Generate and propagate
    assign g = a & b;
    assign p = a ^ b;
    
    // Carry lookahead
    assign c[0] = cin;
    assign c[1] = g[0] | (p[0] & c[0]);
    assign c[2] = g[1] | (p[1] & g[0]) | (p[1] & p[0] & c[0]);
    assign c[3] = g[2] | (p[2] & g[1]) | (p[2] & p[1] & g[0]) | 
                  (p[2] & p[1] & p[0] & c[0]);
    assign c[4] = g[3] | (p[3] & g[2]) | (p[3] & p[2] & g[1]) | 
                  (p[3] & p[2] & p[1] & g[0]) | (p[3] & p[2] & p[1] & p[0] & c[0]);
    
    // Sum
    assign sum = p ^ c[3:0];
    assign cout = c[4];
endmodule
```

### 5. **Complex Design: 8-bit Microprocessor**

```verilog
module simple_cpu(
    input clk, reset,
    output reg [7:0] output_data
);
    reg [7:0] acc;           // Accumulator
    reg [7:0] pc;            // Program counter
    reg [7:0] instruction;
    reg [7:0] reg_file [7:0]; // General purpose registers
    
    // Instruction memory (example)
    reg [7:0] instr_mem [31:0];
    
    // ALU
    wire [7:0] alu_result;
    wire [2:0] opcode;
    
    assign opcode = instruction[7:5];
    
    always @(posedge clk) begin
        if (reset) begin
            pc <= 8'h00;
            acc <= 8'h00;
        end else begin
            // Fetch
            instruction <= instr_mem[pc];
            
            // Decode and execute
            case(opcode)
                3'b000: acc <= acc + 1;      // ADD
                3'b001: acc <= acc - 1;      // SUB
                3'b010: acc <= 8'h00;        // CLR
                3'b011: output_data <= acc;  // OUTPUT
                default: ;
            endcase
            
            // Increment PC
            pc <= pc + 1;
        end
    end
endmodule
```

---

## Summary

| Concept | Type | Use Case |
|---------|------|----------|
| **wire** | Combinational | Logic connections |
| **reg** | Sequential | Storage in procedures |
| **if-else** | Control | Conditional logic |
| **case** | Control | Multi-way branching |
| **always @(*)** | Combinational | Combinational logic |
| **always @(posedge)** | Sequential | Sequential logic |
| **FSM** | Sequential | State machines |
| **Memory** | Storage | Data storage |
| **Pipelining** | Optimization | Throughput improvement |
| **Arithmetic** | Logic | Math operations |

---

## Next Steps

- 📚 Practice each concept with examples
- 🔧 Try the interactive examples in VeriLearn
- 🎯 Design complex systems step by step
- 💡 Combine multiple concepts for advanced designs

**Happy Learning!** 🚀
