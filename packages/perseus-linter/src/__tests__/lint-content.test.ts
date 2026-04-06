import {
    generateTestPerseusItem,
    generateTestPerseusRenderer,
} from "@khanacademy/perseus-core";

import {
    lintPerseusArticle,
    lintPerseusItem,
    lintPerseusRenderer,
} from "../lint-content";

// Long paragraph triggers the `long-paragraph` rule (see long-paragraph.test.ts).
const longParagraph = new Array(50).fill("lorem ipsum").join(" ");

const cleanRenderer = generateTestPerseusRenderer({
    content: "This is a short paragraph.",
});

const lintyRenderer = generateTestPerseusRenderer({
    content: longParagraph,
});

describe("lintPerseusRenderer", () => {
    it("returns an empty array for clean content", () => {
        const warnings = lintPerseusRenderer(cleanRenderer, "renderer");

        expect(warnings).toHaveLength(0);
    });

    it("returns warnings when content violates a lint rule", () => {
        const warnings = lintPerseusRenderer(lintyRenderer, "renderer");

        expect(warnings.length).toBeGreaterThan(0);
        expect(warnings[0].rule).toBe("long-paragraph");
    });
});

describe("lintPerseusItem", () => {
    it("returns warnings from the question content", () => {
        const item = generateTestPerseusItem({
            question: lintyRenderer,
        });

        const {question, hints} = lintPerseusItem(item);

        expect(question.length).toBeGreaterThan(0);
        expect(question[0].rule).toBe("long-paragraph");
        expect(hints).toHaveLength(0);
    });

    it("returns warnings from hints", () => {
        const item = generateTestPerseusItem({
            question: cleanRenderer,
            hints: [lintyRenderer],
        });

        const {question, hints} = lintPerseusItem(item);

        expect(question).toHaveLength(0);
        expect(hints).toHaveLength(1);
        expect(hints[0].length).toBeGreaterThan(0);
        expect(hints[0][0].rule).toBe("long-paragraph");
    });

    it("returns separate warning lists for question and each hint", () => {
        const item = generateTestPerseusItem({
            question: lintyRenderer,
            hints: [lintyRenderer],
        });

        const {question, hints} = lintPerseusItem(item);

        expect(question.length).toBeGreaterThan(0);
        expect(question[0].rule).toBe("long-paragraph");
        expect(hints).toHaveLength(1);
        expect(hints[0].length).toBeGreaterThan(0);
        expect(hints[0][0].rule).toBe("long-paragraph");
    });

    it("aligns hint warning arrays with item.hints", () => {
        const item = generateTestPerseusItem({
            question: cleanRenderer,
            hints: [cleanRenderer, lintyRenderer],
        });

        const {hints} = lintPerseusItem(item);

        expect(hints).toHaveLength(2);
        expect(hints[0]).toHaveLength(0);
        expect(hints[1].length).toBeGreaterThan(0);
        expect(hints[1][0].rule).toBe("long-paragraph");
    });
});

describe("widget warnings", () => {
    it("returns radio-widget-error when no radio choice is marked correct", () => {
        const renderer = generateTestPerseusRenderer({
            content: "Pick one: [[☃ radio 1]]",
            widgets: {
                "radio 1": {
                    type: "radio",
                    options: {
                        choices: [
                            {content: "A", correct: false, id: "1"},
                            {content: "B", correct: false, id: "2"},
                        ],
                    },
                },
            },
        });

        const warnings = lintPerseusRenderer(renderer, "renderer");

        expect(warnings).toContainEqual(
            expect.objectContaining({
                rule: "radio-widget-error",
                message: "No choice is marked as correct.",
            }),
        );
    });
});

describe("lintPerseusArticle", () => {
    it("handles a single renderer", () => {
        const warningsBySection = lintPerseusArticle(lintyRenderer);

        expect(warningsBySection).toHaveLength(1);
        expect(warningsBySection[0].length).toBeGreaterThan(0);
        expect(warningsBySection[0][0].rule).toBe("long-paragraph");
    });

    it("handles an array of renderer sections", () => {
        const warningsBySection = lintPerseusArticle([
            lintyRenderer,
            cleanRenderer,
            lintyRenderer,
        ]);

        expect(warningsBySection).toHaveLength(3);
        expect(warningsBySection[0].length).toBeGreaterThan(0);
        expect(warningsBySection[0][0].rule).toBe("long-paragraph");
        expect(warningsBySection[1]).toHaveLength(0);
        expect(warningsBySection[2].length).toBeGreaterThan(0);
        expect(warningsBySection[2][0].rule).toBe("long-paragraph");
    });

    it("returns one empty inner array per section when all sections are clean", () => {
        const warningsBySection = lintPerseusArticle([
            cleanRenderer,
            cleanRenderer,
        ]);

        expect(warningsBySection).toHaveLength(2);
        expect(warningsBySection[0]).toHaveLength(0);
        expect(warningsBySection[1]).toHaveLength(0);
    });
});
