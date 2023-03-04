import React, { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import Board from "./Board";
import checkPossibleMoves from "./functions/checkPossibleMoves";

const PlayingArea = () => {
  const [activePlayers, setActivePlayers] = useState();
  const [moves, setMoves] = useState([]);

  const rollRef = useRef(null);
  const diceRef = useRef(null);

  let getPlayers = useSelector((state) => state.playersSlice.value);

  useEffect(() => {
    if (getPlayers) {
      setActivePlayers(
        getPlayers.map((a) => {
          return { ...a };
        })
      );
    }
  }, [getPlayers]);

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
  }
};

export default PlayingArea;
