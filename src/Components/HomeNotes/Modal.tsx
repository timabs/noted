import React, { useEffect, useState } from "react";
import { addNoteToNotebook, getNotebooks } from "../../API/NotebooksAPI";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
  noteId: string;
}

interface Notebook {
  _id: string;
  user: string;
  title: string;
  notes: string[];
}

const AddNotebookModal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  children,
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

  const selectNotebook = (notebookId: string) => {
    setTentativeNotebookId(notebookId);
  };

  const addNote = async (noteId: string, notebookId: string) => {
    console.log(noteId, notebookId);

    const response = await addNoteToNotebook(noteId, notebookId);
    onClose();
    console.log(response);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
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
              className={`bg-gray-200 w-full p-2 pl-4 flex`}
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
