import React from "react";
import { createRoot } from "react-dom/client";
import SetupMenu from "./SetupMenu";

const App = () => {
  return <SetupMenu />;
};

const rootDiv = document.getElementById("root");
if (rootDiv) {
  createRoot(rootDiv).render(<App />);
}
