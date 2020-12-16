const numbersBtn = document.querySelectorAll('.calc-button-numbers');
const clearBtn = document.getElementById('clear');
const deleteBtn = document.getElementById('delete');
const enterBtn = document.getElementById('enter');
const result = document.getElementById('result');
//const song = document.getElementById('sound');
const wave = document.getElementById('.wave');
const drop = document.getElementById('drop');
const scoreTable = document.getElementById('score-table');
//const trueSong = document.getElementById('soundTrue');
//const falseSong = document.getElementById('soundFalse');
const waveHeight = document.getElementById('.wave-wrapper');
let count = 10;
let score = 0;
let dropsCount = 1;
let errors = 0;


//Play song
// song.play();

//RANDOM NUMBER AND OPERATOR
function getRandomEquation(min, max) {

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

    const x = getRandomNumber(min,max);
    const y = getRandomOperator();
    const z = getRandomNumber(min,max);
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



// Create drop

function createDrop(equation, isBonus) {
    const drop = document.getElementById('drop');
    let div = document.createElement('div');
    div.className = "raindrop";
    if (isBonus) {
        div.style.backgroundColor = 'red';
        div.style.border= '4px solid #f10c05';
    };
    drop.appendChild(div);
    div.style.left = Math.random()*90+'%';
    div.append(equation);
}

let arrayResult = [];

function arrays() {
    let min,
        max;
    if (score <= 100) {
    min = 0;
    max = 10;
    }
    if (score > 100 && score <=350) {
    min =0;
    max = 20;
    }
    if (score > 350) {
    min = 0;
    max = 50;
    }
    const equation = getRandomEquation( min, max );
    const bonus = (dropsCount%10 === 0);
    dropsCount++;
    createDrop(equation,bonus);
    arrayResult.push({equation: eval(equation),isBonus: bonus});
 
}

const raindrop = document.getElementsByClassName('raindrop');

//setInterval(arrays, 4000);

function enterNumber() {
    if(arrayResult[0].equation == result.textContent) {
       if(!arrayResult[0].isBonus ) {
            arrayResult.splice(0,1);
            drop.firstChild.classList.add('boom');
            setTimeout(() => drop.firstChild.remove(),200);
     }
        else{ 
            count += 9;
            arrayResult = [];
            for (let i = 0; i < drop.childNodes.length; i++ ) {
            drop.childNodes[i].classList.add('boom');
            }
            setTimeout(() => {while (drop.firstChild) {
            drop.firstChild.remove()}},200);
        }   
        score = count + score;
        count++;
        scoreTable.textContent = score; 
        result.textContent = '0';
    }
    else { 
        errors++; 
        score -= count;
        scoreTable.textContent = score;
    }
}
function start(){
while(errors <=3) {
    setInterval(arrays, 5000)
}
}
numbersBtn.forEach(number => number.addEventListener('click',  resultScreen ));
clearBtn.addEventListener('click', clearScreen);
deleteBtn.addEventListener('click', deleteNumber);
enterBtn.addEventListener('click', enterNumber);


