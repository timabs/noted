import { useContext } from "react";
import { SidebarContext } from "../../Context/SidebarContext";

export default function BurgerMenu() {
  const { sbOpen, setSbOpen } = useContext(SidebarContext);

  const handleClick: () => void = () => {
    console.log("sb opened/closed");
    setSbOpen(!sbOpen);
  };
  return (
    <div
      className="w-10 flex flex-col gap-2 hover:cursor-pointer z-20 ml-8 mt-8 absolute"
      onClick={() => handleClick()}
    >
      {/* lines */}
      <div className="h-1 bg-zinc-800"></div>
      <div className="h-1 bg-zinc-800"></div>
      <div className="h-1 bg-zinc-800"></div>
    </div>
  );
}
