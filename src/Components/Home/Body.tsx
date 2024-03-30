import { FC } from "react";
import { AddNote } from "../Notes/AddNote";
import { Notes } from "../Notes/Notes";

export const Body: FC = () => {
  return (
    <div className="h-5/6 w-full text-xl flex flex-col gap-4">
      <AddNote />
      <Notes />
    </div>
  );
};
