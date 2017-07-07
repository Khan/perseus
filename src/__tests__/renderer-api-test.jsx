var React = require("react");
var assert = require("assert");
var Perseus = require("../perseus.js");
var Renderer = Perseus.Renderer;

var TestUtils = React.addons.TestUtils;

var inputNumber1Item = {
    "question": {
        "content": "[[☃ input-number 1]]",
        "images": {},
        "widgets": {
            "input-number 1": {
                "type": "input-number",
                "graded": true,
                "options": {
                    "value": 5,
                    "simplify": "required",
                    "size": "normal",
                    "inexact": false,
                    "maxError": 0.1,
                    "answerType": "number"
                }
            }
        }
    },
    "answerArea": {
        "type": "multiple",
        "options": {
            "content": "",
            "images": {},
            "widgets": {}
        },
        "calculator": false
    },
    "hints": []
};

var inputNumber2Item = {
    "question": {
        "content": "[[☃ input-number 1]] [[☃ input-number 2]]",
        "images": {},
        "widgets": {
            "input-number 1": {
                "type": "input-number",
                "graded": true,
                "options": {
                    "value": 5,
                    "simplify": "required",
                    "size": "normal",
                    "inexact": false,
                    "maxError": 0.1,
                    "answerType": "number"
                }
            },
            "input-number 2": {
                "type": "input-number",
                "graded": true,
                "options": {
                    "value": 6,
                    "simplify": "required",
                    "size": "normal",
                    "inexact": false,
                    "maxError": 0.1,
                    "answerType": "number"
                }
            }
        }
    },
    "answerArea": {
        "type": "multiple",
        "options": {
            "content": "",
            "images": {},
            "widgets": {}
        },
        "calculator": false
    },
    "hints": []
};

// Returns a promise that will resolve shortly after the end of this
// browser tick (roughly a `setTimeout(0)`)
var delayedPromise = (value) => {
    var deferred = $.Deferred();
    _.defer(() => {
        deferred.resolve(value);
    });
    if (typeof jest !== "undefined") {
        jest.runAllTimers();
    }
    return deferred.promise();
};

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

describe("Perseus API", function() {
    describe("setInputValue", function() {
        it("should be able to produce a correctly graded value", function() {
            var renderer = renderQuestionArea(inputNumber1Item);
            renderer.setInputValue("input-number 1", "5");
            var score = renderer.guessAndScore()[1];
            assert.strictEqual(score.type, "points");
            assert.strictEqual(score.earned, score.total);
        });

        it("should be able to produce a wrong value", function() {
            var renderer = renderQuestionArea(inputNumber1Item);
            renderer.setInputValue("input-number 1", "3");
            var score = renderer.guessAndScore()[1];
            assert.strictEqual(score.type, "points");
            assert.strictEqual(score.earned, 0);
        });

        it("should be able to produce an empty score", function() {
            var renderer = renderQuestionArea(inputNumber1Item);
            renderer.setInputValue("input-number 1", "3");
            var score = renderer.guessAndScore()[1];
            assert.strictEqual(score.type, "points");
            assert.strictEqual(score.earned, 0);
            renderer.setInputValue("input-number 1", "");
            var score = renderer.guessAndScore()[1];
            assert.strictEqual(score.type, "invalid");
        });
    });

    describe("interceptInputFocus", function() {
        it("should intercept a focus and get a widget id", function() {
            var interceptedWidgetId;

            var renderer = renderQuestionArea(inputNumber1Item, {
                interceptInputFocus: function(widgetId) {
                    interceptedWidgetId = widgetId;
                }
            });

            var input = renderer.querySelector('input');

            TestUtils.Simulate.focus(input);

            assert.strictEqual(interceptedWidgetId, "input-number 1");
        });

        it("should be able to inject the correct value and grade", function() {
            var renderer = renderQuestionArea(inputNumber1Item, {
                interceptInputFocus: function(widgetId) {
                    renderer.setInputValue(widgetId, "5");
                }
            });

            var input = renderer.querySelector('input');

            TestUtils.Simulate.focus(input);

            var score = renderer.guessAndScore()[1];
            assert.strictEqual(score.type, "points");
            assert.strictEqual(score.earned, score.total);
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

                var input = renderer.querySelector('input');
                assert.strictEqual(
                    $(input).hasClass(Perseus.ClassNames.INPUT),
                    true
                );

                var perseusInput = renderer.querySelector(
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
                var input = renderer.querySelector('input');

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

    describe("onChangeFocus", function() {
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

            var input = renderer.querySelector('input');

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
                assert.strictEqual(oldFocusResult.path, null);
                assert.strictEqual(oldFocusResult.element, null);
                assert.deepEqual(newFocusResult.path, ["input-number 1"]);
                assert.deepEqual(newFocusResult.element, input);

                callCount = 0;
                TestUtils.Simulate.blur(input);
                return delayedPromise();
            }).then(() => {
                assert.strictEqual(callCount, 1,
                        "onFocusChange was not called during onBlur");
                assert.deepEqual(oldFocusResult.path, ["input-number 1"]);
                assert.deepEqual(oldFocusResult.element, input);
                assert.strictEqual(newFocusResult.path, null);
                assert.strictEqual(newFocusResult.element, null);
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

            var inputs = renderer.querySelectorAll('input');
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
                assert.deepEqual(oldFocusResult.path, ["input-number 1"]);
                assert.deepEqual(oldFocusResult.element, input1);
                assert.deepEqual(newFocusResult.path, ["input-number 2"]);
                assert.deepEqual(newFocusResult.element, input2);
            });
        });
    });
});
