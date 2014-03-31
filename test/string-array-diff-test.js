var stringArrayDiff = require("../src/diffs/string-array-diff.jsx");

test("empty diff", function() {
    deepEqual(stringArrayDiff([], []),
              {
                  before: [],
                  after: []
              });
});

test("same values", function() {
    deepEqual(stringArrayDiff(
        [1],
        [1]),
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

test("added value", function() {
    deepEqual(stringArrayDiff(
        [1],
        [1, 2]),
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

test("removed value", function() {
    deepEqual(stringArrayDiff(
        [1, 2, 3],
        [1]),
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
