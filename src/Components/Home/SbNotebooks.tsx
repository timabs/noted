import { FC, useContext, useEffect, useState } from "react";
import {
  INote,
  NoteContextType,
  Notebook,
  NotebookContextType,
} from "../../@types/note";
import { NotebooksContext } from "../../Context/NotebooksContext";
import { NoteContext } from "../../Context/NotesContext";
import { getNotesInNotebook } from "../../API/NotebooksAPI";
interface SbNotebookProps {
  notebook: Notebook;
  index: number;
}

export const SbNotebooks: FC<SbNotebookProps> = ({ notebook, index }) => {
  const { notes } = useContext(NoteContext) as NoteContextType;
  const [fullNotes, setFullNotes] = useState<[]>([]);
  useEffect(() => {
    async function getFullNotes() {
      const retrievedFullNotes = await getNotesInNotebook(notebook._id);
      setFullNotes(retrievedFullNotes);
    }
    getFullNotes();
  }, [notes]);
  const { notebooks } = useContext(NotebooksContext) as NotebookContextType;
  return (
    <div>
      <span
        className={`${
          index === notebooks.length - 1 ? "" : "border-b-2"
        } flex w-full text-xl bg-white pl-6 py-2`}
        key={index}
      >
        {notebook.title}
      </span>
      {fullNotes?.map((fullNote: INote) => (
        <span className={`text-sm w-full flex pl-6 font-bold underline`}>
          {fullNote.title}
        </span>
      ))}
    </div>
  );
};
