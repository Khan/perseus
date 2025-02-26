import {parseTex, modifyTex} from "./tex-wrangler";

const whitespaceRegex = /\s/g;

const assertWrangled = (toWrangle: string, check: string) => {
    // We ignore whitespace when comparing
    const wrangled = modifyTex(toWrangle).replace(whitespaceRegex, "");
    const checkNoSpace = check.replace(whitespaceRegex, "");
    expect(wrangled).toBe(checkNoSpace);
};

const assertParsed = (toParse: undefined | string, check: string) => {
    // We ignore whitespace when comparing
    // @ts-expect-error - TS2345 - Argument of type 'string | undefined' is not assignable to parameter of type 'string'.
    const parsed = parseTex(toParse).replace(whitespaceRegex, "");
    const checkNoSpace = check.replace(whitespaceRegex, "");
    expect(parsed).toBe(checkNoSpace);
};

describe("modifyTex", () => {
    it("should not touch single fractions", () => {
        assertWrangled("\\frac{3}{4}", "\\frac{3}{4}");
    });

    it("should make big single fractions small", () => {
        assertWrangled("\\dfrac{3}{4}", "\\frac{3}{4}");
    });

    it("should make outer fractions big", () => {
        assertWrangled("\\frac{1}{\\frac{2}{3}}", "\\dfrac{1}{\\frac{2}{3}}");
        assertWrangled("\\frac{\\frac{1}{2}}{3}", "\\dfrac{\\frac{1}{2}}{3}");
    });

    it("should make inner fractions small", () => {
        assertWrangled("\\dfrac{1}{\\dfrac{2}{3}}", "\\dfrac{1}{\\frac{2}{3}}");
        assertWrangled("\\dfrac{\\dfrac{1}{2}}{3}", "\\dfrac{\\frac{1}{2}}{3}");
    });

    it("should parse mutliple fractions", () => {
        assertWrangled(
            "\\dfrac{1}{2} + \\dfrac{3}{4}",
            "\\frac{1}{2} + \\frac{3}{4}",
        );
    });

    it("shouldn't touch things before fractions", () => {
        assertWrangled("1 + \\dfrac{2}{3}", "1 + \\frac{2}{3}");
    });

    it("shouldn't touch things after fractions", () => {
        assertWrangled("\\dfrac{1}{2} + 3", "\\frac{1}{2} + 3");
    });

    it("shouldn't touch things that wrap fractions", () => {
        assertWrangled("\\sqrt{\\dfrac{1}{2}}", "\\sqrt{\\frac{1}{2}}");
    });

    it("should have sane failure modes", () => {
        assertWrangled("\\dfrac{3}{4", "\\frac{3}{4}");
        // This could maybe be better, but if someone gives us this and it
        // doesn't work then that's their fault. :)
        assertWrangled("\\dfrac{3}{4}}", "\\frac{3}{4}}");
    });
});

describe("parseTex", () => {
    it("should replace single fractions", () => {
        assertParsed("\\dfrac{3}{4}", "3 / 4");
    });

    it("should remove blackslash-escapes for percent signs", () => {
        assertParsed("3\\%", "3%");
        assertParsed("3.5\\%", "3.5%");
        assertParsed("\\dfrac{3\\%}{4}", "3% / 4");
    });

    it("should not throw error when input is undefined", () => {
        assertParsed(undefined, "");
    });
});
describe("parseTex", () => {
    it("should replace single fractions", () => {
        assertParsed("\\dfrac{3}{4}", "3 / 4");
    });

    it("should remove blackslash-escapes for percent signs", () => {
        assertParsed("3\\%", "3%");
        assertParsed("3.5\\%", "3.5%");
        assertParsed("\\dfrac{3\\%}{4}", "3% / 4");
    });

    it("should not throw error when input is undefined", () => {
        assertParsed(undefined, "");
    });

    it("should not cause an infinite loop if provided incomplete tex commands", () => {
        assertParsed("\\frac", "/");
    });
});
