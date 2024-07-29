let boxes = document.querySelectorAll(".box");
let newGameBtn = document.querySelector("#new_game");
let quitBtn = document.querySelectorAll(".quit");
let resetBtn = document.querySelector("#reset");
let winnerContainer = document.querySelector("#winner_container");
let displayHide = document.querySelector("#display");
let winnerTitle = document.querySelector("#winner_title");

let turn = true;

const winnerPatterns = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

const resetGame = () => {
  turn = true;
  enableBoxes();
  winnerContainer.style.display = "none";
};

newGameBtn.addEventListener("click", resetGame);
resetBtn.addEventListener("click", resetGame);

const disableBoxes = () => {
  for (let box of boxes) {
    box.disabled = true;
  }
};

const enableBoxes = () => {
  for (let box of boxes) {
    box.disabled = false;
    box.innerText = "";
    box.style.color = "#000000cc";
  }
  resetBtn.disabled = false;
};

const showWinner = (winner) => {
  winnerTitle.innerText = `Congratulations! \n Winner is ${winner}`;
  winnerContainer.style.display = "block";
  disableBoxes();
  resetBtn.disabled = true;
};

const checkWinner = () => {
  for (let pattern of winnerPatterns) {
    let position1Value = boxes[pattern[0]].innerText;
    let position2value = boxes[pattern[1]].innerText;
    let position3value = boxes[pattern[2]].innerText;

    if (position1Value != "" && position2value != "" && position3value != "") {
      if (
        position1Value === position2value &&
        position2value === position3value
      ) {
        boxes[pattern[0]].style.color = "red";
        boxes[pattern[1]].style.color = "red";
        boxes[pattern[2]].style.color = "red";
        showWinner(position1Value);
      }
    }
  }
};

boxes.forEach((box) => {
  box.addEventListener("click", () => {
    if (turn) {
      box.innerText = "O";
      turn = false;
    } else {
      box.innerText = "X";
      turn = true;
    }
    box.disabled = true;
    checkWinner();
  });
});
