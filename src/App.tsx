import { RootStoreProvider } from './context/stores.context';
import { NotesTable } from './features/notesTable/notesTable.component';
import { CreateNote } from './features/createNote/createNote.component';
import './App.css';

// adds feature 1
// adds feat a

// adds feature b

// adds feat c

function App() {
  return (
    <RootStoreProvider>
      <h1>Hello World</h1>
      <CreateNote />
      <NotesTable />
    </RootStoreProvider>
  );
}

export default App;
