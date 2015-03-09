var assert = require("assert");
var Perseus = require("../../perseus.js");
var lens = require("../../../hubble/index.js");
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

var expressionItem2 = lens(expressionItem1)
    .set(["question", "widgets", "expression 1", "options"], {
        "answerForms": [
            {
                "considered": "correct",
                "form": false,
                "simplify": false,
                "value": "123-x"
            },
            {
                "considered": "correct",
                "form": false,
                "simplify": false,
                "value": "x-123"
            }
        ],
        "times": false,
        "buttonSets": ["basic"],
        "functions": [
            "f",
            "g",
            "h"
        ],
    })
    .set(["question", "widgets", "expression 1", "version"], {
        "major": 1,
        "minor": 0
    })
    .freeze();

var expressionItem3 = lens(expressionItem1)
    .set(["question", "widgets", "expression 1", "options"], {
        "answerForms": [
            {
                "considered": "ungraded",
                "form": false,
                "simplify": false,
                "value": "1"
            },
            {
                "considered": "incorrect",
                "form": false,
                "simplify": false,
                "value": "2"
            },
            {
                "considered": "correct",
                "form": false,
                "simplify": false,
                "value": "3"
            }
        ],
        "times": false,
        "buttonSets": ["basic"],
        "functions": [
            "f",
            "g",
            "h"
        ],
    })
    .set(["question", "widgets", "expression 1", "version"], {
        "major": 1,
        "minor": 0
    })
    .freeze();

var expressionItem4 = lens(expressionItem3)
    .zoom(["question", "widgets", "expression 1", "options", "answerForms"])
        .merge([0], {
            "value": "\\left(x+2\\right)\\left(x-2\\right)",
            "form": true,
            "considered": "incorrect"
        })
        .merge([1], {
            "value": "x^2-4",
            "considered": "correct"
        })
        .del([2])
    .deZoom()
    .freeze();

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

// Input `value` into the mathquill input found in renderer
var mathQuillInput = function(renderer, value) {
    var input = findMathQuillTextArea(renderer);
    var $input = $(input);

    // mathquill needs a keypress to bind its keydown handler for
    // future events. this is super hacky and is a bad explanation.
    // sorry.
    $input.trigger("keypress");

    _.each(value, ch => {
        $input.val(ch).trigger("keypress");
    });
};

// promise a question area that has rendered
var makeRender = item => {
    var renderer = renderQuestionArea(item, {}, {
        // Our test assumes a mathquill input
        useMathQuill: true,
        // right now we need to either specify all enabledFeatures or none, so
        // we specify this here:
        toolTipFormats: true
    });
    return delayedPromise().then(() => renderer);
};

describe("Expression Widget", function() {
    describe("exponents", function() {
        it("2^-2-3 should produce 2^{-2} - 3", function() {
            return makeRender(expressionItem1).then(renderer => {
                mathQuillInput(renderer, "2^-2-3");
                var score = renderer.guessAndScore()[1];
                assert.strictEqual(score.type, "points");
                assert.strictEqual(score.earned, score.total);
            });
        });
    });

    describe("grading", function() {
        it("should not grade a thing that doesn't parse", function() {
            return makeRender(expressionItem2).then(renderer => {
                mathQuillInput(renderer, "+++");
                var score = renderer.guessAndScore()[1];
                assert.strictEqual(score.type, "invalid");
            });
        });

        it("should not grade a thing that is empty", function() {
            return makeRender(expressionItem2).then(renderer => {
                mathQuillInput(renderer, "");
                var score = renderer.guessAndScore()[1];
                assert.strictEqual(score.type, "invalid");
            });
        });
    });

    describe("fallthrough", function() {
        it("should grade answers which don't match anything as wrong",
            function() {
                return makeRender(expressionItem2).then(renderer => {
                    mathQuillInput(renderer, "500");
                    var score = renderer.guessAndScore()[1];
                    assert.strictEqual(score.type, "points");
                    assert.strictEqual(score.earned, 0);
                });
            }
        );
    });

    describe("multiple answers", function() {
        it("should recognize either of two possibilities", function() {
            var renderer = renderQuestionArea(expressionItem2, {}, {
                useMathQuill: true,
                toolTipFormats: true
            });

            // TODO(joel) - clear input instead of making a new renderer every
            // time!
            return makeRender(expressionItem2).then(renderer => {
                // FIRST ANSWER
                mathQuillInput(renderer, "x-123");
                var score = renderer.guessAndScore()[1];
                assert.strictEqual(score.type, "points");
                assert.strictEqual(score.earned, score.total);
            })
            .then(() => makeRender(expressionItem2))
            .then(renderer => {
                // SECOND ANSWER
                mathQuillInput(renderer, "123-x");
                var score = renderer.guessAndScore()[1];
                assert.strictEqual(score.type, "points");
                assert.strictEqual(score.earned, score.total);
            });
        });

        it("should match from top to bottom", function() {
            /* We want to match the three forms in order:
             *
             *     considered: "ungraded"
             *     value: 1
             *
             *     considered: "incorrect"
             *     value: 2
             *
             *     considered: "correct"
             *     value: 3
             */

            // check that the ungraded one matches first and returns *invalid*
            return makeRender(expressionItem3)
            .then(renderer => {
                mathQuillInput(renderer, "1");
                var score = renderer.guessAndScore()[1];
                assert.strictEqual(score.type, "invalid");
            })
            .then(() => makeRender(expressionItem3))
            .then(renderer => {

                // now check that the incorrect one matches and returns no
                // points
                mathQuillInput(renderer, "2");
                var score = renderer.guessAndScore()[1];
                assert.strictEqual(score.type, "points");
                assert.strictEqual(score.earned, 0);

            })
            .then(() => makeRender(expressionItem3))
            .then(renderer => {

                // finally check that the correct one matches with points
                mathQuillInput(renderer, "3");
                var score = renderer.guessAndScore()[1];
                assert.strictEqual(score.type, "points");
                assert.strictEqual(score.earned, score.total);
            });
        });

        it("should fall through exact forms", function() {
            var specificWrong = "(x+2)(x-2)";
            var correct = "x^2-4";
            /* We're checking that, though the two forms are equivalent, the
             * first *is not* counted as correct because that specific form is
             * checked first and graded incorrect.
             *
             * The rules look like this:
             *
             *     value: (x+2)(x-2)
             *     form: true
             *     considered: incorrect
             *
             *     value: x^2-4
             *     form: false
             *     considered: correct
             *
             */

            // check that the specific one matches
            return makeRender(expressionItem4)
            .then(renderer => {
                mathQuillInput(renderer, specificWrong);
                var score = renderer.guessAndScore()[1];
                assert.strictEqual(score.type, "points");
                assert.strictEqual(score.earned, 0);

            })
            .then(() => makeRender(expressionItem4))
            .then(renderer => {
                mathQuillInput(renderer, correct);
                var score = renderer.guessAndScore()[1];
                assert.strictEqual(score.type, "points");
                assert.strictEqual(score.earned, score.total);
            });
        });
    });
});

