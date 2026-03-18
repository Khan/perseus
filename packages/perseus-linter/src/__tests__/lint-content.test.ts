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
        const warnings = lintPerseusRenderer(cleanRenderer);

        expect(warnings).toHaveLength(0);
    });

    it("returns warnings when content violates a lint rule", () => {
        const warnings = lintPerseusRenderer(lintyRenderer);

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

        expect(warnings.length).toBeGreaterThan(0);
        expect(warnings[0].rule).toBe("long-paragraph");
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

        expect(warnings.length).toBeGreaterThanOrEqual(2);
    });

    it("returns an empty array when all sections are clean", () => {
        const warnings = lintPerseusArticle([cleanRenderer, cleanRenderer]);

        expect(warnings).toHaveLength(0);
    });
});
