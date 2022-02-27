let word = "";
let wordList = ["HELLO", "CRANE", "GHOST", "CHECK", "BLACK", "DOCKS"];
let currentSquare = 0;
let tiles = document.getElementsByClassName("tiles");
let keys = document.getElementsByClassName("btn");
let targetWord = getRandomWord();
let row = 0;
let char;

/* Still to do:
add keyboard functionality
add play again option
dark mode
make on-screen keyboard look better
make on-screen keyboard keys color change too
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
  if (currentSquare % 5 != 0) {
    currentSquare--;
    tiles[currentSquare].textContent = ""; //need to find a way to make this work when they get the word wrong and still can edit the last word
  }
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
  } else if (row < 25) {
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
