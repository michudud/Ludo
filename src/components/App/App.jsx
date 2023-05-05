import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import store from "./../../redux/store";
import Game from "../Game";

const App = () => {
  return (
    <Provider store={store}>
      <Game />
    </Provider>
  );
};

const rootDiv = document.getElementById("root");
if (rootDiv) {
  createRoot(rootDiv).render(<App />);
}
