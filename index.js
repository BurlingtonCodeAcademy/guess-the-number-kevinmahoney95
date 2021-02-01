const readline = require("readline");
const rl = readline.createInterface(process.stdin, process.stdout);

function ask(questionText) {
  return new Promise((resolve, reject) => {
    rl.question(questionText, resolve);
  });
}

start();

async function start() {
  let whichGame = await ask( //stores which game the user wants to play
    'Do you (human) want to pick a number to guess, or should I (computer) pick a number for you (human) to guess?\nIf you want to pick a number, enter "1". If you want the computer to pick a number, enter "2".\n'
  );
  if (whichGame == 1) { //if else to determine which game is executed
    let guess = 0; //Section to create variables that will be reassigned in the function.
    let yOrN = 0;
    let hOrL = 0;
    let max = 100;
    let min = 1;
    let howManyTries = 0;
    let whichGame = 0;

    start();
    async function start() {
      console.log(
        "Let's play a game where you (human) pick a number and I (computer) try to guess it.\n"
      );
      let max = await ask(
        "What do you want the maximum number to be? I will guess numbers between this number and 1.\n"
      );
      console.log("You entered: " + max);
      let secretNumber = await ask(
        "What is your secret number?\nI won't peek, I promise...\n"
      );
      console.log("You entered: " + secretNumber);
      console.log("I will now begin to guess your number. \n");
      while (yOrN !== "Y") {
        howManyTries++; //counts how many loops to guess number
        max = parseInt(max); // turns max input into an integer

        function guessNum(max, min) {// function to guess number between min and max
          let guess = Math.floor((max + min) / 2);
          return guess;
        }
        guess = guessNum(max, min);

        let yOrN = await ask(
          `Is your number ${guess}? Y for Yes or N for No.\n` //asks if the number returned by the guessNum function is the users number
        );

        if (yOrN === "Y") {//if statement that handles if Y is returned to a guessed number
          console.log(
            `My artificial intellect prevails! It took me ${howManyTries} tries to guess your number. \n` //end of game message
          );
          let playAgain = await ask(
            "Would you like to play again? If you do, type Y. If you don't, type N.\n" //saves variable to restart the game loop
          );
          if (playAgain === "Y") {//Loops game again if Yes, ends loop and exits if No
            console.log("Great!\n");
            return start();
          } else {
            process.exit();
          }
        } else {
          hOrL = await ask(
            "Is your number higher or lower than my guess? H for Higher or L for Lower. \n"
          );
        }
        if (hOrL === "H") {//adjusts min and max based on hOrL variable input
          min = guess + 1;
        } else {
          max = guess - 1;
        }
      }
    }
  } else if (whichGame == 2) {
    let randNum = 0; //create variables to be used in loop
    let guess = 1;

    start();

    function randomInt(min, max) {//function to generate a random number
      let range = max - min + 1;
      let randNum = Math.floor(Math.random() * range) + min;
      return randNum;
    }
    randNum = randomInt(1, 100);

    async function start() {
      console.log(
        "How about I (the computer) pick a number between 1 and 100, and you (the human) try to guess it.\nGuess a number, and I will tell you if you are high or low.\n"
      );
      while (randNum !== guess) {
        let guess = await ask("What is your guess? "); //Stores guess

        if (randNum == guess) {
          console.log("Congratulations! You guessed correctly!"); //Returns if number is guessed correctly. Game ends.
          process.exit();
        } else if (randNum > guess) {
          console.log(`Your guess of ${guess} is too low!\n`); //Returns if guess is lower than randNum
        } else if (randNum < guess) {
          console.log(`Your guess of ${guess} is too high!\n`); //Returns if guess is higher than randNum
        }
      }
    }
  }
}
