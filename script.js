const calcHistory = document.querySelector(".past-calc");
const currentCalc = document.querySelector(".current-calc");

function add(n1, n2) {
  return n1 + n2;
}

function subtract(n1, n2) {
  return n1 - n2;
}

function multiply(n1, n2) {
  return n1 * n2;
}

function divide(n1, n2) {
  return n1 / n2;
}

function powerOf(n1, n2) {
  return n1 ** n2;
}

function squareRoot(n) {
  return Math.sqrt(n);
}

function decideOperation(arr) {
  if (arr[0] === "&radic;" && !isNaN(arr[1]) && arr.length === 2) {
    return squareRoot(arr[1]);
  } else if (arr.length === 3) {
    if (arr[1] === "+") {
      return add(arr[0], arr[2]);
    } else if (arr[1] === "-") {
      return subtract(arr[0], arr[2]);
    } else if (arr[1] === "*") {
      return multiply(arr[0], arr[2]);
    } else if (arr[1] === "/") {
      return divide(arr[0], arr[2]);
    } else if (arr[1] === "**") {
      return powerOf(arr[0], arr[2]);
    }
  }
}
const arr = ["&radic;", 4];
console.log(decideOperation(arr));
