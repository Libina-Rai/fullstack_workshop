import { useSelector, useDispatch } from "react-redux";
import { toggleImportanceOf } from "../reducers/noteReducer";

const Notes = () => {
  const filter = useSelector((state) => state.filter);

  //like setState, but for dispatching actions
  const dispatch = useDispatch();

  //like state
  const notes = useSelector((state) =>
    filter === "All"
      ? state.notes
      : filter === "Important"
        ? state.notes.filter((note) => note.important)
        : state.notes.filter((note) => !note.important),
  );

  return (
    <div>
      <ul>
        {notes.map((note) => (
          <li
            key={note.id}
            onClick={() => dispatch(toggleImportanceOf(note.id))}
          >
            {note.content}{" "}
            <strong>{note.important ? "important" : "not important"}</strong>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Notes;
