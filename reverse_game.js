const readline = require("readline");
const rl = readline.createInterface(process.stdin, process.stdout);

function ask(questionText) {
  return new Promise((resolve, reject) => {
    rl.question(questionText, resolve);
  });
}

let randNum = 0
let guess = 1

start()

function randomInt(min, max) {
  let range = max - min + 1;
  let randNum = Math.floor(Math.random()*range) + min;
  return randNum
}
randNum = randomInt(1,100)


async function start() {
  console.log('How about I (the computer) pick a number between 1 and 100, and you (the human) try to guess it.\nGuess a number, and I will tell you if you are high or low.')
  while (randNum !== guess) {
    
    
  let guess = await ask ('What is your guess? ')
  
  if (randNum == guess){
    console.log('Congratulations! You guessed correctly!')
    process.exit()
  } else if (randNum > guess) {
    console.log(`Your guess of ${guess} is too low!`)
  } else if (randNum < guess) {
    console.log(`Your guess of ${guess} is too high!`)
  }
    
  }
}    

    

    


  
