import { FC, useContext, useEffect, useRef, useState } from "react";
import { INote, NoteContextType } from "../../@types/note";
import { deleteNote, editNote } from "../../API/NotesAPI";
import { NoteContext } from "../../Context/NotesContext";
import { OptionsBtn } from "./OptionsBtn";
import AddNotebookModal from "./Modal";

interface OneNoteProps {
  note: INote;
  i: number;
}

export const Note: FC<OneNoteProps> = ({ note, i }) => {
  const [editMode, setEditMode] = useState<boolean>(false);
  const [isExpanded, setIsExpanded] = useState<boolean>(false);
  const [optionsOpen, setOptionsOpen] = useState<boolean>(false);
  const [addModalOpen, setAddModalOpen] = useState<boolean>(false);
  const [contentLength, setContentLength] = useState<number>(0);
  const [errorMessage, setErrorMessage] = useState<string>("");
  const { notes, setNotes } = useContext(NoteContext) as NoteContextType;
  const titleRef = useRef<HTMLHeadingElement>(null);
  const contentRef = useRef<HTMLParagraphElement>(null);
  const maxNoteLength = 10000;
  //options handling
  const handleMenu = () => {
    setOptionsOpen(!optionsOpen);
    setEditMode(false);
  };
  const handleEdit = () => {
    setOptionsOpen(false);
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
  const handleAdd = async () => {
    setAddModalOpen(true);
    setOptionsOpen(false);
  };
  const handleModalClose = () => {
    setAddModalOpen(false);
  };

  //within note handling
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
          <div className="flex flex-row gap-4 items-center">
            <button
              className={`${
                editMode ? "" : "hidden"
              } border rounded-md border-black text-sm px-2 py-1`}
              onClick={() => handleDoneEdit(note._id)}
            >
              done
            </button>
            <img
              src="/ellipsis.png"
              role="button"
              aria-hidden="true"
              className="h-4 pr-2"
              onClick={() => handleMenu()}
            ></img>
            <div
              className={`${
                optionsOpen
                  ? "w-1/2 h-fit border-2 top-9"
                  : "w-0 h-0 top-9 border-2 border-transparent hidden"
              } flex flex-col absolute border-black right-2 rounded-md transition-all duration-200 z-20`}
            >
              <OptionsBtn
                buttonText="edit"
                optionsOpen={optionsOpen}
                onClickFunc={handleEdit}
                noteId={note._id}
              />
              <OptionsBtn
                buttonText="del"
                optionsOpen={optionsOpen}
                onClickFunc={handleDelete}
                noteId={note._id}
              />
              <button
                className={`font-normal rounded-t-md text-sm p-2 ${
                  optionsOpen ? "h-fit border-black border-b-2" : "hidden"
                } bg-white z-10 border-b-0 rounded-b-md`}
                onClick={() => handleAdd()}
              >
                {optionsOpen ? "add to ntbk" : ""}
              </button>
              {/* <OptionsBtn
                buttonText="add to ntbk"
                optionsOpen={optionsOpen}
                onClickFunc={handleAdd}
                noteId={note._id}
                style={{
                  borderBottomLeftRadius: "0.375rem",
                  borderBottomRightRadius: "0.375rem",
                  borderBottom: "0",
                }}
              /> */}
            </div>
            <AddNotebookModal
              addModalOpen={addModalOpen}
              onClose={handleModalClose}
              noteId={note._id}
            />
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
        <div></div>
      </div>
    </div>
  );
};
