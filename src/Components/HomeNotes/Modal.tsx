import React, { useEffect, useState } from "react";
import { addNoteToNotebook, getNotebooks } from "../../API/NotebooksAPI";
import { Notebook } from "../../@types/note";

interface ModalProps {
  addModalOpen: boolean;
  onClose: () => void;
  noteId: string;
}

const AddNotebookModal: React.FC<ModalProps> = ({
  addModalOpen,
  onClose,
  noteId,
}) => {
  const [notebooks, setNotebooks] = useState<Notebook[]>([]);
  const [tentativeNotebookId, setTentativeNotebookId] = useState<string>();
  useEffect(() => {
    async function fetchNotebooks() {
      const allNotebooks = await getNotebooks();
      setNotebooks(allNotebooks);
    }
    fetchNotebooks();
  }, []);

  useEffect(() => {
    console.log(`Add Modal Open: ${addModalOpen}`);
  }, [addModalOpen]);
  const selectNotebook = (notebookId: string) => {
    if (notebookId === tentativeNotebookId) {
      setTentativeNotebookId("");
    } else {
      setTentativeNotebookId(notebookId);
    }
  };

  const addNote = async (noteId: string, notebookId: string) => {
    console.log(noteId, notebookId);
    await addNoteToNotebook(noteId, notebookId);
    onClose();
  };

  return (
    <div
      className={`${
        addModalOpen ? "" : "hidden"
      } fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50`}
    >
      <div className="relative top-20 mx-auto border w-96 shadow-lg rounded-md bg-white">
        <div className="flex justify-between items-center">
          <h4 className="text-lg font-medium text-gray-900 p-4 italic">
            all notebooks
          </h4>
          <button
            onClick={onClose}
            className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-2 pr-4 ml-auto inline-flex items-center"
          >
            <svg
              className="w-5 h-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>
        <div className="mt-2 w-full">
          {notebooks.map((notebook, index) => (
            <span
              key={index}
              className={`${
                tentativeNotebookId === notebook._id
                  ? "border-y-2 border-black"
                  : ""
              } bg-gray-100 w-full p-2 pl-4 flex`}
              onClick={() => selectNotebook(notebook._id)}
            >
              {notebook.title}
            </span>
          ))}
        </div>
        <div className="mt-4 flex justify-end p-4">
          <button
            onClick={() => addNote(noteId, tentativeNotebookId!)}
            className="px-4 py-2 bg-blue-500 text-white text-base font-medium rounded-md w-24 hover:bg-blue-700"
          >
            Select
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddNotebookModal;
