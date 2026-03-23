import './App.css'
import { toggleImportanceOf } from './reducers/noteReducer';
import NewNote from './components/NewNote';
import { useSelector, useDispatch } from 'react-redux';

const App = () => {
  //like setState, but for dispatching actions
  const dispatch = useDispatch();

  //like state
  const notes = useSelector(state => state);

  return (
    <div>
      <NewNote />
      <ul>
        {notes.map((note) => (
          <li
            key={note.id}
            onClick={() =>
              dispatch(toggleImportanceOf(note.id))
            }
          >
            {note.content}{" "}
            <strong>{note.important ? "important" : "not important"}</strong>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default App
