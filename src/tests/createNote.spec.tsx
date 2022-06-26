// Test Libs
import { screen } from "@testing-library/dom";
import { fireEvent } from "@testing-library/react";

// Test setup
import { customRender } from "./providers.mocks";

// App code
import { CreateNote } from "../features/createNote/createNote.component";

describe("Create note test suite", () => {
  it("should render an input form", () => {
    const { getByTestId } = customRender(<CreateNote />);

    const form = getByTestId("new-note");

    expect(form).toBeInTheDocument();
    expect(form).toBeVisible();
  });

  it("should render an input for title", () => {
    const { getByPlaceholderText } = customRender(<CreateNote />);

    const titleInput = getByPlaceholderText("Title");

    expect(titleInput).toBeInTheDocument();
    expect(titleInput).toBeVisible();
  });

  it("should render an input for content", () => {
    const { getByPlaceholderText } = customRender(<CreateNote />);

    const contentInput = getByPlaceholderText("Content");

    expect(contentInput).toBeInTheDocument();
    expect(contentInput).toBeVisible();
  });

  it("should render an input for author", () => {
    const { getByPlaceholderText } = customRender(<CreateNote />);

    const authorInput = getByPlaceholderText("Author");

    expect(authorInput).toBeInTheDocument();
    expect(authorInput).toBeVisible();
  });

  it("should render a button to add a note", () => {
    const { getByText } = customRender(<CreateNote />);

    const addNoteButton = getByText("Add note");

    expect(addNoteButton).toBeInTheDocument();
    expect(addNoteButton).toBeVisible();
  });

  it("should disable the button when the form is invalid", () => {
    const { getByText } = customRender(<CreateNote />);

    const addNoteButton = getByText("Add note");

    expect(addNoteButton).toBeInTheDocument();
    expect(addNoteButton).toBeVisible();
    expect(addNoteButton).toBeDisabled();
  });

  it("should enable the button when the form is valid", async () => {
    // arrange: render the component
    const { debug, container } = customRender(<CreateNote />);

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
