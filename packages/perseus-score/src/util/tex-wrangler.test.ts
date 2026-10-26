import {parseTex} from "./tex-wrangler";

const whitespaceRegex = /\s/g;

const assertParsed = (toParse: undefined | string, check: string) => {
    // We ignore whitespace when comparing
    // @ts-expect-error - TS2345 - Argument of type 'string | undefined' is not assignable to parameter of type 'string'.
    const parsed = parseTex(toParse).replace(whitespaceRegex, "");
    const checkNoSpace = check.replace(whitespaceRegex, "");
    expect(parsed).toBe(checkNoSpace);
};

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
