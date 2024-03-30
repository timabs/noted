import { HomePage } from "./Components/Home/HomePage";
import { NoteProvider } from "./Context/NotesContext";
import { SbProvider } from "./Context/SidebarContext";

function App() {
  return (
    <>
      <NoteProvider>
        <SbProvider>
          <HomePage />
        </SbProvider>
      </NoteProvider>
    </>
  );
}

export default App;
