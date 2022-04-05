export function isElement(element) {
  return element instanceof Element || element instanceof Document;
}

export function isNumber(n) {
  return !isNaN(n);
}

export function clearState(obj, key) {
  if (!obj) throw Error('You need to pass a valid object!')
  if (!key) {
    for (let k in obj) {
      obj[k] = "";
    }
  }

  if (key in obj) {
    obj[key] = "";
  } else {
    return false;
  }

  return true;
}

export function mapToOperator(operator) {
  switch (operator) {
    case "÷":
      return "/";
    case "x":
      return "*";
    default:
      return operator;
  }
}
