/**
 * Disclaimer: Definitely not thorough enough
 */

var assert = require("assert");
var React = require('react');
var InputNumber = require("../input-number.jsx");

var TestUtils = React.addons.TestUtils;

var transform = InputNumber.transform;

describe("input-number", function() {
    it("transform should remove the `value` field", function() {
        var editorProps = {
            value: 5,
            simplify: "required",
            size: "normal",
            inexact: false,
            maxError: 0.1,
            answerType: "number"
        };
        var widgetProps = transform(editorProps);
        assert.strictEqual(_.has(widgetProps, "value"), false);
    });
});
