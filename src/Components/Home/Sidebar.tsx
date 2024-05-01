import { useContext } from "react";
import { SidebarContext } from "../../Context/SidebarContext";
import { NotebooksContext } from "../../Context/NotebooksContext";
import { NotebookContextType } from "../../@types/note";

const Sidebar = () => {
  const { sbOpen } = useContext(SidebarContext);
  const { notebooks } = useContext(NotebooksContext) as NotebookContextType;
  return (
    <div
      className={`h-screen absolute bg-gray-100 w-5/6 transition-all duration-300  ${
        sbOpen ? "left-0" : "-left-full"
      } xl:w-1/4 z-20`}
    >
      <div className="flex flex-col mt-24 gap-4">
        <h2 className="text-4xl font-bold ml-6">Notebooks</h2>
        <div className="flex flex-col gap-2">
          {notebooks.map((notebook, index) => (
            <span
              className={`${
                index === notebooks.length - 1 ? "" : "border-b-2"
              } flex w-full text-xl bg-white pl-6 py-2`}
              key={index}
            >
              {notebook.title}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
