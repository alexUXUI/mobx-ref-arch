// Test Libs
import { fireEvent, screen } from "@testing-library/react";

// Test set up
import { customRender } from "./providers.mocks";

// App code
import App from "../App";

describe("Component Integration Test Suite", () => {
  it("Should fill out the form, hit add note button, and see the results in the table", () => {
    // arrange: render the component
    customRender(<App />);

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

    // act: simulate user clicking the button
    fireEvent.click(addNoteButton);

    // assert: the button should be disabled
    expect(addNoteButton).toBeDisabled();

    // assert: the new note is in the table
    screen.getByText("New Note");
    screen.getByText("New Content");
    screen.getByText("New Author");
  });
});
