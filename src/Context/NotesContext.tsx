import { createContext, useEffect, useState } from "react";
import { NoteContextType, INote } from "../@types/note";
import { fetchNotes } from "../API/notes";

export const NoteContext = createContext<NoteContextType>({
  notes: [],
  saveNote: () => {},
  getNotes: () => {},
});

export const NoteProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const dateOptions: Intl.DateTimeFormatOptions = {
    month: "long",
    day: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  };
  const [notes, setNotes] = useState<INote[]>([]);
  const saveNote = (note: INote) => {
    const currentDate = new Date();
    const newNote: INote = {
      title: note.title,
      content: note.content,
      //change to incorporate db later
      id: Math.random(),
      date: currentDate.toLocaleString("en-US", dateOptions).replace("at", "-"),
    };
    setNotes([newNote, ...notes]);
  };

  const getNotes = async () => {
    const notes = await fetchNotes();
    setNotes(notes);
  };
  useEffect(() => {
    getNotes();
  }, []);
  return (
    <NoteContext.Provider value={{ notes, saveNote, getNotes }}>
      {children}
    </NoteContext.Provider>
  );
};
