import { FC } from "react";
import { INote } from "../../@types/note";

interface OneNoteProps {
  note: INote;
  i: number;
}

export const Note: FC<OneNoteProps> = ({ note, i }) => {
  return (
    <div
      className="border-2 border-black rounded-md p-2 w-full xl:w-1/3 flex flex-col min-h-48 justify-between h-1/3 max-h-52"
      key={i}
    >
      <div>
        <h1 className="font-bold">{note.title}</h1>
        <p className="break-words overflow-auto flex flex-col max-h-32 text-sm">
          {note.content}
        </p>
      </div>

      <span className="text-sm italic self-end justify-self-end">
        {note.date}
      </span>
    </div>
  );
};
