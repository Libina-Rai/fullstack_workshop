import { useState, useEffect } from "react";
import Note from "./components/Note";
import noteService from "./services/notes";
import userService from "./services/login";
import Notification from "./components/Notification";

const App = () => {
  const [notes, setNotes] = useState([]);
  const [newNote, setNewNote] = useState("");
  const [showAll, setShowAll] = useState(true);
  const [notification, setNotification] = useState("");
  const [username, setUsername] = useState('') 
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null);

  useEffect(() => {
    //1. get data from backend server
    let myAxiosPromise = noteService.getAll();
    myAxiosPromise.then((myData) => {
      myData.push({ id: 1000, content: "this is fake note", important: true });
      //2. put the data into notes state
      setNotes(myData);
    });
      setUser(JSON.parse(window.localStorage.getItem("myAuth")));
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
      setNotes(notes.concat(result.data));
      setNewNote("");
    });
  };

  const handleChange = (event) => {
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
    putPromise
      .then((result) => {
        console.dir(result);
        let updatedNote = result.data;
        //2. update the state
        setNotes(
          notes.map((note) => (note.id === updatedNote.id ? updatedNote : note))
        );
      })
      .catch((err) => {
        if (err.response.status === 404) {
          setNotification(
            `sorry this note "${currentNote.content}" does not exist`
          );
          setTimeout(() => {
            setNotification("");
          }, 2000);
          setNotes(notes.filter((note) => note.id !== currentNote.id));
        } else {
          console.log("this is some other error");
        }
      });
  };

  const myStyle = { fontSize: "50px" };

  async function handleLogin(event) {
    event.preventDefault();
    let myUser= await userService.login({username, password});
    setUser(myUser);
    noteService.setToken(myUser.token);
    window.localStorage.setItem("myAuth", JSON.stringify(myUser));
  }

  function loginForm() {
    return (
    <>
      <h2>Login</h2>
      <form onSubmit = {handleLogin}>
        <div>
          <label>
            username
            <input
              type="text"
              value={username}
              onChange={({ target }) => setUsername(target.value)}
            />
          </label>
        </div>
        <div>
          <label>
            password
            <input
              type="password"
              value={password}
              onChange={({ target }) => setPassword(target.value)}
            />
          </label>
        </div>
        <button type="submit">login</button>
      </form>
    </>
    );
  }

  function notesForm() {
    return (
      <form onSubmit={handleSubmit}>
        <input
          value={newNote}
          onChange={handleChange}
          onClick={() => setNewNote("")}
        />
        <button>Submit</button>
      </form>
    );
  }

  return (
    <>
      <h1 style={myStyle} className="redbackground">
        Notes
      </h1>
      <Notification message={notification} />
      {!user && loginForm()}
      <br />
      {user && (
        <div>
          <p>{user.name} logged in </p>
          {notesForm()}
        </div>
      )}
      <br />

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
    </>
  );
};

export default App;
