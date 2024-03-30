import { FC } from "react";
import { Body } from "./Body";
import Header from "./Header";
import Sidebar from "./Sidebar";

export const HomePage: FC = () => {
  return (
    <div className="flex flex-col h-screen">
      <div className="flex flex-row h-1/6">
        <Sidebar />
        <Header />
      </div>
      <Body />
    </div>
  );
};
