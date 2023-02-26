import React, { useEffect, useRef, useState } from "react";
import Board from "./Board";
import checkPossibleMoves from "./functions/checkPossibleMoves";

const PlayingArea = () => {
  const [redPlayer, setRedPlayer] = useState({
    color: "red",
    score: 0,
    startPos: 1,
    endPos: 40,
    realEndPos: 40,
    pawn1Pos: "1rs",
    pawn2Pos: "2rs",
    pawn3Pos: "3rs",
    pawn4Pos: "4rs",
  });
  const [greenPlayer, setGreenPlayer] = useState({
    color: "green",
    score: 0,
    startPos: 11,
    endPos: 10,
    realEndPos: 50,
    pawn1Pos: "1gs",
    pawn2Pos: "2gs",
    pawn3Pos: "3gs",
    pawn4Pos: "4gs",
  });
  const [yellowPlayer, setYellowPlayer] = useState({
    color: "yellow",
    score: 0,
    startPos: 21,
    endPos: 20,
    realEndPos: 60,
    pawn1Pos: "1ys",
    pawn2Pos: "2ys",
    pawn3Pos: "3ys",
    pawn4Pos: "4ys",
  });
  const [bluePlayer, setBluePlayer] = useState({
    color: "blue",
    score: 0,
    startPos: 31,
    endPos: 30,
    realEndPos: 70,
    pawn1Pos: "1bs",
    pawn2Pos: "2bs",
    pawn3Pos: "3bs",
    pawn4Pos: "4bs",
  });

  const setPlayerState = {
    red: setRedPlayer,
    green: setGreenPlayer,
    yellow: setYellowPlayer,
    blue: setBluePlayer,
  };

  const [moves, setMoves] = useState([]);
  const [currentPlayer, setCurrentPlayer] = useState(redPlayer);

  const playerCounter = useRef(1);
  const rollRef = useRef(null);
  const diceRef = useRef(null);

  useEffect(() => {
    if (playerCounter.current > 4) {
      playerCounter.current = 1;
    }
    if (playerCounter.current === 1) {
      setCurrentPlayer(redPlayer);
    } else if (playerCounter.current === 2) {
      setCurrentPlayer(greenPlayer);
    } else if (playerCounter.current === 3) {
      setCurrentPlayer(yellowPlayer);
    } else if (playerCounter.current === 4) {
      setCurrentPlayer(bluePlayer);
    }
  }, [playerCounter.current]);

  return (
    <div className="PlayingArea">
      <Board
        activePlayers={[redPlayer, greenPlayer, yellowPlayer, bluePlayer]}
      />
      <div className="PlayMenu">
        <div className="Controls">
          <p
            style={{
              backgroundColor: currentPlayer.color,
            }}
          >
            Current Player
          </p>
          <button
            ref={rollRef}
            onClick={() => {
              let chceckMoves = checkPossibleMoves(
                currentPlayer,
                [redPlayer, greenPlayer, yellowPlayer, bluePlayer],
                setPlayerState
              );
              diceRef.current.innerHTML = chceckMoves.dice;
              setMoves(chceckMoves.moves);

              if (chceckMoves.moves.length === 0) {
                playerCounter.current += 1;
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
                        playerCounter.current += 1;
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
