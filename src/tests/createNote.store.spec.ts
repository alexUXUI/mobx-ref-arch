import { CreateNoteStore } from "../stores/createNote.store";
import { RootStore } from "../stores/root.store";
import data from "../fixtures/notes.fixtures.json";

const rootStore = new RootStore();

// test the createNote store
describe("CreateNoteStore Test Suite", () => {
  it("should create a new note", () => {
    const createNoteStore = new CreateNoteStore(rootStore);
    expect(createNoteStore).toBeDefined();
  });

  it("should update the new note author", () => {
    const createNoteStore = new CreateNoteStore(rootStore);
    createNoteStore.updateNewNoteAuthor("test");
    expect(createNoteStore.data.author).toBe("test");
  });

  it("should update the new note title", () => {
    const createNoteStore = new CreateNoteStore(rootStore);
    createNoteStore.updateNewNoteTitle("test");
    expect(createNoteStore.data.title).toBe("test");
  });

  it("should update the new note content", () => {
    const createNoteStore = new CreateNoteStore(rootStore);
    createNoteStore.updateNewNoteContent("test");
    expect(createNoteStore.data.content).toBe("test");
  });

  it("should clear the new note", () => {
    const createNoteStore = new CreateNoteStore(rootStore);
    createNoteStore.clearNewNote();
    expect(createNoteStore.data).toEqual({
      id: undefined,
      title: undefined,
      content: undefined,
      createdAt: undefined,
      updatedAt: undefined,
    });
  });
});
