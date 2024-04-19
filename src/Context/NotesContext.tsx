import React, { createContext, useEffect, useState } from "react";
import { NoteContextType, INote } from "../@types/note";
import { createNote, fetchNotes } from "../API/notes";

export const NoteContext = createContext<NoteContextType>({
  notes: [],
  saveNote: () => {},
  getNotes: () => {},
  setNotes: () => {},
});

export const NoteProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const dateOptions: Intl.DateTimeFormatOptions = {
    month: "long",
    hour12: true,
    year: "numeric",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
  };
  const [notes, setNotes] = useState<INote[]>([]);
  const saveNote = async (note: INote) => {
    const newNote = {
      title: note.title,
      content: note.content,
      date: new Date().toLocaleString("en-US", dateOptions).replace("at", "-"),
    };
    const returnedNote = await createNote(newNote);
    setNotes([returnedNote, ...notes]);
  };

  const getNotes = async () => {
    const notes = (await fetchNotes()) as INote[];
    setNotes(notes);
  };
  useEffect(() => {
    getNotes();
  }, []);
  return (
    <NoteContext.Provider value={{ notes, saveNote, getNotes, setNotes }}>
      {children}
    </NoteContext.Provider>
  );
};
