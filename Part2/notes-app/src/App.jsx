import { useState } from "react";
import Note from "./components/Note";
const App = (props) => {
  const [notes, setNotes] = useState(props.notes);
  const [newNote, setNewNote] = useState("");
  const handleSubmit = (event) => {
    event.preventDefault();
    setNotes(
      notes.concat({
        content: newNote,
        id: notes.length + 1,
        important: Math.random() > 0.5,
      })
    );
    setNewNote("");
    console.log("form has been submitted");
  };

  const handleChange = (event) => {
    console.log(event.target.value);
    setNewNote(event.target.value);
  };
  return (
    <div>
      <h1>Notes</h1>
      <ul>
        {notes.map((value) => {
          return <Note key={value.id} note={value} />;
        })}
      </ul>
      <form onSubmit={handleSubmit}>
        <input value={newNote} onChange={handleChange} />
        <button>Submit</button>
      </form>
    </div>
  );
};

export default App;
