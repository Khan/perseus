/** @jsx React.DOM */
var NumberInput = require("../number-input.jsx");
var TestUtils = React.addons.TestUtils;

var STARTING_VALUE = 1;

var testInputResult = function(input, result) {
    var newVal;
    var handleChange = function(val) {
        newVal = val;
    };
    var node = TestUtils.renderIntoDocument(
        <NumberInput
            value={STARTING_VALUE}
            onChange={handleChange}/>);
    TestUtils.Simulate.change(node.getDOMNode(), {target: {value: input}});
    deepEqual(newVal, result);
};

test("basic input", function() {
    testInputResult("2", 2);
});

test("invalid input does not change", function() {
    testInputResult("asdf", STARTING_VALUE);
});
