import { RootStoreProvider } from "./context/stores.context";
import { NotesTable } from "./features/notesTable/notesTable.component";
import { CreateNote } from "./features/createNote/createNote.component";

import "./App.css";

function App() {
  return (
    <RootStoreProvider>
      <CreateNote />
      <NotesTable />
    </RootStoreProvider>
  );
}

export default App;
