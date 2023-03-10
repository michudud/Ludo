import React, { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import Board from "./Board";
import checkPossibleMoves from "./functions/checkPossibleMoves";
import chooseMove from "./functions/chooseMove";

const PlayingArea = () => {
  const [activePlayers, setActivePlayers] = useState();
  const [moves, setMoves] = useState([]);
  const [continueMsg, setContinueMsg] = useState(false);
  const [winners, setWinners] = useState([]);
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

  useEffect(() => {
    if (activePlayers) {
      makeAIMove();
    }
  }, [activePlayers]);

  const makeAIMove = () => {
    setTimeout(() => {
      if (activePlayers[0].user === "AI") {
        let chceckMoves = checkPossibleMoves(activePlayers);
        diceRef.current.innerHTML = chceckMoves.dice;
        if (chceckMoves.moves.length > 0) {
          rollRef.current.disabled = true;
          const moveIndex = chooseMove(chceckMoves.moves, difficultyLevel);
          nextRound(chceckMoves.moves[moveIndex].executeMove());
          rollRef.current.disabled = false;
        } else {
          nextRound(activePlayers);
        }
      }
    }, "100");
  };

  const nextRound = (nextRoundPlayers) => {
    const nexTurn = [...nextRoundPlayers];
    //if (nexTurn[0].score === 400) {
    //nexTurn.shift();
    //} else {
    nexTurn.push(nexTurn.shift());
    //}
    setActivePlayers(nexTurn);
  };

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
                  let chceckMoves = checkPossibleMoves(activePlayers);
                  diceRef.current.innerHTML = chceckMoves.dice;
                  setMoves(chceckMoves.moves);

                  if (chceckMoves.moves.length === 0) {
                    nextRound(activePlayers);
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
                          const playersAfterMove = move.executeMove();
                          setMoves([]);
                          nextRound(playersAfterMove);
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
        <div className={`continue-msg ${continueMsg ? "" : "closed"}`}>
          Player won
          <button>Continue</button>
          <button>Restart</button>
        </div>
      </div>
    );
  }
};

export default PlayingArea;
