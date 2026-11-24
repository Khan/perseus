import {parse} from "@khanacademy/pure-markdown";

import {tableHasRowHeaders} from "./table-row-headers";

// Returns the first `table` node parsed from `markdown`.
function parseTable(markdown: string) {
    return parse(markdown).find((node) => node.type === "table");
}

describe("tableHasRowHeaders", () => {
    it("returns true when the first column header is empty", () => {
        // Arrange
        const table = parseTable("| | Mass |\n|-|-|\n| Gold | 19.3 |");

        // Act, Assert
        expect(tableHasRowHeaders(table)).toBe(true);
    });

    it("returns true when every first column body cell is bold", () => {
        // Arrange
        const table = parseTable(
            "| Metal | Mass |\n|-|-|\n| **Gold** | 19.3 |\n| **Tin** | 7.3 |",
        );

        // Act, Assert
        expect(tableHasRowHeaders(table)).toBe(true);
    });

    it("returns false when a first column body cell is partially bold", () => {
        // Arrange
        const table = parseTable(
            "| Metal | Mass |\n|-|-|\n| **Gold** | 19.3 |\n| **Tin** bar | 7.3 |",
        );

        // Act, Assert
        expect(tableHasRowHeaders(table)).toBe(false);
    });

    it("returns false when the first column has a header and plain cells", () => {
        // Arrange
        const table = parseTable("| Metal | Mass |\n|-|-|\n| Gold | 19.3 |");

        // Act, Assert
        expect(tableHasRowHeaders(table)).toBe(false);
    });

    it("returns false for a single-column table", () => {
        // Arrange
        const table = parseTable("| |\n|-|\n| **Gold** |");

        // Act, Assert
        expect(tableHasRowHeaders(table)).toBe(false);
    });
});
