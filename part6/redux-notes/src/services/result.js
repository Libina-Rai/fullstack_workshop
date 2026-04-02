const baseUrl = "http://localhost:3001/notes";

export const getAll = async () => {
  const response = await fetch(baseUrl);
  return response.json();
};

export const createNote = async (newNote) => {
  const response = await fetch(baseUrl, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(newNote),
  });
  return response.json();
};

export const updateNote = async (updatedNote, id ) => {
  const response = await fetch(`${baseUrl}/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },  
    body: JSON.stringify(updatedNote),
  });
  return response.json();
};
