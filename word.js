const Letter = require('./letter');

class Word {
  constructor(arrChar){
    
  //create array of objects using Letter
    this._arrChar = arrChar.split('').map(char => char = new Letter(char)); 
  }

  //concat all values into a string
  makeWord() { 
    let str = '';
    this._arrChar.forEach(char => str += ` ${char.isGuessed()}`);
    return str;
  }

//call method from Letter for each array value
  checkChar(char) { 
    this._arrChar.forEach(itemChar => itemChar.isInWord(char));
  }
};

module.exports = Word;