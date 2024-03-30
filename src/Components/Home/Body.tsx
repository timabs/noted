import { FC } from "react";
import { AddNote } from "../Notes/AddNote";

export const Body: FC = () => {
  return (
    <div className="h-5/6 w-full text-xl flex">
      <AddNote />
    </div>
  );
};
