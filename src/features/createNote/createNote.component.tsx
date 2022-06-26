import { observer } from "mobx-react-lite";
import { uuidv4 } from "../../logic/uuid.logic";
import { useStores } from "../../context/stores.context";

import "../../styles/form.style.css";

type InputHandler = (e: React.ChangeEvent<HTMLInputElement>) => void;

export const CreateNote = observer(() => {
  // provision the stores from the context
  const { newNoteStore, noteStore } = useStores();

  // Destructure the fields of new note
  const {
    data: { title, content, author },
  } = newNoteStore;

  // handle user input
  const handleTitleChange: InputHandler = (e) => {
    return newNoteStore.updateNewNoteTitle(e.target.value);
  };

  const handleContentChange: InputHandler = (e) => {
    return newNoteStore.updateNewNoteContent(e.target.value);
  };

  const handleAuthorChange: InputHandler = (e) => {
    return newNoteStore.updateNewNoteAuthor(e.target.value);
  };

  const handleAddNote = () => {
    return noteStore.addNote({
      id: uuidv4().toString(),
      title: title || "no title",
      content: content || "no content",
      createdAt: new Date(),
      updatedAt: new Date(),
      author: author || "no author",
    });
  };

  // render a form to create a new note
  return (
    <form data-testid="new-note" onSubmit={(e) => e.preventDefault()}>
      <input
        type="text"
        placeholder="Title"
        value={title || ""}
        onChange={handleTitleChange}
      />
      <input
        type="text"
        placeholder="Content"
        value={content || ""}
        onChange={handleContentChange}
      />
      <input
        type="text"
        placeholder="Author"
        value={author || ""}
        onChange={handleAuthorChange}
      />
      <button
        type="submit"
        onClick={handleAddNote}
        disabled={!title || !content || !author}
      >
        Add note
      </button>
    </form>
  );
});
