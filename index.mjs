import { isElement } from "./utils.mjs";

function operate(operator, a, b) {
  switch (operator) {
    case "+":
      return a + b;
    case "-":
      return a - b;
    case "*":
      return a * b;
    case "/":
      return a / b;
    default:
      return;
  }
}

function populateKeyPad(targetElement) {
  if (!isElement(targetElement)) return;

  new Array(10).fill("").forEach((digit, index) => {
    const key = document.createElement("div");
    key.textContent = index;
    key.dataset.keyValue = index;
    targetElement.appendChild(key);
  });
}

populateKeyPad(document.querySelector(".calculator-keypad"));
