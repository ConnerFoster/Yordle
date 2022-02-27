let word = "";
let wordList = ["HELLO", "CRANE", "GHOST", "CHECK", "BLACK", "DOCKS"];
let currentSquare = 0;
let tiles = document.getElementsByClassName("tiles");
let keys = document.getElementsByClassName("btn");
let targetWord = getRandomWord();
let row = 0;
let char;

let currentRow = 0;

/* Still to do:
Make Modal for when game is over
add play again option
make on-screen keyboard look better
make on-screen keyboard keys color change too
add full word lists 
keyboard right size on mobile
*/

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
  if (currentSquare < currentRow * 5) {
    currentSquare = currentRow * 5;
  }
  tiles[currentSquare].textContent = "";
}

function ent() {
  if (word.length < 5) {
    alert("Too short a word");
  } else if (!wordList.includes(word)) {
    alert("Not in word list");
  } else {
    wordCheck();
  }
}

function wordCheck() {
  if (word == targetWord) {
    for (let i = 0; i < 5; i++) {
      tiles[row + i].classList.add("green");
    }
    alert("You Win!");
    location.reload();
  } else {
    for (let i = 0; i < 5; i++) {
      if (word[i] == targetWord[i]) {
        tiles[row + i].classList.add("green");
      } else if (targetWord.includes(word[i])) {
        tiles[row + i].classList.add("yellow");
      } else {
        tiles[row + i].classList.add("gray");
      }
    }
    row += 5;
    word = "";
    currentRow++;
  }
  if (row == 30) {
    console.log("The Word was : " + targetWord);
  }
}

function getRandomWord() {
  return wordList[Math.floor(Math.random() * wordList.length)];
}

document.addEventListener("keydown", (e) => {
  char = e.key;
  if (char.length === 1 && /[a-zA-Z]/.test(char)) {
    input(char.toUpperCase());
  } else if (char == "Enter") {
    ent();
  } else if (char == "Backspace") {
    del();
  } else {
    console.log("Error w/ Keyboard Input");
  }
});

function gameOver(result) {}
