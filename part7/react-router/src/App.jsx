import {
  Routes,
  Route,
  Link,
  useNavigate,
  Navigate,
  useMatch,
} from "react-router-dom";
import Notes from "./Notes";
import Note from "./Note";
import { useState } from "react";
import Login from "./Login";

const Home = () => (
  <div>
    {" "}
    <h2>TKTL notes app</h2>{" "}
  </div>
);

const Users = () => {
  const navigate = useNavigate();

  return (
    <div>
      <h2>Users</h2>
      <button
        onClick={() => {
          navigate("/notes123");
        }}
      >
        go to notes123
      </button>
      <button
        onClick={() => {
          navigate("/notes456");
        }}
      >
        go to notes456
      </button>
    </div>
  );
};

const App = ({ notes }) => {
  const [user, setUser] = useState(null);

  const padding = {
    padding: 5,
  };

  const match = useMatch("/notes/:id");
  const note = match ? notes.find((note) => note.id === match.params.id) : null;

  return (
    <>
      <div>
        <Link style={padding} to="/">
          home
        </Link>
        <Link style={padding} to="/notes">
          notes
        </Link>
        <Link style={padding} to="/users">
          users
        </Link>
        {user ? (
          <em>{user} logged in</em>
        ) : (
          <Link style={padding} to="/login">
            login
          </Link>
        )}
      </div>

      <Routes>
        <Route path="/notes/:id" element={<Note note={note} />} />
        <Route path="/login" element={<Login setUser={setUser} />} />
        <Route path="/notes" element={<Notes notes={notes} />} />
        <Route
          path="/users"
          element={user ? <Users /> : <Navigate replace to="/login" />}
        />
        <Route path="/notes123" element={<Notes notes={notes} />} />
        <Route path="/notes456" element={<Notes notes={notes} />} />
        <Route path="/" element={<Home />} />
      </Routes>
      <div>
        <i>Note app, Department of Computer Science 2024</i>
      </div>
    </>
  );
};

export default App;
