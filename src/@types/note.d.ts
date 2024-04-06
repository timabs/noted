export interface INote {
  title: string;
  content: string;
  id: number;
  date: string;
}
export type NoteContextType = {
  notes: INote[];
  saveNote: (note: INote) => void;
  getNotes: () => void;
};
