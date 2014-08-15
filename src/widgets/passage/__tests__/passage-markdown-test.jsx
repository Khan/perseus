var assert = require("assert");
var _ = require("underscore");

var PassageMarkdown = require("../passage-markdown.jsx");
var {parse, output} = PassageMarkdown;

validateParse = (parsed, expected) => {
    if (!_.isEqual(parsed, expected)) {
        var parsedStr = JSON.stringify(parsed, null, 4);
        var expectedStr = JSON.stringify(expected, null, 4);
        if (parsedStr === expectedStr) {
            // If these two are the same, there were some different
            // properties that didn't get picked up in JSON.stringify,
            // such as properties with undefined as the value, or with
            // a function as a value.
            // We feebly attempt to display a useful message in this case :(
            parsedStr = "had undefined/function properties";
            expectedStr = "no undefined/function properties";
        }
        assert.fail(
            parsedStr,
            expectedStr,
            "parsed did not match expected",
            "<>"
        );
    }
};

describe("passage markdown", () => {
    describe("ref parsing", () => {
        it ("should handle a single ref in plain text", () => {
            var parsed = parse("this is a {{ref}}");
            validateParse(parsed, [{
                type: "paragraph",
                content: [
                    {
                        type: "text",
                        content: "this is a "
                    },
                    {
                        type: "refStart",
                        ref: 1
                    },
                    {
                        type: "text",
                        content: "ref"
                    },
                    {
                        type: "refEnd",
                        ref: 1
                    },
                ]
            }]);
        });
    });
});

