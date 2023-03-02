import React from "react";
import { createRoot } from "react-dom/client";
import SetupMenu from "./SetupMenu";
import PlayingArea from "./PlayingArea";

const App = () => {
  return (
    <>
      <SetupMenu />
      <PlayingArea />
    </>
  );
};

const rootDiv = document.getElementById("root");
if (rootDiv) {
  createRoot(rootDiv).render(<App />);
}
