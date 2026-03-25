import { createRoot } from "react-dom/client";
import "./index.css";
import { Provider } from "react-redux";
import { createStore, combineReducers } from "redux";
import noteReducer from "./reducers/noteReducer";
import filterReducer from "./reducers/filterReducer";
import App from "./App";

const reducer = combineReducers({
  notes: noteReducer,
  filter: filterReducer
})

export const store = createStore(reducer);

createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <App />
  </Provider>
);

// let myRoot = createRoot(document.getElementById("root"));

// function myRender() {
//   myRoot.render(<App />);
// }

// myRender();
// store.subscribe(myRender);
