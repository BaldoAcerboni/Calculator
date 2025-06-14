const calcHistory = document.querySelector(".past-calc");
const currentCalc = document.querySelector(".current-calc");
const numbers = document.querySelectorAll(".number");
const operators = document.querySelectorAll(".operator");
const numArr = [];
const operationArr = [];

//basic operation functions
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

//function that decides which operation to fire
function decideOperation(arr) {
  if (!isNaN(arr[1]) && arr.length === 2) {
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

//function that creates array containing numbers + operators and decide what to do with them
function Calculator(input) {
  let result;
  if (!isNaN(+input) && operationArr.length === 0) {
    operationArr.push(input);
  } else if (
    operationArr.length === 1 &&
    input.classList.contains("operator")
  ) {
    operationArr.push(input);
  } else if (
    operationArr.length === 2 &&
    operationArr[1] === "*" &&
    input === "*"
  ) {
    operationArr[1] = "**";
  } else if (operationArr.length === 2 && !isNaN(+input)) {
    operationArr.push(input);
  } else if (
    operationArr.length === 3 &&
    input.classList.contains("operator")
  ) {
    result = decideOperation(operationArr);
    operationArr.length = 0;
    operationArr.push(result);
  }
}

function numberSetter(n) {
  if (!isNaN(n)) {
    numArr.push(n);
  } else if (n === "." && numArr.indexOf(n) === -1) {
    numArr.push(n);
  }
}
