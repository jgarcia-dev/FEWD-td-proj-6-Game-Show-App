const overlay = document.getElementById('overlay');
const qwerty = document.getElementById('qwerty');
const phraseUL = document.getElementById('phrase').firstElementChild;
const startButton = document.querySelector('.btn__reset');
let missed = 0;
const phrases = ["why so serious", "hasta la vista baby", "may the force be with you", "hulk smash", "just keep swimming"];

// return a random phrase from an array
const getRandomPhraseAsArray = arr => {
    const randIndex = Math.floor( Math.random() * arr.length );
    return phrases[randIndex];
}

// adds the allLetters of a string to the display
const addPhraseToDisplay = arr => {
    for (let i = 0; i < arr.length; i += 1) {
        const currChar = arr[i];
        const li = document.createElement('li');
        li.textContent = currChar;
        if (currChar != ' ') {
            li.className = 'letter';
        } else if (currChar === ' ') {
            li.className = 'space';
        }
        phraseUL.appendChild(li);
    }
}

// check if a letter is in the phrase
const checkLetter = button => {
    const letterLIs = phraseUL.children;
    let match = null;
    for (let i = 0; i < letterLIs.length; i += 1) {
        const li = letterLIs[i];
        if (button.textContent === li.textContent) {
            li.classList.add('show');
            match = button.textContent;
        }
    }
    return match;
}

// check if the game has been won or lost
const checkWin = () => {
    const shownLetters = phraseUL.getElementsByClassName('show');
    const allLetters = phraseUL.getElementsByClassName('letter');
    if (shownLetters.length === allLetters.length) {
        overlay.classList.remove('start');
        overlay.classList.add('win');
        overlay.firstElementChild.textContent = "You Won!"
        overlay.style.display = 'flex';
        startButton.textContent = 'Reset Game';
    } else if (missed === 5) {
        overlay.classList.remove('start');
        overlay.classList.add('lose');
        overlay.firstElementChild.textContent = "Sorry, you lose"
        overlay.style.display = 'flex';
        startButton.textContent = 'Reset Game';
    }
}

// listen for the start game button to be pressed
startButton.addEventListener('click', () => {
    if (startButton.textContent === 'Start Game') {
        overlay.style.display = 'none';
    } else if (startButton.textContent === 'Reset Game') {
        resetGame();
    }
});

// listen for the onscreen keyboard to be clicked
qwerty.addEventListener('click', e => {
    const element = e.target; 
    scoreboardOL = document.getElementById('scoreboard').firstElementChild;
    const hearts = scoreboardOL.children;
    if (element.tagName === 'BUTTON') {
        element.className = 'chosen';
        element.disabled = true;
        const letterFound = checkLetter(element);
        if (letterFound === null) {
            hearts[missed].firstElementChild.src = 'images/lostHeart.png';
            missed += 1;
        }
        checkWin();
    }
});

// resets the current game
const resetGame = () => {
    const pressedButtons = qwerty.querySelectorAll('.chosen');
    // Remove phrase letters
    while (phraseUL.hasChildNodes()) {
        phraseUL.removeChild(phraseUL.lastChild);
    }
    // Add new phrase
    const newPhraseArray = getRandomPhraseAsArray(phrases);
    addPhraseToDisplay(newPhraseArray);
    // Reset qwerty buttons
    for (let i = 0; i < pressedButtons.length; i += 1) {
        pressedButtons[i].disabled = false;
        pressedButtons[i].className = "";
    }
    // Reset hearts
    scoreboardOL = document.getElementById('scoreboard').firstElementChild;
    const hearts = scoreboardOL.children;
    for (let i = 0; i < hearts.length; i += 1) {
        hearts[i].firstElementChild.src = 'images/liveHeart.png';
    }

    missed = 0;
    overlay.style.display = 'none'
}


const phraseArray = getRandomPhraseAsArray(phrases);
addPhraseToDisplay(phraseArray);




