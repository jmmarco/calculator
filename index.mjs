function operate(operator, a, b) {
  switch(operator) {
    case '+':
      return a + b;
    case '-':
      return a - b;
    case '*':
      return a * b;
    case '/':
      return a / b;
    default:
      return;
  }
}


console.log(operate('+', 5, 7));