import { useState, useEffect, useRef } from "react";
import Note from "./components/Note";
import noteService from "./services/notes";
import userService from "./services/login";
import Notification from "./components/Notification";
import LoginForm from "./components/LoginForm";
import Togglable from "./components/Togglable";
import NotesForm from "./components/NotesForm";

const App = () => {
  const [notes, setNotes] = useState([]);
  const [showAll, setShowAll] = useState(true);
  const [notification, setNotification] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState(null);
  const noteFormRef = useRef();

  useEffect(() => {
    const fetchNotes = async () => {
      const myData = await noteService.getAll();
      setNotes(myData);
    };

    fetchNotes();
  }, []);

  const notesToShow = notes.filter((note) => (showAll ? true : note.important));

  const createNote = async (noteObject) => {
    noteFormRef.current.toggleVisibility();
    try {
      const newNote = await noteService.create(noteObject); // returns response.data now
      if (newNote && newNote.id) {
        setNotes(notes.concat(newNote));
      }
    } catch (err) {
      setNotification("Error creating note");
      setTimeout(() => setNotification(""), 2000);
    }
  };

  const handleShowAll = () => {
    setShowAll(!showAll);
  };

  const updateData = async (id) => {
    try {
      const currentNote = notes.find((note) => note.id === id);

      const updatedNote = {
        ...currentNote,
        important: !currentNote.important,
      };

      const updated = await noteService.update(id, updatedNote);

      setNotes(notes.map((note) => (note.id === updated.id ? updated : note)));
    } catch (err) {
      const currentNote = notes.find((note) => note.id === id);

      if (err.response?.status === 404) {
        setNotification(
          `sorry this note "${currentNote.content}" does not exist`,
        );

        setTimeout(() => {
          setNotification("");
        }, 2000);

        setNotes(notes.filter((note) => note.id !== currentNote.id));
      } else {
        console.log("some other error");
      }
    }
  };

  const myStyle = { fontSize: "50px" };

  async function handleLogin(event) {
    event.preventDefault();

    const myUser = await userService.login({ username, password });

    setUser(myUser);

    noteService.setToken(myUser.token);

    window.localStorage.setItem("myAuth", JSON.stringify(myUser));
  }

  const loginForm = () => {
    return (
      <>
        <Togglable buttonLabel="Login Toggle">
          <LoginForm
            username={username}
            password={password}
            handleUsernameChange={({ target }) => setUsername(target.value)}
            handlePasswordChange={({ target }) => setPassword(target.value)}
            handleSubmit={handleLogin}
          />
        </Togglable>
      </>
    );
  };

  function notesForm() {
    return (
      <Togglable buttonLabel="New Note" ref={noteFormRef}>
        <NotesForm createNote={createNote} />
      </Togglable>
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
          <p>{user.name} logged in</p>
          {notesForm()}
        </div>
      )}

      <br />
      <button onClick={handleShowAll}>
        show {showAll ? "important" : "all"}
      </button>
      <ul>
        {notesToShow.map((note) => {
          return (
            <Note
              key={note.id}
              note={note}
              updateNote={() => {
                updateData(note.id);
              }}
            />
          );
        })}
      </ul>
    </>
  );
};

export default App;
