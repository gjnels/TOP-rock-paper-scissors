"use strict";

/*
Rock Paper Scissors

Player goes against the computer for 5 rounds.
For now, this is displayed in the console.
*/

const moves = ["rock", "paper", "scissors"];

// computer move
// choose a random number between 0 and 2 which corresponds to a selection from an array of moves
const computerMove = () => Math.trunc(Math.random() * 3);

// player move
// get input from player on their move choice
// validate player has entered either rock, paper, or scissors
const playerMove = function () {
  let move;
  while (!moves.includes(move)) {
    move = prompt("Enter your move. Choose either Rock, Paper, or Scissors.");
    move = move ? move.toLowerCase() : undefined;
  }
  return moves.indexOf(move);
};

// play a round
// given the index of the moves, compare them to see who wins or if it is a tie
const playRound = function (playerMove, computerMove) {
  if (playerMove === computerMove) {
    return "It's a tie!";
  } else {
    switch (playerMove) {
      case 0:
        switch (computerMove) {
          case 1:
            return "Computer wins!";
          case 2:
            return "You win!";
        }
      case 1:
        switch (computerMove) {
          case 0:
            return "You win!";
          case 2:
            return "Computer wins!";
        }
      case 2:
        switch (computerMove) {
          case 0:
            return "Computer wins!";
          case 1:
            return "You win!";
        }
    }
  }
};

// play game
// takes an integer for the number of turns to play
const game = function (turns) {
  let playerChoice;
  let computerChoice;

  for (let i = 1; i <= turns; i++) {
    playerChoice = playerMove();
    computerChoice = computerMove();

    console.log(`Round ${i}`);
    console.log(`You chose: ${moves[playerChoice]}`);
    console.log(`Computer chose: ${moves[computerChoice]}`);
    console.log(playRound(playerChoice, computerChoice));
  }
};

game(5);
