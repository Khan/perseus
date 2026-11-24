import {expectIssue, expectPass} from "../__tests__/linter.testutils";
import {TABLE_HELP_LINK} from "../help-links";

import tableEmptyColumnHeaderRule, {
    emptyColumnHeaderMessage,
} from "./table-empty-column-header";

describe("table-empty-column-header", () => {
    it("warns when a middle column header is empty", () => {
        // Arrange
        const markdown =
            "| Name | | Age |\n" + "|-|-|-|\n" + "| Ann | yes | 30 |";

        // Act, Assert
        expectIssue(tableEmptyColumnHeaderRule, markdown, undefined, {
            messages: [emptyColumnHeaderMessage([2])],
        });
    });

    it("warns when the last column header is empty", () => {
        // Arrange
        const markdown = "| Name | |\n" + "|-|-|\n" + "| Ann | 30 |";

        // Act, Assert
        expectIssue(tableEmptyColumnHeaderRule, markdown, undefined, {
            messages: [emptyColumnHeaderMessage([2])],
        });
    });

    it("lists every column with an empty header", () => {
        // Arrange
        const markdown =
            "| Name | | Age | |\n" + "|-|-|-|-|\n" + "| Ann | a | 30 | b |";

        // Act, Assert
        expectIssue(tableEmptyColumnHeaderRule, markdown, undefined, {
            messages: [emptyColumnHeaderMessage([2, 4])],
        });
    });

    it("warns when a row header table has another empty column header", () => {
        // Arrange
        const markdown =
            "| | Mass | |\n" + "|-|-|-|\n" + "| **Gold** | 19.3 | a |";

        // Act, Assert
        expectIssue(tableEmptyColumnHeaderRule, markdown, undefined, {
            messages: [emptyColumnHeaderMessage([3])],
        });
    });

    it("passes when every column header has text", () => {
        // Arrange
        const markdown = "| Name | Age |\n" + "|-|-|\n" + "| Ann | 30 |";

        // Act, Assert
        expectPass(tableEmptyColumnHeaderRule, markdown);
    });

    it("passes when only the first column header is empty (row headers)", () => {
        // Arrange
        const markdown =
            "| | Mass |\n" +
            "|-|-|\n" +
            "| Gold | 19.3 |\n" +
            "| Silver | 10.5 |";

        // Act, Assert
        expectPass(tableEmptyColumnHeaderRule, markdown);
    });

    it("passes when every column header is empty (layout table)", () => {
        // Arrange
        const markdown = "| | | |\n" + "|-|-|-|\n" + "| a | b | c |";

        // Act, Assert
        expectPass(tableEmptyColumnHeaderRule, markdown);
    });

    it("links to the table notation guide", () => {
        // Arrange
        const markdown = "| Name | |\n" + "|-|-|\n" + "| Ann | 30 |";

        // Act, Assert
        expectIssue(tableEmptyColumnHeaderRule, markdown, undefined, {
            helpLink: TABLE_HELP_LINK,
        });
    });
});
