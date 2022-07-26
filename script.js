"use strict";

/*
Rock Paper Scissors

Player goes against the computer for 5 rounds.
For now, this is displayed in the console.
*/

const moves = ["rock", "paper", "scissors"];
const winningScore = 5;
let gameOver = false;

const resultsElement = document.querySelector(".results");
const roundElement = document.createElement("p");
const playerMoveElement = document.createElement("p");
const computerMoveElement = document.createElement("p");
const roundResultElement = document.createElement("p");
const scoreElement = document.createElement("p");

resultsElement.appendChild(roundElement);
resultsElement.appendChild(playerMoveElement);
resultsElement.appendChild(computerMoveElement);
resultsElement.appendChild(roundResultElement);
resultsElement.appendChild(scoreElement);

let round = 0;
let score = [0, 0];

// computer move
// choose a random number between 0 and 2 which corresponds to a selection from an array of moves
const generateComputerMove = () => Math.trunc(Math.random() * 3);

// get round results depending on the moves
// given the index of the moves, compare them to see who wins or if it is a tie
// returns 'tie', 'player', or 'computer'
const getRoundResults = function (playerMove, computerMove) {
  if (playerMove === computerMove) {
    return "tie";
  } else {
    switch (playerMove) {
      case 0:
        switch (computerMove) {
          case 1:
            return "computer";
          case 2:
            return "player";
        }
      case 1:
        switch (computerMove) {
          case 0:
            return "player";
          case 2:
            return "computer";
        }
      case 2:
        switch (computerMove) {
          case 0:
            return "computer";
          case 1:
            return "player";
        }
    }
  }
};

// play game
// takes an integer for the number of turns to play
function playRound(e) {
  if (gameOver) return; // the game is over, so nothing else can happen

  // update the round number
  round++;

  // get the moves and round result
  const playerMove = +e.target.dataset.move; // get the player move from the data attribute of the button
  const computerMove = generateComputerMove(); // generate a random move for the computer
  const result = getRoundResults(playerMove, computerMove);

  // update the score
  if (result === "player") score[0]++;
  if (result === "computer") score[1]++;

  // check for a winner
  const winner = score.findIndex((score) => score === winningScore);
  if (winner >= 0) {
    // there is a player with a winning score
    gameOver = true; // mark the game as ended so the buttons do nothing

    // create the final outcome elements
    const winnerElement = document.createElement("p");
    winnerElement.textContent = `${
      winner ? "Computer has" : "You have"
    } won the game in ${round} rounds!`;
    scoreElement.textContent = `Final score: You - ${score[0]} | Computer - ${score[1]}`;

    // replace the elements from the results div with the outcome and final score
    resultsElement.replaceChildren(winnerElement);
    resultsElement.appendChild(scoreElement);
    return; // prevent the rest of the function from running when there is a winner
  }

  // update the results elements
  roundElement.textContent = `Round ${round}`;
  playerMoveElement.textContent = `You chose: ${moves[playerMove]}`;
  computerMoveElement.textContent = `Computer chose: ${moves[computerMove]}`;
  roundResultElement.textContent =
    result === "tie"
      ? "It's a tie!"
      : `Winner: ${result === "player" ? "You!" : "Computer"}`;
  scoreElement.textContent = `Score: You - ${score[0]} | Computer - ${score[1]}`;
}

// add event listeners to the player move buttons
const moveBtns = document.querySelectorAll("button.move");
moveBtns.forEach((btn) => {
  btn.addEventListener("click", playRound);
});
