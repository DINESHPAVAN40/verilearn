export const validateVerilog = (code: string): { valid: boolean; errors: string[] } => {
  const errors: string[] = [];
  
  // Check for basic syntax
  if (!code.includes('module')) {
    errors.push('Module declaration not found');
  }
  if (!code.includes('endmodule')) {
    errors.push('Module end declaration not found');
  }
  
  // Check for matching parentheses
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
  
  return {
    valid: errors.length === 0,
    errors,
  };
};

export const getCodeHighlighting = (code: string) => {
  const keywords = [
    'module', 'endmodule', 'input', 'output', 'inout', 'wire', 'reg',
    'integer', 'real', 'always', 'initial', 'begin', 'end', 'if', 'else',
    'case', 'default', 'for', 'while', 'function', 'task', 'parameter'
  ];
  
  let highlighted = code;
  keywords.forEach(keyword => {
    const regex = new RegExp(`\\b${keyword}\\b`, 'g');
    highlighted = highlighted.replace(regex, `<span class="keyword">${keyword}</span>`);
  });
  
  return highlighted;
};

export const saveFile = async (filename: string, content: string) => {
  const element = document.createElement('a');
  element.setAttribute('href', `data:text/plain;charset=utf-8,${encodeURIComponent(content)}`);
  element.setAttribute('download', filename);
  element.style.display = 'none';
  document.body.appendChild(element);
  element.click();
  document.body.removeChild(element);
};
