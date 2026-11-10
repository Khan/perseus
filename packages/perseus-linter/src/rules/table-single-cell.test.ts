import {expectPass, expectIssue} from "../__tests__/test-utils";

import tableSingleCellRule, {SINGLE_CELL_MESSAGE} from "./table-single-cell";

describe("table-single-cell", () => {
    it.each([
        ["one body row", "| Answer |\n|--------|\n| 42 |"],
        ["no body rows", "| Answer |\n|--------|"],
        ["an empty header", "|  |\n|----|\n| 42 |"],
        ["with a caption", "|| My caption ||\n| Answer |\n|--------|\n| 42 |"],
    ])("warns when a single-column table has %s", (_, markdown) => {
        // Arrange, Act, Assert
        expectIssue(tableSingleCellRule, markdown, undefined, {
            messages: [SINGLE_CELL_MESSAGE],
        });
    });

    it.each([
        ["more than one column", "| A | B |\n|---|---|\n| 1 | 2 |"],
        [
            "more than one body row",
            "| Metal |\n|-------|\n| Gold |\n| Silver |",
        ],
    ])("passes when a table has %s", (_, markdown) => {
        // Arrange, Act, Assert
        expectPass(tableSingleCellRule, markdown);
    });
});
