import React, { useState } from "react";
import BoardField from "./BoardField";

const Board = ({ activePlayers, winners, numberOfPlayers }) => {
  const [board, setBoard] = useState([
    [0, 0, 0, 0, 9, 10, 11, 0, 0, 0, 0],
    [0, "2rs", "3rs", 0, 8, "1gf", 12, 0, "3gs", "2gs", 0],
    [0, "1rs", "4rs", 0, 7, "2gf", 13, 0, "4gs", "1gs", 0],
    [0, 0, 0, 0, 6, "3gf", 14, 0, 0, 0, 0],
    [1, 2, 3, 4, 5, "4gf", 15, 16, 17, 18, 19],
    [40, "1rf", "2rf", "3rf", "4rf", 100, "4yf", "3yf", "2yf", "1yf", 20],
    [39, 38, 37, 36, 35, "4bf", 25, 24, 23, 22, 21],
    [0, 0, 0, 0, 34, "3bf", 26, 0, 0, 0, 0],
    [0, "1bs", "4bs", 0, 33, "2bf", 27, 0, "4ys", "1ys", 0],
    [0, "2bs", "3bs", 0, 32, "1bf", 28, 0, "3ys", "2ys", 0],
    [0, 0, 0, 0, 31, 30, 29, 0, 0, 0, 0],
  ]);

  let allPlayers;
  if (winners.length < numberOfPlayers) {
    allPlayers = activePlayers.concat(winners);
  } else {
    allPlayers = winners;
  }

  return (
    <div className="Board">
      {board.map((row, rowIndex) =>
        row.map((coll, collIndex) => {
          let pawnsOnField = [];

          for (let i = 0; i < allPlayers.length; i++) {
            for (let j = 1; j <= 4; j++) {
              let currPawn = "pawn" + j + "Pos";
              if (allPlayers[i][currPawn] === coll) {
                pawnsOnField.push(allPlayers[i].color);
              }
            }
          }

          return (
            <BoardField
              key={rowIndex + "_" + collIndex}
              field={coll}
              pawnsOnField={pawnsOnField}
            />
          );
        })
      )}
    </div>
  );
};

export default Board;
