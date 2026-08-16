import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const { code } = await request.json();

    if (!code) {
      return NextResponse.json(
        { error: 'Code is required' },
        { status: 400 }
      );
    }

    // Basic Verilog validation
    const errors: string[] = [];

    if (!code.includes('module')) {
      errors.push('Module declaration not found');
    }
    if (!code.includes('endmodule')) {
      errors.push('Module end declaration not found');
    }

    // Check for matching braces
    let parenCount = 0;
    let bracketCount = 0;
    let braceCount = 0;

    for (const char of code) {
      if (char === '(') parenCount++;
      if (char === ')') parenCount--;
      if (char === '[') bracketCount++;
      if (char === ']') bracketCount--;
      if (char === '{') braceCount++;
      if (char === '}') braceCount--;
    }

    if (parenCount !== 0) errors.push('Mismatched parentheses');
    if (bracketCount !== 0) errors.push('Mismatched brackets');
    if (braceCount !== 0) errors.push('Mismatched braces');

    return NextResponse.json({
      valid: errors.length === 0,
      errors,
    });
  } catch (error) {
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
