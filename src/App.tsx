import { RootStoreProvider } from './context/stores.context';
import { NotesTable } from './features/notesTable/notesTable.component';
import { CreateNote } from './features/createNote/createNote.component';
import './App.css';

// adds feat a, iterates on a

// adds feature b. iterates on feat b.

// adds feat c
// adds whatev

// new commit
// new release

// some feature
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
