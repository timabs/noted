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

export async function addNoteToNotebook(noteId: string, notebookId: string) {
  try {
    const response = await api.patch(`/api/v1/notebooks/${notebookId}`, {
      noteId: noteId,
    });
    return response.data;
  } catch (error) {
    console.log(error);
  }
}

export async function getNotesInNotebook(notebookId: string) {
  try {
    const response = await api.get(`api/v1/notebooks/${notebookId}`);
    return response.data.fullNotes;
  } catch (error) {
    console.log(error);
  }
}
