import {testRule, expectPass} from "../__tests__/test-utils";

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

describe("table-missing-caption", () => {
    it("warns when a table has no caption", () => {
        // Arrange, Act
        const warnings = testRule(
            tableMissingCaptionRule,
            UNCAPTIONED_TABLE,
            undefined,
        );

        expect(warnings).toHaveLength(1);
        expect(warnings?.[0]?.message).toBe(MISSING_CAPTION_MESSAGE);
    });

    it("warns when a caption contains only whitespace", () => {
        // Arrange, Act
        const warnings = testRule(
            tableMissingCaptionRule,
            captionedTable("   "),
            undefined,
        );

        expect(warnings).toHaveLength(1);
        expect(warnings?.[0]?.message).toBe(EMPTY_CAPTION_MESSAGE);
    });

    it("passes when a table has a caption", () => {
        // Arrange, Act, Assert
        expectPass(tableMissingCaptionRule, captionedTable(" My caption "));
    });

    it("passes when a caption is made of formatted text", () => {
        // Arrange, Act, Assert
        expectPass(tableMissingCaptionRule, captionedTable(" *My caption* "));
    });
});
