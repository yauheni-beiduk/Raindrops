const numbersBtn = document.querySelectorAll('.calc-button-numbers');
const clearBtn = document.getElementById('clear');
const deleteBtn = document.getElementById('delete');
const enterBtn = document.getElementById('enter');
const result = document.getElementById('result');
const song = document.querySelector('.sound');
const wave = document.getElementById('.wave');
const drop = document.getElementById('drop');

let answerCorrect = false;


//Play song
//song.play();




//RANDOM NUMBER AND OPERATOR
function getRandomEquation() {

    function getRandomNumber(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min; 
    };

    function getRandomOperator(){
        var operators = Array('+','-','*');
        var operator = operators[Math.floor(Math.random()*operators.length)];
        return operator
    };

    const x = getRandomNumber(0, 10);
    const y = getRandomOperator();
    const z = getRandomNumber(0, 10);
    if (x>z) {
        return (x + y + z);
    }
        return (z + y + x);
}



// CLICK CALCULATOR

function numbersClick(number) {
    if (result.textContent === '0') {
        result.textContent = number;
    } else {
        result.textContent += number;
    };
};


function resultScreen(e) { 
    if (result.textContent.length > 5) {
      return result.textContent
    }
    numbersClick(e.target.textContent);
};


function clearScreen() {
   return  result.textContent = '0';
}


function deleteNumber() {
    if(result.textContent.length > 1 ) {
    return result.textContent = result.textContent.slice(0, result.textContent.length-1);
    }
    return  result.textContent = '0';
}





class Drop {
    constructor(speed, equation=getRandomEquation(), res, color) {

    this.speed = speed;
    this.equation = equation;
    this.res = res;
    this.color = color;
    }
    createDrop() {
        const drop = document.getElementById('drop');
        let div = document.createElement('div');
        div.className = "raindrop";
        drop.appendChild(div);
        div.style.left =Math.random()*90+'%';
        div.append(this.equation);
        const x = eval(this.equation);
        return x;
    }
};



const arrayResult = [];
function arrays() {
arrayResult.push(new Drop().createDrop());
return arrayResult;
}


function enterNumber() {
    if(arrayResult[arrayResult.length-1] == result.textContent) {
    console.log(true);
    }
    else console.log(false);
}



numbersBtn.forEach(number => number.addEventListener('click',  resultScreen ));
clearBtn.addEventListener('click', clearScreen);
deleteBtn.addEventListener('click', deleteNumber);
enterBtn.addEventListener('click', enterNumber);


