const checkPossibleMoves = (activePlayers, setActivePlayers) => {
  const diceResult = Math.floor(Math.random() * 6 + 1);

  let availableMoves = [];
  let player = activePlayers[0];
  let otherPlayers = [...activePlayers];
  otherPlayers.shift();

  let otherPlayersPawnScore = [];

  ///count player pawn score
  let pawnScore = 0;
  for (let i = 1; i < 5; i++) {
    let currPawn = "pawn" + i + "Pos";
    if (typeof player[currPawn] === "number") {
      if (player.endPos === 40) {
        pawnScore += player[currPawn];
      } else {
        if (player[currPawn] < player.startPos) {
          pawnScore += player[currPawn] + 40 - player.startPos + 1;
        } else {
          pawnScore += player[currPawn] - player.startPos + 1;
        }
      }
    }
  }
  ///

  ///count other players pawn score
  for (let i = 0; i < otherPlayers.length; i++) {
    let otherPlayerPawnScore = 0;
    for (let j = 1; j < 5; j++) {
      let otherPlayerPawn = "pawn" + j + "Pos";
      if (typeof otherPlayers[i][otherPlayerPawn] === "number") {
        if (otherPlayers[i].endPos === 40) {
          otherPlayerPawnScore += otherPlayers[i][otherPlayerPawn];
        } else {
          if (otherPlayers[i][otherPlayerPawn] < otherPlayers[i].startPos) {
            otherPlayerPawnScore +=
              otherPlayers[i][otherPlayerPawn] +
              40 -
              otherPlayers[i].startPos +
              1;
          } else {
            otherPlayerPawnScore +=
              otherPlayers[i][otherPlayerPawn] - otherPlayers[i].startPos + 1;
          }
        }
      }
    }
    otherPlayersPawnScore.push(otherPlayerPawnScore);
  }
  ///

  /// check possibility to start game by leaving base
  if (diceResult === 6) {
    for (let i = 1; i < 5; i++) {
      let currPawn = "pawn" + i + "Pos";
      if (typeof player[currPawn] === "string") {
        if (player[currPawn].includes("s")) {
          availableMoves.push({
            name: "start with pawn " + i,
            pawn: "pawn" + i,
            moveScore: 5,
            pawnScore: pawnScore,
            pawnScoreAdd: 1,
            executeMove: () => {
              activePlayers[0][currPawn] = player.startPos;
              setActivePlayers(activePlayers);
            },
          });
        }
      }
    }
  }
  ///

  /// check possibility to move pawn
  for (let i = 1; i < 5; i++) {
    let currPawn = "pawn" + i + "Pos";

    if (typeof player[currPawn] === "number") {
      if (player.endPos === 40) {
        if (player[currPawn] + diceResult <= player.realEndPos) {
          if (player[currPawn] === player.startPos) {
            availableMoves.push({
              name: "move pawn " + i + " from start field",
              pawn: "pawn" + i,
              moveScore: 3,
              pawnScore: pawnScore,
              pawnScoreAdd: diceResult,
              executeMove: () => {
                activePlayers[0][currPawn] = player[currPawn] + diceResult;
                setActivePlayers(activePlayers);
              },
            });
          } else {
            availableMoves.push({
              name: "move pawn " + i,
              pawn: "pawn" + i,
              currPose: player[currPawn],
              moveScore: 4,
              pawnScore: pawnScore,
              pawnScoreAdd: diceResult,
              executeMove: () => {
                activePlayers[0][currPawn] = player[currPawn] + diceResult;
                setActivePlayers(activePlayers);
              },
            });
          }
        } else {
          if (player[currPawn] + diceResult - 40 <= 4) {
            let placeInHouse =
              player[currPawn] + diceResult - 40 + player.color[0] + "f";

            let checkForSpace = true;
            for (let j = 1; j < 5; j++) {
              let currPawnCheck = "pawn" + j + "Pos";
              if (player[currPawnCheck] === placeInHouse) {
                checkForSpace = false;
              }
            }
            if (checkForSpace) {
              availableMoves.push({
                name: "enter house with pawn " + i,
                pawn: "pawn" + i,
                moveScore: 8,
                executeMove: () => {
                  activePlayers[0][currPawn] = placeInHouse;
                  activePlayers[0].score = player.score + 100;
                  setActivePlayers(activePlayers);
                },
              });
            }
          }
        }
      } else {
        let pawnCount;
        if (player[currPawn] < player.startPos) {
          pawnCount = player[currPawn] + 40;
        } else {
          pawnCount = player[currPawn];
        }
        if (pawnCount + diceResult <= player.realEndPos) {
          let setPose = player[currPawn] + diceResult;
          if (setPose > 40) {
            setPose -= 40;
          }
          if (player[currPawn] === player.startPos) {
            availableMoves.push({
              name: "move pawn " + i + " from start field",
              pawn: "pawn" + i,
              moveScore: 3,
              pawnScore: pawnScore,
              pawnScoreAdd: diceResult,
              executeMove: () => {
                activePlayers[0][currPawn] = setPose;
                setActivePlayers(activePlayers);
              },
            });
          } else {
            availableMoves.push({
              name: "move pawn " + i,
              pawn: "pawn" + i,
              currPose: player[currPawn],
              moveScore: 4,
              pawnScore: pawnScore,
              pawnScoreAdd: diceResult,
              executeMove: () => {
                activePlayers[0][currPawn] = setPose;
                setActivePlayers(activePlayers);
              },
            });
          }
        } else {
          if (pawnCount + diceResult - player.realEndPos <= 4) {
            let placeInHouse =
              pawnCount +
              diceResult -
              player.realEndPos +
              player.color[0] +
              "f";

            let checkForSpace = true;
            for (let j = 1; j < 5; j++) {
              let currPawnCheck = "pawn" + j + "Pos";
              if (player[currPawnCheck] === placeInHouse) {
                checkForSpace = false;
              }
            }
            if (checkForSpace) {
              availableMoves.push({
                name: "enter house with pawn " + i,
                pawn: "pawn" + i,
                moveScore: 8,
                executeMove: () => {
                  activePlayers[0][currPawn] = placeInHouse;
                  activePlayers[0].score = player.score + 100;
                  setActivePlayers(activePlayers);
                },
              });
            }
          }
        }
      }
    } else if (player[currPawn].includes("f")) {
      if (Number(player[currPawn][0]) + diceResult <= 4) {
        let placeInHouse =
          Number(player[currPawn][0]) + diceResult + player.color[0] + "f";

        let checkForSpace = true;
        for (let j = 1; j < 5; j++) {
          let currPawnCheck = "pawn" + j + "Pos";
          if (player[currPawnCheck] === placeInHouse) {
            checkForSpace = false;
          }
        }
        if (checkForSpace) {
          availableMoves.push({
            name: "move pawn " + i + " inside home",
            pawn: "pawn" + i,
            moveScore: 2,
            pawnScore: pawnScore,
            pawnScoreAdd: diceResult,
            executeMove: () => {
              activePlayers[0][currPawn] = placeInHouse;
              setActivePlayers(activePlayers);
            },
          });
        }
      }
    }
  }
  ///

  /// check possibility to capture opponent
  for (let i = 0; i < otherPlayers.length; i++) {
    for (let j = 1; j < 5; j++) {
      for (let k = 1; k < 5; k++) {
        let currPawn = "pawn" + k + "Pos";
        let otherPlayerPawn = "pawn" + j + "Pos";
        let otherPlayerPawnScore = 0;

        ///other player pawn score
        if (typeof otherPlayers[i][otherPlayerPawn] === "number") {
          if (otherPlayers[i].endPos === 40) {
            otherPlayerPawnScore = otherPlayers[i][otherPlayerPawn];
          } else {
            if (otherPlayers[i][otherPlayerPawn] < otherPlayers[i].startPos) {
              otherPlayerPawnScore =
                otherPlayers[i][otherPlayerPawn] +
                40 -
                otherPlayers[i].startPos +
                1;
            } else {
              otherPlayerPawnScore =
                otherPlayers[i][otherPlayerPawn] - otherPlayers[i].startPos + 1;
            }
          }
        }
        ///

        if (typeof player[currPawn] === "string") {
          if (player[currPawn].includes("s") && diceResult === 6) {
            if (otherPlayers[i][otherPlayerPawn] === player.startPos) {
              availableMoves.push({
                name:
                  "capture " +
                  otherPlayers[i].color +
                  " leaving base with " +
                  player[currPawn],
                pawn: "pawn" + k,
                moveScore: 10,
                pawnScore: pawnScore,
                pawnScoreAdd: 1,
                opponentScore: otherPlayers[i].score,
                opponentPawnScore: otherPlayersPawnScore[i],
                opponentPawnScoreCapture: otherPlayerPawnScore,
                executeMove: () => {
                  activePlayers[0][currPawn] = player.startPos;
                  setActivePlayers((previousState) => [
                    ...previousState,
                    activePlayers,
                  ]);
                },
                moveResults: () => {
                  activePlayers[i + 1][otherPlayerPawn] =
                    j + otherPlayers[i].color[0] + "s";
                  setActivePlayers((previousState) => [
                    ...previousState,
                    activePlayers,
                  ]);
                },
              });
            }
          }
        } else {
          if (player.realEndPos === 40) {
            if (player[currPawn] + diceResult <= 40) {
              if (
                player[currPawn] + diceResult ===
                  otherPlayers[i][otherPlayerPawn] &&
                player[currPawn] + diceResult !== otherPlayers[i].startPos
              ) {
                availableMoves.push({
                  name:
                    "capture " +
                    otherPlayers[i].color +
                    " with pawn " +
                    k +
                    " on field " +
                    player[currPawn],
                  pawn: "pawn" + k,
                  currPose: player[currPawn],
                  moveScore: 6,
                  pawnScore: pawnScore,
                  pawnScoreAdd: diceResult,
                  opponentScore: otherPlayers[i].score,
                  opponentPawnScore: otherPlayersPawnScore[i],
                  opponentPawnScoreCapture: otherPlayerPawnScore,
                  executeMove: () => {
                    activePlayers[0][currPawn] = player[currPawn] + diceResult;
                    setActivePlayers((previousState) => [
                      ...previousState,
                      activePlayers,
                    ]);
                  },
                  moveResults: () => {
                    activePlayers[i + 1][otherPlayerPawn] =
                      j + otherPlayers[i].color[0] + "s";
                    setActivePlayers((previousState) => [
                      ...previousState,
                      activePlayers,
                    ]);
                  },
                });
              }
            }
          } else {
            let pawnCount;
            if (player[currPawn] < player.startPos) {
              pawnCount = player[currPawn] + 40;
            } else {
              pawnCount = player[currPawn];
            }

            if (pawnCount + diceResult <= player.realEndPos) {
              let setPose = player[currPawn] + diceResult;
              if (setPose > 40) {
                setPose -= 40;
              }
              if (
                setPose === otherPlayers[i][otherPlayerPawn] &&
                setPose !== otherPlayers[i].startPos
              ) {
                availableMoves.push({
                  name:
                    "capture " +
                    otherPlayers[i].color +
                    " with pawn " +
                    k +
                    " on field " +
                    player[currPawn],
                  pawn: "pawn" + k,
                  currPose: player[currPawn],
                  moveScore: 6,
                  pawnScore: pawnScore,
                  pawnScoreAdd: diceResult,
                  opponentScore: otherPlayers[i].score,
                  opponentPawnScore: otherPlayersPawnScore[i],
                  opponentPawnScoreCapture: otherPlayerPawnScore,
                  executeMove: () => {
                    activePlayers[0][currPawn] = setPose;
                    setActivePlayers((previousState) => [
                      ...previousState,
                      activePlayers,
                    ]);
                  },
                  moveResults: () => {
                    activePlayers[i + 1][otherPlayerPawn] =
                      j + otherPlayers[i].color[0] + "s";
                    setActivePlayers((previousState) => [
                      ...previousState,
                      activePlayers,
                    ]);
                  },
                });
              }
            }
          }
        }
      }
    }
  }
  ///

  ///filter results
  let filteredMoves = [];

  for (let i = 1; i <= 4; i++) {
    let pawnFilter = availableMoves.filter((move) => move.pawn === "pawn" + i);

    if (pawnFilter.length > 0) {
      let maxMoveScore = Math.max(...pawnFilter.map((move) => move.moveScore));

      let highestScoreMove = pawnFilter.filter(
        (move) => move.moveScore === maxMoveScore
      );
      if (
        highestScoreMove.length > 1 ||
        maxMoveScore === 10 ||
        maxMoveScore === 6
      ) {
        let combinedMoveResults = [];
        combinedMoveResults.push(highestScoreMove[0].executeMove);
        for (let j = 0; j < highestScoreMove.length; j++) {
          combinedMoveResults.push(highestScoreMove[j].moveResults);
        }
        delete highestScoreMove[0].moveResults;

        filteredMoves.push({
          ...highestScoreMove[0],
          moveScore: maxMoveScore * highestScoreMove.length,
          opponentPawnScoreCapture:
            highestScoreMove[0].opponentPawnScoreCapture *
            highestScoreMove.length,
          executeMove: () => {
            combinedMoveResults.forEach((execute) => {
              execute();
            });
          },
        });
      } else {
        filteredMoves.push(highestScoreMove[0]);
      }
    }
  }
  ///

  return {
    dice: diceResult,
    moves: filteredMoves,
  };
};

export default checkPossibleMoves;
