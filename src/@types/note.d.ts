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
