import { FC, useContext, useEffect, useRef, useState } from "react";
import { INote, NoteContextType } from "../../@types/note";
import { deleteNote, editNote } from "../../API/NotesAPI";
import { NoteContext } from "../../Context/NotesContext";

interface OneNoteProps {
  note: INote;
  i: number;
}

export const Note: FC<OneNoteProps> = ({ note, i }) => {
  const [editMode, setEditMode] = useState<boolean>(false);
  const [isExpanded, setIsExpanded] = useState<boolean>(false);
  const { notes, setNotes } = useContext(NoteContext) as NoteContextType;
  const titleRef = useRef<HTMLHeadingElement>(null);
  const contentRef = useRef<HTMLParagraphElement>(null);
  const handleEdit = () => {
    setEditMode(true);
  };
  const handleDoneEdit = async (id: string) => {
    const editedNote: INote = {
      title: titleRef.current!.innerText,
      content: contentRef.current!.innerText,
      _id: id,
    };
    titleRef.current!.scrollLeft = 0;
    setEditMode(false);
    await editNote(editedNote, editedNote._id);
  };
  const handleDelete = async (id: string) => {
    await deleteNote(id);
    const newNotes = notes.filter((note) => note._id != id);
    setNotes(newNotes);
  };
  const handleExpand = () => {
    setIsExpanded(!isExpanded);
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
      className={`${
        isExpanded ? "h-96" : "h-56"
      } font-helv border-2 border-black rounded-md p-2 w-full xl:w-1/3 flex flex-col min-h-48 justify-between h-1/3 transition-all duration-300`}
      key={i}
      data-id={note._id}
    >
      <div>
        <div className="flex flex-row items-center justify-between w-full">
          <h1
            className={`font-bold flex flex-row justify-between p-2 max-h-12 text-lg truncate max-w-36 min-w-12`}
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
              onClick={() => handleDoneEdit(note._id)}
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
          className={`${isExpanded ? "h-72" : "h-32"} ${
            editMode ? "outline-2 outline-black outline-solid" : "outline-none"
          }break-words overflow-auto flex flex-col text-sm min-h-24 p-2 transition-all duration-300`}
          contentEditable={editMode}
          ref={contentRef}
          tabIndex={editMode ? 0 : -1}
        >
          {note.content}
        </p>
      </div>
      <div className="flex flex-row justify-end gap-4 items-center">
        <span className="text-sm italic self-end justify-self-end">
          {note.date}
        </span>
        <img
          src="/expand.png"
          className="w-4 h-4"
          role="button"
          onClick={() => handleExpand()}
        ></img>
      </div>
    </div>
  );
};
