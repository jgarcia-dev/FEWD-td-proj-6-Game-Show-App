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
    } else if (missed === 5) {
        overlay.classList.remove('start');
        overlay.classList.add('lose');
        overlay.firstElementChild.textContent = "Sorry, you lose"
        overlay.style.display = 'flex';
    }
}

// listen for the start game button to be pressed
startButton.addEventListener('click', () => {
    overlay.style.display = 'none';
});

// listen for the onscreen keyboard to be clicked
qwerty.addEventListener('click', e => {
    const element = e.target; 
    scoreboardOL = document.getElementById('scoreboard').firstElementChild;
    const hearts = scoreboardOL.children;
    if (element.tagName === 'BUTTON') {
        element.className = 'chosen';
        element.disabled = 'true';
        const letterFound = checkLetter(element);
        if (letterFound === null) {
            hearts[missed].firstElementChild.src = 'images/lostHeart.png';
            missed += 1;
        }
        checkWin();
    }
});


const phraseArray = getRandomPhraseAsArray(phrases);
addPhraseToDisplay(phraseArray);




