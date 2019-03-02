const inquirer = require('inquirer');
const Word = require('./word');

//function that accapts another function to run by users request 


const again = (fun, val) => { 
  inquirer
    .prompt([
      {
        type: 'confirm',
        name: 'answer',
        message: 'Wanna try again?',
        default: false
      }
    ])
    .then((res) => res.answer ? fun(val) : console.log('It was pleasure to spend time with you'))
    .catch((err) => console.log(err.message));
};

//array of words to guess
let initialWords = ['fullstack', 'coding', 'developer', 'javascript']; 

//recursion function 
const guess = (arr) => {

  let cnt = 5;

//copy array and pick one word rendomly 
  let words = Array.from(arr);
  let oneWord = words[Math.floor(Math.random() * words.length)];
  const guessWord = new Word(oneWord);

  console.log(`\nNumber of attempts left: ${cnt}\n`);

  //declare and invoke inner recursion function 
  (askForChar = () => {
    if (cnt > 0) {
      inquirer
        .prompt([
          {
            type: 'input',
            name: 'char',
            message: 'Guess letter!',
            validate: (value) => value.length === 1 && isNaN(parseInt(value)) || 'Use one character at a time, no integers'
          }
        ])
        .then((res) => { 
          oneWord.includes(res.char) ? console.log('Correct!') : console.log('Incorrect!'); 
          cnt -= 1;
          //check if letter is guessed 
          guessWord.checkChar(res.char.toLowerCase()); 
          //show word with guessed letters
          const str = guessWord.makeWord(); 
          console.log(`${str}\n`);

          //checks if all letters are guessed, remove guessed word from copied array
          if (!str.includes('_')) { 
            words.splice(words.indexOf(oneWord), 1);
            if (words.length === 0) {
              console.log(`\nYou guessed all words!`);
            } else {
              console.log(`\nYou guessed it! Next word now!`);

            //if all letters guessed call outer function for another word
              guess(words); 
            }
          } else {
            console.log(`Number of attempts left: ${cnt}\n`);

            //if not all letter guessed call inner function for another try
            askForChar();  
          }
        })
        .catch((err) => console.log(err.message));
    } else {
      console.log(`\nYou lost!`);
      
      //ask user if he/she wants to play again
      again(guess, initialWords);  
    }
  })();
};

guess(initialWords);

