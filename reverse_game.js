const readline = require("readline");
const rl = readline.createInterface(process.stdin, process.stdout);

function ask(questionText) {
  return new Promise((resolve, reject) => {
    rl.question(questionText, resolve);
  });
}

let randNum = 0; //create variables to be used in loop
let guess = 1;

start();

function randomInt(min, max) { //function to generate a random number
  let range = max - min + 1;
  let randNum = Math.floor(Math.random() * range) + min;
  return randNum;
}
randNum = randomInt(1, 100);

async function start() {
  console.log(
    "How about I (the computer) pick a number between 1 and 100, and you (the human) try to guess it.\nGuess a number, and I will tell you if you are high or low."
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
