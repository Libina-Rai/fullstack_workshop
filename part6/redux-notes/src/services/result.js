const baseUrl = "http://localhost:3001/notes";

export const getAll = async () => {
  const response = await fetch(baseUrl);
  return response.json();
};
