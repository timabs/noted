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
      className={`font-normal rounded-md text-sm p-2 ${
        optionsOpen ? "h-fit border-black border-b-2" : "h-0 border-0"
      } bg-white`}
      onClick={() => onClickFunc(noteId)}
    >
      {optionsOpen ? buttonText : ""}
    </button>
  );
};
