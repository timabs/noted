import { FC, useContext, useEffect, useRef, useState } from "react";
import { INote, NoteContextType } from "../../@types/note";
import { deleteNote } from "../../API/notes";
import { NoteContext } from "../../Context/NotesContext";

interface OneNoteProps {
  note: INote;
  i: number;
}

export const Note: FC<OneNoteProps> = ({ note, i }) => {
  const [editMode, setEditMode] = useState<boolean>(false);
  const { notes, setNotes } = useContext(NoteContext) as NoteContextType;
  const titleRef = useRef<HTMLHeadingElement>(null);
  const contentRef = useRef<HTMLParagraphElement>(null);
  const handleEdit = () => {
    setEditMode(true);
  };
  const handleDoneEdit = () => {
    titleRef.current!.scrollLeft = 0;
    setEditMode(false);
  };
  const handleDelete = async (id: string) => {
    await deleteNote(id);
    const newNotes = notes.filter((note) => note._id != id);
    setNotes(newNotes);
  };

  useEffect(() => {
    if (editMode && contentRef.current) {
      setTimeout(() => {
        contentRef.current!.focus();
      }, 0);
    }
  }, [editMode]);
  return (
    <div
      className={`font-helv border-2 border-black rounded-md p-2 w-full xl:w-1/3 flex flex-col min-h-48 justify-between h-1/3 max-h-56`}
      key={i}
      data-id={note._id}
    >
      <div>
        <div className="flex flex-row items-center justify-between w-full">
          <h1
            className={`font-bold flex flex-row justify-between p-2 max-h-12 text-lg truncate max-w-36`}
            contentEditable={editMode}
            ref={titleRef}
          >
            {note.title}{" "}
          </h1>
          <div className="flex flex-row gap-1">
            <button
              className={`${
                editMode ? "hidden" : ""
              } font-normal border border-black rounded-sm text-sm px-2 h-1/2`}
              onClick={() => handleEdit()}
            >
              edit
            </button>
            <button
              className={`${
                editMode ? "" : "hidden"
              } font-normal border border-black rounded-sm text-sm px-2 h-1/2`}
              onClick={() => handleDoneEdit()}
            >
              done
            </button>
            <button
              className={`font-normal border border-black rounded-sm text-sm px-2 h-1/2`}
              onClick={() => handleDelete(note._id)}
            >
              del
            </button>
          </div>
        </div>

        <p
          className={`${
            editMode ? "outline-2 outline-black outline-solid" : "outline-none"
          }break-words overflow-auto flex flex-col max-h-32 text-sm min-h-24 p-2`}
          contentEditable={editMode}
          ref={contentRef}
          tabIndex={editMode ? 0 : -1}
        >
          {note.content}
        </p>
      </div>

      <span className="text-sm italic self-end justify-self-end">
        {note.date}
      </span>
    </div>
  );
};
