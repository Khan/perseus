import {expectIssue, expectPass} from "../__tests__/linter.testutils";
import {TABLE_HELP_LINK} from "../help-links";

import tableMissingCellsRule from "./table-missing-cells";

describe("table-missing-cells", () => {
    it.each([
        "|col1|col2|col3|\n|----|----|----|\n|col1|col2|col3|\n|cell1|cell2|",
        "|col1|col2|col3|\n|----|----|----|\n|col1|col2|\n|cell1|cell2|",
        "|col1|col2|\n|----|----|\n|cell1|cell2|\n|cell1|cell2|cell3|",
        "|col1|\n|----|----|\n|col1|\n|cell1|cell2|",
        "|col1|col2|\n|----|----|\n|col1|\n|cell1|cell2|",
    ])("tableMissingCellsRule warns with: %s", (str: string) => {
        expectIssue(tableMissingCellsRule, str);
    });

    it.each([
        "|col1|col2|\n|----|----|\n|cell1|cell2|\n|cell1|cell2|",
        "|cell1|\n|----|\n|cell2|\n|cell3|",
    ])("tableMissingCellsRule passes with: %s", (str: string) => {
        expectPass(tableMissingCellsRule, str);
    });

    it("links to the table notation guide", () => {
        // Arrange
        const markdown = "|col1|col2|\n|----|----|\n|cell1|\n";

        // Act, Assert
        expectIssue(tableMissingCellsRule, markdown, undefined, {
            helpLink: TABLE_HELP_LINK,
        });
    });
});
