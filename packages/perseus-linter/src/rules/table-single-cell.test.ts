import {expectPass, expectIssue} from "../__tests__/test-utils";
import Rule from "../rule";

import tableSingleCellRule from "./table-single-cell";

describe("table-single-cell", () => {
    it.each([
        ["one body row", "| Answer |\n|--------|\n| 42 |"],
        ["no body rows", "| Answer |\n|--------|"],
        ["with a caption", "|| My caption ||\n| Answer |\n|--------|\n| 42 |"],
    ])("warns when a single-column table has %s", (_, markdown) => {
        // Arrange, Act, Assert
        expectIssue(tableSingleCellRule, markdown, undefined, {
            severity: Rule.Severity.WARNING,
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
