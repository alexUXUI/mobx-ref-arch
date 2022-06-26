import { observer } from "mobx-react";
import { Note } from "../../stores/notes.store";
import { useStores } from "../../context/stores.context";

import "../../styles/table.style.css";

export const NotesTable = observer(() => {
  const { noteStore } = useStores();

  return (
    <table data-testid="notes-table">
      <thead>
        <tr>
          <th>Title</th>
          <th>Content</th>
          <th>Author</th>
          <th>Created At</th>
          <th>Updated At</th>
        </tr>
      </thead>
      <tbody>
        {noteStore.notes.map((note: Note) => (
          <tr key={note.id}>
            <td>{note.title}</td>
            <td>{note.content}</td>
            <td>{note.author}</td>
            <td>{note.createdAt.toLocaleDateString()}</td>
            <td>{note.updatedAt.toLocaleDateString()}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
});
