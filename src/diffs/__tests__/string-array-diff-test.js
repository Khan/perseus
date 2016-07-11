/* TODO(csilvers): fix these lint errors (http://eslint.org/docs/rules): */
/* eslint-disable comma-dangle, indent, no-undef, no-var, object-curly-spacing */
/* To fix, remove an entry above, run ka-lint, and fix errors. */



var stringArrayDiff = require("../string-array-diff.jsx");

describe("string array diff", function() {
    it("diffs an empty diff", function() {
        expect(stringArrayDiff([], [])).toEqual(
                  {
                      before: [],
                      after: []
                  });
    });

    it("diffs the same values", function() {
        expect(stringArrayDiff(
            [1],
            [1])).toEqual(
            {
                before: [
                    { status: "unchanged",
                      value: 1 }
                ],
                after: [
                    { status: "unchanged",
                      value: 1 }
                ]
            });
    });

    it("diffs an added value", function() {
        expect(stringArrayDiff(
            [1],
            [1, 2])).toEqual(
            {
                before: [
                    { status: "unchanged",
                      value: 1 }
                ],
                after: [
                    { status: "unchanged",
                      value: 1 },
                    { status: "added",
                      value: 2 }
                ]
            });
    });

    it("diffs a removed value", function() {
        expect(stringArrayDiff(
            [1, 2, 3],
            [1])).toEqual(
            {
                before: [
                    { status: "unchanged",
                      value: 1 },
                    { status: "removed",
                      value: 2 },
                    { status: "removed",
                      value: 3 }
                ],
                after: [
                    { status: "unchanged",
                      value: 1 }
                ]
            });
    });
});
