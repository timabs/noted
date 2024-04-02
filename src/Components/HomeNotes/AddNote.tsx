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

  const handleSubmit = (e: FormEvent, formData: INote | any) => {
    e.preventDefault();
    saveNote(formData);
    setNewOpen(false);
    setFormData({});
    titleRef.current!.value = "";
    contentRef.current!.value = "";
  };
  return (
    <div className="w-full flex px-8 h-fit flex-col items-end gap-4">
      <button
        className="border-black border-2 py-1 px-4 w-20 rounded-md h-fit text-center"
        onClick={() => setNewOpen(!newOpen)}
      >
        add
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
            className="h-full overflow-y-auto p-2 resize-none"
            id="content"
            onChange={handleChange}
            ref={contentRef}
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
