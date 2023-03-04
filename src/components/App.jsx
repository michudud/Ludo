import React from "react";
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import store from "./store";
import SetupMenu from "./SetupMenu";
import PlayingArea from "./PlayingArea";

const App = () => {
  return (
    <Provider store={store}>
      <SetupMenu />
      <PlayingArea />
    </Provider>
  );
};

const rootDiv = document.getElementById("root");
if (rootDiv) {
  createRoot(rootDiv).render(<App />);
}
