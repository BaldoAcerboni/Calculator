const currentScreen = document.querySelector(".current-calc");
const pastScreen = document.querySelector(".past-calc");
const numbers = document.querySelectorAll(".number");
const operators = document.querySelectorAll(".operator");
const backspace = document.querySelector(".backspace");
const deleteBtn = document.querySelector(".cancel");
const equal = document.querySelector(".equal");

const calculator = {
  currentNum: "",
  operationArr: [],
};

const keybooardEvents = {
  numbers: [1, 2, 3, 4, 5, 6, 7, 8, 9, 0],
  operators: ["+", "-", "*", "/", "^"],
  deleters: ["Backspace", "Delete"],
  equal: "=",
};
function updateCurrentNumBtn(n) {
  calculator.currentNum += n.target.textContent;
}

function updateOperationArr(el) {
  let result = 0;
  if (calculator.currentNum && el.target.classList.contains("operator")) {
    calculator.operationArr.push(parseFloat(calculator.currentNum));
    calculator.currentNum = "";
    calculator.operationArr.push(el.target.textContent);
  }
  console.log(calculator.operationArr.length);
  if (
    calculator.operationArr.length === 4 &&
    el.target.classList.contains("operator")
  ) {
    console.log(calculator.operationArr.slice(0, -1));
    result = setOperationArrBtn(calculator.operationArr.slice(0, -1));
    console.log("result", result);
    setPastScreenBtn(result);
    setCurrentScreenBtn(el);
    clearOpearationArr();
    calculator.operationArr.push(result, el.target.textContent);
  }

  console.log("calculator.operationArr", calculator.operationArr);
}

function resetCurrentNum() {
  calculator.currentNum = "";
}

function clearOpearationArr() {
  calculator.operationArr.length = 0;
}

function setCurrentScreenBtn(str) {
  currentScreen.textContent += str.target.textContent;
}

function setPastScreenBtn(str) {
  pastScreen.textContent = currentScreen.textContent;
  currentScreen.textContent = str;
}
function backspaceAction() {
  if (calculator.currentNum) {
    calculator.currentNum = "";
  } else {
    calculator.operationArr.pop();
  }
}

function insertOperator(op) {
  if (calculator.operationArr.length === 0 && calculator.currentNum) {
    calculator.operationArr.push(calculator.currentNum);
  }
  if (calculator.operationArr.length === 1) {
    calculator.operationArr.push(op);
  } else if (calculator.operationArr.length === 3) {
    calculator.operationArr;
  }
}

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

function setOperationArrBtn(arr) {
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

Array.from(numbers).forEach((num) => {
  num.addEventListener("click", updateCurrentNumBtn);
  num.addEventListener("click", setCurrentScreenBtn);
});

Array.from(operators).forEach((op) => {
  op.addEventListener("click", setCurrentScreenBtn);
  op.addEventListener("click", updateOperationArr);
});
