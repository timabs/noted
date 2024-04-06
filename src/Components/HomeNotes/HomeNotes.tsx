import { FC, useContext, useEffect } from "react";
import { NoteContext } from "../../Context/NotesContext";
import { NoteContextType } from "../../@types/note";
import { Note } from "./SingleNote";
import { v4 as genNewID } from "uuid";

export const HomeNotes: FC = () => {
  const checkTempID = (): void => {
    let tempUser = localStorage.getItem("tempId");
    if (!tempUser) {
      tempUser = genNewID();
      localStorage.setItem("tempId", tempUser);
    }
  };
  //fetch notes and user ID gen
  useEffect(() => {
    checkTempID();
  }, []);
  const { notes } = useContext(NoteContext) as NoteContextType;
  return (
    <div className="flex flex-col gap-4 items-center w-full px-8  xl:items-start">
      {/*each note*/}
      {notes
        ? notes.map((note, i) => <Note note={note} i={i} key={i} />)
        : null}
    </div>
  );
};
