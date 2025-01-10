let answer = Math.floor(Math.random() * 100) + 1;
let computerGuess = Math.floor(Math.random() * 100) + 1;

let left = 1;
let right = 100;
let userAttempts = 0;
let computerAttempts = 0;

console.log(answer);

const userScoreText = document.getElementById("user-score");
const computerScoreText = document.getElementById("computer-score");
let userScore = 0;
let computerScore = 0;

function processUserGuess() {
    const userText = document.getElementById("userText");
    const userGuess = Number(userText.value);
    const response_to_user = document.getElementById("response-to-user");
    const feedback = document.getElementById("feedback");
    const userAttempt = document.getElementById("user-attempt");

    if (isNaN(userGuess) || userGuess < 1 || userGuess > 100) {
        feedback.textContent = 'Please enter a valid number between 1 and 100.';
        return;
    }

    userAttempts++;

    
    if (userGuess === answer && computerGuess === answer) {
        computerAttempts++; 
        feedback.classList.add("displayGameResultDraw");
        feedback.textContent = `It's a DRAW! You and Computer both guessed correctly in ${userAttempts} attempts! The game will restart in 10 seconds.`;
        
        disableInput();
        setTimeout(resetGame, 10000);
        return;
    }

    if (userGuess === answer) {
        response_to_user.textContent = `You guessed ${userGuess}`;
        feedback.classList.add("displayGameResultWin");
        feedback.textContent = `CONGRATULATIONS! You win in ${userAttempts} attempts! The game will restart in 10 seconds.`;

        userScore++;
        userScoreText.textContent = `Your score: ${userScore}`;

        disableInput();
        setTimeout(resetGame, 10000);
        return;
    }

    if (userGuess > answer) {
        response_to_user.textContent = `You guessed ${userGuess}`;
        feedback.textContent = 'Guess LOWER';
    } else {
        response_to_user.textContent = `You guessed ${userGuess}`;
        feedback.textContent = 'Guess HIGHER';
    }

    userAttempt.textContent = `Your attempts: ${userAttempts}`;
    userText.value = "";

    setTimeout(getComputerGuess, 500);
}


function getComputerGuess() {
    computerAttempts++;

    const computerAttempt = document.getElementById("computer-attempt");
    const computerFeedback = document.getElementById("computer-feedback");

    computerAttempt.textContent = `Computer's attempts: ${computerAttempts}`;
    computerFeedback.textContent = `Computer guessed ${computerGuess}`;

    if (computerGuess === answer) {

        feedback.classList.add("displayGameResultLose");
        feedback.textContent = `YOU LOSE! Computer wins in ${computerAttempts} attempts! The game will restart in
        10 seconds.`;

        computerFeedback.textContent = `Computer guessed ${computerGuess}.`;

        computerScore++;
        computerScoreText.textContent = `Computer score: ${computerScore}`;

        disableInput();
        setTimeout(resetGame,10000);
    } else if (computerGuess > answer) {
        right = computerGuess - 1;
        computerGuess = Math.floor((left + right) / 2);
    } else if (computerGuess < answer) {
        left = computerGuess + 1;
        computerGuess = Math.floor((left + right) / 2);
    }

    
}

function resetGame() {
    answer = Math.floor(Math.random() * 100) + 1;
    left = 1;
    right = 100;
    computerGuess = Math.floor((left + right) / 2);
    userAttempts = 0;
    computerAttempts = 0;

    feedback.classList.remove("displayGameResultWin");
    feedback.classList.remove("displayGameResultLose");
    feedback.classList.remove("displayGameResultDraw");

    document.getElementById("user-attempt").textContent = '';
    document.getElementById("computer-attempt").textContent = '';

    document.getElementById("response-to-user").textContent = '';
    document.getElementById("feedback").textContent = '';
    document.getElementById("computer-feedback").textContent = '';
}

function disableInput() {
    const userText = document.getElementById("userText");
    const submitButton = document.querySelector("button[type='submit']");

    userText.disabled = true;
    submitButton.disabled = true;

    setTimeout(() => {
        userText.disabled = false;
        submitButton.disabled = false;
    }, 10000);
}
