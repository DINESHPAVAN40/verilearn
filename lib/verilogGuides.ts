export const verilogGuides = {
  basics: {
    title: 'Verilog Basics',
    sections: [
      {
        id: 'intro',
        title: 'Introduction to Verilog',
        content: `Verilog is a Hardware Description Language (HDL) used to describe digital systems.
It allows engineers to design and simulate circuits at various levels of abstraction.`,
        example: `module simple_module(
  input clk,
  input reset,
  output reg out
);
  // Your code here
endmodule`,
      },
      {
        id: 'datatypes',
        title: 'Data Types',
        content: `Verilog supports various data types:
- wire: Used for continuous assignment
- reg: Used in procedural blocks
- integer: 32-bit signed integer
- real: Floating point number
- bit: Single bit
- logic: 4-state logic`,
        example: `wire [7:0] data_bus;     // 8-bit wire
reg [15:0] counter;      // 16-bit register
integer count = 0;       // Integer variable
real pi = 3.14159;       // Real number`,
      },
      {
        id: 'operators',
        title: 'Operators',
        content: `Verilog operators include:
- Arithmetic: +, -, *, /, %
- Comparison: ==, !=, <, >, <=, >=
- Logical: &&, ||, !
- Bitwise: &, |, ^, ~, >>, <<
- Ternary: ? :
- Concatenation: { }`,
        example: `assign sum = a + b;
assign diff = a - b;
assign result = (condition) ? value1 : value2;
assign concat = {a, b, c};`,
      },
    ],
  },
  combinational: {
    title: 'Combinational Logic',
    sections: [
      {
        id: 'assign',
        title: 'Continuous Assignment',
        content: 'Continuous assignments are used for combinational logic using the assign keyword.',
        example: `module mux2to1(
  input a, b, sel,
  output out
);
  assign out = sel ? b : a;
endmodule`,
      },
      {
        id: 'gates',
        title: 'Logic Gates',
        content: 'Implement basic logic gates using Verilog.',
        example: `// AND Gate
module and_gate(input a, b, output out);
  assign out = a & b;
endmodule

// OR Gate
module or_gate(input a, b, output out);
  assign out = a | b;
endmodule

// NOT Gate
module not_gate(input a, output out);
  assign out = ~a;
endmodule`,
      },
    ],
  },
  sequential: {
    title: 'Sequential Logic',
    sections: [
      {
        id: 'always',
        title: 'Always Block',
        content: 'Always blocks describe sequential logic and are triggered by sensitivity lists.',
        example: `always @(posedge clk) begin
  if (reset)
    counter <= 0;
  else
    counter <= counter + 1;
end`,
      },
      {
        id: 'flipflop',
        title: 'Flip-Flops',
        content: 'Flip-flops are basic memory elements used in sequential circuits.',
        example: `// D Flip-Flop
module dff(
  input clk, reset, d,
  output reg q, q_bar
);
  always @(posedge clk) begin
    if (reset) begin
      q <= 0;
      q_bar <= 1;
    end else begin
      q <= d;
      q_bar <= ~d;
    end
  end
endmodule`,
      },
    ],
  },
  advanced: {
    title: 'Advanced Topics',
    sections: [
      {
        id: 'state_machine',
        title: 'State Machines',
        content: 'Finite State Machines (FSM) are used to model sequential behavior.',
        example: `module fsm(
  input clk, reset, input_sig,
  output reg output_sig
);
  reg [1:0] state, next_state;
  
  parameter S0 = 2'b00, S1 = 2'b01, S2 = 2'b10;
  
  always @(posedge clk) begin
    if (reset)
      state <= S0;
    else
      state <= next_state;
  end
  
  always @(*) begin
    case(state)
      S0: next_state = input_sig ? S1 : S0;
      S1: next_state = input_sig ? S2 : S0;
      S2: next_state = S0;
      default: next_state = S0;
    endcase
  end
endmodule`,
      },
      {
        id: 'memory',
        title: 'Memory Models',
        content: 'RAM and ROM implementations in Verilog.',
        example: `module memory #(
  parameter DEPTH = 256,
  parameter WIDTH = 8,
  parameter ADDR_WIDTH = 8
)(
  input clk, we,
  input [ADDR_WIDTH-1:0] addr,
  input [WIDTH-1:0] data_in,
  output [WIDTH-1:0] data_out
);
  reg [WIDTH-1:0] mem [0:DEPTH-1];
  
  always @(posedge clk) begin
    if (we)
      mem[addr] <= data_in;
  end
  
  assign data_out = mem[addr];
endmodule`,
      },
    ],
  },
};

export type Guide = typeof verilogGuides;
