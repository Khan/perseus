import {
    generateTestPerseusItem,
    generateTestPerseusRenderer,
} from "@khanacademy/perseus-core";

import {
    lintPerseusArticle,
    lintPerseusItem,
    lintPerseusRenderer,
} from "../lint-content";

// 501+ characters to trigger the long-paragraph rule
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

        const warnings = lintPerseusItem(item);
        console.log(warnings)
        expect(warnings.length).toBeGreaterThan(2);
        // expect(warnings[0].rule).toBe("long-paragraph");
    });

    it("returns warnings from hints", () => {
        const item = generateTestPerseusItem({
            question: cleanRenderer,
            hints: [lintyRenderer],
        });

        const warnings = lintPerseusItem(item);

        expect(warnings.length).toBeGreaterThan(0);
        expect(warnings[0].rule).toBe("long-paragraph");
    });

    it("combines warnings from question and hints", () => {
        const item = generateTestPerseusItem({
            question: lintyRenderer,
            hints: [lintyRenderer],
        });

        const warnings = lintPerseusItem(item);

        expect(warnings.length).toBeGreaterThanOrEqual(2);
    });
});

describe("widget warnings", () => {
    it.only("shows what a widget warning looks like", () => {
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

        console.log(JSON.stringify(warnings, null, 2));
        expect(warnings.length).toBeGreaterThan(0);
    });
});

describe("lintPerseusArticle", () => {
    it("handles a single renderer", () => {
        const warnings = lintPerseusArticle(lintyRenderer);

        expect(warnings.length).toBeGreaterThan(0);
        expect(warnings[0].rule).toBe("long-paragraph");
    });

    it("handles an array of renderer sections", () => {
        const warnings = lintPerseusArticle([
            lintyRenderer,
            cleanRenderer,
            lintyRenderer,
        ]);

        console.log(warnings)
        expect(warnings.length).toBeGreaterThanOrEqual(4);

    });

    it("returns an empty array when all sections are clean", () => {
        const warnings = lintPerseusArticle([cleanRenderer, cleanRenderer]);

        expect(warnings).toHaveLength(0);
    });
});
