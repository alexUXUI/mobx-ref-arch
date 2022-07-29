// Test Libs
import { screen } from "@testing-library/react";
import { fireEvent } from "@testing-library/react";

// Test setup
import { customRender } from "./providers.mocks";

// App code
import { CreateNote } from "../features/createNote/createNote.component";

// symbolic change

describe("Create note test suite", () => {
  it("should render an input form", () => {
    customRender(<CreateNote />);

    const form = screen.getByTestId("new-note");

    expect(form).toBeInTheDocument();
    expect(form).toBeVisible();

    // test
  });

  it("should render an input for title", () => {
    customRender(<CreateNote />);

    const titleInput = screen.getByPlaceholderText("Title");

    expect(titleInput).toBeInTheDocument();
    expect(titleInput).toBeVisible();
  });

  it("should render an input for content", () => {
    customRender(<CreateNote />);

    const contentInput = screen.getByPlaceholderText("Content");

    expect(contentInput).toBeInTheDocument();
    expect(contentInput).toBeVisible();
  });

  it("should render an input for author", () => {
    customRender(<CreateNote />);

    const authorInput = screen.getByPlaceholderText("Author");

    expect(authorInput).toBeInTheDocument();
    expect(authorInput).toBeVisible();
  });

  it("should render a button to add a note", () => {
    customRender(<CreateNote />);

    const addNoteButton = screen.getByText("Add note");

    expect(addNoteButton).toBeInTheDocument();
    expect(addNoteButton).toBeVisible();
  });

  it("should disable the button when the form is invalid", () => {
    customRender(<CreateNote />);

    const addNoteButton = screen.getByText("Add note");

    expect(addNoteButton).toBeInTheDocument();
    expect(addNoteButton).toBeVisible();
    expect(addNoteButton).toBeDisabled();
  });

  it("should enable the button when the form is valid", async () => {
    customRender(<CreateNote />);

    // get a reference to all the input fields and the button
    const titleInput = screen.getByPlaceholderText("Title");
    const contentInput = screen.getByPlaceholderText("Content");
    const authorInput = screen.getByPlaceholderText("Author");
    const addNoteButton = screen.getByText("Add note");

    // act: simulate user input
    fireEvent.change(titleInput, { target: { value: "New Note" } });
    fireEvent.change(contentInput, { target: { value: "New Content" } });
    fireEvent.change(authorInput, { target: { value: "New Author" } });

    // assert: the button should be enabled
    expect(addNoteButton).toBeEnabled();
  });
});
