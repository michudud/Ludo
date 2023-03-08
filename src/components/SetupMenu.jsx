import React, { useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { setPlayers } from "./playersSlice";
import {
  redPlayer,
  greenPlayer,
  yellowPlayer,
  bluePlayer,
} from "./functions/playersData";

const SetupMenu = () => {
  const dispatch = useDispatch();
  const playersSetupRef = useRef(null);
  const [menuOpen, setMenuOpen] = useState(true);

  let menuPlayers = [redPlayer, greenPlayer, yellowPlayer, bluePlayer];

  const startGame = () => {
    let activePlayers = [];
    for (let i = 0; i < 4; i++) {
      let val = playersSetupRef.current.children[i].lastElementChild.value;
      if (val === "Player") {
        menuPlayers[i].user = val;
        activePlayers.push(menuPlayers[i]);
      } else if (val === "AI") {
        menuPlayers[i].user = val;
        activePlayers.push(menuPlayers[i]);
      }
    }
    if (activePlayers.length >= 2) {
      dispatch(setPlayers(activePlayers));
      setMenuOpen(!menuOpen);
    }
  };

  return (
    <div className={`SetupMenu ${menuOpen ? "" : "closed"}`}>
      <div className="smLabel">Choose Who Plays With Which Color</div>
      <div className="playersSetups" ref={playersSetupRef}>
        {menuPlayers.map((player) => {
          return (
            <div className="playerSetup" key={player.color}>
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
              <select name="user">
                <option value="Player">Player</option>
                <option value="AI">AI</option>
                <option value="None">None</option>
              </select>
            </div>
          );
        })}
      </div>
      <div className="difficultySetup">
        <label>Choose Difficulty Level</label>
        <select name="difficulty">
          <option value="easy">Easy</option>
          <option value="medium">Medium</option>
          <option value="hard">Hard</option>
        </select>
      </div>
      <button onClick={startGame} className="smPlay">
        Play
      </button>
    </div>
  );
};

export default SetupMenu;
