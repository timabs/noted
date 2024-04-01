import { FC } from "react";
import { AddNote } from "../HomeNotes/AddNote";
import { HomeNotes } from "../HomeNotes/HomeNotes";

export const Body: FC = () => {
  return (
    <div className="h-5/6 w-full text-xl flex flex-col gap-4">
      <AddNote />
      <HomeNotes />
    </div>
  );
};
