import { FC, useContext } from "react";
import { Notebook, NotebookContextType } from "../../@types/note";
import { NotebooksContext } from "../../Context/NotebooksContext";
interface SbNotebookProps {
  notebook: Notebook;
  index: number;
}

export const SbNotebooks: FC<SbNotebookProps> = ({ notebook, index }) => {
  const { notebooks } = useContext(NotebooksContext) as NotebookContextType;
  return (
    <div>
      <span
        className={`${
          index === notebooks.length - 1 ? "" : "border-b-2"
        } flex w-full text-xl bg-white pl-6 py-2`}
        key={index}
      >
        {notebook.title}
      </span>
    </div>
  );
};
