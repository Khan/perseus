const assert = require("assert");
const React = require("react");
const ReactDOM = require("react-dom");
const _ = require("underscore");

const NumberInput = require("../number-input.jsx");
const TestUtils = require("react-addons-test-utils");

const STARTING_VALUE = 1;

describe("NumberInput", function() {
    const testInputResult = function(input, result, extraProps) {
        let newVal;
        const handleChange = function(val) {
            newVal = val;
        };

        const props = _.extend(
            {
                value: STARTING_VALUE,
                onChange: handleChange,
            },
            extraProps
        );

        const node = TestUtils.renderIntoDocument(<NumberInput {...props} />);
        TestUtils.Simulate.change(ReactDOM.findDOMNode(node), {
            target: {value: input},
        });
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
            placeholder: 15,
        });
    });

    const testArrowKeys = function(args) {
        const key = args.key;
        const startingValue = args.startingValue;
        const endingValue = args.endingValue;
        const keysEnabled = args.keysEnabled;

        let newVal = startingValue;
        const handleChange = function(val) {
            newVal = val;
        };

        const node = TestUtils.renderIntoDocument(
            <NumberInput
                value={startingValue}
                onChange={handleChange}
                useArrowKeys={keysEnabled}
            />
        );
        TestUtils.Simulate.keyDown(ReactDOM.findDOMNode(node), {key: key});
        assert.deepEqual(newVal, endingValue);
    };

    it("should let you increment with the arrow keys", function() {
        testArrowKeys({
            key: "ArrowUp",
            startingValue: 0,
            endingValue: 1,
            keysEnabled: true,
        });
    });

    it("should let you decrement with the arrow keys", function() {
        testArrowKeys({
            key: "ArrowDown",
            startingValue: 0,
            endingValue: -1,
            keysEnabled: true,
        });
    });

    it("does not increment and decrement non-integers", function() {
        testArrowKeys({
            key: "ArrowDown",
            startingValue: 1 / 2,
            endingValue: 1 / 2,
            keysEnabled: true,
        });

        testArrowKeys({
            key: "ArrowUp",
            startingValue: 0.5,
            endingValue: 0.5,
            keysEnabled: true,
        });
    });

    it("shouldn't increment when the arrow keys are disabled", function() {
        testArrowKeys({
            key: "ArrowUp",
            startingValue: 0,
            endingValue: 0,
            keysEnabled: false,
        });
    });
});
