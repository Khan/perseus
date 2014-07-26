/** @jsx React.DOM */
var assert = require("assert");
var Perseus = require("../../perseus.js");
// TODO(jack): Package MathQuill
var MathQuill = window.MathQuill;

var TestUtils = React.addons.TestUtils;
var delayedPromise = require("../../testutils/delayed-promise.jsx");

var expressionItem1 = {
    "question": {
        "content": "[[☃ expression 1]]",
        "images": {},
        "widgets": {
            "expression 1": {
                "type": "expression",
                "graded": true,
                "options": {
                    "value": "2^{-2}-3",
                    "form": false,
                    "simplify": false,
                    "times": false,
                    "buttonSets": [
                        "basic"
                    ],
                    "functions": [
                        "f",
                        "g",
                        "h"
                    ],
                    "buttonsVisible": "never"
                },
                "version": {
                    "major": 0,
                    "minor": 1
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
    "itemDataVersion": {
        "major": 0,
        "minor": 1
    },
    "hints": []
};

var renderQuestionArea = function(item, apiOptions, enabledFeatures) {
    var Renderer = Perseus.Renderer;
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

var findMathQuill = function(renderer) {
    var base = renderer.getDOMNode();
    var span = base.querySelector(".mq-editable-field");
    assert.notEqual(span, null);
    var mathQuillField = MathQuill.MathField(span);
    assert.notEqual(mathQuillField, null);
    return mathQuillField;
};

var findMathQuillTextArea = function(renderer) {
    var base = renderer.getDOMNode();
    var input = base.querySelector(".mq-textarea>textarea");
    assert.notEqual(input, null);
    return input;
};

describe("Expression Widget", function() {
    describe("exponents", function() {
        it("2^-2-3 should produce 2^{-2} - 3", function() {
            var renderer = renderQuestionArea(expressionItem1, {}, {
                // Our test assumes a mathquill input
                useMathQuill: true,
                // right now we need to either specify all enabledFeatures or
                // none, so we specify this here:
                toolTipFormats: true
            });

            // Give the renderer some time to render (ugh)
            return delayedPromise().then(() => {
                var input = findMathQuillTextArea(renderer);
                // mathquill needs a keypress to bind its keydown handler for
                // future events. this is super hacky and is a bad explanation.
                // sorry.
                $(input).trigger("keypress");

                _.each("2^-2-3", (ch) => {
                    $(input).val(ch).trigger("keypress");
                });

                var score = renderer.guessAndScore()[1];
                assert.strictEqual(score.type, "points");
                assert.strictEqual(score.earned, score.total);
            });
        });
    });
});

