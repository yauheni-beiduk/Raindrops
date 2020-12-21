const numbersBtn = document.querySelectorAll('.calc-button-numbers');
const clearBtn = document.getElementById('clear');
const deleteBtn = document.getElementById('delete');
const enterBtn = document.getElementById('enter');
const result = document.getElementById('result');
// const song = document.getElementById('sound');
const wave = document.getElementById('wave');
const drop = document.getElementById('drop');
const scoreTable = document.getElementById('score-table');
// const trueSong = document.getElementById('soundTrue');
// const falseSong = document.getElementById('soundFalse');
const waveHeight = document.getElementById('wave-wrapper');
let count = 10;
let score = 0;
let dropsCount = 1;
let errors = 0;
const raindrop = document.getElementsByClassName('raindrop');
let trueAnswer = 0;
const start = document.getElementById('start');
const game_over = document.getElementById('game-Over');

const wrapperFirstPage = document.getElementById('wrapperFirstPage');
const allScore = document.getElementById('allScore');
const totalEquations = document.getElementById('totalEquations');
const totalAnswer = document.getElementById('totalAnswer');
let arrayResult = [];









function fullScreen(event) {
    if (!event.target.hasAttribute('data-fullscreen')) return;
    if (document.fullscreenElement) {
      document.exitFullscreen();
    } else {
      document.documentElement.requestFullscreen();
    }
  }

  function nextPage () {
      wrapperFirstPage.style.display = 'none';
      start.style.display = 'flex';
}

//Play song
// song.play()

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
      return result.textContent;
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
    div.style.left = Math.random()*80+'%';
    div.append(equation); 
}

let timerId,
    timerIdOne,
    timerIdTwo;

// go raindrop
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
    if (errors == 0) {
   timerId = setTimeout(function () {
        arrayResult.splice(0,1);
        drop.firstChild.classList.add('boom');
        setTimeout(() => drop.firstChild.remove(),100)
    }, 6800);}
    if (errors == 1) {
    timerIdOne = setTimeout(function () {
            arrayResult.splice(0,1);
            drop.firstChild.classList.add('boom');
            setTimeout(() => drop.firstChild.remove(),100)
        }, 5000);}
        if (errors == 2) {
     timerIdTwo = setTimeout(function () {
                arrayResult.splice(0,1);
                drop.firstChild.classList.add('boom');
                setTimeout(() => drop.firstChild.remove(),100)
            }, 4000);}
    arrayResult.push({equation: eval(equation),isBonus: bonus});
}



// Start game

let startOne;
let startTwo;
let startThree;
function startGaame () {
    if (errors == 0) {
    startOne = setInterval(arrays,7000);
}
    else if (errors == 1) {
    startTwo = setInterval(arrays,4000);
}
    else {
    startThree = setInterval(arrays,2000);
}
}




function enterNumber() {
    if(arrayResult[0].equation == result.textContent) {
       if(!arrayResult[0].isBonus ) {
            arrayResult.splice(0,1);
            drop.firstChild.classList.add('boom');
            setTimeout(() => drop.firstChild.remove(),100);
            clearInterval(timerIdOne);
            clearInterval(timerIdTwo);
     }
        else{ 
            count += 9;
            arrayResult = [];
            for (let i = 0; i < drop.childNodes.length; i++ ) {
            drop.childNodes[i].classList.add('boom');
            }
            setTimeout(() => {while (drop.firstChild) {
            drop.firstChild.remove()}},100);
        }   
        score = count + score;
        count++;
        scoreTable.textContent = score; 
        result.textContent = '0';
     //   trueSong.play();
        trueAnswer++;
    }
    else { 
        errors++; 
        score -= count;
        scoreTable.textContent = score;
     //   falseSong.play();
        if(errors == 0) {
            clearTimeout(timerId);
        }
        if(errors == 1) {
            waveHeight.style.height = '30%';
            startGaame ();
            clearInterval(startOne);
            clearTimeout( timerIdOne);
         
        }
        if(errors == 2) {
            waveHeight.style.height = '40%';
            startGaame ();
            clearInterval(startTwo);
            clearTimeout(timerIdTwo);
        }
        if(errors == 3) {
            waveHeight.style.height = '60%';
            clearInterval(startThree);
            gameOver();
        }
    }
}



function keyBoard (e) {
    if (result.textContent.length > 5) {
       return result.textContent ;
      }
    if ( e.which == 49 ) {
        if (result.textContent === '0') {
            result.textContent = '1';
        } else {
            result.textContent += '1';
        };
    };
    if ( e.which == 50 ) {
        if (result.textContent === '0') {
            result.textContent = '2';
        } else {
            result.textContent += '2';
        };
    };
    if ( e.which == 51 ) {
        if (result.textContent === '0') {
            result.textContent = '3';
        } else {
            result.textContent += '3';
        };
    };
    if ( e.which == 52 ) {
        if (result.textContent === '0') {
            result.textContent = '4';
        } else {
            result.textContent += '4';
        };
    };
    if ( e.which == 53 ) {
        if (result.textContent === '0') {
            result.textContent = '5';
        } else {
            result.textContent += '5';
        };
    };
    if ( e.which == 54 ) {
        if (result.textContent === '0') {
            result.textContent = '6';
        } else {
            result.textContent += '6';
        };
    };
    if ( e.which == 55 ) {
        if (result.textContent === '0') {
            result.textContent = '7';
        } else {
            result.textContent += '7';
        };
    };
    if ( e.which == 56 ) {
        if (result.textContent === '0') {
            result.textContent = '8';
        } else {
            result.textContent += '8';
        };
    };
    if ( e.which == 57 ) {
        if (result.textContent === '0') {
            result.textContent = '9';
        } else {
            result.textContent += '9';
        };
    };
    if ( e.which == 48 ) {
        if (result.textContent === '0') {
            result.textContent = '0';
        } else {
            result.textContent += '0';
        };
    };
    if ( e.which == 46 ) {
        clearScreen();
    };
    if(e.which == 8) {
        deleteNumber() ;
    }
    if(e.which == 13) {
        enterNumber() ;
    }
}


function gameOver () {
    game_over.style.display ="block";
    start.style.display = 'none';
    allScore.textContent = score;
    totalEquations.textContent = dropsCount - 1 ;
    totalAnswer.textContent = trueAnswer;
}


function anewGame() {
    game_over.style.display ="none";
    wrapperFirstPage.style.display = 'block';
    location.reload();
}


// let autoTimer;
// let enteredResult;
// let autoTimerRes;
// function autoEnterResult() {
//     arrayResult.equation == result.textContent;
//     setTimeout(clearScreen(), 1500);

// };

// function onPlayAutomatic() {
//     startGaame();
//     autoTimer = setTimeout(function auto() {
//             setTimeout(autoEnterResult, 1000);
//             let resultValue = arrayResult.equation
//             result.textContent =  resultValue;
//             autoTimer = setTimeout(auto, 5000);
    
//     }, 3500);
// };


numbersBtn.forEach(number => number.addEventListener('click',  resultScreen ));
clearBtn.addEventListener('click', clearScreen);
deleteBtn.addEventListener('click', deleteNumber);
enterBtn.addEventListener('click', enterNumber);


window.addEventListener('click', fullScreen);
window.addEventListener('keyup', keyBoard);



