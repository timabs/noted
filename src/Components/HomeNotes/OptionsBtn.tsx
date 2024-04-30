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
  style?: Object;
}
export const OptionsBtn: FC<OptionsProps> = ({
  buttonText,
  optionsOpen,
  onClickFunc,
  noteId,
  style,
}) => {
  return (
    <button
      className={`font-normal rounded-t-md text-sm p-2 ${
        optionsOpen ? "h-fit border-black border-b-2" : "h-0 border-0"
      } bg-white z-10`}
      onClick={() => onClickFunc(noteId)}
      style={style}
    >
      {optionsOpen ? buttonText : ""}
    </button>
  );
};
