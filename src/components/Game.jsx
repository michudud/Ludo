import React from "react";
import PlayingArea from "./PlayingArea";
import SetupMenu from "./SetupMenu";

const Game = () => {
  return (
    <div className="Game">
      <SetupMenu />
      <PlayingArea />
    </div>
  );
};

export default Game;
