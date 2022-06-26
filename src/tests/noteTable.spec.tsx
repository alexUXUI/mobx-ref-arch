// Test Libs
import { screen } from "@testing-library/dom";

// Test setup
import { customRender } from "./providers.mocks";

// App code
import { NotesTable } from "../features/notesTable/notesTable.component";

describe("Table test suite", () => {
  it("should render table", () => {
    const { getByTestId } = customRender(<NotesTable />);

    const table = getByTestId("notes-table");

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
