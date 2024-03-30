import { HomePage } from "./Components/Home/HomePage";
import { SbProvider } from "./Context/SidebarContext";

function App() {
  return (
    <>
      <SbProvider>
        <HomePage />
      </SbProvider>
    </>
  );
}

export default App;
