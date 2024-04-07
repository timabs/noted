import { FC, FormEvent, useContext, useRef, useState } from "react";
import { NoteContext } from "../../Context/NotesContext";
import { INote, NoteContextType } from "../../@types/note";

export const AddNote: FC = () => {
  const [newOpen, setNewOpen] = useState<boolean>(false);
  const { saveNote } = useContext(NoteContext) as NoteContextType;
  const [formData, setFormData] = useState<INote | {}>();
  const titleRef = useRef<HTMLInputElement>(null);
  const contentRef = useRef<HTMLTextAreaElement>(null);

  const handleChange = (
    e: FormEvent<HTMLInputElement | HTMLTextAreaElement>
  ): void => {
    setFormData({
      ...formData,
      [e.currentTarget.id]: e.currentTarget.value,
    });
  };

  const resetPlaceholders = () => {
    titleRef.current!.placeholder = "New Note";
    contentRef.current!.placeholder = "Enter your note text...";
  };

  const handleSubmit = (e: FormEvent, formData: INote | any) => {
    e.preventDefault();
    if (formData) {
      saveNote(formData);
      setNewOpen(false);
      setFormData({});
    } else {
      titleRef.current!.placeholder = "Note can't be empty!";
      contentRef.current!.placeholder = "Note can't be empty!";
      setTimeout(() => {
        resetPlaceholders();
      }, 2000);
    }
    titleRef.current!.value = "";
    contentRef.current!.value = "";
  };
  return (
    <div className="w-full flex px-8 h-fit flex-col items-end">
      <button
        className="py-1 w-16 rounded-md h-fit text-center flex justify-end items-center"
        onClick={() => setNewOpen(!newOpen)}
        type="button"
      >
        <svg
          version="1.1"
          id="Layer_1"
          xmlns="http://www.w3.org/2000/svg"
          xmlnsXlink="http://www.w3.org/1999/xlink"
          x="0px"
          y="0px"
          width="2rem"
          height="2rem"
          viewBox="0 0 122.879 122.879"
          enableBackground="new 0 0 122.879 122.879"
          xmlSpace="preserve"
        >
          <g>
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M104.885,17.995c23.993,23.994,23.993,62.896,0,86.89 c-23.994,23.993-62.896,23.993-86.89,0c-23.993-23.994-23.993-62.896,0-86.89C41.989-5.998,80.891-5.998,104.885,17.995 L104.885,17.995z M93.607,57.949c1.928,0,3.49,1.563,3.49,3.49c0,1.928-1.563,3.49-3.49,3.49H64.93v28.678 c0,1.928-1.563,3.49-3.49,3.49c-1.927,0-3.489-1.563-3.489-3.49V64.93H29.272c-1.928,0-3.491-1.563-3.491-3.49 c0-1.927,1.563-3.49,3.491-3.49H57.95V29.271c0-1.927,1.563-3.49,3.489-3.49c1.928,0,3.49,1.563,3.49,3.49v28.678H93.607 L93.607,57.949z"
            />
          </g>
        </svg>
      </button>
      {/* New note Box */}
      <form
        className={`${
          newOpen ? "flex" : "hidden"
        } flex flex-col rounded-md border-black border-2 w-11/12 h-96 px-4 py-2 gap-2`}
        onSubmit={(e) => handleSubmit(e, formData)}
      >
        <label
          htmlFor="title"
          className="flex border-b-2 border-gray-400 h-3/12"
        >
          <input
            type="text"
            className="w-full p-2"
            id="title"
            placeholder="New Note"
            onChange={handleChange}
            ref={titleRef}
          ></input>
        </label>
        <label htmlFor="content" className="h-4/6">
          <textarea
            className="h-full overflow-y-auto p-2 resize-none w-full placeholder:text-sm"
            id="content"
            onChange={handleChange}
            ref={contentRef}
            placeholder="Enter your note text..."
            title="note-content"
          ></textarea>
        </label>
        <button
          className="border-black border-2 py-1 px-4 w-20 rounded-md h-fit text-center self-end"
          type="submit"
        >
          done
        </button>
      </form>
    </div>
  );
};
