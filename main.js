const numbersBtn = document.querySelectorAll(".calc-button-numbers");
const clearBtn = document.getElementById("clear");
const deleteBtn = document.getElementById("delete");
const enterBtn = document.getElementById("enter");
const result = document.getElementById("result");
const song = document.getElementById("sound");
const wave = document.getElementById("wave");
const drop = document.getElementById("drop");
const scoreTable = document.getElementById("score-table");
const trueSong = document.getElementById("soundTrue");
const falseSong = document.getElementById("soundFalse");
const start = document.getElementById("start");
const game_over = document.getElementById("game-Over");
const wrapperFirstPage = document.getElementById("wrapperFirstPage");
const allScore = document.getElementById("allScore");
const totalEquations = document.getElementById("totalEquations");
const totalAnswer = document.getElementById("totalAnswer");
const waveHeight = document.getElementById("wave-wrapper");
const raindrop = document.getElementsByClassName("raindrop");

let count = 10;
let score = 0;
let dropsCount = 1;
let errors = 0;
let trueAnswer = 0;
let arrayResult = [];
let startOne;
let id = 0;
let timer;


function addFullScreen(event) {
  if (!event.target.hasAttribute("data-fullscreen")) return;
  if (document.fullscreenElement) {
    document.exitFullscreen();
  } else {
    document.documentElement.requestFullscreen();
  }
}

function goNextPage() {
  wrapperFirstPage.style.display = "none";
  start.style.display = "flex";
}

//Play song
song.play();


//RANDOM NUMBER AND OPERATOR

function getRandomEquation(min, max) {
  function getRandomNumber(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  function getRandomOperator() {
    var operators = Array("+", "-", "*");
    var operator = operators[Math.floor(Math.random() * operators.length)];
    return operator;
  }

  const x = getRandomNumber(min, max);
  const y = getRandomOperator();
  const z = getRandomNumber(min, max);
  if (x > z) {
    return x + y + z;
  }
  return z + y + x;
}

// CLICK CALCULATOR

function numbersClick(number) {
  if (result.textContent === "0") {
    result.textContent = number;
  } else {
    result.textContent += number;
  }
}

function resultScreen(e) {
  if (result.textContent.length > 5) {
    return result.textContent;
  }
  numbersClick(e.target.textContent);
}

function clearScreen() {
  return (result.textContent = "0");
}

function deleteNumber() {
  if (result.textContent.length > 1) {
    return (result.textContent = result.textContent.slice(
      0,
      result.textContent.length - 1
    ));
  }
  return (result.textContent = "0");
}

// CREATE DROP

function createDrop(equation, id, isBonus) {
  const drop = document.getElementById("drop");
  let div = document.createElement("div");
  div.className = "raindrop";
  div.id = id;
  if (isBonus) {
    div.style.backgroundColor = "red";
    div.style.border = "4px solid #f10c05";
  }
  drop.appendChild(div);
  div.style.left = Math.random() * 80 + "%";
  div.append(equation);
}

// GO RAINDROP

function goDrop() {
  let up;
  ++id;
  const currentId = id;
  let min, max;
  if (score <= 150) {
    min = 0;
    max = 10;
  }
  if (score > 150 && score <= 450) {
    min = 0;
    max = 12;
  }
  if (score > 450) {
    min = 0;
    max = 15;
  }
  const equation = getRandomEquation(min, max);
  const bonus = dropsCount % 10 === 0;
  dropsCount++;
  createDrop(equation, currentId, bonus);

  function removeDrop() {
    const element = document.getElementById(currentId);
    if (element) {
      element.classList.add("boom");
      setTimeout(() => element.remove(), 100);
      arrayResult.splice(0, 1);
      waveHeight.style.height = up;
      errors++;
      score -= count;
      if ( score <= 0 ) {
        score = 0;
        };
      scoreTable.textContent = score;
      falseSong.play();
    }
  }
  if (errors == 0) {
    setTimeout(() => {
      up = "20%";
      removeDrop();
    }, 6800);
  }
  if (errors == 1) {
    setTimeout(() => {
      up = "30%";
      removeDrop();
    }, 5000);
    clearInterval(startOne);
    startGame();
  }
  if (errors == 2) {
   timer = setTimeout(() => {
      up = "40%";
      removeDrop();
    }, 4000);
    clearInterval(startOne);
    startGame();
  }
  if (errors == 3) {
    clearInterval(startOne);
    clearTimeout(timer);
    gameOver();
  }
  arrayResult.push({ equation: eval(equation), isBonus: bonus });
}

// START GAME

function startGame() {
  if (errors == 0) {
    setTimeout(goDrop, 1500);
    startOne = setInterval(goDrop, 7000);
  } else if (errors == 1) {
    startOne = setInterval(goDrop, 4000);
  } else if (errors == 2){
    startOne = setInterval(goDrop, 2000);
  }
}

// CHECK THE RESULT (TRUE OR FALSE)

function enterNumber() {
  if (arrayResult[0].equation == result.textContent) {
    if (!arrayResult[0].isBonus) {
      arrayResult.splice(0, 1);
      drop.firstChild.classList.add("boom");
      setTimeout(() => drop.firstChild.remove(), 100);
    } else {
      count += 9;
      arrayResult = [];
      for (let i = 0; i < drop.childNodes.length; i++) {             
        drop.childNodes[i].classList.add("boom");
      }
      setTimeout(() => {
        while (drop.firstChild) {
          drop.firstChild.remove();
        }
      }, 100);
    }
    score = count + score;
    count++;
    scoreTable.textContent = score;
    result.textContent = "0";
    trueSong.play();
    trueAnswer++;
   } else {
     falseSong.play();
   }
}

// ADD ENTER FROM KEYBOARD

function addKeyBoard(e) {
  if (result.textContent.length > 5) {
    return result.textContent;
  }
  const zero = result.textContent === "0";
  if (e.which == 49) {
    if (zero) {
      result.textContent = "1";
    } else {
      result.textContent += "1";
    }
  }
  if (e.which == 50) {
    if (zero) {
      result.textContent = "2";
    } else {
      result.textContent += "2";
    }
  }
  if (e.which == 51) {
    if (zero) {
      result.textContent = "3";
    } else {
      result.textContent += "3";
    }
  }
  if (e.which == 52) {
    if (zero) {
      result.textContent = "4";
    } else {
      result.textContent += "4";
    }
  }
  if (e.which == 53) {
    if (zero) {
      result.textContent = "5";
    } else {
      result.textContent += "5";
    }
  }
  if (e.which == 54) {
    if (zero) {
      result.textContent = "6";
    } else {
      result.textContent += "6";
    }
  }
  if (e.which == 55) {
    if (zero) {
      result.textContent = "7";
    } else {
      result.textContent += "7";
    }
  }
  if (e.which == 56) {
    if (zero) {
      result.textContent = "8";
    } else {
      result.textContent += "8";
    }
  }
  if (e.which == 57) {
    if (zero) {
      result.textContent = "9";
    } else {
      result.textContent += "9";
    }
  }
  if (e.which == 48) {
    if (zero) {
      result.textContent = "0";
    } else {
      result.textContent += "0";
    }
  }
  if (e.which == 46) {
    clearScreen();
  }
  if (e.which == 8) {
    deleteNumber();
  }
  if (e.which == 13) {
    enterNumber();
  }
}

function gameOver() {
  clearInterval(startOne);
  clearTimeout(timer);
  setTimeout(() => {
    game_over.style.display = "block";
    start.style.display = "none";
    allScore.textContent = score;
    totalEquations.textContent = dropsCount - 2;
    totalAnswer.textContent = trueAnswer;
  }, 100);
}

function anewGame() {
  game_over.style.display = "none";
  wrapperFirstPage.style.display = "block";
  location.reload();
}

// AUTO PLAY GAME

function autoEnterResult() {
  if(arrayResult[0]){
    if(dropsCount%6 == 0) {
      result.textContent = 122;
      setTimeout(clearScreen, 3000);
    }
    else {
  result.textContent = arrayResult[0].equation;
  setTimeout(clearScreen, 1000);
}}
}

function onAutoPlay() {
  startGame();
  setTimeout(function autoPlay() {
    setTimeout(autoEnterResult, 4500);
    if (arrayResult[0]) {
    enterNumber();
    };
    setTimeout(autoPlay, 5000);
  }, 2500);
}

numbersBtn.forEach((number) => number.addEventListener("click", resultScreen));
clearBtn.addEventListener("click", clearScreen);
deleteBtn.addEventListener("click", deleteNumber);
enterBtn.addEventListener("click", enterNumber);
window.addEventListener("click", addFullScreen);
window.addEventListener("keyup", addKeyBoard);
