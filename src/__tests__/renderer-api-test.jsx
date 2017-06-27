const React = require("react");
const _ = require("underscore");

const ReactDOM = require("react-dom");

const assert = require("assert");
const Renderer = require("../renderer.jsx");
const ClassNames = require("../perseus-api.jsx").ClassNames;

const TestUtils = require("react-addons-test-utils");
const delayedPromise = require("../testutils/delayed-promise.jsx");

// Items for testing!
const inputNumber1Item = require("./test-items/input-number-1-item.json");
const inputNumber2Item = require("./test-items/input-number-2-item.json");
const tableItem = require("./test-items/table-item.json");

// Jasmine requires us to use `pit` to support promises;
// mocha supports this already with `it`.
// This seemed to be the best compromise to support
// async tests in both frameworks.
const pit = window.pit || window.it || global.pit || global.it;

const renderQuestionArea = function(item, apiOptions) {
    const renderer = TestUtils.renderIntoDocument(
        <Renderer
            content={item.question.content}
            images={item.question.images}
            widgets={item.question.widgets}
            problemNum={0}
            apiOptions={apiOptions}
        />
    );
    return renderer;
};

describe("Perseus API", function() {
    describe("setInputValue", function() {
        it("should be able to produce a correctly graded value", function() {
            const renderer = renderQuestionArea(inputNumber1Item);
            renderer.setInputValue(["input-number 1"], "5");
            const score = renderer.guessAndScore()[1];
            assert.strictEqual(score.type, "points");
            assert.strictEqual(score.earned, score.total);
        });

        it("should be able to produce a wrong value", function() {
            const renderer = renderQuestionArea(inputNumber1Item);
            renderer.setInputValue(["input-number 1"], "3");
            const score = renderer.guessAndScore()[1];
            assert.strictEqual(score.type, "points");
            assert.strictEqual(score.earned, 0);
        });

        it("should be able to produce an empty score", function() {
            const renderer = renderQuestionArea(inputNumber1Item);
            renderer.setInputValue(["input-number 1"], "3");
            let score = renderer.guessAndScore()[1];
            assert.strictEqual(score.type, "points");
            assert.strictEqual(score.earned, 0);
            renderer.setInputValue(["input-number 1"], "");
            score = renderer.guessAndScore()[1];
            assert.strictEqual(score.type, "invalid");
        });

        it("should be able to accept a callback", function() {
            let x = 3;
            const renderer = renderQuestionArea(inputNumber1Item);
            assert.strictEqual(x, 3);
            renderer.setInputValue(["input-number 1"], "3", function() {
                x = 5;
            });
            assert.strictEqual(x, 5);
        });
    });

    describe("getInputPaths", function() {
        it("should be able to find all the input widgets", function() {
            const renderer = renderQuestionArea(inputNumber2Item);
            const numPaths = renderer.getInputPaths().length;
            assert.strictEqual(numPaths, 2);
        });

        it("should be able to find all inputs within widgets", function() {
            const renderer = renderQuestionArea(tableItem);
            const numPaths = renderer.getInputPaths().length;
            assert.strictEqual(numPaths, 8);
        });
    });

    describe("getDOMNodeForPath", function() {
        it("should find one DOM node per <input>", function() {
            const renderer = renderQuestionArea(inputNumber2Item);
            const inputPaths = renderer.getInputPaths();
            const allInputs = TestUtils.scryRenderedDOMComponentsWithTag(
                renderer, "input");
            assert.strictEqual(inputPaths.length, allInputs.length);
        });

        it("should find the right DOM nodes for the <input>s", function() {
            const renderer = renderQuestionArea(inputNumber2Item);
            const inputPaths = renderer.getInputPaths();
            const allInputs = TestUtils.scryRenderedDOMComponentsWithTag(
                renderer, "input");
            _.each(inputPaths, (inputPath, i) => {
                const $node = $(renderer.getDOMNodeForPath(inputPath));
                const $input = $(ReactDOM.findDOMNode(allInputs[i]));
                assert.ok($input.closest($node).length);
            });
        });
    });

    describe("onInputError", function() {
        it("should call a callback when grading an empty input-number",
            function() {
                let wasCalled;
                const renderer = renderQuestionArea(inputNumber1Item, {
                    onInputError: function(widgetId) {
                        wasCalled = true;
                    },
                });
                const score = renderer.guessAndScore()[1];
                assert.strictEqual(score.type, "invalid");
                assert.strictEqual(wasCalled, true);
            }
        );
    });

    describe("CSS ClassNames", function() {
        describe("perseus-input", function() {
            it("should be on the `input` element of an input-number",
                function() {
                    // Feel free to change this if you change the class name,
                    // but if you do, you must up the perseus api [major]
                    // version
                    assert.strictEqual(
                        ClassNames.INPUT,
                        "perseus-input");

                    const renderer = renderQuestionArea(inputNumber1Item);

                    const input = ReactDOM.findDOMNode(renderer)
                            .querySelector('input');
                    assert.strictEqual(
                        $(input).hasClass(ClassNames.INPUT),
                        true
                    );

                    const perseusInput = ReactDOM.findDOMNode(renderer)
                        .querySelector(".perseus-input");
                    assert.strictEqual(input, perseusInput);
                }
            );
        });

        describe("perseus-focused", function() {
            it("should be on an input-number exactly when focused",
                function() {
                    // Feel free to change this if you change the class name,
                    // but if you do, you must up the perseus api [major]
                    // version
                    assert.strictEqual(
                        ClassNames.FOCUSED,
                        "perseus-focused"
                    );

                    const renderer = renderQuestionArea(inputNumber1Item, {
                        interceptInputFocus: function(widgetId) {
                            renderer.setInputValue(widgetId, "5");
                        },
                    });
                    const input = ReactDOM.findDOMNode(renderer)
                            .querySelector('input');

                    assert.strictEqual(
                        $(input).hasClass(ClassNames.FOCUSED),
                        false
                    );

                    TestUtils.Simulate.focus(input);
                    assert.strictEqual(
                        $(input).hasClass(ClassNames.FOCUSED),
                        true
                    );

                    TestUtils.Simulate.blur(input);
                    assert.strictEqual(
                        $(input).hasClass(ClassNames.FOCUSED),
                        false
                    );
                }
            );
        });
    });

    describe("onFocusChange", function() {
        pit("should be called from focused to blurred to back on one input",
            function() {
                let callCount = 0;
                let newFocusResult;
                let oldFocusResult;
                const renderer = renderQuestionArea(inputNumber1Item, {
                    onFocusChange: function(newFocus, oldFocus) {
                        callCount++;
                        newFocusResult = newFocus;
                        oldFocusResult = oldFocus;
                    },
                });

                const input = ReactDOM.findDOMNode(renderer)
                        .querySelector('input');

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
            }
        );

        pit("should be called focusing between two inputs",
            function() {
                let callCount = 0;
                let newFocusResult;
                let oldFocusResult;
                const renderer = renderQuestionArea(inputNumber2Item, {
                    onFocusChange: function(newFocus, oldFocus) {
                        callCount++;
                        newFocusResult = newFocus;
                        oldFocusResult = oldFocus;
                    },
                });

                const inputs = ReactDOM.findDOMNode(renderer)
                        .querySelectorAll('input');
                const input1 = inputs[0];
                const input2 = inputs[1];
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
            }
        );
    });

    describe("widget placeholders", function() {
        it("should replace widgets with [WIDGET]", function() {
            const item = require("./test-items/input-number-1-item.json");
            const widgetPlaceholder = <span>[WIDGET]</span>;
            const apiOptions = {
                widgetPlaceholder: widgetPlaceholder,
            };
            const renderer = TestUtils.renderIntoDocument(
                <Renderer
                    content={item.question.content}
                    images={item.question.images}
                    widgets={item.question.widgets}
                    problemNum={0}
                    apiOptions={apiOptions}
                />
            );

            const spans = TestUtils.scryRenderedDOMComponentsWithTag(
                renderer, "span");

            assert.equal(spans[0].textContent, "[WIDGET]");
        });

        it("should replace images with [IMAGE]", function() {
            const item = require("./test-items/image-item.json");
            const imagePlaceholder = <span>[IMAGE]</span>;
            const apiOptions = {
                imagePlaceholder: imagePlaceholder,
            };
            const renderer = TestUtils.renderIntoDocument(
                <Renderer
                    content={item.question.content}
                    images={item.question.images}
                    widgets={item.question.widgets}
                    problemNum={0}
                    apiOptions={apiOptions}
                />
            );

            const spans = TestUtils.scryRenderedDOMComponentsWithTag(
                renderer, "span");

            assert.equal(spans[0].textContent, "[IMAGE]");
        });
    });
});
