import axios from "axios";

const apiURL = "http://localhost:5000";

const api = axios.create({
  baseURL: apiURL,
  headers: {
    "X-Temp-User": localStorage.getItem("tempId"),
  },
});

export async function getNotebooks() {
  try {
    const response = await api.get(`api/v1/notebooks`);
    return response.data.notebooks;
  } catch (error) {
    console.log(error);
  }
}
