import { makeAutoObservable, runInAction } from "mobx";
import { RootStore } from "./root.store";
import data from "../fixtures/notes.fixtures.json";

export interface Note {
  id: string;
  title: string;
  content: string;
  createdAt: Date;
  updatedAt: Date;
  author: string;
}
// yyeeee
const defaultNotes: Note[] = [
  ...data.notes.map((note) => {
    return {
      ...note,
      createdAt: new Date(note.createdAt),
      updatedAt: new Date(note.updatedAt),
    };
  }),
];

export class NoteStore {
  // stores all the notes
  notes: Note[] = defaultNotes;

  // ref to the root store, initalized in the constructor
  rootStore: RootStore;

  constructor(rootStore: RootStore) {
    this.rootStore = rootStore;

    // mobx sugar to make everthything in this class observable
    makeAutoObservable(this);
  }

  // Mobx action that allows us to add a note to the store
  addNote(note: Note) {
    const { newNoteStore } = this.rootStore;

    // add a note to the root store
    this.notes.push(note);

    // Call an action from another store to clear the new note store
    runInAction(() => {
      newNoteStore.clearNewNote();
    });
  }
}
