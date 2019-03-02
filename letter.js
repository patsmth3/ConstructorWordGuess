class Letter {
    constructor(char) {
      this._char = char;
      this._guessed = false;
    }
  
    isGuessed() {

      //show guessed letter
      return this._guessed ? this._char : '_';  
    }
  
    isInWord(guessedChar) {
      
      //show guessed letter
      this._char === guessedChar ? this._guessed = true : undefined; 
    }
  
  };
  
  module.exports = Letter;