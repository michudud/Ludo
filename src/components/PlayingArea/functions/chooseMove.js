const chooseMove = (moves, difficulty) => {
  switch (difficulty) {
    case "easy":
      let easyMoveIndex;

      ///look for lowest score move
      const minScore = Math.min(...moves.map((move) => move.moveScore));
      const minScoreMoves = moves.filter((move) => move.moveScore === minScore);
      ///

      if (minScoreMoves.length > 1) {
        if (minScore === 4) {
          ///look for pawn closest to start position
          const closestToStartPos = Math.min(
            ...minScoreMoves.map((move) => move.currPose)
          );
          let closestToStartPawnMoves = minScoreMoves;
          if (!isNaN(closestToStartPos)) {
            closestToStartPawnMoves = minScoreMoves.filter(
              (move) => move.currPose === closestToStartPos
            );
          }
          ///

          ///choose random move from between moves with the same result
          const rndMove = Math.floor(
            Math.random() * closestToStartPawnMoves.length
          );
          const pawnToMove = closestToStartPawnMoves[rndMove].pawn;
          easyMoveIndex = moves.findIndex((move) => move.pawn === pawnToMove);
          ///
        } else if (minScore % 6 === 0) {
          ///look for move causing the least pawn score capture
          const minPawnScoreCapture = Math.min(
            ...minScoreMoves.map((move) => move.opponentPawnScoreCapture)
          );
          const minPawnScoreCaptureMoves = minScoreMoves.filter(
            (move) => move.opponentPawnScoreCapture === minPawnScoreCapture
          );
          ///

          ///look for pawn closest to start position
          const closestToStartPos = Math.min(
            ...minPawnScoreCaptureMoves.map((move) => move.currPose)
          );
          const closestToStartPawnMoves = minScoreMoves.filter(
            (move) => move.currPose === closestToStartPos
          );
          ///

          ///choose random move from between moves with the same result
          const rndMove = Math.floor(
            Math.random() * closestToStartPawnMoves.length
          );
          const pawnToMove = closestToStartPawnMoves[rndMove].pawn;
          easyMoveIndex = moves.findIndex((move) => move.pawn === pawnToMove);
          ///
        } else {
          ///choose random move from between moves with the same result
          const rndMove = Math.floor(Math.random() * minScoreMoves.length);
          const pawnToMove = minScoreMoves[rndMove].pawn;
          easyMoveIndex = moves.findIndex((move) => move.pawn === pawnToMove);
          ///
        }
      } else {
        ///use the only move available with lowest score
        const pawnToMove = minScoreMoves[0].pawn;
        easyMoveIndex = moves.findIndex((move) => move.pawn === pawnToMove);
        ///
      }

      return easyMoveIndex;

    case "medium":
      ///at medium difficulty moves are chosen randomly
      const mediumMoveIndex = Math.floor(Math.random() * moves.length);
      ///

      return mediumMoveIndex;

    case "hard":
      let hardMoveIndex;

      ///look for opponents having 3 pawns in home that can be captured
      const winningOpponents = moves.filter(
        (move) => move.opponentScore === 300
      );
      const opportunitiesToCapture = winningOpponents.filter(
        (move) => move.moveScore === 10 || move.moveScore === 6
      );
      ///

      if (winningOpponents.length > 0 && opportunitiesToCapture.length > 0) {
        ///look for opponents beeing closest to win
        const maxOpponentsPawnScore = Math.max(
          ...opportunitiesToCapture.map((move) => move.opponentPawnScore)
        );
        const maxPawnScoreOpponents = opportunitiesToCapture.filter(
          (move) => move.opponentPawnScore === maxOpponentsPawnScore
        );
        ///

        ///look for pawn closest to home
        const closestToHomePos = Math.max(
          ...maxPawnScoreOpponents.map((move) => move.currPose)
        );
        let closestToHomePawnMoves = maxPawnScoreOpponents;
        if (!isNaN(closestToHomePos)) {
          closestToHomePawnMoves = maxPawnScoreOpponents.filter(
            (move) => move.currPose === closestToHomePos
          );
        }

        ///choose random move from between moves with the same result
        const rndMove = Math.floor(
          Math.random() * closestToHomePawnMoves.length
        );
        const pawnToMove = closestToHomePawnMoves[rndMove].pawn;
        hardMoveIndex = moves.findIndex((move) => move.pawn === pawnToMove);
        ///
      } else {
        ///look for highest score move
        const maxScore = Math.max(...moves.map((move) => move.moveScore));
        const maxScoreMoves = moves.filter(
          (move) => move.moveScore === maxScore
        );
        ///

        if (maxScoreMoves.length > 1) {
          if (maxScore === 4) {
            ///look for pawn closest to home
            const closestToHomePos = Math.max(
              ...maxScoreMoves.map((move) => move.currPose)
            );
            const closestToHomePawnMoves = maxScoreMoves.filter(
              (move) => move.currPose === closestToHomePos
            );
            ///

            ///choose random move from between moves with the same result
            const rndMove = Math.floor(
              Math.random() * closestToHomePawnMoves.length
            );
            const pawnToMove = closestToHomePawnMoves[rndMove].pawn;
            hardMoveIndex = moves.findIndex((move) => move.pawn === pawnToMove);
            ///
          } else if (maxScore % 6 === 0) {
            ///look for opponents with highest score
            const maxOpponentsScore = Math.max(
              ...maxScoreMoves.map((move) => move.opponentScore)
            );
            const captureHighestScoreOpponent = maxScoreMoves.filter(
              (move) => move.opponentScore === maxOpponentsScore
            );
            ///

            ///look for move causing the highest pawn score capture
            const maxPawnScoreCapture = Math.max(
              ...captureHighestScoreOpponent.map(
                (move) => move.opponentPawnScore
              )
            );
            const maxPawnScoreCaptureMoves = captureHighestScoreOpponent.filter(
              (move) => move.opponentPawnScore === maxPawnScoreCapture
            );
            ///

            ///look for pawn closest to home
            const closestToHomePos = Math.max(
              ...maxPawnScoreCaptureMoves.map((move) => move.currPose)
            );
            const closestToHomePawnMoves = maxPawnScoreCaptureMoves.filter(
              (move) => move.currPose === closestToHomePos
            );
            ///

            ///choose random move from between moves with the same result
            const rndMove = Math.floor(
              Math.random() * closestToHomePawnMoves.length
            );
            const pawnToMove = closestToHomePawnMoves[rndMove].pawn;
            hardMoveIndex = moves.findIndex((move) => move.pawn === pawnToMove);
            ///
          } else {
            ///choose random move from between moves with the same result
            const rndMove = Math.floor(Math.random() * maxScoreMoves.length);
            const pawnToMove = maxScoreMoves[rndMove].pawn;
            hardMoveIndex = moves.findIndex((move) => move.pawn === pawnToMove);
            ///
          }
        } else {
          ///use the only move available with highest score
          const pawnToMove = maxScoreMoves[0].pawn;
          hardMoveIndex = moves.findIndex((move) => move.pawn === pawnToMove);
          ///
        }
      }

      return hardMoveIndex;
  }
};

export default chooseMove;
