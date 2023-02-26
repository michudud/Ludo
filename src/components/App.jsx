import React from "react";
import { createRoot } from "react-dom/client";
import PlayingArea from "./PlayingArea";

const App = () => {
  return <PlayingArea />;
};

const rootDiv = document.getElementById("root");
if (rootDiv) {
  createRoot(rootDiv).render(<App />);
}
