import {findSections, splitSections} from "./guidelines";

const DOC = [
    "Intro text.",
    "",
    "# Style",
    "Bold the first line.",
    "## Hints",
    "Hints build up to the answer.",
    "```",
    "# not a heading",
    "```",
    "# Accessibility",
    "Describe images.",
].join("\n");

describe("splitSections", () => {
    it("splits at headings, outside code fences", () => {
        // Arrange, Act
        const sections = splitSections(DOC);

        // Assert
        expect(sections.map((s) => [s.level, s.heading])).toEqual([
            [0, ""],
            [1, "Style"],
            [2, "Hints"],
            [1, "Accessibility"],
        ]);
        expect(sections[2].text).toBe(
            "## Hints\nHints build up to the answer.\n```\n# not a heading\n```",
        );
    });
});

describe("findSections", () => {
    it("finds sections by heading text, with their subsections", () => {
        // Arrange
        const sections = splitSections(DOC);

        // Act
        const found = findSections(sections, "style");

        // Assert
        expect(found).toHaveLength(1);
        expect(found[0].text).toContain("## Hints");
        expect(found[0].text).not.toContain("Accessibility");
    });

    it("finds nothing when no heading matches", () => {
        // Arrange, Act
        const found = findSections(splitSections(DOC), "missing");

        // Assert
        expect(found).toEqual([]);
    });
});
