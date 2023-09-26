const currentOutput = document.getElementById('current');
const previousOutput = document.getElementById('previous');
const numberBtn = document.getElementsByClassName('num');
const operatorBtn = document.getElementsByClassName('op');
const equalBtn = document.getElementById('equal');
const deleteBtn = document.getElementById('delete');
//variable used to store the values to be used in the operation
const calculator = {
    num: '',
    elementsArray: []
}

//FUNCTIONS
function writeNumber(e) {
    let textContentTemp = '';
    //I want numbers not IP addresses
    if(e.target.textContent === '.' && calculator.num.indexOf('.') !== -1) {
        return;
    //max 3 decimal digits. In that case substitute last digit with user input
    } else if(calculator.num.indexOf('.') !== -1 && calculator.num.indexOf('.') === calculator.num.length - 4) {
        calculator.num = calculator.num.split('');
        calculator.num.pop();//modifies actual variable and does not create a copy like other methods used
        calculator.num = calculator.num.join('') + e.target.textContent;
        textContentTemp = currentOutput.textContent;
        textContentTemp = textContentTemp.split('');
        textContentTemp.pop();//modifies actual variable and does not create a copy like other methods used
        textContentTemp = textContentTemp.join('');
        currentOutput.textContent = textContentTemp + e.target.textContent;
        textContentTemp = '';
    //max ten digits number, not counting decimals. In that case substitute last digit with user input
    } else if(e.target.textContent !== '.' && calculator.num.indexOf('.') === -1 && calculator.num.length === 10) {
        calculator.num = calculator.num.split('');
        calculator.num.pop();//modifies actual variable and does not create a copy like other methods used
        calculator.num = calculator.num.join('') + e.target.textContent;
        textContentTemp = currentOutput.textContent;
        textContentTemp = textContentTemp.split('');
        textContentTemp.pop();//modifies actual variable and does not create a copy like other methods used
        textContentTemp = textContentTemp.join('');
        currentOutput.textContent = textContentTemp + e.target.textContent;
        textContentTemp = '';
    } else {
        calculator.num += e.target.textContent;
        currentOutput.textContent += e.target.textContent;
    }
}

function writeOperator(e) {
    if(calculator.num){
        calculator.elementsArray.push(+calculator.num);
        calculator.num = '';
    }
    if(e.target.id === 'squared') {
        calculator.elementsArray.push('**', 2)
        currentOutput.textContent += e.target.id;
    } else if (e.target.id) {
        calculator.elementsArray.push('**')
        currentOutput.textContent += e.target.id;
    } else if(e.target.parentNode.id === 'squared') {
        calculator.elementsArray.push('**', 2)
        currentOutput.textContent += e.target.parentNode.id;
    } else if(e.target.parentNode.id === 'powOf') {
        calculator.elementsArray.push('**')
        currentOutput.textContent += e.target.parentNode.id;
    } else {
        calculator.elementsArray.push(e.target.textContent)
        currentOutput.textContent += e.target.textContent;
    }
    
}

function deleteObj() {
    currentOutput.textContent = '';
    calculator.num = '';
    calculator.elementsArray = [];
}

function solve() {
    if(isNaN(calculator.elementsArray[calculator.elementsArray.length - 1])) {
        calculator.elementsArray.push(+calculator.num)
    }
    const solved = solveExpression(calculator.elementsArray);
    previousOutput.textContent = currentOutput.textContent;
    currentOutput.textContent = solved;
    calculator.num = solved.toString();
    calculator.elementsArray = [];
}

//function that solve the expression, used recursion to define priority
function solveExpression(arr) {
    let num = 0;
    if(arr.length === 1) {
        //case 1++++4 or similar
        if(isNaN(arr[0])) {
            arr[0] = 'ERROR';
        //cheating floating point bs
        } else if(arr[0] % 1) {
            arr[0] = arr[0].toFixed(3);
        }
        return;
    } else if(arr.length === 2) {
        //due to the if statement at the beginning of solve() that 'uses' the last number input of the user only
        //if an operator has been inserted right before it, i could not find a way to get an error
        //but it is probably just my smooth brain that can not think of it so better leave it there
        console.log(arr)
        arr[0] = 'ERROR'
        return;
    } else if(arr.indexOf('**') !== -1) {
        num = arr[arr.indexOf('**') - 1] ** arr[arr.indexOf('**') + 1];
        arr.splice(arr.indexOf('**')-1, 3, num)
        solveExpression(arr);
        console.log(arr)
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

//EVENT LISTENERS
Array.from(numberBtn).forEach(btn => {
btn.addEventListener('click', writeNumber)
})

Array.from(operatorBtn).forEach(btn => {
    btn.addEventListener('click', writeOperator)
})

deleteBtn.addEventListener('click', deleteObj)

equalBtn.addEventListener('click', solve)