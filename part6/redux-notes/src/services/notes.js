import axios from "axios";

const baseUrl = "http://localhost:3001/notes"; // This is the URL of the JSON server that serves our notes data

const getAll = async () => {
  const response = await axios.get(baseUrl);
  return response.data;
};

const postNewNote = async (content) => {
  const newNote = {
    content,
    important: false,
  };
  const response = await axios.post(baseUrl, newNote);
  return response.data;
};

export { getAll, postNewNote };
