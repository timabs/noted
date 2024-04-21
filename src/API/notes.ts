import axios from "axios";

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

export async function createNote(note: object) {
  try {
    const response = await api.post(`/api/v1/notes`, { note });
    return response.data;
  } catch (error) {
    console.log(error);
  }
}

export async function deleteNote(noteId: string) {
  try {
    await api.delete(`/api/v1/notes/${noteId}`);
  } catch (error) {
    console.log(error);
  }
}

export async function editNote(note: object, noteId: string) {
  try {
    const response = await api.patch(`/api/v1/notes/${noteId}`, { note: note });
    return response.data;
  } catch (error) {
    console.log(error);
  }
}
