import axios from "axios";
const baseUrl = "/api/notes"; // On Render: same origin, On local: backend proxy

const getAll = () => {
  const request = axios.get(baseUrl);
  return request.then((response) => response.data.concat({ id: 100, content: "This is fake", important: true }));
};

const create = (newObject) => {
  const request = axios.post(baseUrl, newObject);
  return request.then((response) => response.data);
};

const update = (id, newObject) => {
  const request = axios.put(`${baseUrl}/${id}`, newObject);
  return request.then((response) => response.data);
};

export default { create, getAll, update };
