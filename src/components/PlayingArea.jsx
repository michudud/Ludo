import React, { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import Board from "./Board";
import checkPossibleMoves from "./functions/checkPossibleMoves";
import chooseMove from "./functions/chooseMove";

const PlayingArea = () => {
  const [activePlayers, setActivePlayers] = useState();
  const [moves, setMoves] = useState([]);
  const difficultyLevel = useSelector((state) => state.playersSlice.difficulty);

  const rollRef = useRef(null);
  const diceRef = useRef(null);

  let getPlayers = useSelector((state) => state.playersSlice.players);

  useEffect(
    function loadPlayers() {
      if (getPlayers) {
        setActivePlayers(
          getPlayers.map((a) => {
            return { ...a };
          })
        );
      }
    },
    [getPlayers]
  );

  useEffect(
    function makeAIMove() {
      setTimeout(() => {
        if (activePlayers) {
          if (activePlayers[0].user === "AI") {
            let chceckMoves = checkPossibleMoves(
              [...activePlayers],
              setActivePlayers
            );
            diceRef.current.innerHTML = chceckMoves.dice;

            if (chceckMoves.moves.length > 0) {
              rollRef.current.disabled = true;
              const moveIndex = chooseMove(chceckMoves.moves, difficultyLevel);
              chceckMoves.moves[moveIndex].executeMove();
              rollRef.current.disabled = false;
            }

            let nexTurn = [...activePlayers];
            nexTurn.push(nexTurn.shift());
            setActivePlayers(nexTurn);
          }
        }
      }, "1000");
    },
    [activePlayers]
  );

  if (activePlayers) {
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
                if (activePlayers[0].user === "Player") {
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
                }
              }}
            >
              Roll the Dice
            </button>
            <div className="Dice" ref={diceRef}></div>
          </div>
          <div className="MovesMenu">
            {moves.length > 0 && activePlayers[0].user === "Player"
              ? moves.map((move) => {
                  return (
                    <div className="move-detail" key={move.name}>
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
                    </div>
                  );
                })
              : null}
          </div>
        </div>
      </div>
    );
  }
};

export default PlayingArea;
