import { createContext, useState } from "react";
import { NoteContextType, INote } from "../@types/note";

export const NoteContext = createContext<NoteContextType | null>(null);

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
  return (
    <NoteContext.Provider value={{ notes, saveNote }}>
      {children}
    </NoteContext.Provider>
  );
};
