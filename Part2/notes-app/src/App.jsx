import { useState, useEffect } from "react";
import Note from "./components/Note";
import axios from "axios";

const App = (props) => {
  const [notes, setNotes] = useState([]);
  const [newNote, setNewNote] = useState("");
  const [showAll, setShowAll] = useState(true);

  useEffect(() => {
    //1. get data from backend server
    let myAxiosPromise = axios.get("http://localhost:3001/notes");
    myAxiosPromise.then((myResult) => {
      console.log("return promise");
      console.dir(myResult.data);
      //2. put the data into notes state
      setNotes(myResult.data);
    });
  }, []);

  const notesToShow = notes.filter((note) => (showAll ? true : note.important));

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

  const handleShowAll = () => {
    setShowAll(!showAll);
  };

  return (
    <div>
      <h1>Notes</h1>
      <button onClick={handleShowAll}>
        show {showAll ? "important" : "all"}
      </button>
      <ul>
        {notesToShow.map((value) => {
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
