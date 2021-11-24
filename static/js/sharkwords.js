const ALPHABET = 'abcdefghijklmnopqrstuvwxyz';
const WORDS = [
  'strawberry',
  'orange',
  'apple',
  'banana',
  'pineapple',
  'kiwi',
  'peach',
  'pecan',
  'eggplant',
  'durian',
  'peanut',
  'chocolate',
];

// numWrong       - stores number of wrong guesses
// correctGuesses - number of correct guesses
let numWrong = 0;
let correctGuesses = 0;

// Loop over the chars in `word` and create divs.
//
const createDivsForChars = word => {
  // storing id:word-container in wordContainer
  const wordContainer = document.querySelector('#word-container');
  // for each letter in the word, add HTML to create divs. 
  for (const letter of word) {
    wordContainer.insertAdjacentHTML('beforeend', `<div class="letter-box ${letter}"></div>`);
  }
};


// Loop over each letter in `ALPHABET` and generate buttons.
//
const generateLetterButtons = () => {
  // stores #letter-buttons id in letterButtonContainer
  const letterButtonContainer = document.querySelector('#letter-buttons');
  // for each character in the alphabet, add a button
  for (const char of ALPHABET) {
    letterButtonContainer.insertAdjacentHTML('beforeend', `<button>${char}</button>`);
  }
};

// Set the `disabled` property of `buttonEl` to `true.
//
// `buttonEl` is an `HTMLElement` object.
//
const disableLetterButton = buttonEl => {
  buttonEl.disabled = true;
};

const disableAllButtons = () => {
  const buttons = document.querySelectorAll('button');

  for (const button of buttons) {
    button.disabled = true;
  }
};

// Return `true` if `letter` is in the word.
//
const isLetterInWord = letter => document.querySelector(`div.${letter}`) !== null;

// Called when `letter` is in word. Update contents of divs with `letter`.
//
const handleCorrectGuess = (letter, word) => {
  const correctLetters = document.querySelectorAll(`div.${letter}`);

  for (const div of correctLetters){
    div.innerHTML = letter;
    correctGuesses += 1;
  }
  const wordLength = word.length;
  if (correctGuesses === wordLength) {
    disableAllButtons();
    document.querySelector('#win').style.display = 'block';
  }

};


//
// Called when `letter` is not in word.
//
// Increment `numWrong` and update the shark image.
// If the shark gets the person (5 wrong guesses), disable
// all buttons and show the "play again" message.

const handleWrongGuess = () => {
  numWrong += 1;
  
  document
    .querySelector('#shark-img img')
    .setAttribute('src', `/static/images/guess${numWrong}.png`);

  if (numWrong === 5) {
    disableAllButtons();
    document.querySelector('#play-again').style.display = 'block';
  }

};

//  Reset game state. Called before restarting the game.
const resetGame = () => {
  window.location = '/sharkwords';
};

// This is like if __name__ == '__main__' in Python
//
(function startGame() 
  {
    // For now, we'll hardcode the word that the user has to guess.
    const word = 'hello';

    createDivsForChars(word);
    generateLetterButtons();

    const buttons = document.querySelectorAll('button')

    for (const button of buttons) 
    {
      button.addEventListener('click', evt => 
      {
        const clickedButton = evt.target;
        disableLetterButton(clickedButton);

        const letter = clickedButton.textContent;

        if (isLetterInWord(letter)) 
        {
          handleCorrectGuess(letter, word);
        }
        else 
        {
          handleWrongGuess(letter);
        }
      });
    }

    document.querySelector('#play-again').addEventListener('click', resetGame);
    document.querySelector('#win').addEventListener('click', resetGame);
  })();

