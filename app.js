const qwerty = document.getElementById('qwerty');
const phrase = document.getElementById('phrase');
const startButton = document.querySelector('.btn__reset');
const missed = 0;
const phrases = ["why so serious", "hasta la vista baby", "may the force be with you", "hulk smash", "just keep swimming"];


// return a random phrase from an array
const getRandomPhraseAsArray = arr => {
    const randIndex = Math.floor( Math.random() * arr.length );
    return phrases[randIndex];
}

// adds the letters of a string to the display
const addPhraseToDisplay = arr => {
    for (let i = 0; i < arr.length; i += 1) {
        const char = arr[i];
        li = document.createElement('li');
        li.textContent = char;
        if (char != ' ') {
            li.className = 'letter';
        } else if (char === ' ') {
            li.className = 'space';
        }
        phrase.firstElementChild.appendChild(li);
    }
}

// check if a letter is in the phrase
const checkLetter = button => {
    const checkLetter = phrase.firstElementChild.children;
    let match = null;
    for (let i = 0; i < checkLetter.length; i += 1) {
        li = checkLetter[i];
        if (button.textContent === li.textContent) {
            li.classList.add('show');
            match = button.textContent;
        }
    }
    return match;
}

// check if the game has been won or lost
const checkWin = () => {

}

// listen for the start game button to be pressed
startButton.addEventListener('click', () => {
    const overlay = document.getElementById('overlay');
    overlay.style.display = 'none';
});

// listen for the onscreen keyboard to be clicked
qwerty.addEventListener('click', e => {
    const element = e.target; 
    if (element.tagName === 'BUTTON') {
        element.className = 'chosen';
        element.disabled = 'true';
        const letterFound = checkLetter(element);
    }
});


const phraseArray = getRandomPhraseAsArray(phrases);
addPhraseToDisplay(phraseArray);




