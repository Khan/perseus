/** @jsx React.DOM */

/**
 * Disclaimer: Definitely not thorough enough
 */

var TestUtils = React.addons.TestUtils;
var InputNumber = require("../input-number.jsx");

var transform = InputNumber.transform;


test("transform should remove the `value` field", function() {
    var editorProps = {
        value: 5,
        simplify: "required",
        size: "normal",
        inexact: false,
        maxError: 0.1,
        answerType: "number"
    };
    var widgetProps = transform(editorProps);
    equal(_.has(widgetProps, "value"), false);
});

