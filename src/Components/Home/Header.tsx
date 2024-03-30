import BurgerMenu from "./Burger";

export default function Header() {
  return (
    <header className="text-6xl w-full text-center px-8 pt-8 flex">
      <BurgerMenu />
      <h1 className="w-full">...noted</h1>
    </header>
  );
}
