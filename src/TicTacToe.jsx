import React, { useState } from "react";
import "./TicTacToe.css";

export default function TicTacToe() {

  const [board, setBoard] = useState(Array(9).fill(""));
  const [currentPlayer, setCurrentPlayer] = useState("X");
  const [winner, setWinner] = useState(null);

  const winningCombinations = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
  ];

  const handleClick = (index) => {

    if (board[index] !== "" || winner) {
      return;
    }

    const newBoard = [...board];
    newBoard[index] = currentPlayer;

    setBoard(newBoard);

    // Check winner
    const isWinner = winningCombinations.some((combination) => {
      return combination.every((i) => newBoard[i] === currentPlayer);
    });

    if (isWinner) {
      setWinner(currentPlayer);
    } 
    else if (newBoard.every((cell) => cell !== "")) {
      setWinner("Draw");
    } 
    else {
      setCurrentPlayer(currentPlayer === "X" ? "O" : "X");
    }
  };

  // Restart game
  const restartGame = () => {
    setBoard(Array(9).fill(""));
    setCurrentPlayer("X");
    setWinner(null);
  };

  return (
    <div className="game-container">

      <h1>XO Game</h1>

      <h3>
        {winner
          ? winner === "Draw"
            ? "Game Draw!"
            : `Winner is ${winner}!`
          : `Player ${currentPlayer}'s Turn`}
      </h3>

      <div className="board">
        {board.map((value, index) => (
          <button
            key={index}
            className="cell"
            onClick={() => handleClick(index)}
          >
            {value}
          </button>
        ))}
      </div>

      <button className="restart-btn" onClick={restartGame}>
        Restart Game
      </button>

    </div>
  );
}
