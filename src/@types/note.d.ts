export interface INote {
  title: string;
  content: string;
  date?: string;
  _id: string;
}
export type NoteContextType = {
  notes: INote[];
  saveNote: (note: INote) => void;
  getNotes: () => void;
  setNotes: React.Dispatch<React.SetStateAction<INote[]>>;
};

export interface Notebook {
  _id: string;
  user: string;
  title: string;
  notes: string[];
}

export type NotebookContextType = {
  notebooks: Notebook[];
  setNotebooks: React.Dispatch<SetStateAction<Notebook[]>>;
};
