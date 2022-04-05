import { isElement, isNumber, clearState, mapToOperator } from "./utils.mjs";

const STATE = {
  firstTerm: "",
  secondTerm: "",
  operator: "",
  accumulator: "",
};

function operate(operator, a, b) {
  const verifiedOperator = mapToOperator(operator);

  switch (verifiedOperator) {
    case "+":
      return +a + +b;
    case "-":
      return +a - +b;
    case "*":
      return +a * +b;
    case "/":
      return b === 0 ? null : a / b;
    default:
      return;
  }
}

function populateDigits(targetElement) {
  if (!isElement(targetElement)) return;

  const keypad = [
    "AC",
    "+/−",
    "%",
    "÷",
    "7",
    "8",
    "9",
    "×",
    "4",
    "5",
    "6",
    "−",
    "1",
    "2",
    "3",
    "+",
    "0",
    ",",
    "=",
  ];

  keypad.forEach((key) => {
    const keyEl = document.createElement("div");
    keyEl.textContent = key;
    keyEl.dataset.keyValue = key;
    keyEl.classList.add("calculator-digit");
    targetElement.appendChild(keyEl);
  });
}

populateDigits(document.querySelector(".calculator-keypad"));
