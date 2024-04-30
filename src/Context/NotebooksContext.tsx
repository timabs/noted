import React, { createContext, useEffect, useState } from "react";
import { Notebook, NotebookContextType } from "../@types/note";
import { getNotebooks } from "../API/NotebooksAPI";

export const NotebooksContext = createContext<NotebookContextType>({
  notebooks: [],
  setNotebooks: () => {},
});

export const NotebookProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  useEffect(() => {
    async function fetchNotebooks() {
      const allNotebooks = await getNotebooks();
      setNotebooks(allNotebooks);
    }
    fetchNotebooks();
  }, []);

  const [notebooks, setNotebooks] = useState<Notebook[]>([]);

  return (
    <NotebooksContext.Provider value={{ notebooks, setNotebooks }}>
      {children}
    </NotebooksContext.Provider>
  );
};
