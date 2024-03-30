import { FC, useContext } from "react";
import { NoteContext } from "../../Context/NotesContext";
import { NoteContextType } from "../../@types/note";

export const Notes: FC = () => {
  const { notes } = useContext(NoteContext) as NoteContextType;
  return (
    <div className="flex flex-col gap-4 items-center w-full px-8  xl:items-start">
      {/*each note*/}
      {notes.map((note, i) => (
        <div
          className="border-2 border-black rounded-md p-2 w-full xl:w-1/3 flex flex-col"
          key={i}
        >
          <h1 className="font-bold">{note.title}</h1>
          <p>{note.content}</p>
          <span className="text-sm italic self-end">{note.date}</span>
        </div>
      ))}
    </div>
  );
};
