import { useContext } from "react";
import { SidebarContext } from "../../Context/SidebarContext";

const Sidebar = () => {
  const { sbOpen } = useContext(SidebarContext);
  return (
    <div
      className={`h-screen absolute bg-gray-300 w-5/6 transition-all duration-300  ${
        sbOpen ? "left-0" : "-left-full"
      }`}
    ></div>
  );
};

export default Sidebar;
