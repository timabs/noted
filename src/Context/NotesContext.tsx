import { createContext, useEffect, useState } from "react";
import { NoteContextType, INote } from "../@types/note";
import { createNote, fetchNotes } from "../API/notes";

export const NoteContext = createContext<NoteContextType>({
  notes: [],
  saveNote: () => {},
  getNotes: () => {},
});

export const NoteProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [notes, setNotes] = useState<INote[]>([]);
  const saveNote = async (note: INote) => {
    const newNote: INote = {
      title: note.title,
      content: note.content,
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
    <NoteContext.Provider value={{ notes, saveNote, getNotes }}>
      {children}
    </NoteContext.Provider>
  );
};
