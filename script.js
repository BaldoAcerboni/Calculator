const calcHistory = document.querySelector(".past-calc");
const currentCalc = document.querySelector(".current-calc");
const numbers = document.querySelectorAll(".number");
const operators = document.querySelectorAll(".operator");
const equal = document.querySelector(".equal");
const backSpace = document.querySelector(".backspace");
const cancel = document.querySelector(".cancel");
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
  if (arr.length === 3) {
    if (arr[1] === "+") {
      return add(arr[0], arr[2]);
    } else if (arr[1] === "-") {
      return subtract(arr[0], arr[2]);
    } else if (arr[1] === "*") {
      return multiply(arr[0], arr[2]);
    } else if (arr[1] === "/") {
      return divide(arr[0], arr[2]);
    } else if (arr[1] === "^") {
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
    (input.target.classList.contains("operator") ||
      input.target.parentNode.classList.contains("operator"))
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
  } else if (input.target.textContent === "=") {
    operationArr.push(parseFloat(numArr.join("")));
    result = decideOperation(operationArr);
    Number.isInteger(result) ? true : (result = result.toFixed(2));
    operationArr.length = 0;
    operationArr.push(result);
    calcHistory.textContent = currentCalc.textContent;
    currentCalc.textContent = result;
  }
}

function numberSetter(n) {
  if (
    (!isNaN(n.target.textContent) || n === ".") &&
    numArr.indexOf(".") < numArr.length - 2 &&
    numArr.indexOf(".") !== -1
  ) {
    console.log("max two decimal number, sorry I'm too lazy for anything else");
    return;
  } else if (
    !isNaN(n.target.textContent) ||
    e.key === 0 ||
    e.key === 1 ||
    e.key === 2 ||
    e.key === 3 ||
    e.key === 4 ||
    e.key === 5 ||
    e.key === 6 ||
    e.key === 7 ||
    e.key === 8 ||
    e.key === 9
  ) {
    numArr.push(n.target.textContent);
    currentCalc.textContent += n.target.textContent;
  } else if (
    (n.target.textContent === "." || n === ".") &&
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

function delete1(e) {
  if (operationArr.length > 0) {
    operationArr.pop();
    currentCalc.textContent = operationArr.join("");
  } else if (numArr.length > 0) {
    numArr.length = 0;
  }
}

function cancelScreen(e) {
  operationArr.length = 0;
  numArr.length = 0;
  currentCalc.textContent = "";
  calcHistory.textContent = "";
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

equal.addEventListener("click", Calculator);

backSpace.addEventListener("click", delete1);

cancel.addEventListener("click", cancelScreen);

window.addEventListener("keydown", (e) => {
  console.log(e.key);
  if (
    e.key === 0 ||
    e.key === 1 ||
    e.key === 2 ||
    e.key === 3 ||
    e.key === 4 ||
    e.key === 5 ||
    e.key === 6 ||
    e.key === 7 ||
    e.key === 8 ||
    e.key === 9 ||
    e.key === "."
  ) {
    numberSetter(e.key);
  } else if (
    e.key === "+" ||
    e.key === "-" ||
    e.key === "*" ||
    e.key === "/" ||
    e.key === "^"
  ) {
    makeNumber(e.key);
    Calculator(e.key);
  } else if (e.key === "=") {
    Calculator(e.key);
  } else if (e.key === "Backspace") {
    delete1();
  } else if (e.key === "Delete") {
    cancelScreen();
  }
});
