import { createSlice } from "@reduxjs/toolkit";
import { getAll, postNewNote } from "../services/notes";

//slice -> reducer, action -> object, state -> array of objects

// const initialState = [
//   {
//     content: "Reducer defines how state works",
//     important: true,
//     id: 1,
//   },
//   {
//     content: "state or store can contain any data",
//     important: false,
//     id: 2,
//   },
// ];

const generateId = () => Number((Math.random() * 1000000).toFixed(0));

const noteSlice = createSlice({
  name: "notes",
  initialState: [],
  reducers: {
    // createNote(state, action) {
    //   const content = action.payload;
    //   return state.concat({
    //     content,
    //     important: false,
    //     id: generateId(),
    //   });
    // },
    addAllNotes(state, action) {
      return state.concat(action.payload);
    },
    toggleImportanceOf(state, action) {
      const id = action.payload;
      const noteToChange = state.find((n) => n.id === id);
      const changedNote = {
        ...noteToChange,
        important: !noteToChange.important,
      };
      return state.map((note) => (note.id !== id ? note : changedNote));
    },
  },
});

export const { createNote, toggleImportanceOf, addAllNotes } =
  noteSlice.actions;

export const getAndAddAllNotes = () => {
  const getNotesFromAxiosAndDispatch = async (dispatch) => {
    const allNotes = await getAll(); //calling the getAll function to fetch all notes from the backend
    dispatch(addAllNotes(allNotes)); //dispatching the addAllNotes action with the data received from the getAll function
  };
  return getNotesFromAxiosAndDispatch;
};

export const addNewNoteWithThunk = (content) => {
  const addNoteToAxiosAndDispatch = async (dispatch) => {
    const newNote = await postNewNote(content); //calling the postNewNote function to add a new note to the backend and get the newly created note in response
    dispatch(noteSlice.actions.addAllNotes(newNote)); //dispatching the addAllNotes action with the newly created note
  };
  return addNoteToAxiosAndDispatch;
};

export default noteSlice.reducer; //exporting the reducer function created by createSlice
