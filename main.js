const fs = require("fs");

let word = "";
let wordList = ["HELLO", "CRANE", "GHOST", "CHECK", "BLACK", "DOCKS"];
let currentSquare = 0;
const tiles = document.getElementsByClassName("tiles");
const keys = document.getElementsByClassName("btn");
const modal = document.getElementById("modal-container");
let targetWord = getRandomWord();
let row = 0;
let char;
let currentRow = 0;

/* Still to do:
Make Modal look better
make play again not just reload page, be able to keep track of wins - losses
make on-screen keyboard look better
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
    modal.style.display = "flex";
  } else {
    for (let i = 0; i < 5; i++) {
      if (word[i] == targetWord[i]) {
        tiles[row + i].classList.add("green");
        updateKeyboardColors(word[i], "green");
      } else if (targetWord.includes(word[i])) {
        tiles[row + i].classList.add("yellow");
        updateKeyboardColors(word[i], "yellow");
      } else {
        tiles[row + i].classList.add("gray");
        updateKeyboardColors(word[i], "gray");
      }
    }
    row += 5;
    word = "";
    currentRow++;
  }
  if (row == 30) {
    console.log("The Word was : " + targetWord);
    document.getElementById("modal-main-text").textContent = "You Lost!🙁";
    modal.style.display = "flex";
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

function gameOver(result) {
  return null;
}

function updateKeyboardColors(letter, color) {
  for (let i = 0; i < 28; i++) {
    if (keys[i].dataset.value == letter) {
      keys[i].classList.add(color);
    }
    if (
      keys[i].classList.contains("yellow") &&
      keys[i].classList.contains("green")
    ) {
      keys[i].classList.remove("yellow");
    }
  }
}

document.getElementById("close-main-modal").addEventListener("click", () => {
  modal.style.display = "none";
});

document.getElementById("play-again").addEventListener("click", () => {
  location.reload();
});
