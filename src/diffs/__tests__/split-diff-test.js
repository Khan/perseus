/* TODO(csilvers): fix these lint errors (http://eslint.org/docs/rules): */
/* eslint-disable indent, no-undef, no-var, object-curly-spacing */
/* To fix, remove an entry above, run ka-lint, and fix errors. */



describe("split diff", function() {
    var splitDiff;

    beforeEach(function() {
        splitDiff = require("../split-diff.jsx");
    });

    it("splits an empty diff", function() {
        expect(splitDiff([])).toEqual([]);
    });

    it("does not split a one line string", function() {
        expect(splitDiff([{ value: "hello" }]))
            .toEqual([[{ value: "hello" }]]);
    });

    it("splits a multiline string into two parts", function() {
        expect(splitDiff([{ value: "he\nllo" }]))
            .toEqual([[{ value: "he" }], [{ value: "llo" }]]);
    });

    it("keeps things on the same line when splitting a changed value",
         function() {
         expect(splitDiff([{ value: "hello" },
                           { value: "goodbye", removed: true }]))
             .toEqual([[{ value: "hello" },
                        { value: "goodbye", removed: true }]]);
    });

    it("splits a string with a change and a newline", function() {
         expect(splitDiff([{ value: "hello" },
                           { value: "good\nbye", removed: true }]))
             .toEqual([[{ value: "hello" },
                        { value: "good", removed: true }],
                       [{ value: "bye", removed: true }]]);
    });
});
