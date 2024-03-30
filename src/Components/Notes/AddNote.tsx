import { FC } from "react";

export const AddNote: FC = () => {
  return (
    <div className="w-full flex px-8 h-fit flex-col items-end gap-4">
      <button className="border-black border-2 py-1 px-4 w-20 rounded-md h-fit text-center">
        add
      </button>
      {/* New note Box */}
      <div className="flex flex-col rounded-md border-black border-2 w-72 h-96 px-4 py-2 gap-2">
        <label
          htmlFor="note-title"
          className="flex border-b-2 border-gray-400 h-1/6"
        >
          <input
            type="text"
            className="w-full p-2"
            id="note-title"
            placeholder="New Note"
          ></input>
        </label>
        <textarea className="h-4/6 overflow-scroll p-2"></textarea>
        <button className="border-black border-2 py-1 px-4 w-20 rounded-md h-fit text-center self-end">
          done
        </button>
      </div>
    </div>
  );
};
