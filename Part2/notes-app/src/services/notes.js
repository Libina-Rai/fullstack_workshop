import axios from "axios";

const baseUrl =
  import.meta.env.MODE === "production"
    ? "/api/notes" // On Render: same origin
    : "http://localhost:3001/api/notes"; // On local: backend

const getAll = () => {
  return axios.get(baseUrl).then((result) => result.data);
};

const create = (note) => {
  return axios.post(baseUrl, note).then((result) => result.data);
};

const update = (id, updatedNote) => {
  return axios.put(`${baseUrl}/${id}`, updatedNote).then((result) => result.data);
};

export default { create, getAll, update };
