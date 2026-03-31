import NewNote from "./components/NewNote";
import Notes from "./components/Notes";
import VisibilityFilter from "./components/VisibilityFilter";
import { getAll } from "./services/notes";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { addAllNotes } from "./reducers/noteReducer";

const App = () => {
  const dispatch = useDispatch(); //allows us to dispatch actions to the Redux store

  useEffect(() => {
    getAll().then((notes) => dispatch(addAllNotes(notes))); //fetches all notes from the server and dispatches an action to add them to the Redux store 
  }, []);

  return (
    <div>
      <VisibilityFilter />
      <NewNote />
      <Notes />
    </div>
  );
};

export default App;
