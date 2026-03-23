import { createStore } from "redux";
const generateId = () => Number((Math.random() * 1000000).toFixed(0));
const noteReducer = (state=[], action) => {
  if (action.type === "NEW_NOTE") {
    // state.push(action.payload)
    let newState = [...state, action.payload];
    return newState;
  }
  if (action.type === "TOGGLE_IMPORTANCE") {
    let myState = state.find((note) => note.id === action.payload.id);
    let myUpdatedNote = { ...myState, important: !myState.important };
    let newState = state.map((note) =>
      note.id === action.payload.id ? myUpdatedNote : note,
    );
    return newState;
  }
  return state;
};

export const store = createStore(noteReducer, []);

export const createNote = (content) => {
  return {
    type: "NEW_NOTE",
    payload: {
      content,
      important: false,
      id: generateId(),
    },
  }
};

export const toggleImportanceOf = (id) => {
  return {
    type: "TOGGLE_IMPORTANCE",
    payload: {
      id,
    }
  }
}

export default noteReducer;
