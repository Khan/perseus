var assert = require("assert");

var NumberInput = require("../number-input.jsx");
var TestUtils = React.addons.TestUtils;

var STARTING_VALUE = 1;

describe("NumberInput", function() {

    var testInputResult = function(input, result, extraProps) {
        var newVal;
        var handleChange = function(val) {
            newVal = val;
        };

        var props = _.extend({
            value: STARTING_VALUE,
            onChange: handleChange
        }, extraProps);

        var node = TestUtils.renderIntoDocument(<NumberInput {...props} />);
        TestUtils.Simulate.change(node.getDOMNode(), {target: {value: input}});
        assert.deepEqual(newVal, result);
    };

    it("basic input", function() {
        testInputResult("42", 42);
    });

    it("invalid input does not change", function() {
        testInputResult("asdf", STARTING_VALUE);
    });

    it("should use placeholder value if blank and has placeholder", () => {
        testInputResult("", 15, {
            placeholder: 15
        });
    });

    var testArrowKeys = function(args) {
        var key = args.key;
        var startingValue = args.startingValue;
        var endingValue = args.endingValue;
        var keysEnabled = args.keysEnabled;

        var newVal = startingValue;
        var handleChange = function(val) {
            newVal = val;
        };

        var node = TestUtils.renderIntoDocument(
            <NumberInput
                value={startingValue}
                onChange={handleChange}
                useArrowKeys={keysEnabled} />
            );
        TestUtils.Simulate.keyDown(node.getDOMNode(), {key: key});
        assert.deepEqual(newVal, endingValue);
    };

    it("should let you increment with the arrow keys", function() {
        testArrowKeys({
            key: "ArrowUp",
            startingValue: 0,
            endingValue: 1,
            keysEnabled: true
        });
    });

    it("should let you decrement with the arrow keys", function() {
        testArrowKeys({
            key: "ArrowDown",
            startingValue: 0,
            endingValue: -1,
            keysEnabled: true
        });
    });

    it("does not increment and decrement non-integers", function() {
        testArrowKeys({
            key: "ArrowDown",
            startingValue: 1/2,
            endingValue: 1/2,
            keysEnabled: true
        });

        testArrowKeys({
            key: "ArrowUp",
            startingValue: 0.5,
            endingValue: 0.5,
            keysEnabled: true
        });
    });

    it("shouldn't increment when the arrow keys are disabled", function() {
        testArrowKeys({
            key: "ArrowUp",
            startingValue: 0,
            endingValue: 0,
            keysEnabled: false
        });
    });

});
