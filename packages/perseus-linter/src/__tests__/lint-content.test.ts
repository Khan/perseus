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
        const issues = lintPerseusRenderer(cleanRenderer, "renderer");

        expect(issues).toHaveLength(0);
    });

    it("returns issues when content violates a lint rule", () => {
        const issues = lintPerseusRenderer(lintyRenderer, "renderer");

        expect(issues.length).toBeGreaterThan(0);
        expect(issues[0].rule).toBe("long-paragraph");
    });
});

describe("lintPerseusItem", () => {
    it("returns issues from the question content", () => {
        const item = generateTestPerseusItem({
            question: lintyRenderer,
        });

        const {question, hints} = lintPerseusItem(item);

        expect(question.length).toBeGreaterThan(0);
        expect(question[0].rule).toBe("long-paragraph");
        expect(hints).toHaveLength(0);
    });

    it("returns issues from hints", () => {
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

    it("returns separate issue lists for question and each hint", () => {
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

    it("aligns hint issue arrays with item.hints", () => {
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

describe("widget issues", () => {
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

        const issues = lintPerseusRenderer(renderer, "renderer");

        expect(issues).toContainEqual(
            expect.objectContaining({
                rule: "radio-widget-error",
                message: "radio 1: No choice is marked as correct.",
            }),
        );
    });
});

describe("lintPerseusArticle", () => {
    it("handles a single renderer", () => {
        const issuesBySection = lintPerseusArticle(lintyRenderer);

        expect(issuesBySection).toHaveLength(1);
        expect(issuesBySection[0].length).toBeGreaterThan(0);
        expect(issuesBySection[0][0].rule).toBe("long-paragraph");
    });

    it("handles an array of renderer sections", () => {
        const issuesBySection = lintPerseusArticle([
            lintyRenderer,
            cleanRenderer,
            lintyRenderer,
        ]);

        expect(issuesBySection).toHaveLength(3);
        expect(issuesBySection[0].length).toBeGreaterThan(0);
        expect(issuesBySection[0][0].rule).toBe("long-paragraph");
        expect(issuesBySection[1]).toHaveLength(0);
        expect(issuesBySection[2].length).toBeGreaterThan(0);
        expect(issuesBySection[2][0].rule).toBe("long-paragraph");
    });

    it("returns one empty inner array per section when all sections are clean", () => {
        const issuesBySection = lintPerseusArticle([
            cleanRenderer,
            cleanRenderer,
        ]);

        expect(issuesBySection).toHaveLength(2);
        expect(issuesBySection[0]).toHaveLength(0);
        expect(issuesBySection[1]).toHaveLength(0);
    });
});
