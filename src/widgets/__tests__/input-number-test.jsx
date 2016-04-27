/* TODO(csilvers): fix these lint errors (http://eslint.org/docs/rules): */
/* eslint-disable no-var */
/* To fix, remove an entry above, run ka-lint, and fix errors. */

/**
 * Disclaimer: Definitely not thorough enough
 */

const assert = require("assert");
const _ = require("underscore");
const InputNumber = require("../input-number.jsx");

const transform = InputNumber.transform;

describe("input-number", function() {
    it("transform should remove the `value` field", function() {
        const editorProps = {
            value: 5,
            simplify: "required",
            size: "normal",
            inexact: false,
            maxError: 0.1,
            answerType: "number",
        };
        const widgetProps = transform(editorProps);
        assert.strictEqual(_.has(widgetProps, "value"), false);
    });
});
