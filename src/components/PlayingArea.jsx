import React, { useEffect, useRef, useState } from "react";
import Board from "./Board";
import checkPossibleMoves from "./functions/checkPossibleMoves";

const PlayingArea = () => {
  const [activePlayers, setActivePlayers] = useState([
    {
      color: "red",
      score: 0,
      startPos: 1,
      endPos: 40,
      realEndPos: 40,
      pawn1Pos: "1rs",
      pawn2Pos: "2rs",
      pawn3Pos: "3rs",
      pawn4Pos: "4rs",
    },
    {
      color: "green",
      score: 0,
      startPos: 11,
      endPos: 10,
      realEndPos: 50,
      pawn1Pos: "1gs",
      pawn2Pos: "2gs",
      pawn3Pos: "3gs",
      pawn4Pos: "4gs",
    },
    {
      color: "yellow",
      score: 0,
      startPos: 21,
      endPos: 20,
      realEndPos: 60,
      pawn1Pos: "1ys",
      pawn2Pos: "2ys",
      pawn3Pos: "3ys",
      pawn4Pos: "4ys",
    },
    {
      color: "blue",
      score: 0,
      startPos: 31,
      endPos: 30,
      realEndPos: 70,
      pawn1Pos: "1bs",
      pawn2Pos: "2bs",
      pawn3Pos: "3bs",
      pawn4Pos: "4bs",
    },
  ]);

  const [moves, setMoves] = useState([]);

  const rollRef = useRef(null);
  const diceRef = useRef(null);

  return (
    <div className="PlayingArea">
      <Board activePlayers={activePlayers} />
      <div className="PlayMenu">
        <div className="Controls">
          <p
            style={{
              backgroundColor: activePlayers[0].color,
            }}
          >
            Current Player
          </p>
          <button
            ref={rollRef}
            onClick={() => {
              let chceckMoves = checkPossibleMoves(
                [...activePlayers],
                setActivePlayers
              );
              diceRef.current.innerHTML = chceckMoves.dice;
              setMoves(chceckMoves.moves);

              if (chceckMoves.moves.length === 0) {
                let nexTurn = [...activePlayers];
                nexTurn.push(nexTurn.shift());
                setActivePlayers(nexTurn);
              } else {
                rollRef.current.disabled = true;
              }
            }}
          >
            Roll the Dice
          </button>
          <div className="Dice" ref={diceRef}></div>
        </div>
        <div className="MovesMenu">
          {moves.length > 0
            ? moves.map((move) => {
                return (
                  <>
                    <p>{move.name}</p>
                    <button
                      onClick={() => {
                        move.executeMove();
                        setMoves([]);
                        let nexTurn = [...activePlayers];
                        nexTurn.push(nexTurn.shift());
                        setActivePlayers(nexTurn);
                        rollRef.current.disabled = false;
                      }}
                    >
                      Execute move
                    </button>
                  </>
                );
              })
            : null}
        </div>
      </div>
    </div>
  );
};

export default PlayingArea;
