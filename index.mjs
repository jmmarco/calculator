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
    "+/-",
    "%",
    "÷",
    "7",
    "8",
    "9",
    "x",
    "4",
    "5",
    "6",
    "-",
    "1",
    "2",
    "3",
    "+",
    "0",
    ".",
    "=",
  ];

  keypad.forEach((key) => {
    const keyEl = document.createElement("div");
    keyEl.textContent = key;
    keyEl.dataset.key = key;
    keyEl.classList.add("calculator-digit");
    targetElement.appendChild(keyEl);
  });
}

populateDigits(document.querySelector(".calculator-keypad"));

function handleClick(e) {
  const { key } = e.target.dataset;

  if (!key) return;
  console.log(STATE.firstTerm.length > 0);

  switch (true) {
    case !isNumber(key) && key === "AC":
      console.log(`fired ${1} case`);
      clearState(STATE);
      populateDisplay();
      break;
    case !isNumber(key) && key === "." && STATE.firstTerm.length === 0:
      console.log(`fired ${2} case`);
      STATE.firstTerm = "0.";
      populateDisplay(STATE.firstTerm);
      break;
    case !isNumber(key) &&
      key === "." &&
      STATE.firstTerm.length > 0 &&
      STATE.secondTerm.length === 0:
      console.log(`fired ${3} case`);
      STATE.firstTerm += ".";
      populateDisplay(STATE.firstTerm);
      break;
    case !isNumber(key) && key === "." && STATE.secondTerm.length === 0:
      console.log(`fired ${4} case`);
      STATE.secondTerm = "0.";
      populateDisplay(STATE.secondTerm);
      break;
    case !isNumber(key) && key === "." && STATE.secondTerm.length > 0:
      console.log(`fired ${5} case`);
      STATE.secondTerm += ".";
      populateDisplay(STATE.secondTerm);
      break;
    case isNumber(key) && !STATE.firstTerm:
      console.log(`fired ${6} case`);
      STATE.firstTerm = key;
      populateDisplay(STATE.firstTerm);
      break;
    case !isNumber(key) &&
      STATE.firstTerm &&
      !STATE.operator &&
      !STATE.secondTerm:
      console.log(`fired ${7} case`);
      STATE.operator = key;
      break;
    case isNumber(key) &&
      STATE.firstTerm.length > 0 &&
      !STATE.operator &&
      !STATE.secondTerm:
      console.log(`fired ${8} case`);
      STATE.firstTerm += key;
      populateDisplay(STATE.firstTerm);
      break;
    case isNumber(key) &&
      STATE.firstTerm.length > 0 &&
      STATE.operator &&
      !STATE.secondTerm:
      console.log(`fired ${9} case`);
      STATE.secondTerm = key;
      populateDisplay(STATE.secondTerm);
      break;
    case !isNumber(key) &&
      STATE.firstTerm.length > 0 &&
      STATE.secondTerm.length > 0: {
      console.log(`fired ${10} case`);
      console.log("STATE", STATE);
      console.log(operate(STATE.operator, STATE.firstTerm, STATE.secondTerm));

      const operation = operate(
        STATE.operator,
        STATE.firstTerm,
        STATE.secondTerm
      );

      STATE.accumulator = Number.isInteger(operation)
        ? operation.toString()
        : operation.toFixed(1).toString();

      console.log(operate(STATE.operator, STATE.firstTerm, STATE.secondTerm));
      populateDisplay(STATE.accumulator);
      clearState(STATE, "firstTerm");
      clearState(STATE, "secondTerm");
      clearState(STATE, "operator");
      break;
    }
    case !isNumber(key) &&
      STATE.accumulator &&
      STATE.firstTerm.length === 0 &&
      STATE.secondTerm.length === 0:
      console.log(`fired ${11} case`);
      STATE.operator = key;
      break;
    case !isNumber(key) && STATE.accumulator && STATE.firstTerm.length > 0: {
      console.log(`fired ${12} case`);

      const operation = operate(
        STATE.operator,
        STATE.accumulator,
        STATE.firstTerm
      );

      STATE.accumulator = Number.isInteger(operation)
        ? operation.toString()
        : operation.toFixed(1).toString();

      populateDisplay(STATE.accumulator);
      clearState(STATE, "firstTerm");
      console.log('12 =>', STATE)
      break;
    }
    case isNumber(key) &&
      STATE.firstTerm.length > 0 &&
      STATE.operator &&
      STATE.secondTerm.length > 0:
      console.log(`fired ${13} case`);
      STATE.secondTerm += key;
      populateDisplay(STATE.secondTerm);
      break;
    default:
      break;
  }

  console.log(STATE);
}

window.addEventListener("click", handleClick);

function populateDisplay(value = 0) {
  // if (isNaN(value)) throw new Error(`You must pass a number value! You entered: ${value}`);
  const display = document.querySelector(".calculator-display");
  display.textContent = value;
}
