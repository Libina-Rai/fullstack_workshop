import NewNote from "./components/NewNote";
import Notes from "./components/Notes";
import VisibilityFilter from "./components/VisibilityFilter";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { getAndAddAllNotes } from "./reducers/noteReducer";

const App = () => {
  const dispatch = useDispatch(); //allows us to dispatch actions to the Redux store

  useEffect(() => {
    dispatch(getAndAddAllNotes());
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
