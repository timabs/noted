import BurgerMenu from "./Burger";

export default function Header() {
  return (
    <header className="text-6xl h-1/6 w-full text-center p-8 flex">
      <BurgerMenu />
      <h1 className="w-full">...noted</h1>
    </header>
  );
}
