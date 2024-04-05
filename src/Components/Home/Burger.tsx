import { useContext } from "react";
import { SidebarContext } from "../../Context/SidebarContext";

export default function BurgerMenu() {
  const { sbOpen, setSbOpen } = useContext(SidebarContext);

  const handleClick: () => void = () => {
    setSbOpen(!sbOpen);
  };
  return (
    <div
      className="w-8 flex flex-col gap-1 hover:cursor-pointer z-20 ml-6 mt-8 absolute xl:ml-8"
      onClick={() => handleClick()}
    >
      {/* lines */}
      <div className="h-1 bg-zinc-800"></div>
      <div className="h-1 bg-zinc-800"></div>
      <div className="h-1 bg-zinc-800"></div>
    </div>
  );
}
