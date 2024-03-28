import Header from "./Header";
import Sidebar from "./Sidebar";

export default function HomePage() {
  return (
    <div className="flex flex-row">
      <Sidebar />
      <Header />
    </div>
  );
}
