import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { getAll, createNote, updateNote } from "./services/result";

const App = () => {
  const queryClient = useQueryClient();

  //allows us to fetch data and manage the state of that data
  const result = useQuery({
    queryKey: ["notes"],
    queryFn: getAll,
    refetchOnWindowFocus: false,
  });

  //allows us to create new data and manage the state of that data
  const newNoteMutation = useMutation({
    mutationFn: createNote,
    onSuccess: (myNote) => {
      const notes = queryClient.getQueryData(["notes"]);
      queryClient.setQueryData(["notes"], notes.concat(myNote));
    },
  });

  // allows us to update data and manage the state of that data
  const updateNoteMutation = useMutation({
    mutationFn: ({ id, updatedNote }) => updateNote(id, updatedNote),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["notes"] });
    },
  });

  if (result.isLoading) {
    return <div>Loading data...</div>;
  }

  const addNote = async (event) => {
    event.preventDefault();
    const content = event.target.note.value;
    newNoteMutation.mutate({ content, important: true });
    event.target.note.value = "";
  };

  const toggleImportance = (note) => {
    // toggle importance of the note with the given id
    updateNoteMutation.mutate({
      id: note.id,
      updatedNote: { ...note, important: !note.important },
    });
    console.log("toggle importance of", note.id);
  };

  const notes = result.data;

  return (
    <div>
      <h2>Notes app</h2>
      <form onSubmit={addNote}>
        <input name="note" />
        <button type="submit">add</button>
      </form>
      {notes &&
        notes.map((note) => (
          <li key={note.id} onClick={() => toggleImportance(note)}>
            {note.content}
            <strong> {note.important ? "important" : ""}</strong>
          </li>
        ))}
    </div>
  );
};

export default App;
