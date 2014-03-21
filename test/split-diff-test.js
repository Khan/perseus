var splitDiff = require("../src/diffs/split-diff.jsx");

test("splitting an empty diff", function() {
    deepEqual(splitDiff([]),
              []);
});

test("splitting a one line string does not split", function() {
    deepEqual(splitDiff([{ value: "hello" }]),
              [[{ value: "hello" }]]);
});

test("splitting a multiline string splits into two parts", function() {
    deepEqual(splitDiff([{ value: "he\nllo" }]),
              [[{ value: "he" }], [{ value: "llo" }]]);
});

test("splitting a string with a changed value keeps things on the same line",
     function() {
     deepEqual(splitDiff([{ value: "hello" },
                          { value: "goodbye", removed: true }]),
               [[{ value: "hello" },
                 { value: "goodbye", removed: true }]]);
});

test("splitting a string with a change and a newline", function() {
     deepEqual(splitDiff([{ value: "hello" },
                          { value: "good\nbye", removed: true }]),
                          [[{ value: "hello" },
                            { value: "good", removed: true }],
                           [{ value: "bye", removed: true }]]);
});
