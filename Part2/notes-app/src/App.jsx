import { useState, useEffect } from "react";
import Note from "./components/Note";
import noteService from "./services/notes";

const App = () => {
  const [notes, setNotes] = useState([]);
  const [newNote, setNewNote] = useState("");
  const [showAll, setShowAll] = useState(true);

  useEffect(() => {
    console.log("hello");
    //1. get data from backend server
    let myAxiosPromise = noteService.getAll();
    myAxiosPromise.then((myData) => {
      console.log("return promise");
      console.dir(myData);
      //2. put the data into notes state
      setNotes(myData);
    });
  }, []);

  const notesToShow = notes.filter((note) => (showAll ? true : note.important));

  const handleSubmit = (event) => {
    event.preventDefault();
    let myNote = {
      content: newNote,
      important: Math.random() > 0.5,
    };
    let postPromise = noteService.create(myNote);
    postPromise.then((result) => {
      console.log("note created data return", result.data);
      setNotes(notes.concat(result.data));
      setNewNote("");
    });
    console.log("form has been submitted");
  };

  const handleChange = (event) => {
    console.log(event.target.value);
    setNewNote(event.target.value);
  };

  const handleShowAll = () => {
    setShowAll(!showAll);
  };

  const updateData = (id) => {
    //1. update the server
    let currentNote = notes.find((note) => {
      return note.id === id;
    });
    let updatedNote = { ...currentNote, important: !currentNote.important };
    let putPromise = noteService.update(id, updatedNote);
    putPromise.then((result) => {
      console.dir(result);
      //2. update the state
      setNotes(
        notes.map((note) => (note.id === updatedNote.id ? updatedNote : note))
      );
    });
  };

  return (
    <>
      <h1>Notes</h1>
      <button onClick={handleShowAll}>
        show {showAll ? "important" : "all"}
      </button>
      <ul>
        {notesToShow.map((value) => {
          return (
            <Note
              key={value.id}
              note={value}
              updateNote={() => {
                updateData(value.id);
              }}
            />
          );
        })}
      </ul>
      <form onSubmit={handleSubmit}>
        <input value={newNote} onChange={handleChange} />
        <button>Submit</button>
      </form>
    </>
  );
};

export default App;
