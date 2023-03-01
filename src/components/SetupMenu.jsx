import React from "react";
import {
  redPlayer,
  greenPlayer,
  yellowPlayer,
  bluePlayer,
} from "./functions/playersData";

const SetupMenu = () => {
  let menuPlayers = [redPlayer, greenPlayer, yellowPlayer, bluePlayer];

  const startGame = () => {};

  return (
    <div className="SetupMenu">
      <div className="smLabel">Choose Who Plays With Which Color</div>
      <div className="playersSetups">
        {menuPlayers.map((player) => {
          return (
            <div className="playerSetup">
              <div
                className="playerBg"
                style={{ backgroundColor: player.color2 }}
              >
                <div
                  className="playerPawn"
                  style={{ borderColor: player.color }}
                ></div>
              </div>
              <label>
                {player.color.charAt(0).toUpperCase() + player.color.slice(1)}{" "}
                Pawns
              </label>
              <select name="owner">
                <option value="Player">Player</option>
                <option value="AI">AI</option>
                <option value="None">None</option>
              </select>
            </div>
          );
        })}
      </div>
      <button onClick={startGame()} className="smPlay">
        Play
      </button>
    </div>
  );
};

export default SetupMenu;
