let word = "";
let wordList = ["hello", "crane", "ghost", "check", "black", "docks"];
let currentSquare = 0;
let tiles = document.getElementsByClassName("tiles");
let targetWord = getRandomWord();
let row = 0;

function input(value) {
  if (word.length < 5) {
    word += value;
    tiles[currentSquare].textContent = value;
    currentSquare++;
  }

  console.log(word);
}

function del() {
  word = word.slice(0, -1);
  currentSquare--;
  tiles[currentSquare].textContent = "";
}

function ent() {
  if (word.length < 5) {
    console.log("Too short a word");
  } else if (!wordList.includes(word)) {
    console.log("Not in word list");
  } else {
    wordCheck();
  }
}

function wordCheck() {
  if (word == targetWord) {
    console.log("You Win");
  } else if (row < 25) {
    for (let i = 0; i < 5; i++) {
      if (word[i] == targetWord[i]) {
        tiles[row + i].classList.add("green");
      } else if (targetWord.includes(word[i])) {
        tiles[row + i].classList.add("yellow");
      }
    }
    row += 5
  }
}

function getRandomWord() {
  return wordList[Math.floor(Math.random() * wordList.length)];
}
