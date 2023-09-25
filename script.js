const currentOutput = document.getElementById('current');
const previousOutput = document.getElementById('previous');
const buttons = document.getElementsByClassName('button');
const numberBtn = document.getElementsByClassName('num');
const operatorBtn = document.getElementsByClassName('op');
const equalBtn = document.getElementById('equal');
const deleteBtn = document.getElementById('delete');

const calculator = {
    num: '',
    elementsArray: [],
    
}

//FUNCTIONS
function displayOutput (e) {
    if(e.target.id) {
        currentOutput.textContent += e.target.id;
    } else {
        currentOutput.textContent += e.target.textContent;
    }
    
}

function displayDelete() {
    currentOutput.textContent = '';
}

function writeNumber(e) {
    calculator.num += e.target.textContent;
}

function writeOperator(e) {
    calculator.elementsArray.push(+calculator.num);
    calculator.num = '';
    if(e.target.id === 'squared') {
        calculator.elementsArray.push('**', 2)
        console.log(calculator.elementsArray)
    } else if (e.target.id) {
        calculator.elementsArray.push('**')
    } else {
        calculator.elementsArray.push(e.target.textContent)
    }
}

function deleteObj() {
    calculator.num = '';
    calculator.elementsArray = [];
}

function solve() {
    if(isNaN(calculator.elementsArray[calculator.elementsArray.length - 1])) {
        calculator.elementsArray.push(+calculator.num)
    }
    const solved = solveExpression(calculator.elementsArray);
    console.log(solved)
    previousOutput.textContent = currentOutput.textContent;
    currentOutput.textContent = solved;
    calculator.num = solved.toString();

}

//NON FUNZIONA DOPO UGUALE
function solveExpression(arr) {
    let num = 0;
    if(arr.length === 1) {
        return;
    } else if(arr.length === 2) {
        arr[0] = 'ERROR'
        return;
    } else if(arr.indexOf('**') !== -1) {
        num = arr[arr.indexOf('**') - 1] ** arr[arr.indexOf('**') + 1];
        arr.splice(arr.indexOf('**')-1, 3, num)
        console.log(num)
        console.log(arr)
        num = 0;
        solveExpression(arr);
    } else if(arr.indexOf('*') !== -1) {
        console.log(arr.indexOf('*'))
        num = arr[arr.indexOf('*') - 1] * arr[arr.indexOf('*') + 1];
        arr.splice(arr.indexOf('*')-1, 3, num)
        console.log(num)
        console.log(arr)
        num = 0;
        solveExpression(arr);
    } else if(arr.indexOf('/') !== -1) {
        num = arr[arr.indexOf('/') - 1] / arr[arr.indexOf('/') + 1];
        arr.splice(arr.indexOf('/')-1, 3, num)
        console.log(num)
        console.log(arr)
        num = 0;
        solveExpression(arr);
    } else if(arr.indexOf('-') !== -1) {
        num = arr[arr.indexOf('-') - 1] - arr[arr.indexOf('-') + 1];
        arr.splice(arr.indexOf('-')-1, 3, num)
        console.log(num)
        console.log(arr)
        num = 0;
        solveExpression(arr);
    } else if(arr.indexOf('+') !== -1) {
        num = arr[arr.indexOf('+') - 1] + arr[arr.indexOf('+') + 1];
        arr.splice(arr.indexOf('+')-1, 3, num)
        console.log(num)
        console.log(arr)
        num = 0;
        solveExpression(arr);
    }
    return arr[0];
}

//EVENT LISTENERS
Array.from(buttons).forEach(button => {
    button.addEventListener('click', displayOutput)
})

deleteBtn.addEventListener('click', displayDelete)


Array.from(numberBtn).forEach(btn => {
btn.addEventListener('click', writeNumber)
})

Array.from(operatorBtn).forEach(btn => {
    btn.addEventListener('click', writeOperator)
})

deleteBtn.addEventListener('click', deleteObj)

equalBtn.addEventListener('click', solve)