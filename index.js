const readline = require("readline");
const rl = readline.createInterface(process.stdin, process.stdout);

function ask(questionText) {
  return new Promise((resolve, reject) => {
    rl.question(questionText, resolve);
  });
}

let guess = 0;
let YorN = 0;
let HorL = 0;
let max = 100;
let min = 1;
let howManyTries = 0;

start();

async function start() {
  console.log(
    "Let's play a game where you (human) pick a number and I (computer) try to guess it.\n"
  );
  let max = await ask(
    "What do you want the maximum number to be? I will guess numbers between this number and 1. "
  );
  console.log("You entered: " + max);
  let secretNumber = await ask(
    "What is your secret number?\nI won't peek, I promise...\n"
  );
  console.log("You entered: " + secretNumber);
  console.log("I will now begin to guess your number. \n");
  while (YorN !== "Y") {
    howManyTries++;
    max = parseInt(max);

    function guessNum(max, min) {
      let guess = Math.floor((max + min) / 2);
      return guess;
    }
    guess = guessNum(max, min);

    let YorN = await ask(`Is your number ${guess}? Y for Yes or N for No.\n`);

    if (YorN === "Y") {
      console.log(
        `My artificial intellect prevails! It took me ${howManyTries} tries to guess your number. `
      );
      let playAgain = await ask(
        "Would you like to play again? If you do, type Y. If you don't, type N."
      );
      if (playAgain === "Y") {
        console.log("Great!\n");
        return start();
      } else {
        process.exit();
      }
    } else {
      HorL = await ask(
        "Is your number higher or lower than my guess? H for Higher or L for Lower. \n"
      );
    }
    if (HorL === "H") {
      min = guess + 1;
    } else {
      max = guess - 1;
    }
  }
}
