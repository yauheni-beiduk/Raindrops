const numbersBtn = document.querySelectorAll('.calc-button-numbers');
const clearBtn = document.getElementById('clear');
const deleteBtn = document.getElementById('delete');
const enterBtn = document.getElementById('enter');
const result = document.getElementById('result');
const song = document.querySelector('.sound');
//Play song
//song.play();


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
    else return  result.textContent = '0';
}

// function btnClick(btns) {
// const btns = document.querySelectorAll(`.calc-button-numbers[data-key="${e.key}"]`)

// }
// btns.forEach(number => number.addEventListener('keypress',  resultScreen ));  

numbersBtn.forEach(number => number.addEventListener('click',  resultScreen ));
clearBtn.addEventListener('click', clearScreen);
deleteBtn.addEventListener('click', deleteNumber);



