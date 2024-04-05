import { FC } from "react";
import { Body } from "./Body";
import Header from "./Header";
import Sidebar from "./Sidebar";
import BurgerMenu from "./Burger";

export const HomePage: FC = () => {
  return (
    <div className="flex flex-col h-screen xl:items-center font-helv gap-2">
      <div className="flex flex-row h-1/12 xl:w-full">
        <BurgerMenu />
        <Sidebar />
        <Header />
      </div>
      <Body />
    </div>
  );
};
