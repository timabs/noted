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
  const [contentLength, setContentLength] = useState<number>(0);
  const [errorMessage, setErrorMessage] = useState<string>("");
  const { notes, setNotes } = useContext(NoteContext) as NoteContextType;
  const titleRef = useRef<HTMLHeadingElement>(null);
  const contentRef = useRef<HTMLParagraphElement>(null);
  const maxNoteLength = 10000;
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
    contentRef.current!.scrollTop = 0;
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
  const handleKeyDown = (e: React.KeyboardEvent<HTMLParagraphElement>) => {
    if (contentLength >= maxNoteLength) {
      setErrorMessage("Max note length reached!");
      if (e.key != "Backspace") {
        e.preventDefault();
      } else {
        setErrorMessage("");
      }
    }
  };
  const handleInput = () => {
    const noteLength = contentRef.current!.innerText.length;
    setContentLength(noteLength);
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
      <div className="relative">
        <div
          className={`${
            errorMessage ? "" : "hidden"
          } w-full h-12 bg-red-700 text-white absolute transition-all duration-200 text-sm rounded-md text-center flex items-center justify-center -bottom-8`}
        >
          <span>{errorMessage}</span>
        </div>
        <div className="flex flex-row items-center justify-between w-full">
          <h1
            className={`font-bold flex flex-row justify-between p-2 max-h-12 text-lg truncate max-w-36 min-w-12 sm:max-w-48`}
            contentEditable={editMode}
            ref={titleRef}
          >
            <span className={`${editMode ? "" : "truncate"}`}>
              {note.title}
            </span>
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
          } break-words overflow-auto flex flex-col text-sm min-h-24 p-2 transition-all duration-300`}
          contentEditable={editMode}
          ref={contentRef}
          tabIndex={editMode ? 0 : -1}
          onInput={() => handleInput()}
          onKeyDown={(e) => handleKeyDown(e)}
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
