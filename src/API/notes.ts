import axios from "axios";
import { INote } from "../@types/note";

const apiURL = "http://localhost:5000";

const api = axios.create({
  baseURL: apiURL,
  headers: {
    "X-Temp-User": localStorage.getItem("tempId"),
  },
});

export async function fetchNotes() {
  try {
    const response = await api.get(`/api/v1/notes`);
    return response.data.notes;
  } catch (error) {
    console.log(error);
  }
}

export async function createNote(note: INote) {
  try {
    const response = await api.post(`/api/v1/notes`, { note });
    return response.data;
  } catch (error) {
    console.log(error);
  }
}
