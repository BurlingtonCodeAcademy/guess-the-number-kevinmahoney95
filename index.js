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
// beginning min and max, to be changed within function, as well as initially assigning variables for guess, YorN, and HorL, which decided if while loop runs

// function to guess a number between the max and min
// must figure out how to get variables to reassign inside if else

start();

async function start() {
  console.log(
    "Let's play a game where you (human) pick a number and I (computer) try to guess it.\n"
  );
  let max = await ask(
    "What do you want the maximum number to be? I will guess numbers between this number and 1."
  );
  console.log("You entered: " + max);
  let secretNumber = await ask(
    "What is your secret number?\nI won't peek, I promise...\n"
  );
  console.log("You entered: " + secretNumber);
  console.log("I will now begin to guess your number. \n");
  while (YorN !== "Y") {
    max = parseInt(max); // converts max input to an integer

    function guessNum(max, min) {
      let guess = Math.floor((max + min) / 2); //function to return a smart guess b/t the min and max
      return guess;
    }
    guess = guessNum(max, min);

    // main while loop that runs as long as Y has not been returned
    let YorN = await ask(`Is your number ${guess}? Y for Yes or N for No.\n `); //determines if loop will continue
    // will be altered in if else
    if (YorN === "Y") {
      console.log("My artificial intellect prevails!");
      process.exit(); //end of game
    } else {
      HorL = await ask(
        "Is your number higher or lower than my guess? H for Higher or L for Lower. \n" //logs High or Low, dictates how range is adjusted
      );
    }
    if (HorL === "H") {
      min = guess + 1;
    } else {
      max = guess - 1;
    }
  }

  process.exit();
}
