const currentScreen = document.querySelector(".current-calc");
const pastScreen = document.querySelector(".past-calc");
const numbers = document.querySelectorAll(".number");
const operators = document.querySelectorAll(".operator");
const backspace = document.querySelector(".backspace");
const deleteBtn = document.querySelector(".cancel");
const equal = document.querySelector(".equal");

function Calculator() {
  (this.currentNum = ""),
    (this.operationArr = []),
    (this.setCurrentNumBtn = function (n) {
      this.currentNum += n.target.textContent;
    }),
    (this.setOperationArrBtn = function (el) {
      console.log(this.operationArr);
      if (this.operationArr.length === 0) {
        this.operationArr.push(this.currentNum);
        this.currentNum = "";
      }
      this.operationArr.push(el.target.textContent);
    }),
    (this.setOperation = function (arr) {
      if (arr.length === 3) {
        if (arr[1] === "+") {
          this.add(arr[0], arr[2]);
        } else if (arr[1] === "-") {
          this.subtract(arr[0], arr[2]);
        } else if (arr[1] === "*") {
          this.multiply(arr[0], arr[2]);
        } else if (arr[1] === "/") {
          this.divide(arr[0], arr[2]);
        } else if (arr[1] === "^") {
          this.powerOf(arr[0], arr[2]);
        }
      }
    }),
    (this.add = function (n1, n2) {
      return n1 + n2;
    }),
    (this.subtract = function (n1, n2) {
      return n1 - n2;
    }),
    (this.multiply = function (n1, n2) {
      return n1 * n2;
    }),
    (this.divide = function (n1, n2) {
      return n1 / n2;
    }),
    (this.powerOf = function (n1, n2) {
      return n1 ** n2;
    }),
    (this.setCurrentScreenBtn = function (str) {
      currentScreen.textContent = str.target.textContent;
    }),
    (this.setPastScreenBtn = function (str) {
      pastScreen.textContent = currentScreen.textContent;
      currentScreen.textContent = str.target.textContent;
    }),
    (this.backspace = function () {
      if (this.currentNum) {
        this.currentNum = "";
      } else {
        this.operationArr.pop();
      }
    }),
    (this.insertOperator = function (op) {
      if (this.operationArr.length === 1) {
        this.operationArr.push(op);
      } else if (this.operationArr.length === 3) {
        this.operationArr;
      }
    });
}

let calc = new Calculator();
console.log(calc);

Array.from(numbers).forEach((num) => {
  num.addEventListener("click", calc.setCurrentNumBtn);

  num.addEventListener("click", calc.setCurrentScreenBtn);
});

Array.from(operators).forEach((op) => {
  op.addEventListener("click", calc.setOperationArrBtn);
});
