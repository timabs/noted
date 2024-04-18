export interface INote {
  title: string;
  content: string;
  date?: string;
  _id?: number;
}
export type NoteContextType = {
  notes: INote[];
  saveNote: (note: INote) => void;
  getNotes: () => void;
};
