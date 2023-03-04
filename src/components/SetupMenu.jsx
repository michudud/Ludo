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
  let activePlayers = [];

  const startGame = () => {
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
    dispatch(setPlayers(activePlayers));
    setMenuOpen(!menuOpen);
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
              <select name="owner">
                <option value="Player">Player</option>
                <option value="AI">AI</option>
                <option value="None">None</option>
              </select>
            </div>
          );
        })}
      </div>
      <button onClick={startGame} className="smPlay">
        Play
      </button>
    </div>
  );
};

export default SetupMenu;
