const assert = require("assert");

const {maybeUnescape} = require("../jipt-hack.jsx");

const assertShouldKeepOriginal = function(text) {
    assert.equal(maybeUnescape(text), text);
};

const assertShouldUnescape = function(text, unescaped) {
    assert.equal(maybeUnescape(text), unescaped);
};

describe("maybeUnescape", () => {
    it("should not modify empty string", () => {
        assertShouldKeepOriginal("");
    });
    it("should not modify string without backslashes", () => {
        assertShouldKeepOriginal("x");
        assertShouldKeepOriginal("$x$");
        assertShouldKeepOriginal("Welcome to Khan Academy!");
        assertShouldKeepOriginal("Multiple\nlines\r\nand a\ttab");
    });
    it("should not modify string that contains illegal escape sequences",
        () => {
            const illegals = "abcdefghijklmopqsuvwxyz" +
                "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
            for (let i = 0; i < illegals.length; i++) {
                assertShouldKeepOriginal("\\" + illegals[i]);
                assertShouldKeepOriginal("Here \\" + illegals[i] + " there");
            }
            assertShouldKeepOriginal("$\\blue4$");
        });
    it("should unescape string that contains legal escape sequences",
        () => {
            assertShouldUnescape("\\n", "\n");
            assertShouldUnescape("\\r", "\r");
            assertShouldUnescape("\\t", "\t");
        });
    it("should not unescape if the result would be invalid LaTeX",
        () => {
            assertShouldKeepOriginal("\\\\");
            assertShouldKeepOriginal("\\\\foo");
        });
    it("odd results if both the original " +
            "and the unescaped contain invalid LaTeX", () => {
        // Can't win here since the input is inherently erroneous.
        // This test just documents what will happen in some of the cases.
        assertShouldKeepOriginal("\\n\\\\", "\n\\");
        assertShouldKeepOriginal("\\n\\\\foo", "\n\\foo");
        assertShouldKeepOriginal("\\\\pi\\\\pie", "\\pi\\pie");
    });
    it("should unescape if the original contains invalid LaTeX", () => {
        assertShouldUnescape("\\neq\\notlatex", "\neq\notlatex");
    });
    it("should not unescape if the result would contain invalid LaTeX", () => {
        assertShouldKeepOriginal("\\\\neq\\\\notlatex");
    });
    it("should unescape most escaped LaTeX expressions", () => {
        assertShouldUnescape("\\\\pi", "\\pi");
        assertShouldUnescape("x\\\\neq y", "x\\neq y");
        assertShouldUnescape("x\\\\\\\\neq y", "x\\\\neq y");
        assertShouldUnescape("x\\\\\\\\\\\\neq y", "x\\\\\\neq y");
        assertShouldUnescape("\\\\frac{a}{\\\\pi}", "\\frac{a}{\\pi}");
        assertShouldUnescape("\\\\blue4", "\\blue4");
    });
    it("should not unescape most unescaped LaTeX expressions", () => {
        assertShouldKeepOriginal("\\pi");
        assertShouldKeepOriginal("x\\neq y");
        assertShouldKeepOriginal("x\\\\\\neq y");
        assertShouldKeepOriginal("\\frac{a}{\\pi}");
        assertShouldKeepOriginal("\\blue4");
        assertShouldKeepOriginal("\\blue 4");
        assertShouldKeepOriginal("\\blue{4}");
    });
    it("should not unescape string with dollar if preceded by one backslash",
        () => {
            assertShouldKeepOriginal("\\$");
            assertShouldKeepOriginal("$\\$$");
            assertShouldKeepOriginal("$\\$");
        });
    it("should unescape string with dollar if preceded by more than one " +
            "backslash", () => {
        assertShouldUnescape("\\\\$", "\\$");
        assertShouldUnescape("$\\\\$$", "$\\$$");
        assertShouldUnescape("$\\\\$", "$\\$");
    });
    it("should not unescape strings that have been partially unescaped " +
            "by the JIPT bug", () => {
        // This is another no-win, but shouldn't happen after Crowdin has
        // fixed their bug
        assertShouldKeepOriginal("\\\\blue4\\blue2");
    });
});
