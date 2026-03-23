import { store, createNote } from "../reducers/noteReducer";

const NewNote = () => {
  const addNote = (event) => {
    event.preventDefault();
    const content = event.target.note.value;
    event.target.note.value = "";
    store.dispatch(createNote(content));
  };

  return (
    <div>
      <form onSubmit={addNote}>
        <input name="note" />
        <button type="submit">add</button>
      </form>
    </div>
  );
};

export default NewNote;
