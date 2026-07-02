# State Machines Design Guide

Design robust finite state machines for complex sequential control.

## Introduction to FSM

A Finite State Machine (FSM) is a computational model with:
- **Limited number of states**
- **Transitions between states** based on inputs
- **Outputs** based on current state (Moore) or state+input (Mealy)

---

## Moore vs Mealy Machines

### Moore Machine
- Output depends **only on state**
- Output changes on state transition
- Naturally synchronized with clock

### Mealy Machine
- Output depends on **state AND input**
- Output can change with input (not synchronized)
- Can reach output faster

---

## Moore State Machine Template

```verilog
module moore_fsm(
    input clk, reset, input_signal,
    output reg [1:0] output_signal
);
    // State encoding
    localparam STATE_A = 2'b00;
    localparam STATE_B = 2'b01;
    localparam STATE_C = 2'b10;
    
    reg [1:0] current_state, next_state;
    
    // State transition logic
    always @(*) begin
        case(current_state)
            STATE_A: next_state = input_signal ? STATE_B : STATE_A;
            STATE_B: next_state = input_signal ? STATE_C : STATE_A;
            STATE_C: next_state = input_signal ? STATE_A : STATE_C;
            default: next_state = STATE_A;
        endcase
    end
    
    // Output logic (depends only on state)
    always @(*) begin
        case(current_state)
            STATE_A: output_signal = 2'b00;
            STATE_B: output_signal = 2'b01;
            STATE_C: output_signal = 2'b10;
            default: output_signal = 2'b00;
        endcase
    end
    
    // State update on clock
    always @(posedge clk) begin
        if (reset)
            current_state <= STATE_A;
        else
            current_state <= next_state;
    end
endmodule
```

---

## Mealy State Machine Template

```verilog
module mealy_fsm(
    input clk, reset, input_signal,
    output reg output_signal
);
    localparam STATE_A = 2'b00;
    localparam STATE_B = 2'b01;
    
    reg [1:0] current_state, next_state;
    
    // State transition logic
    always @(*) begin
        case(current_state)
            STATE_A: next_state = input_signal ? STATE_B : STATE_A;
            STATE_B: next_state = input_signal ? STATE_A : STATE_B;
            default: next_state = STATE_A;
        endcase
    end
    
    // Output logic (depends on state AND input)
    always @(*) begin
        case(current_state)
            STATE_A: output_signal = input_signal;
            STATE_B: output_signal = ~input_signal;
            default: output_signal = 1'b0;
        endcase
    end
    
    // State update
    always @(posedge clk) begin
        if (reset)
            current_state <= STATE_A;
        else
            current_state <= next_state;
    end
endmodule
```

---

## Practical Examples

### Example 1: Traffic Light Controller

```verilog
module traffic_light(
    input clk, reset, emergency,
    output reg [1:0] light  // 00=Red, 01=Yellow, 10=Green
);
    // States
    localparam RED = 2'b00;
    localparam GREEN = 2'b10;
    localparam YELLOW = 2'b01;
    
    reg [1:0] state, next_state;
    reg [4:0] timer;
    
    // Timer values
    localparam RED_TIME = 5'd20;
    localparam GREEN_TIME = 5'd15;
    localparam YELLOW_TIME = 5'd5;
    
    // Next state logic
    always @(*) begin
        case(state)
            RED: next_state = (timer == RED_TIME) ? GREEN : RED;
            GREEN: next_state = (timer == GREEN_TIME) ? YELLOW : GREEN;
            YELLOW: next_state = (timer == YELLOW_TIME) ? RED : YELLOW;
            default: next_state = RED;
        endcase
    end
    
    // Output (Moore - depends only on state)
    always @(*) begin
        case(state)
            RED: light = 2'b00;
            GREEN: light = 2'b10;
            YELLOW: light = 2'b01;
            default: light = 2'b00;
        endcase
    end
    
    // State and timer update
    always @(posedge clk) begin
        if (reset) begin
            state <= RED;
            timer <= 5'h0;
        end else if (emergency) begin
            state <= RED;
            timer <= 5'h0;
        end else if (state != next_state) begin
            state <= next_state;
            timer <= 5'h0;
        end else begin
            timer <= timer + 1;
        end
    end
endmodule
```

### Example 2: Pattern Detector (1011)

```verilog
module pattern_detector(
    input clk, reset, data_in,
    output reg detected
);
    // States for detecting "1011"
    localparam IDLE = 3'b000;
    localparam GOT_1 = 3'b001;
    localparam GOT_10 = 3'b010;
    localparam GOT_101 = 3'b011;
    
    reg [2:0] state, next_state;
    
    // Next state logic
    always @(*) begin
        case(state)
            IDLE: next_state = data_in ? GOT_1 : IDLE;
            GOT_1: next_state = data_in ? GOT_1 : GOT_10;
            GOT_10: next_state = data_in ? GOT_101 : IDLE;
            GOT_101: next_state = data_in ? GOT_1 : IDLE;
            default: next_state = IDLE;
        endcase
    end
    
    // Output (Mealy - detected when transition to GOT_101 and input=1)
    always @(*) begin
        detected = (state == GOT_101) && data_in;
    end
    
    // State update
    always @(posedge clk) begin
        if (reset)
            state <= IDLE;
        else
            state <= next_state;
    end
endmodule
```

### Example 3: Vending Machine

```verilog
module vending_machine(
    input clk, reset, coin_inserted, select_item,
    output reg dispensed
);
    localparam IDLE = 2'b00;
    localparam ACCEPT_COIN = 2'b01;
    localparam DISPENSE = 2'b10;
    
    reg [1:0] state, next_state;
    
    always @(*) begin
        case(state)
            IDLE: next_state = coin_inserted ? ACCEPT_COIN : IDLE;
            ACCEPT_COIN: next_state = select_item ? DISPENSE : ACCEPT_COIN;
            DISPENSE: next_state = IDLE;
            default: next_state = IDLE;
        endcase
    end
    
    always @(*) begin
        dispensed = (state == DISPENSE);
    end
    
    always @(posedge clk) begin
        if (reset)
            state <= IDLE;
        else
            state <= next_state;
    end
endmodule
```

---

## State Encoding Techniques

### One-Hot Encoding
```verilog
localparam S0 = 3'b001;  // Only one bit high
localparam S1 = 3'b010;
localparam S2 = 3'b100;
```
**Pros:** Fast transitions, low logic
**Cons:** More flip-flops needed

### Binary Encoding
```verilog
localparam S0 = 3'b00;  // Natural binary
localparam S1 = 3'b01;
localparam S2 = 3'b10;
localparam S3 = 3'b11;
```
**Pros:** Fewer flip-flops
**Cons:** More complex logic

---

## Best Practices

1. **Use localparam for states**
   ```verilog
   localparam STATE_NAME = 2'b00;
   ```

2. **Separate logic blocks**
   - Next state logic (combinational)
   - Output logic (combinational)
   - State update (sequential)

3. **Always include reset**
   ```verilog
   if (reset)
       state <= INITIAL_STATE;
   ```

4. **Default cases**
   ```verilog
   default: next_state = IDLE;
   ```

5. **Document state transitions**
   ```
   IDLE --[condition]--> STATE_B
   ```

---

## Practice Exercises

### Exercise 1: Sequence Recognizer
Detect sequence "110" and output pulse.

### Exercise 2: Up-Down Counter
With increment/decrement control.

### Exercise 3: Clock Divider with Enable
Divide clock by 4 with programmable divisor.

---

## Debugging FSMs

### Testbench Template
```verilog
module fsm_tb;
    reg clk, reset, input_sig;
    wire output_sig;
    
    fsm_module uut(
        .clk(clk),
        .reset(reset),
        .input_sig(input_sig),
        .output_sig(output_sig)
    );
    
    always #5 clk = ~clk;
    
    initial begin
        $monitor("Time=%t State=%b Input=%b Output=%b", 
                 $time, uut.state, input_sig, output_sig);
        
        clk = 0; reset = 1;
        #10 reset = 0;
        
        // Apply test vectors
        input_sig = 1; #10;
        input_sig = 0; #10;
        input_sig = 1; #10;
        
        #100 $finish;
    end
endmodule
```

---

## Summary

- Moore: Output from state only ✓ Simpler
- Mealy: Output from state + input ✓ Faster
- Always use reset ✓ Essential
- Separate logic ✓ Cleaner
- Test thoroughly ✓ Important

---

## Next Steps

- Design multi-input FSMs
- Study hierarchical FSMs
- Explore [Testbenches](./testbenches.md) for FSM testing
- Implement complex control systems

**Design FSMs in VeriLearn!** 🚀