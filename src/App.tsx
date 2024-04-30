import { HomePage } from "./Components/Home/HomePage";
import { NotebookProvider } from "./Context/NotebooksContext";
import { NoteProvider } from "./Context/NotesContext";
import { SbProvider } from "./Context/SidebarContext";

function App() {
  return (
    <>
      <NotebookProvider>
        <NoteProvider>
          <SbProvider>
            <HomePage />
          </SbProvider>
        </NoteProvider>
      </NotebookProvider>
    </>
  );
}

export default App;
