/* TODO(csilvers): fix these lint errors (http://eslint.org/docs/rules): */
/* eslint-disable no-var, react/jsx-closing-bracket-location */
/* To fix, remove an entry above, run ka-lint, and fix errors. */

const assert = require("assert");
const lens = require("../../../hubble/index.js");
// TODO(jack): Package MathQuill
const MathQuill = window.MathQuill;
const MQ = MathQuill.getInterface(2);
const Perseus = require("../../perseus.js");
const React = require("react");
const ReactDOM = require("react-dom");
const _ = require("underscore");

const TestUtils = React.addons.TestUtils;
const delayedPromise = require("../../testutils/delayed-promise.jsx");

const expressionItem1 = {
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
                        "basic",
                    ],
                    "functions": [
                        "f",
                        "g",
                        "h",
                    ],
                    "buttonsVisible": "never",
                },
                "version": {
                    "major": 0,
                    "minor": 1,
                },
            },
        },
    },
    "answerArea": {
        "calculator": false,
    },
    "itemDataVersion": {
        "major": 0,
        "minor": 1,
    },
    "hints": [],
};

const expressionItem2 = lens(expressionItem1)
    .set(["question", "widgets", "expression 1", "options"], {
        "answerForms": [
            {
                "considered": "correct",
                "form": false,
                "simplify": false,
                "value": "123-x",
            },
            {
                "considered": "correct",
                "form": false,
                "simplify": false,
                "value": "x-123",
            },
        ],
        "times": false,
        "buttonSets": ["basic"],
        "functions": [
            "f",
            "g",
            "h",
        ],
    })
    .set(["question", "widgets", "expression 1", "version"], {
        "major": 1,
        "minor": 0,
    })
    .freeze();

const expressionItem3 = lens(expressionItem1)
    .set(["question", "widgets", "expression 1", "options"], {
        "answerForms": [
            {
                "considered": "ungraded",
                "form": false,
                "simplify": false,
                "value": "1",
            },
            {
                "considered": "incorrect",
                "form": false,
                "simplify": false,
                "value": "2",
            },
            {
                "considered": "correct",
                "form": false,
                "simplify": false,
                "value": "3",
            },
        ],
        "times": false,
        "buttonSets": ["basic"],
        "functions": [
            "f",
            "g",
            "h",
        ],
    })
    .set(["question", "widgets", "expression 1", "version"], {
        "major": 1,
        "minor": 0,
    })
    .freeze();

const expressionItem4 = lens(expressionItem3)
    .zoom(["question", "widgets", "expression 1", "options", "answerForms"])
        .merge([0], {
            "value": "\\left(x+2\\right)\\left(x-2\\right)",
            "form": true,
            "considered": "incorrect",
        })
        .merge([1], {
            "value": "x^2-4",
            "considered": "correct",
        })
        .del([2])
    .deZoom()
    .freeze();

const renderQuestionArea = function(item, apiOptions, enabledFeatures) {
    const Renderer = Perseus.Renderer;
    const renderer = TestUtils.renderIntoDocument(
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

/* eslint-disable no-unused-vars */
const findMathQuill = function(renderer) {
    const base = ReactDOM.findDOMNode(renderer);
    const span = base.querySelector(".mq-editable-field");
    assert.notEqual(span, null);
    const mathQuillField = MQ.MathField(span);
    assert.notEqual(mathQuillField, null);
    return mathQuillField;
};
/* eslint-enable no-unused-vars */

const findMathQuillTextArea = function(renderer) {
    const base = ReactDOM.findDOMNode(renderer);
    const input = base.querySelector(".mq-textarea>textarea");
    assert.notEqual(input, null);
    return input;
};

// Input `value` into the mathquill input found in renderer
const mathQuillInput = function(renderer, value) {
    const input = findMathQuillTextArea(renderer);
    const $input = $(input);

    // mathquill needs a keypress to bind its keydown handler for
    // future events. this is super hacky and is a bad explanation.
    // sorry.
    $input.trigger("keypress");

    _.each(value, ch => {
        $input.val(ch).trigger("keypress");
    });
};

// promise a question area that has rendered
const makeRender = item => {
    const renderer = renderQuestionArea(item, {}, {
        // Our test assumes a mathquill input
        useMathQuill: true,
        // right now we need to either specify all enabledFeatures or none, so
        // we specify this here:
        toolTipFormats: true,
    });
    return delayedPromise().then(() => renderer);
};

describe("Expression Widget", function() {
    describe("exponents", function() {
        it("2^-2-3 should produce 2^{-2} - 3", function() {
            return makeRender(expressionItem1).then(renderer => {
                mathQuillInput(renderer, "2^-2-3");
                const score = renderer.guessAndScore()[1];
                assert.strictEqual(score.type, "points");
                assert.strictEqual(score.earned, score.total);
            });
        });
    });

    describe("grading", function() {
        it("should not grade a thing that doesn't parse", function() {
            return makeRender(expressionItem2).then(renderer => {
                mathQuillInput(renderer, "+++");
                const score = renderer.guessAndScore()[1];
                assert.strictEqual(score.type, "invalid");
            });
        });

        it("should not grade a thing that is empty", function() {
            return makeRender(expressionItem2).then(renderer => {
                mathQuillInput(renderer, "");
                const score = renderer.guessAndScore()[1];
                assert.strictEqual(score.type, "invalid");
            });
        });
    });

    describe("fallthrough", function() {
        it("should grade answers which don't match anything as wrong",
            function() {
                return makeRender(expressionItem2).then(renderer => {
                    mathQuillInput(renderer, "500");
                    const score = renderer.guessAndScore()[1];
                    assert.strictEqual(score.type, "points");
                    assert.strictEqual(score.earned, 0);
                });
            }
        );
    });

    describe("multiple answers", function() {
        it("should recognize either of two possibilities", function() {
            // TODO(joel) - clear input instead of making a new renderer every
            // time!
            return makeRender(expressionItem2).then(renderer => {
                // FIRST ANSWER
                mathQuillInput(renderer, "x-123");
                const score = renderer.guessAndScore()[1];
                assert.strictEqual(score.type, "points");
                assert.strictEqual(score.earned, score.total);
            })
            .then(() => makeRender(expressionItem2))
            .then(renderer => {
                // SECOND ANSWER
                mathQuillInput(renderer, "123-x");
                const score = renderer.guessAndScore()[1];
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
                const score = renderer.guessAndScore()[1];
                assert.strictEqual(score.type, "invalid");
            })
            .then(() => makeRender(expressionItem3))
            .then(renderer => {

                // now check that the incorrect one matches and returns no
                // points
                mathQuillInput(renderer, "2");
                const score = renderer.guessAndScore()[1];
                assert.strictEqual(score.type, "points");
                assert.strictEqual(score.earned, 0);

            })
            .then(() => makeRender(expressionItem3))
            .then(renderer => {

                // finally check that the correct one matches with points
                mathQuillInput(renderer, "3");
                const score = renderer.guessAndScore()[1];
                assert.strictEqual(score.type, "points");
                assert.strictEqual(score.earned, score.total);
            });
        });

        it("should fall through exact forms", function() {
            const specificWrong = "(x+2)(x-2)";
            const correct = "x^2-4";
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
                const score = renderer.guessAndScore()[1];
                assert.strictEqual(score.type, "points");
                assert.strictEqual(score.earned, 0);

            })
            .then(() => makeRender(expressionItem4))
            .then(renderer => {
                mathQuillInput(renderer, correct);
                const score = renderer.guessAndScore()[1];
                assert.strictEqual(score.type, "points");
                assert.strictEqual(score.earned, score.total);
            });
        });
    });
});

