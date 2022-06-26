import { makeAutoObservable } from "mobx";
import { RootStore } from "./root.store";

interface NewNote {
  id: string | undefined;
  title: string | undefined;
  content: string | undefined;
  createdAt: Date | undefined;
  updatedAt: Date | undefined;
  author: string | undefined;
}

const defaultNewNote: NewNote = {
  id: undefined,
  title: undefined,
  content: undefined,
  createdAt: undefined,
  updatedAt: undefined,
  author: undefined,
};

export class CreateNoteStore {
  rootStore: RootStore;
  data: NewNote = defaultNewNote;

  constructor(rootStore: RootStore) {
    this.rootStore = rootStore;
    makeAutoObservable(this);
  }

  updateNewNoteAuthor(author: string) {
    this.data.author = author;
  }

  updateNewNoteTitle(title: string) {
    this.data.title = title;
  }

  updateNewNoteContent(content: string) {
    this.data.content = content;
  }

  clearNewNote() {
    this.data = defaultNewNote;
  }
}
