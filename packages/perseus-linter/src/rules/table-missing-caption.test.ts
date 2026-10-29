import {expectPass, expectWarning} from "../__tests__/test-utils";

import tableMissingCaptionRule, {
    MISSING_CAPTION_MESSAGE,
    EMPTY_CAPTION_MESSAGE,
} from "./table-missing-caption";

// A plain markdown table, which has no way to carry a caption.
const UNCAPTIONED_TABLE =
    "|col1|col2|\n|----|----|\n|cell1|cell2|\n|cell3|cell4|";

// A titled table is written as a `|| caption ||` line directly above the
// table. `title` is spliced into the line to vary the caption under test.
const captionedTable = (title: string) =>
    `||${title}||\n Header A | Header B \n - | - \n Cell 1 | Cell 2 \n`;

// A table whose header row has only empty cells.
const EMPTY_HEADERS_TABLE = "|  |   |\n|----|----|\n|cell1|cell2|";

describe("table-missing-caption", () => {
    it("warns when a table has no caption", () => {
        // Arrange, Act
        expectWarning(tableMissingCaptionRule, UNCAPTIONED_TABLE, undefined, {
            messages: [MISSING_CAPTION_MESSAGE],
        });
    });

    it.each(["", " ", "   "])(
        "warns when a caption is empty or only contains whitespace: %j",
        (title) => {
            expectWarning(
                tableMissingCaptionRule,
                captionedTable(title),
                undefined,
                {
                    messages: [EMPTY_CAPTION_MESSAGE],
                },
            );
        },
    );

    it("passes when a table has a caption", () => {
        // Arrange, Act, Assert
        expectPass(tableMissingCaptionRule, captionedTable(" My caption "));
    });

    it("passes when a caption is made of formatted text", () => {
        // Arrange, Act, Assert
        expectPass(tableMissingCaptionRule, captionedTable(" *My caption* "));
    });

    it.each([
        ["no caption", EMPTY_HEADERS_TABLE],
        ["an empty caption", `||  ||\n${EMPTY_HEADERS_TABLE}`],
    ])(
        "passes when all column headers are empty and the table has %s",
        (_, markdown) => {
            // Arrange, Act, Assert
            expectPass(tableMissingCaptionRule, markdown);
        },
    );

    it("warns when a table has no caption and some column headers are empty", () => {
        // Arrange, Act, Assert
        expectWarning(
            tableMissingCaptionRule,
            "|col1|  |\n|----|----|\n|cell1|cell2|",
            undefined,
            {messages: [MISSING_CAPTION_MESSAGE]},
        );
    });
});
