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
    input.target.classList.contains("operator")
  ) {
    operationArr.push(input.target.textContent);
    currentCalc.textContent += input.target.textContent;
  } else if (operationArr.length === 2 && !isNaN(+input)) {
    operationArr.push(input);
  } else if (
    operationArr.length === 3 &&
    input.target.classList.contains("operator")
  ) {
    result = decideOperation(operationArr).toFixed(2);
    operationArr.length = 0;
    operationArr.push(result, input.target.textContent);
    calcHistory.textContent = currentCalc.textContent;
    currentCalc.textContent = operationArr.join("");
  }
  console.log(result);
  console.log(operationArr);
}

function numberSetter(n) {
  if (
    !isNaN(n.target.textContent) &&
    numArr.indexOf(".") < numArr.length - 2 &&
    numArr.indexOf(".") !== -1
  ) {
    console.log("max two decimal number, sorry I'm too lazy for anything else");
    return;
  } else if (!isNaN(n.target.textContent)) {
    numArr.push(n.target.textContent);
    currentCalc.textContent += n.target.textContent;
  } else if (
    n.target.textContent === "." &&
    numArr.indexOf(n.target.textContent) === -1
  ) {
    numArr.push(n.target.textContent);
    currentCalc.textContent += n.target.textContent;
  }
}

function makeNumber() {
  let num = parseFloat(numArr.join(""));
  numArr.length = 0;
  Calculator(num);
  return num;
}

Array.from(numbers).forEach((num) => {
  num.addEventListener("click", numberSetter);
});

Array.from(operators).forEach((op) => {
  op.addEventListener("click", makeNumber);
});

Array.from(operators).forEach((op) => {
  op.addEventListener("click", Calculator);
});
