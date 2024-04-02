import { FC } from "react";
import { AddNote } from "../HomeNotes/AddNote";
import { HomeNotes } from "../HomeNotes/HomeNotes";

export const Body: FC = () => {
  return (
    <div className="h-5/6 w-full text-xl flex flex-col gap-4 xl:w-1/2">
      <AddNote />
      <HomeNotes />
    </div>
  );
};
