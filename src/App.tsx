import { RootStoreProvider } from './context/stores.context';
import { NotesTable } from './features/notesTable/notesTable.component';
import { CreateNote } from './features/createNote/createNote.component';
import './App.css';

function App() {
  return (
    <RootStoreProvider>
      <h1>Hello World</h1>
      <CreateNote />
      <NotesTable />
    </RootStoreProvider>
  );
}
// 1
export default App;
