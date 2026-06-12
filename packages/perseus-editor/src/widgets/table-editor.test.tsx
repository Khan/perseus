import {render, screen} from "@testing-library/react";
import * as React from "react";

import TableEditor from "./table-editor";

const baseProps = {
    rows: 2,
    columns: 3,
    headers: ["a", "b", "c"],
    answers: [
        ["2", "4", "6"],
        ["3", "6", "9"],
    ],
};

describe("TableEditor", () => {
    it("renders the answer cells", () => {
        // Arrange, Act
        render(<TableEditor {...baseProps} onChange={() => {}} />);

        // Assert (4 and 9 are unique to answer cells; 2/3 also appear in the
        // row/column size inputs)
        expect(screen.getByDisplayValue("4")).toBeInTheDocument();
        expect(screen.getByDisplayValue("9")).toBeInTheDocument();
    });

    it("leaves the answer cells enabled when editing is allowed", () => {
        // Arrange, Act
        render(<TableEditor {...baseProps} onChange={() => {}} />);

        // Assert
        expect(screen.getByDisplayValue("4")).toBeEnabled();
        expect(screen.getByDisplayValue("9")).toBeEnabled();
    });

    it("disables the answer cells when editing is disabled", () => {
        // Arrange, Act
        render(
            <TableEditor
                {...baseProps}
                onChange={() => {}}
                apiOptions={{editingDisabled: true}}
            />,
        );

        // Assert
        expect(screen.getByDisplayValue("4")).toBeDisabled();
        expect(screen.getByDisplayValue("9")).toBeDisabled();
    });
});
