const readline = require('readline');

// Initialize readline interface
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
  });

// Initialize global variables
let secretNumber;
// Default amount of attempts if not specified
let numAttempts = 5;

// Finds random number between `min` and `max`
function randomInRange(min, max) {
    // Rounds `min` to next biggest whole number
    min = Math.ceil(Number(min));
    // Rounds `max` to next smallest whole number
    max = Math.floor(Number(max));
    // Returns number within range
    return Math.floor(Math.random() * (max - min + 1) + min);
}

// Checks if guess `n` is the `secretNumber`
function checkGuess(n) {
    // Converts guess `n` String to Number
    n = Number(n);
    if (n > secretNumber) {
        console.log('Too high.');
        return false;
    }
    if (n < secretNumber) {
        console.log('Too low.');
        return false;
    }
    if (n === secretNumber) {
        console.log('Correct!');
        return true;
    }
}
// Asks user how many tries they would like
function askLimit() {
    rl.question('How many tries would you like? ', answer => {
        // If `answer` is blank then `numAttempts` will use default of `5`
        if(answer != undefined){
            // Assigns `answer` to `numAttempts`
            numAttempts = Number(answer);
        }

        askRange();
    });
}


function askRange() {
    // Initialize `max and `min` within function scope
    let max, min;
    rl.question('Enter a max number: ', answer => {
        max = answer;
        rl.question('Enter a min number: ', answer => {
            min = answer;
            // Assigns `secretNumber` to random number within range
            secretNumber = randomInRange(min, max);
            console.log(`You have ${numAttempts} tries to pick the correct number between ${min} and ${max}`)

            askGuess();
        });
    });

}

function askGuess() {
    // Checks if user has guesses left
    if (numAttempts > 0){
        rl.question('Enter a guess: ', answer => {
            // Checks if `answer` matches `secretNumber`
            let check = checkGuess(answer);
            // If `answer` is a match, closes readline interface
            if (check) {
                rl.close();
            } else {
                // Decreases amount of attempts left
                numAttempts--;
                askGuess();
            }
        });
    } else {
        // Ends game if user runs out of attempts
        console.log("You Lose!");
        rl.close();
    }
}

askLimit();
