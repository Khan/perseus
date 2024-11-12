import {formatPath} from "./object-path";

describe("formatPath", () => {
    it(`returns "(root)" for an empty path`, () => {
        expect(formatPath([])).toBe("(root)");
    });

    it("formats an array index", () => {
        expect(formatPath([0])).toBe("(root)[0]");
    });

    it("formats an object key", () => {
        expect(formatPath(["foo"])).toBe("(root).foo");
    });

    it("allows underscores, dollar signs, uppercase, and numbers in object keys", () => {
        expect(formatPath(["$", "_", "Abc0123789_$"])).toBe(
            "(root).$._.Abc0123789_$",
        );
    });

    it("quotes object keys that start with a number", () => {
        expect(formatPath(["0foo"])).toBe(`(root)["0foo"]`);
    });

    it("quotes object keys that contain a space", () => {
        expect(formatPath(["foo bar"])).toBe(`(root)["foo bar"]`);
    });

    it("escapes quotes and backslashes in object keys", () => {
        expect(formatPath([`"\\`])).toBe(`(root)["\\"\\\\"]`);
    });

    it("joins different kinds of path segments correctly", () => {
        expect(formatPath(["a", 0, "b", 1, 2])).toBe(`(root).a[0].b[1][2]`);
    });

    it("formats symbol keys", () => {
        expect(formatPath([Symbol("foo")])).toBe(`(root)[Symbol(foo)]`);
    });
});
