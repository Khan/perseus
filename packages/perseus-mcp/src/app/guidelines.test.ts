import {createGuidelineUseCases} from "./guidelines";

import type {GuidelineFile} from "../ports/guidelines-source";

function useCases(files: GuidelineFile[]) {
    return createGuidelineUseCases({
        source: {read: async () => ({ok: true, dir: "/guidance", files})},
    });
}

const TEX: GuidelineFile = {
    name: "tex.md",
    text: [
        "---",
        "title: Writing TeX",
        "summary: How to write math in TeX.",
        "readWhen: writing math expressions",
        "seeAlso: [general]",
        "---",
        "# Fractions",
        "Use \\dfrac.",
        "# Spacing",
        "No manual spaces.",
    ].join("\n"),
};
const GENERAL: GuidelineFile = {
    name: "general.md",
    text: "# Style\nBold the first line.",
};

describe("getGuidelines", () => {
    it("lists the topics, with when to read each, given no topic", async () => {
        // Arrange, Act
        const result = await useCases([GENERAL, TEX]).getGuidelines({});

        // Assert
        expect(result.topics).toEqual([
            expect.objectContaining({topic: "general", title: "general"}),
            expect.objectContaining({
                topic: "tex",
                readWhen: "writing math expressions",
                seeAlso: ["general"],
            }),
        ]);
    });

    it("returns a topic's text without its frontmatter", async () => {
        // Arrange, Act
        const result = await useCases([GENERAL, TEX]).getGuidelines({
            topic: "tex",
        });

        // Assert
        expect(result).toMatchObject({
            topic: "tex",
            seeAlso: ["general"],
            text: "# Fractions\nUse \\dfrac.\n# Spacing\nNo manual spaces.",
        });
    });

    it("finds sections by heading across topics given no topic", async () => {
        // Arrange, Act
        const result = await useCases([GENERAL, TEX]).getGuidelines({
            section: "spacing",
        });

        // Assert
        expect(result.sections).toEqual([
            {topic: "tex", text: "# Spacing\nNo manual spaces."},
        ]);
    });

    it("lists the topics there are for a topic that doesn't exist", async () => {
        // Arrange, Act
        const result = await useCases([GENERAL, TEX]).getGuidelines({
            topic: "alt-text",
        });

        // Assert
        expect(result).toMatchObject({
            notFound: `There's no topic "alt-text".`,
            topics: [{topic: "general"}, {topic: "tex"}],
        });
    });
});

describe("status", () => {
    it("names the folder and its topics", async () => {
        // Arrange, Act
        const status = await useCases([GENERAL, TEX]).status();

        // Assert
        expect(status).toMatchObject({
            available: true,
            dir: "/guidance",
            topics: ["general", "tex"],
        });
    });
});
