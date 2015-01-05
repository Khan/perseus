var assert = require("assert");

var tex = require("../tex-wrangler.js");

var whitespaceRegex = /\s/g;

function assertWrangled(toWrangle, check) {
    // We ignore whitespace when comparing
    var wrangled = tex.modifyTex(toWrangle).replace(whitespaceRegex, "");
    var checkNoSpace = check.replace(whitespaceRegex, "");
    assert.strictEqual(wrangled, checkNoSpace);
}

describe("the tex wrangler", function() {
    it("should not touch single fractions", function() {
        assertWrangled("\\frac{3}{4}", "\\frac{3}{4}");
    });

    it("should make big single fractions small", function() {
        assertWrangled("\\dfrac{3}{4}", "\\frac{3}{4}");
    });

    it("should make outer fractions big", function() {
        assertWrangled("\\frac{1}{\\frac{2}{3}}", "\\dfrac{1}{\\frac{2}{3}}");
        assertWrangled("\\frac{\\frac{1}{2}}{3}", "\\dfrac{\\frac{1}{2}}{3}");
    });

    it("should make inner fractions small", function() {
        assertWrangled("\\dfrac{1}{\\dfrac{2}{3}}", "\\dfrac{1}{\\frac{2}{3}}");
        assertWrangled("\\dfrac{\\dfrac{1}{2}}{3}", "\\dfrac{\\frac{1}{2}}{3}");
    });

    it("should parse mutliple fractions", function() {
        assertWrangled(
            "\\dfrac{1}{2} + \\dfrac{3}{4}",
            "\\frac{1}{2} + \\frac{3}{4}"
        );
    });

    it("shouldn't touch things before fractions", function() {
        assertWrangled("1 + \\dfrac{2}{3}", "1 + \\frac{2}{3}");
    });

    it("shouldn't touch things after fractions", function() {
        assertWrangled("\\dfrac{1}{2} + 3", "\\frac{1}{2} + 3");
    });

    it("shouldn't touch things that wrap fractions", function() {
        assertWrangled("\\sqrt{\\dfrac{1}{2}}", "\\sqrt{\\frac{1}{2}}");
    });

    it("should have sane failure modes", function() {
        assertWrangled("\\dfrac{3}{4", "\\frac{3}{4}");
        // This could maybe be better, but if someone gives us this and it
        // doesn't work then that's their fault. :)
        assertWrangled("\\dfrac{3}{4}}", "\\frac{3}{4}}");
    });
});
