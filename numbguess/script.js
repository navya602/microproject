let randomNumber = Math.floor(Math.random() * 100) + 1;
const guesses = document.querySelector('#guesses');
const lastResult = document.querySelector('#message');
const lowOrHi = document.querySelector('.lowOrHi');
const guessSubmit = document.querySelector('#submitGuess');
const guessField = document.querySelector('#guess');
const remainingGuesses = document.querySelector('#remaining');
const newGameButton = document.querySelector('#newGame');
const gameContainer = document.querySelector('.container');

let guessCount = 1;
let remaining = 10;

function checkGuess() {
    const userGuess = Number(guessField.value);

    if (guessCount === 1) {
        guesses.textContent = 'Previous guesses: ';
    }
    guesses.textContent += userGuess + ' ';
    remaining--;
    remainingGuesses.textContent = remaining;

    if (userGuess === randomNumber) {
        lastResult.textContent = 'Congratulations! You guessed it right!';
        lastResult.style.backgroundColor = 'green';
        setGameOver();
    } else if (guessCount === 10) {
        lastResult.textContent = `!!!GAME OVER!!! The number was ${randomNumber}`;
        setGameOver();
    } else {
        lastResult.textContent = 'Wrong!';
        lastResult.style.backgroundColor = 'red';
        if (userGuess < randomNumber) {
            lastResult.textContent += ' Too low.';
        } else if (userGuess > randomNumber) {
            lastResult.textContent += ' Too high.';
        }
    }

    guessCount++;
    guessField.value = '';
    guessField.focus();
}

guessSubmit.addEventListener('click', checkGuess);
guessField.addEventListener('keypress', function(event) {
    if (event.key === 'Enter') {
        checkGuess();
    }
});

function setGameOver() {
    guessField.disabled = true;
    guessSubmit.disabled = true;
    newGameButton.style.display = 'block';
    newGameButton.addEventListener('click', resetGame);
    gameContainer.classList.add('game-over');
}

function resetGame() {
    guessCount = 1;
    remaining = 10;

    const resetParas = document.querySelectorAll('.results p');
    for (const resetPara of resetParas) {
        resetPara.textContent = '';
    }
    guesses.textContent = 'Previous guesses: ';
    remainingGuesses.textContent = remaining;
    lastResult.style.backgroundColor = '';
    guessField.disabled = false;
    guessSubmit.disabled = false;
    newGameButton.style.display = 'none';
    guessField.value = '';
    guessField.focus();
    randomNumber = Math.floor(Math.random() * 100) + 1;
    gameContainer.classList.remove('game-over');
}