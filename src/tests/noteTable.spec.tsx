// Test Libs
import { screen } from "@testing-library/react";

// Test setup
import { customRender } from "./providers.mocks";

// App code
import { NotesTable } from "../features/notesTable/notesTable.component";

describe("Table test suite", () => {
  it("should render table", () => {
    customRender(<NotesTable />);

    const table = screen.getByTestId("notes-table");

    expect(table).toBeInTheDocument();
    expect(table).toBeVisible();
  });

  it("should render table header", () => {
    customRender(<NotesTable />);

    screen.getByText("Title");
    screen.getByText("Content");
    screen.getByText("Author");
    screen.getByText("Created At");
    screen.getByText("Updated At");
  });
});
