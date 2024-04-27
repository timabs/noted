//props needed:
//1. button text
//2. optionsOpen state
//3. onClick function
//4. note id
import { FC } from "react";

interface OptionsProps {
  buttonText: string;
  optionsOpen: boolean;
  onClickFunc: (id: string) => void;
  noteId: string;
}
export const OptionsBtn: FC<OptionsProps> = ({
  buttonText,
  optionsOpen,
  onClickFunc,
  noteId,
}) => {
  return (
    <button
      className={`font-normal rounded-sm text-sm p-2 ${
        optionsOpen ? "h-fit border-b-2 border-black" : "h-0 border-0"
      }`}
      onClick={() => onClickFunc(noteId)}
    >
      {optionsOpen ? buttonText : ""}
    </button>
  );
};
