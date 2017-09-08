const assert = require("assert");

const {maybeUnescape, maybeUnescapeAccordingToSource, shouldUnescape} = require("../jipt-hack.jsx");

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


describe("maybeUnescapeAccordingToSource", () => {
    it("should not unescape when neither string is escaped", () => {
        const result = maybeUnescapeAccordingToSource(
            "We know that $x\\neq y$", "Vi vet at $x\\neq y$");
        assert.deepEqual(
            ["We know that $x\\neq y$", "Vi vet at $x\\neq y$"], result);
    });
    it("should not unescape when source is not escaped " +
            "but translation is", () => {
        const result = maybeUnescapeAccordingToSource(
            "We know that $x\\neq y$", "Vi vet at $x\\\\neq y$");
        assert.deepEqual(
            ["We know that $x\\neq y$", "Vi vet at $x\\\\neq y$"], result);
    });
    it("should unescape when both strings are escaped ", () => {
        const result = maybeUnescapeAccordingToSource(
            "We know that $x\\\\neq y$", "Vi vet at $x\\\\neq y$");
        assert.deepEqual(
            ["We know that $x\\neq y$", "Vi vet at $x\\neq y$"], result);
    });
    // This is a weird behavior, but we expect this situation not to happen
    it("should unescape when source is escaped but translation is not", () => {
        const result = maybeUnescapeAccordingToSource(
            "We know that $x\\\\neq y$", "Vi vet at $x\\neq y$");
        assert.deepEqual(
            ["We know that $x\\neq y$", "Vi vet at $x\neq y$"], result);
    });
});

// This function is implicitly tested via the tests for `maybeUnescape()`.
// However, it is important for Manticore that it declares strings without
// backslashes as not needing unescaping, and we can't tell from the outcome of
// `maybeUnescape()` what such strings are classified as.
describe("shouldUnescape", () => {
    it("should return false for empty string", () => {
        assert.equal(shouldUnescape(""), false);
    });
    it("should return false for string without backslashes", () => {
        assert.equal(shouldUnescape("x"), false);
        assert.equal(shouldUnescape("$x$"), false);
        assert.equal(shouldUnescape("Welcome to Khan Academy!"), false);
        assert.equal(shouldUnescape("Multiple\nlines\r\nand a\ttab"), false);
    });
});
