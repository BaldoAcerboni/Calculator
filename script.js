const currentOutput = document.getElementById('current');
const previousOutput = document.getElementById('previous');
const numberBtn = document.getElementsByClassName('num');
const operatorBtn = document.getElementsByClassName('op');
const equalBtn = document.getElementById('equal');
const deleteBtn = document.getElementById('delete');
const para = document.getElementById('para')
//variable used to store the values to be used in the operation
const calculator = {
    num: '',
    elementsArray: []
}
const keyboardEvents = {
    numbers: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '0', '.', 'Backspace'],
    operators: ['+', '-', '*', '/', '^']
}

//FUNCTIONS
function writeNumber(e) {
    let textContentTemp = '';
    para.textContent = '';
    //when user got a result from previous operation and start clicking directly new numbers
    if(calculator.elementsArray.length === 1) {
        calculator.elementsArray = [];
        previousOutput.textContent = '';
    }
    if(typeof calculator.elementsArray[calculator.elementsArray.length - 1] === 'number') {
        para.textContent = 'Please choose an operation you want to apply to the previous number';
    } else if((e.target.textContent === '.' || e.key === '.') && !calculator.num) {
        calculator.num = '0.';
        currentOutput.textContent = '0.';
    
    } else if(e.target.classList.contains('backspace') || e.target.parentNode.classList.contains('backspace') || e.key === 'Backspace') {
        calculator.num = calculator.num.split('');
        calculator.num.pop();
        calculator.num = calculator.num.join('');
        textContentTemp = currentOutput.textContent;
        textContentTemp = textContentTemp.split('');
        textContentTemp.pop();//modifies actual variable and does not create a copy like other methods used
        textContentTemp = textContentTemp.join('');
        currentOutput.textContent = textContentTemp;
    //I want numbers not IP addresses
    } else if((e.target.textContent === '.' || e.key === '.') && calculator.num.indexOf('.') !== -1) {
        para.textContent = 'Please input valid numbers'
        return;
    //max 3 decimal digits. In that case substitute last digit with user input
    } else if(calculator.num.indexOf('.') !== -1 && calculator.num.indexOf('.') < calculator.num.length - 3) {
        calculator.num = calculator.num.split('');
        calculator.num.pop();//modifies actual variable and does not create a copy like other methods used
        calculator.num = calculator.num.join('') + (e.key || e.target.textContent);
        textContentTemp = currentOutput.textContent;
        textContentTemp = textContentTemp.split('');
        textContentTemp.pop();//modifies actual variable and does not create a copy like other methods used
        textContentTemp = textContentTemp.join('');
        currentOutput.textContent = textContentTemp + (e.key || e.target.textContent);
        textContentTemp = '';
        para.textContent = 'Max number of decimal digits reached. What previously was the last digit, has been replaced with the last input';
    //max ten digits number, not counting decimals. In that case substitute last digit with user input
    } else if((e.key === '.' || e.target.textContent === '.') && calculator.num.indexOf('.') === -1) {
        calculator.num += (e.key || e.target.textContent);
        currentOutput.textContent += (e.key || e.target.textContent);
    } else if(calculator.num.indexOf('.') === -1 && calculator.num.length > 9) {
        calculator.num = calculator.num.split('');
        calculator.num.pop();//modifies actual variable and does not create a copy like other methods used
        calculator.num = calculator.num.join('') + (e.key || e.target.textContent);
        textContentTemp = currentOutput.textContent;
        textContentTemp = textContentTemp.split('');
        textContentTemp.pop();//modifies actual variable and does not create a copy like other methods used
        textContentTemp = textContentTemp.join('');
        currentOutput.textContent = textContentTemp + (e.key || e.target.textContent);
        textContentTemp = '';
        para.textContent = 'Max number of digits reached. What previously was the last digit, has been replaced with the last input';
    } else {
        calculator.num += (e.key || e.target.textContent);
        currentOutput.textContent += (e.key || e.target.textContent);
    }
}

function writeOperator(e) {
    para.textContent = '';
    if(calculator.num || typeof calculator.elementsArray[calculator.elementsArray.length - 1] === 'number'){
        if(calculator.num) {
            calculator.elementsArray.push(+calculator.num);
            calculator.num = '';
        }
        if(e.target.id === 'squared') {
            calculator.elementsArray.push('**', 2)
            currentOutput.textContent = '';
            previousOutput.textContent = calculator.elementsArray.join('')
        } else if (e.key === '^' || e.target.id === 'powOf') {
            calculator.elementsArray.push('**')
            currentOutput.textContent = '';
            previousOutput.textContent = calculator.elementsArray.join('')
        } else if(e.target.parentNode.id === 'squared') {
            calculator.elementsArray.push('**', 2)
            currentOutput.textContent = '';
            previousOutput.textContent = calculator.elementsArray.join('')
        } else if(e.target.parentNode.id === 'powOf') {
            calculator.elementsArray.push('**')
            currentOutput.textContent = '';
            previousOutput.textContent = calculator.elementsArray.join('')
        } else {
            calculator.elementsArray.push(e.key || e.target.textContent)
            currentOutput.textContent = '';
            previousOutput.textContent = calculator.elementsArray.join('')
        }
    } else {
        if(e.target.id === 'squared') {
            para.textContent = 'please input the number you want to square';
        } else if (e.key === '^' || e.target.id === 'powOf') {
            para.textContent = 'please input the number you want to elevate to the power of n';
        } else if(e.target.parentNode.id === 'squared') {
            para.textContent = 'please input the number you want to square';
        } else if(e.target.parentNode.id === 'powOf') {
            para.textContent = 'please input the number you want to elevate to the power of n';
        } else if(e.key === '+' || e.target.textContent === '+'){
            para.textContent = `please input the number you want sum`;
        } else if(e.key === '-' || e.target.textContent === '-'){
            para.textContent = `please input the number you want subtract`;
        } else if(e.key === '/' || e.target.textContent === '/'){
            para.textContent = `please input the number you want divide`;
        } else if(e.key === '*' || e.target.textContent === '*'){
            para.textContent = `please input the number you want multiply`;
        }
    }
}

function deleteObj() {
    para.textContent = '';
    if(calculator.num) {
        currentOutput.textContent = '';
        calculator.num = '';
        para.textContent = 'Press DEL button again to delete the full expression';
    } else {
        previousOutput.textContent = '';
        calculator.elementsArray = [];
    }
}

//function that checks if what user is trying to solve makes sense, if so it gets result from solveExpression()
function solve() {
    para.textContent = '';
    if(calculator.elementsArray.length <= 1) {
        para.textContent = 'Please input any math before pressing "="'
    } else {
        if(isNaN(calculator.elementsArray[calculator.elementsArray.length - 1])) {
            calculator.elementsArray.push(+calculator.num)
        }
        const solved = solveExpression(calculator.elementsArray);
        previousOutput.textContent = solved;
        currentOutput.textContent = '';
        calculator.num = solved.toString();
        calculator.elementsArray = [+calculator.num];
        calculator.num = '';
    }
}

//function that solve the expression, used recursion to define priority
function solveExpression(arr) {
    let num = 0;
    if(arr.length === 1) {
        //cheating the floating point problem
        if(arr[0] % 1) {
            arr[0] = arr[0].toFixed(3);
        }
        return;
    } else if(arr.length === 2) {
    //due to the if statement at the beginning of solve() that 'uses' the last number input of the user only
    //if an operator has been inserted right before it, i could not find a way to get an error
    //but it is probably just my smooth brain that can not think of it so better leave it there
        arr[0] = 'ERROR'
        return;
    } else if(arr.indexOf('**') !== -1) {
        num = arr[arr.indexOf('**') - 1] ** arr[arr.indexOf('**') + 1];
        arr.splice(arr.indexOf('**')-1, 3, num)
        solveExpression(arr);
    } else if(arr.indexOf('*') !== -1) {
        num = arr[arr.indexOf('*') - 1] * arr[arr.indexOf('*') + 1];
        arr.splice(arr.indexOf('*')-1, 3, num)
        solveExpression(arr);
    } else if(arr.indexOf('/') !== -1) {
        num = arr[arr.indexOf('/') - 1] / arr[arr.indexOf('/') + 1];
        arr.splice(arr.indexOf('/')-1, 3, num)
        solveExpression(arr);
    } else if(arr.indexOf('-') !== -1) {
        num = arr[arr.indexOf('-') - 1] - arr[arr.indexOf('-') + 1];
        arr.splice(arr.indexOf('-')-1, 3, num)
        solveExpression(arr);
    } else if(arr.indexOf('+') !== -1) {
        num = arr[arr.indexOf('+') - 1] + arr[arr.indexOf('+') + 1];
        arr.splice(arr.indexOf('+')-1, 3, num)
        solveExpression(arr);
    }
    return arr[0];
}

function getKey(e) {
    if(keyboardEvents.numbers.indexOf(e.key) !== -1) {
        writeNumber(e);
    } else if(keyboardEvents.operators.indexOf(e.key) !== -1) {
        writeOperator(e);
    } else if(e.key === 'Delete') {
        deleteObj();
    } else if(e.key === '=') {
        solve();
    } else if(e.key === 'Shift') {
        return;
    } else {
        para.textContent = `Keyboard cheat-sheet:
        besides the obvious, 
        "^" to elevate to the power of n,
        "Backspace" to delete a single digit,
        "Delete" to delete last input full number, press again to delete whole expression`;
        return;
    }
}

//EVENT LISTENERS
Array.from(numberBtn).forEach(btn => {
btn.addEventListener('click', writeNumber)
})

Array.from(operatorBtn).forEach(btn => {
    btn.addEventListener('click', writeOperator)
})

deleteBtn.addEventListener('click', deleteObj)

equalBtn.addEventListener('click', solve)

window.addEventListener('keyup', getKey)