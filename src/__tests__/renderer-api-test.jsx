var assert = require("assert");
var Perseus = require("../perseus.js");
var Renderer = Perseus.Renderer;
var AnswerAreaRenderer = Perseus.AnswerAreaRenderer;

var TestUtils = React.addons.TestUtils;
var delayedPromise = require("../testutils/delayed-promise.jsx");

// Items for testing!
var inputNumber1Item = require("./test-items/input-number-1-item.json");
var inputNumber2Item = require("./test-items/input-number-2-item.json");
var tableItem = require("./test-items/table-item.json");
var answerAreaInputsItem = require(
    "./test-items/answer-area-inputs-item.json"
);

// Jasmine requires us to use `pit` to support promises;
// mocha supports this already with `it`.
// This seemed to be the best compromise to support
// async tests in both frameworks.
var pit = window.pit || window.it || global.pit || global.it;

var renderQuestionArea = function(item, apiOptions, enabledFeatures) {
    var renderer = TestUtils.renderIntoDocument(
        <Renderer
            content={item.question.content}
            images={item.question.images}
            widgets={item.question.widgets}
            problemNum={0}
            apiOptions={apiOptions}
            enabledFeatures={enabledFeatures} />
    );
    return renderer;
};

var renderAnswerArea = function(item, apiOptions, enabledFeatures) {
    var answerAreaRenderer = TestUtils.renderIntoDocument(
        <AnswerAreaRenderer
            type={item.answerArea.type}
            options={item.answerArea.options}
            calculator={item.answerArea.calculator}
            problemNum={0}
            apiOptions={apiOptions}
            enabledFeatures={enabledFeatures} />
    );
    return answerAreaRenderer;
};

describe("Perseus API", function() {
    describe("setInputValue", function() {
        it("should be able to produce a correctly graded value", function() {
            var renderer = renderQuestionArea(inputNumber1Item);
            renderer.setInputValue(["input-number 1"], "5");
            var score = renderer.guessAndScore()[1];
            assert.strictEqual(score.type, "points");
            assert.strictEqual(score.earned, score.total);
        });

        it("should be able to produce a wrong value", function() {
            var renderer = renderQuestionArea(inputNumber1Item);
            renderer.setInputValue(["input-number 1"], "3");
            var score = renderer.guessAndScore()[1];
            assert.strictEqual(score.type, "points");
            assert.strictEqual(score.earned, 0);
        });

        it("should be able to produce an empty score", function() {
            var renderer = renderQuestionArea(inputNumber1Item);
            renderer.setInputValue(["input-number 1"], "3");
            var score = renderer.guessAndScore()[1];
            assert.strictEqual(score.type, "points");
            assert.strictEqual(score.earned, 0);
            renderer.setInputValue(["input-number 1"], "");
            var score = renderer.guessAndScore()[1];
            assert.strictEqual(score.type, "invalid");
        });

        it("should be able to accept a callback", function() {
            var x = 3;
            var renderer = renderQuestionArea(inputNumber1Item);
            assert.strictEqual(x, 3);
            renderer.setInputValue(["input-number 1"], "3", function() {
                x = 5;
            });
            assert.strictEqual(x, 5);
        });
    });

    describe("getInputPaths", function() {
        it("should be able to find all the input widgets", function() {
            var renderer = renderQuestionArea(inputNumber2Item);
            var numPaths = renderer.getInputPaths().length;
            assert.strictEqual(numPaths, 2);
        });

        it("should be able to find all inputs within widgets", function() {
            var renderer = renderQuestionArea(tableItem);
            var numPaths = renderer.getInputPaths().length;
            assert.strictEqual(numPaths, 8);
        });

        it("should be able to find inputs in the answer-area", function() {
            var answerAreaRenderer = renderAnswerArea(answerAreaInputsItem);
            var numPaths = answerAreaRenderer.getInputPaths().length;
            assert.strictEqual(numPaths, 2);
        });
    });

    describe("getDOMNodeForPath", function() {
        it("should find one DOM node per <input>", function() {
            var renderer = renderQuestionArea(inputNumber2Item);
            var inputPaths = renderer.getInputPaths();
            var allInputs = TestUtils.scryRenderedDOMComponentsWithTag(
                renderer, "input");
            assert.strictEqual(inputPaths.length, allInputs.length);
        });

        it("should find the right DOM nodes for the <input>s", function() {
            var renderer = renderQuestionArea(inputNumber2Item);
            var inputPaths = renderer.getInputPaths();
            var allInputs = TestUtils.scryRenderedDOMComponentsWithTag(
                renderer, "input");
            _.each(inputPaths, (inputPath, i) => {
                var $node = $(renderer.getDOMNodeForPath(inputPath));
                var $input = $(allInputs[i].getDOMNode());
                assert.ok($input.closest($node).length);
            });
        });
    });

    describe("onInputError", function() {
        it("should call a callback when grading an empty input-number",
                function() {
            var wasCalled;
            var renderer = renderQuestionArea(inputNumber1Item, {
                onInputError: function(widgetId) {
                    wasCalled = true;
                }
            });
            var score = renderer.guessAndScore()[1];
            assert.strictEqual(score.type, "invalid");
            assert.strictEqual(wasCalled, true);
        });
    });

    describe("CSS ClassNames", function() {
        describe("perseus-input", function() {
            it("should be on the `input` element of an input-number",
                    function() {
                // Feel free to change this if you change the class name, but
                // if you do, you must up the perseus api [major] version
                assert.strictEqual(Perseus.ClassNames.INPUT, "perseus-input");

                var renderer = renderQuestionArea(inputNumber1Item);

                var input = renderer.getDOMNode().querySelector('input');
                assert.strictEqual(
                    $(input).hasClass(Perseus.ClassNames.INPUT),
                    true
                );

                var perseusInput = renderer.getDOMNode().querySelector(
                    ".perseus-input"
                );
                assert.strictEqual(input, perseusInput);
            });
        });

        describe("perseus-focused", function() {
            it("should be on an input-number exactly when focused",
                    function() {
                // Feel free to change this if you change the class name, but
                // if you do, you must up the perseus api [major] version
                assert.strictEqual(
                    Perseus.ClassNames.FOCUSED,
                    "perseus-focused"
                );

                var renderer = renderQuestionArea(inputNumber1Item, {
                    interceptInputFocus: function(widgetId) {
                        renderer.setInputValue(widgetId, "5");
                    }
                });
                var input = renderer.getDOMNode().querySelector('input');

                assert.strictEqual(
                    $(input).hasClass(Perseus.ClassNames.FOCUSED),
                    false
                );

                TestUtils.Simulate.focus(input);
                assert.strictEqual(
                    $(input).hasClass(Perseus.ClassNames.FOCUSED),
                    true
                );

                TestUtils.Simulate.blur(input);
                assert.strictEqual(
                    $(input).hasClass(Perseus.ClassNames.FOCUSED),
                    false
                );
            });
        });
    });

    describe("onFocusChange", function() {
        pit("should be called from focused to blurred to back on one input",
                function() {
            var callCount = 0;
            var newFocusResult;
            var oldFocusResult;
            var renderer = renderQuestionArea(inputNumber1Item, {
                onFocusChange: function(newFocus, oldFocus) {
                    callCount++;
                    newFocusResult = newFocus;
                    oldFocusResult = oldFocus;
                }
            });

            var input = renderer.getDOMNode().querySelector('input');

            callCount = 0;
            TestUtils.Simulate.focus(input);
            // Technically, this is probably synchronous, but we do want
            // to make sure that this hasn't been called a second time
            // asynchronously, so we check after waiting for an async
            // result here. This also means that this test should
            // continue to pass if we decide it makes more sense for
            // this callback to be async, which could reasonably happen
            return delayedPromise().then(() => {
                assert.strictEqual(callCount, 1,
                        "onFocusChange was not called during onFocus");
                assert.strictEqual(oldFocusResult, null);
                assert.deepEqual(newFocusResult, ["input-number 1"]);

                callCount = 0;
                TestUtils.Simulate.blur(input);
                return delayedPromise();
            }).then(() => {
                assert.strictEqual(callCount, 1,
                        "onFocusChange was not called during onBlur");
                assert.deepEqual(oldFocusResult, ["input-number 1"]);
                assert.strictEqual(newFocusResult, null);
            });
        });

        pit("should be called focusing between two inputs",
                function() {
            var callCount = 0;
            var newFocusResult;
            var oldFocusResult;
            var renderer = renderQuestionArea(inputNumber2Item, {
                onFocusChange: function(newFocus, oldFocus) {
                    callCount++;
                    newFocusResult = newFocus;
                    oldFocusResult = oldFocus;
                }
            });

            var inputs = renderer.getDOMNode().querySelectorAll('input');
            var input1 = inputs[0];
            var input2 = inputs[1];
            TestUtils.Simulate.focus(input1);

            callCount = 0;
            TestUtils.Simulate.focus(input2);
            // Technically, this is probably synchronous, but we do want
            // to make sure that this hasn't been called a second time
            // asynchronously, so we check after waiting for an async
            // result here. This also means that this test should
            // continue to pass if we decide it makes more sense for
            // this callback to be async, which could reasonably happen
            return delayedPromise().then(() => {
                assert.strictEqual(callCount, 1,
                        "onFocusChange was called the wrong number of" +
                        "times while switching between input-numbers");
                assert.deepEqual(oldFocusResult, ["input-number 1"]);
                assert.deepEqual(newFocusResult, ["input-number 2"]);
            });
        });
    });
});
