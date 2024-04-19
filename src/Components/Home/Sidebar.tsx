import { useContext } from "react";
import { SidebarContext } from "../../Context/SidebarContext";

const Sidebar = () => {
  const { sbOpen } = useContext(SidebarContext);
  return (
    <div
      className={`h-screen absolute bg-gray-100 w-5/6 transition-all duration-300  ${
        sbOpen ? "left-0" : "-left-full"
      } xl:w-1/4`}
    ></div>
  );
};

export default Sidebar;
