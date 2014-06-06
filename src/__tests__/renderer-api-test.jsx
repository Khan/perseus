/** @jsx React.DOM */
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

            var input = renderer.getDOMNode().querySelector('input');

            TestUtils.Simulate.focus(input);

            assert.strictEqual(interceptedWidgetId, "input-number 1");
        });

        it("should be able to inject the correct value and grade", function() {
            var renderer = renderQuestionArea(inputNumber1Item, {
                interceptInputFocus: function(widgetId) {
                    renderer.setInputValue(widgetId, "5");
                }
            });

            var input = renderer.getDOMNode().querySelector('input');

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
});
