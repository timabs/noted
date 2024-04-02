import { FC, useContext } from "react";
import { NoteContext } from "../../Context/NotesContext";
import { NoteContextType } from "../../@types/note";
import { Note } from "./SingleNote";

export const HomeNotes: FC = () => {
  const { notes } = useContext(NoteContext) as NoteContextType;
  return (
    <div className="flex flex-col gap-4 items-center w-full px-8  xl:items-start">
      {/*each note*/}
      {notes.map((note, i) => (
        <Note note={note} i={i} key={i} />
      ))}
    </div>
  );
};
