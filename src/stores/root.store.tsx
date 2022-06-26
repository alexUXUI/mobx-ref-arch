import { autorun } from "mobx";
import { NoteStore } from "./notes.store";
import { CreateNoteStore } from "./createNote.store";

export class RootStore {
  noteStore: NoteStore;
  newNoteStore: CreateNoteStore;

  constructor() {
    // create the stores and pass them the 'this' context
    // so that they can access the root store
    this.noteStore = new NoteStore(this);
    this.newNoteStore = new CreateNoteStore(this);

    // report any changes to the console
    autorun(() => {});
  }
}
