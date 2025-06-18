const currentScreen = document.querySelector(".current-calc");
const numbers = document.querySelectorAll(".number");
const operators = document.querySelectorAll(".operator");
const backspace = document.querySelector(".backspace");
const deleteBtn = document.querySelector(".cancel");
const equal = document.querySelector(".equal");

const calculator = {
  currentNum: "",
  operationArr: [],
  result: false,
};

const keybooardEvents = {
  numbers: ["1", "2", "3", "4", "5", "6", "7", "8", "9", "0", "."],
  operators: ["+", "-", "*", "/", "^"],
  deleters: ["Backspace", "Delete"],
  equal: "=",
};

function updateCurrentNumBtn(n) {
  if (calculator.currentNum) {
    if (
      calculator.currentNum.indexOf(".") !== -1 &&
      n.target.textContent === "."
    ) {
      return;
    }
  }
  calculator.currentNum += n.target.textContent;
  setCurrentScreenBtn(n);
}

function updateCurrentNumKey(e) {
  if (calculator.currentNum) {
    if (calculator.currentNum.indexOf(".") !== -1 && e.key === ".") {
      return;
    }
  }
  calculator.currentNum += e.key;
  setCurrentScreenKey(e);
}

function updateOperationArr(el) {
  let result = 0;
  if (calculator.currentNum) {
    calculator.operationArr.push(parseFloat(calculator.currentNum));
    calculator.currentNum = "";
  }
  calculator.operationArr.push(el.target.textContent);
  setCurrentScreenBtn(el);

  if (calculator.operationArr.length === 4) {
    result = setOperationArrBtn(
      calculator.operationArr.slice(0, calculator.operationArr.length - 1)
    );
    Number.isInteger(result) ? true : result.toFixed(2);
    clearCurrentScreen();
    setCurrentScreenBtn(result);
  }
}

function updateOperationArrKey(el) {
  let result = 0;
  if (calculator.currentNum) {
    calculator.operationArr.push(parseFloat(calculator.currentNum));
    calculator.currentNum = "";
  }
  calculator.operationArr.push(el.key);
  setCurrentScreenKey(el);

  if (calculator.operationArr.length === 4) {
    result = setOperationArrBtn(
      calculator.operationArr.slice(0, calculator.operationArr.length - 1)
    );
    Number.isInteger(result) ? true : result.toFixed(2);
    clearCurrentScreen();
    setCurrentScreenBtn(result);
  }
}

function calculate() {
  let result = 0;

  if (calculator.currentNum) {
    if (Number.isInteger(parseFloat(calculator.currentNum))) {
      calculator.operationArr.push(parseFloat(calculator.currentNum));
    } else {
      calculator.operationArr.push(
        parseFloat(calculator.currentNum).toFixed(2)
      );
    }
    calculator.currentNum = "";
  }
  if (calculator.operationArr.length === 3) {
    result = setOperationArrBtn(calculator.operationArr, true);
    clearCurrentScreen();
    setCurrentScreenBtn(result);
  }
}

function resetCurrentNum() {
  calculator.currentNum = "";
}

function clearOpearationArr() {
  calculator.operationArr.length = 0;
}

function setCurrentScreenBtn(str) {
  if (str.target) {
    currentScreen.textContent += str.target.textContent;
  } else {
    currentScreen.textContent += str;
  }
}

function clearCurrentScreen() {
  currentScreen.textContent = "";
}

function setCurrentScreenKey(e) {
  currentScreen.textContent += e.key;
}

function backspaceAction() {
  if (calculator.currentNum) {
    calculator.currentNum = "";
  } else {
    calculator.operationArr.pop();
  }
  currentScreen.textContent = calculator.operationArr.join("");
}

function deleteAction() {
  resetCurrentNum();
  clearOpearationArr();
  currentScreen.textContent = "";
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

function setOperationArrBtn(arr, equal = false) {
  let result = 0;
  if (arr.length === 3) {
    if (arr[1] === "+") {
      result = add(arr[0], arr[2]);
    } else if (arr[1] === "-") {
      result = subtract(arr[0], arr[2]);
    } else if (arr[1] === "*") {
      result = multiply(arr[0], arr[2]);
    } else if (arr[1] === "/") {
      result = divide(arr[0], arr[2]);
    } else if (arr[1] === "^") {
      result = powerOf(arr[0], arr[2]);
    }
    Number.isInteger(result) ? true : (result = parseFloat(result).toFixed(2));
  }
  if (calculator.result === false) {
    calculator.operationArr.splice(0, calculator.operationArr.length - 1);
  } else {
    calculator.operationArr.length = 0;
  }
  calculator.operationArr.length = 0;
  calculator.operationArr.push(result);
  return result;
}

Array.from(numbers).forEach((num) => {
  num.addEventListener("click", updateCurrentNumBtn);
});

Array.from(operators).forEach((op) => {
  op.addEventListener("click", updateOperationArr);
});

equal.addEventListener("click", calculate);

backspace.addEventListener("click", backspaceAction);

deleteBtn.addEventListener("click", deleteAction);

window.addEventListener("keydown", (e) => {
  if (keybooardEvents.numbers.indexOf(e.key) !== -1) {
    updateCurrentNumKey(e);
  } else if (keybooardEvents.operators.indexOf(e.key) !== -1) {
    updateOperationArrKey(e);
  } else if (e.key === "=") {
    calculate();
  } else if (e.key === "Backspace") {
    backspaceAction();
  } else if (e.key === "Delete") {
    deleteAction();
  }
});
