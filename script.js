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
    });
}

let calc = new Calculator();
