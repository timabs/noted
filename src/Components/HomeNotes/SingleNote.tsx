import { FC } from "react";
import { INote } from "../../@types/note";

interface OneNoteProps {
  note: INote;
  i: number;
}

export const Note: FC<OneNoteProps> = ({ note, i }) => {
  return (
    <div
      className="border-2 border-black rounded-md p-2 w-full xl:w-1/3 flex flex-col"
      key={i}
    >
      <h1 className="font-bold">{note.title}</h1>
      <p>{note.content}</p>
      <span className="text-sm italic self-end">{note.date}</span>
    </div>
  );
};
