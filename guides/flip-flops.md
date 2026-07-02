# Flip-Flops and Sequential Logic Guide

Understand memory elements and sequential circuits.

## Introduction to Sequential Logic

While combinational logic produces outputs based only on current inputs, sequential logic produces outputs based on both current inputs and previous history. This is achieved using memory elements called **flip-flops**.

---

## Latches vs Flip-Flops

**Latches:**
- Level-triggered (respond to input levels)
- Asynchronous or gated
- Can be unstable

**Flip-Flops:**
- Edge-triggered (respond to clock edges)
- Synchronous operation
- More stable and predictable

---

## SR Latch (Set-Reset Latch)

### NOR-based SR Latch

**Truth Table:**
| S | R | Q | Q' |
|---|---|---|----|
| 0 | 0 | Hold | Hold |
| 1 | 0 | 1 | 0 |
| 0 | 1 | 0 | 1 |
| 1 | 1 | X | X |

**Verilog Implementation:**
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

**Key Points:**
- Simplest memory element
- Both inputs 1 is illegal
- Asynchronous operation
- Q and Q' are complementary

---

## SR Flip-Flop (Clocked)

**Verilog Implementation:**
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

**Key Points:**
- Edge-triggered on clock rise
- Synchronous with clock
- More predictable than latch

---

## D Flip-Flop (Data Flip-Flop)

Most commonly used flip-flop.

**Truth Table:**
| Clock | D | Q(next) |
|-------|---|----------|
| ↑ | 0 | 0 |
| ↑ | 1 | 1 |
| - | X | Q (hold) |

**Verilog Implementation:**
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

**Key Points:**
- Captures input D on clock edge
- Perfect for delay elements
- Simple and reliable

---

## JK Flip-Flop

Most versatile flip-flop.

**Truth Table:**
| J | K | Q(next) | Function |
|---|---|---------|----------|
| 0 | 0 | Q | Hold |
| 0 | 1 | 0 | Reset |
| 1 | 0 | 1 | Set |
| 1 | 1 | Q' | Toggle |

**Verilog Implementation:**
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
                2'b00: q <= q;           // No change
                2'b01: q <= 1'b0;        // Reset
                2'b10: q <= 1'b1;        // Set
                2'b11: q <= ~q;          // Toggle
            endcase
            q_bar <= ~q;
        end
    end
endmodule
```

**Key Points:**
- J=Set, K=Reset
- Toggle when both 1
- Very flexible

---

## T Flip-Flop (Toggle)

Useful for counters.

**Truth Table:**
| T | Q(next) |
|---|----------|
| 0 | Q |
| 1 | Q' |

**Verilog Implementation:**
```verilog
module t_flipflop(
    input clk, reset, t,
    output reg q, q_bar
);
    always @(posedge clk) begin
        if (reset) begin
            q <= 1'b0;
            q_bar <= 1'b1;
        end else if (t) begin
            q <= ~q;
            q_bar <= ~q_bar;
        end
    end
endmodule
```

**Key Points:**
- Simple toggle behavior
- Great for frequency dividers
- Basis for binary counters

---

## Applications

### Binary Counter (using T Flip-Flops)

```verilog
module binary_counter(
    input clk, reset, enable,
    output reg [7:0] count
);
    always @(posedge clk) begin
        if (reset)
            count <= 8'h00;
        else if (enable)
            count <= count + 1;  // Automatic increment
    end
endmodule
```

### Shift Register

```verilog
module shift_register_8bit(
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

### Frequency Divider

```verilog
module freq_divider_by_2(
    input clk, reset,
    output reg divided_clk
);
    always @(posedge clk) begin
        if (reset)
            divided_clk <= 1'b0;
        else
            divided_clk <= ~divided_clk;  // Toggle
    end
endmodule
```

---

## Reset and Set

**Synchronous Reset:**
```verilog
always @(posedge clk) begin
    if (reset)
        q <= 1'b0;  // Reset on clock edge
    else
        q <= d;
end
```

**Asynchronous Reset:**
```verilog
always @(posedge clk or negedge async_reset) begin
    if (!async_reset)
        q <= 1'b0;  // Reset immediately
    else
        q <= d;
end
```

---

## Metastability

When clock and data edges coincide, metastable states can occur.

**Solution: Synchronizer Chain**
```verilog
module synchronizer(
    input clk, async_input,
    output sync_output
);
    reg [1:0] sync_chain;
    
    always @(posedge clk) begin
        sync_chain[0] <= async_input;
        sync_chain[1] <= sync_chain[0];
    end
    
    assign sync_output = sync_chain[1];
endmodule
```

---

## Practice Exercises

### Exercise 1: Design a 4-bit Binary Counter
```verilog
module counter_4bit(
    input clk, reset, enable,
    output reg [3:0] count,
    output overflow
);
    always @(posedge clk) begin
        if (reset)
            count <= 4'h0;
        else if (enable)
            count <= count + 1;
    end
    
    assign overflow = (count == 4'hF) && enable;
endmodule
```

### Exercise 2: Design a Ring Counter
```verilog
module ring_counter(
    input clk, reset,
    output reg [3:0] out
);
    always @(posedge clk) begin
        if (reset)
            out <= 4'b0001;
        else
            out <= {out[2:0], out[3]};
    end
endmodule
```

### Exercise 3: Design a Parallel-to-Serial Converter
```verilog
module p2s_converter(
    input clk, reset, load,
    input [7:0] parallel_in,
    output serial_out
);
    reg [7:0] shift_reg;
    
    always @(posedge clk) begin
        if (reset)
            shift_reg <= 8'h00;
        else if (load)
            shift_reg <= parallel_in;
        else
            shift_reg <= {1'b0, shift_reg[7:1]};
    end
    
    assign serial_out = shift_reg[0];
endmodule
```

---

## Summary

| Flip-Flop | Inputs | Best For |
|-----------|--------|----------|
| SR | Set, Reset | Basic memory |
| D | Data | Data capture |
| JK | J, K | Counters |
| T | Toggle | Frequency division |

---

## Next Steps

- Master flip-flop timing constraints
- Study clock domain crossing
- Explore [State Machines](./state-machines.md)
- Design complex sequential circuits

**Test flip-flops in VeriLearn!** 🚀