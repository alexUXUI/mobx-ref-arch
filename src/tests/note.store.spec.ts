import { NoteStore } from "../stores/notes.store";
import { RootStore } from "../stores/root.store";

const rootStore = new RootStore();

// spec change

describe("NoteStore Test Suite", () => {
  it("should exist", () => {
    const noteStore = new NoteStore(rootStore);
    expect(noteStore).toBeDefined();
  });

  it("should add a note", () => {
    const noteStore = new NoteStore(rootStore);
    noteStore.addNote({
      id: "1",
      title: "Test Note",
      content: "This is a test note",
      createdAt: new Date(),
      updatedAt: new Date(),
      author: "test",
    });
    expect(noteStore.notes.length).toBe(3);
  });
});
