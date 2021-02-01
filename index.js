const readline = require("readline");
const rl = readline.createInterface(process.stdin, process.stdout);

function ask(questionText) {
  return new Promise((resolve, reject) => {
    rl.question(questionText, resolve);
  });
}

let guess = 0;          //Section to create variables that will be reassigned in the function.
let yOrN = 0;
let hOrL = 0;
let max = 100;
let min = 1;
let howManyTries = 0;

start();

async function start() {
  console.log(
    "Let's play a game where you (human) pick a number and I (computer) try to guess it.\n"
  );
  let max = await ask(
    "What do you want the maximum number to be? I will guess numbers between this number and 1.\n "
  );
  console.log("You entered: " + max);
  let secretNumber = await ask(
    "What is your secret number?\nI won't peek, I promise...\n"
  );
  console.log("You entered: " + secretNumber);
  console.log("I will now begin to guess your number. \n");
  while (yOrN !== "Y") {
    howManyTries++;      //counts how many loops to guess number
    max = parseInt(max); // turns max input into an integer

    function guessNum(max, min) {           // function to guess number between min and max
      let guess = Math.floor((max + min) / 2);
      return guess;
    }
    guess = guessNum(max, min);

    let yOrN = await ask(`Is your number ${guess}? Y for Yes or N for No.\n`);

    if (yOrN === "Y") {      //if statement that handles if Y is returned to a guessed number
      console.log(
        `My artificial intellect prevails! It took me ${howManyTries} tries to guess your number. \n` //end of game message
      );
      let playAgain = await ask(
        "Would you like to play again? If you do, type Y. If you don't, type N.\n" //saves variable to restart the game loop
      );
      if (playAgain === "Y") {      //Loops game again if Yes, ends loop and exits if No
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
    if (hOrL === "H") { //adjusts min and max based on hOrL variable input
      min = guess + 1;
    } else {
      max = guess - 1;
    }

    
  }
}
