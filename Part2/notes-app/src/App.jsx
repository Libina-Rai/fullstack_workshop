import Note from "./components/Note";
const App = ({ notes }) => {
  return (
    <div>
      <h1>Notes</h1>
      <ul>
        {notes.map((value) => {
          return <Note key={value.id} note={value} />;
        })}
      </ul>
    </div>
  );
};

export default App;
