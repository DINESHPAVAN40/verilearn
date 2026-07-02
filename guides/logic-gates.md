# Logic Gates Tutorial

Master the fundamentals of digital logic design with basic logic gates.

## What are Logic Gates?

Logic gates are the building blocks of digital circuits. They perform basic logical operations on binary inputs (0 or 1) and produce a single binary output.

---

## Basic Logic Gates

### 1. AND Gate

**Truth Table:**
| A | B | Y |
|---|---|---|
| 0 | 0 | 0 |
| 0 | 1 | 0 |
| 1 | 0 | 0 |
| 1 | 1 | 1 |

**Verilog Implementation:**
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

module and_gate_tb;
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

**Key Points:**
- Output is 1 only when BOTH inputs are 1
- AND gate selects signals
- Used for enabling/disabling logic

---

### 2. OR Gate

**Truth Table:**
| A | B | Y |
|---|---|---|
| 0 | 0 | 0 |
| 0 | 1 | 1 |
| 1 | 0 | 1 |
| 1 | 1 | 1 |

**Verilog Implementation:**
```verilog
module or_gate(
    input a,
    input b,
    output y
);
    assign y = a | b;
endmodule
```

**Key Points:**
- Output is 1 when AT LEAST ONE input is 1
- OR gate combines signals
- Used for priority or accumulation

---

### 3. NOT Gate (Inverter)

**Truth Table:**
| A | Y |
|---|---|
| 0 | 1 |
| 1 | 0 |

**Verilog Implementation:**
```verilog
module not_gate(
    input a,
    output y
);
    assign y = ~a;
endmodule
```

**Key Points:**
- Output is opposite of input
- Simplest logic gate
- Used for signal inversion

---

### 4. XOR Gate (Exclusive OR)

**Truth Table:**
| A | B | Y |
|---|---|---|
| 0 | 0 | 0 |
| 0 | 1 | 1 |
| 1 | 0 | 1 |
| 1 | 1 | 0 |

**Verilog Implementation:**
```verilog
module xor_gate(
    input a,
    input b,
    output y
);
    assign y = a ^ b;
endmodule
```

**Key Points:**
- Output is 1 when inputs are DIFFERENT
- Used for parity checking
- Used in adder circuits

---

### 5. NAND Gate

**Truth Table:**
| A | B | Y |
|---|---|---|
| 0 | 0 | 1 |
| 0 | 1 | 1 |
| 1 | 0 | 1 |
| 1 | 1 | 0 |

**Verilog Implementation:**
```verilog
module nand_gate(
    input a,
    input b,
    output y
);
    assign y = ~(a & b);
    // Or: assign y = a ~& b;
endmodule
```

**Key Points:**
- NOT-AND gate
- Output is 0 only when BOTH inputs are 1
- Universal gate (can build any logic)

---

### 6. NOR Gate

**Truth Table:**
| A | B | Y |
|---|---|---|
| 0 | 0 | 1 |
| 0 | 1 | 0 |
| 1 | 0 | 0 |
| 1 | 1 | 0 |

**Verilog Implementation:**
```verilog
module nor_gate(
    input a,
    input b,
    output y
);
    assign y = ~(a | b);
    // Or: assign y = a ~| b;
endmodule
```

**Key Points:**
- NOT-OR gate
- Output is 1 only when BOTH inputs are 0
- Universal gate

---

### 7. XNOR Gate

**Truth Table:**
| A | B | Y |
|---|---|---|
| 0 | 0 | 1 |
| 0 | 1 | 0 |
| 1 | 0 | 0 |
| 1 | 1 | 1 |

**Verilog Implementation:**
```verilog
module xnor_gate(
    input a,
    input b,
    output y
);
    assign y = ~(a ^ b);
    // Or: assign y = a ~^ b;
endmodule
```

**Key Points:**
- XOR inverted
- Output is 1 when inputs are SAME
- Used for equality checking

---

## Combining Gates

### Multi-input AND Gate
```verilog
module and_3bit(
    input a, b, c,
    output y
);
    assign y = a & b & c;
endmodule
```

### Multi-input OR Gate
```verilog
module or_4bit(
    input [3:0] inputs,
    output y
);
    assign y = inputs[0] | inputs[1] | inputs[2] | inputs[3];
endmodule
```

### Complex Logic Expression
```verilog
module complex_logic(
    input a, b, c, d,
    output y
);
    // y = (a AND b) OR (c AND d)
    assign y = (a & b) | (c & d);
endmodule
```

---

## De Morgan's Laws

Useful for logic simplification:

1. **NOT(A AND B) = NOT(A) OR NOT(B)**
   ```verilog
   // These are equivalent:
   assign y = ~(a & b);
   assign y = (~a) | (~b);
   ```

2. **NOT(A OR B) = NOT(A) AND NOT(B)**
   ```verilog
   // These are equivalent:
   assign y = ~(a | b);
   assign y = (~a) & (~b);
   ```

---

## Practical Examples

### 2-to-1 Multiplexer
```verilog
module mux_2to1(
    input a, b, select,
    output y
);
    assign y = select ? b : a;
    // Using gates: y = (NOT select AND a) OR (select AND b)
    // assign y = ((~select) & a) | (select & b);
endmodule
```

### Majority Gate
```verilog
module majority_3bit(
    input a, b, c,
    output y
);
    // Output is 1 if at least 2 inputs are 1
    assign y = (a & b) | (b & c) | (a & c);
endmodule
```

### Parity Generator
```verilog
module parity_4bit(
    input [3:0] data,
    output parity
);
    // Output is 1 if odd number of 1s
    assign parity = data[0] ^ data[1] ^ data[2] ^ data[3];
endmodule
```

---

## Practice Exercises

### Exercise 1: Design a NAND gate using AND and NOT
```verilog
module nand_from_basic(
    input a, b,
    output y
);
    wire and_result;
    assign and_result = a & b;
    assign y = ~and_result;
endmodule
```

### Exercise 2: Design XOR using basic gates
```verilog
module xor_from_basic(
    input a, b,
    output y
);
    // XOR = (a AND NOT b) OR (NOT a AND b)
    assign y = (a & (~b)) | ((~a) & b);
endmodule
```

### Exercise 3: Design a 4-input AND gate
```verilog
module and_4input(
    input [3:0] inputs,
    output y
);
    assign y = inputs[0] & inputs[1] & inputs[2] & inputs[3];
endmodule
```

---

## Summary Table

| Gate | Output | Best For |
|------|--------|----------|
| AND | 1 if all inputs 1 | Enabling |
| OR | 1 if any input 1 | Combining |
| NOT | Inverted input | Inversion |
| XOR | 1 if inputs different | Parity |
| NAND | Opposite of AND | Simplification |
| NOR | Opposite of OR | Simplification |
| XNOR | Opposite of XOR | Comparison |

---

## Next Steps

- Practice building complex logic from basic gates
- Study combinational circuits (adders, multiplexers, decoders)
- Explore boolean algebra for optimization
- Move to [Flip-Flops](./flip-flops.md) for sequential logic

**Try these examples in VeriLearn!** 🚀