/**
 * @jest-environment node
 */
import {CHECKLIST, checklistLinkFor, renderChecklist} from "./checklist";

describe("checklistLinkFor", () => {
    it("returns the entry's anchor in the checklist for a known code", () => {
        // Arrange, Act
        const link = checklistLinkFor("lint:radio-widget-error");

        // Assert
        expect(link).toBe(
            "perseus://guides/review-checklist.md#no-correct-answer",
        );
    });

    it("returns undefined for a code no entry explains", () => {
        // Arrange, Act
        const link = checklistLinkFor("parse-error");

        // Assert
        expect(link).toBeUndefined();
    });
});

describe("CHECKLIST", () => {
    it("gives every entry a unique id", () => {
        // Arrange
        const ids = CHECKLIST.map((entry) => entry.id);

        // Act
        const unique = new Set(ids);

        // Assert
        expect(unique.size).toBe(ids.length);
    });

    it("explains each issue code in at most one entry", () => {
        // Arrange
        const codes = CHECKLIST.flatMap((entry) => entry.issueCodes);

        // Act
        const unique = new Set(codes);

        // Assert
        expect(unique.size).toBe(codes.length);
    });
});

describe("renderChecklist", () => {
    it("renders a section headed with each entry's id", () => {
        // Arrange, Act
        const markdown = renderChecklist();

        // Assert
        const headings = markdown
            .split("\n")
            .filter((line) => line.startsWith("## "));
        expect(headings).toEqual(
            CHECKLIST.map((entry) => `## ${entry.title} (\`${entry.id}\`)`),
        );
    });
});
