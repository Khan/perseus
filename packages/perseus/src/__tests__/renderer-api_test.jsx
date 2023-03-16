// @flow
import {within} from "@testing-library/react";
import {screen} from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import * as React from "react";
import ReactDOM from "react-dom";
import "@testing-library/jest-dom";
import TestUtils from "react-dom/test-utils.js";
import _ from "underscore";
import "jest-enzyme";

import {ClassNames, Dependencies, Renderer} from "@khanacademy/perseus";

import {testDependencies} from "../../../../testing/test-dependencies.js";
import {registerAllWidgetsForTesting} from "../util/register-all-widgets-for-testing.js";
import {renderQuestion} from "../widgets/__tests__/renderQuestion.jsx";

import imageItem from "./test-items/image-item.js";
import numericInput1Item from "./test-items/numeric-input-1-item.js";
import numericInput2Item from "./test-items/numeric-input-2-item.js";
import tableItem from "./test-items/table-item.js";

const itemWidget = numericInput1Item;

// Returns a promise that will resolve shortly after the end of this
// browser tick.
const delayedPromise = (value) => {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve(value);
        }, 0);
    });
};

describe("Perseus API", function () {
    beforeEach(() => {
        jest.spyOn(Dependencies, "getDependencies").mockReturnValue(
            testDependencies,
        );
        registerAllWidgetsForTesting();
    });

    describe("setInputValue", function () {
        it("should be able to produce a correctly graded value", function () {
            const {renderer} = renderQuestion(numericInput1Item.question);
            renderer.setInputValue(["numeric-input 1"], "5", () => {});
            const score = renderer.guessAndScore()[1];
            expect(score.type).toBe("points");
            expect(score.earned).toBe(score.total);
        });

        it("should be able to produce a wrong value", function () {
            const {renderer} = renderQuestion(numericInput1Item.question);
            renderer.setInputValue(["numeric-input 1"], "3", () => {});
            const score = renderer.guessAndScore()[1];
            expect(score.type).toBe("points");
            expect(score.earned).toBe(0);
        });

        it("should be able to produce an empty score", function () {
            const {renderer} = renderQuestion(numericInput1Item.question);
            renderer.setInputValue(["numeric-input 1"], "3", () => {});
            let score = renderer.guessAndScore()[1];
            expect(score.type).toBe("points");
            expect(score.earned).toBe(0);
            renderer.setInputValue(["numeric-input 1"], "", () => {});
            score = renderer.guessAndScore()[1];
            expect(score.type).toBe("invalid");
        });

        it("should be able to accept a callback", function (done) {
            const {renderer} = renderQuestion(numericInput1Item.question);
            renderer.setInputValue(["numeric-input 1"], "3", function () {
                const guess = renderer.getUserInput()[0];
                expect(guess?.currentValue).toBe("3");
                done();
            });
            jest.runAllTimers();
        });
    });

    describe("getInputPaths", function () {
        it("should be able to find all the input widgets", function () {
            const {renderer} = renderQuestion(numericInput2Item.question);
            const numPaths = renderer.getInputPaths().length;
            expect(numPaths).toBe(2);
        });

        it("should be able to find all inputs within widgets", function () {
            const {renderer} = renderQuestion(tableItem.question);
            const numPaths = renderer.getInputPaths().length;
            expect(numPaths).toBe(8);
        });
    });

    describe("getDOMNodeForPath", function () {
        it("should find one DOM node per <input>", function () {
            const {renderer} = renderQuestion(numericInput2Item.question);
            const inputPaths = renderer.getInputPaths();
            const allInputs = TestUtils.scryRenderedDOMComponentsWithTag(
                renderer,
                "input",
            );
            expect(inputPaths).toHaveLength(allInputs.length);
        });

        it("should find the right DOM nodes for the <input>s", function () {
            const {renderer} = renderQuestion(numericInput2Item.question);
            const inputPaths = renderer.getInputPaths();

            const allInputs = screen.getAllByRole("textbox");
            inputPaths.forEach((inputPath, i) => {
                const node = renderer.getDOMNodeForPath(inputPath);
                const input = ReactDOM.findDOMNode(allInputs[i]);
                // $FlowFixMe[incompatible-call] node is nullable
                expect(within(node).getByRole("textbox")).toBe(input);
            });
        });
    });

    describe("CSS ClassNames", function () {
        describe("perseus-focused", function () {
            it("should be on an numeric-input exactly when focused", function () {
                // Feel free to change this if you change the class name,
                // but if you do, you must up the perseus api [major]
                // version
                expect(ClassNames.FOCUSED).toBe("perseus-focused");

                renderQuestion(numericInput1Item.question);
                const input = screen.getByRole("textbox");

                expect(input.getAttribute("class")).not.toContain("focused");

                userEvent.click(input);
                expect(input.getAttribute("class")).toContain("focused");

                userEvent.tab();
                expect(input.getAttribute("class")).not.toContain("focused");
            });
        });
    });

    describe("onFocusChange", function () {
        it("should be called from focused to blurred to back on one input", function () {
            // TODO(WEB-998): Migrate tests still using real timers to using fake timers
            jest.useRealTimers();
            let callCount = 0;
            let newFocusResult;
            let oldFocusResult;
            const {renderer} = renderQuestion(numericInput1Item.question, {
                onFocusChange: function (newFocus, oldFocus) {
                    callCount++;
                    newFocusResult = newFocus;
                    oldFocusResult = oldFocus;
                },
            });

            // $FlowFixMe[incompatible-use]
            // $FlowFixMe[prop-missing]
            const input = ReactDOM.findDOMNode(renderer).querySelector("input");

            callCount = 0;
            TestUtils.Simulate.focus(input);
            // Technically, this is probably synchronous, but we do want
            // to make sure that this hasn't been called a second time
            // asynchronously, so we check after waiting for an async
            // result here. This also means that this test should
            // continue to pass if we decide it makes more sense for
            // this callback to be async, which could reasonably happen
            return delayedPromise()
                .then(() => {
                    expect(callCount).toBe(1);
                    expect(oldFocusResult).toBe(null);
                    expect(newFocusResult).toEqual(["numeric-input 1"]);

                    callCount = 0;
                    TestUtils.Simulate.blur(input);
                    return delayedPromise();
                })
                .then(() => {
                    expect(callCount).toBe(1);
                    expect(oldFocusResult).toEqual(["numeric-input 1"]);
                    expect(newFocusResult).toBe(null);
                });
        });

        it("should be called focusing between two inputs", function () {
            // TODO(WEB-998): Migrate tests still using real timers to using fake timers
            jest.useRealTimers();
            let callCount = 0;
            let newFocusResult;
            let oldFocusResult;
            const {renderer} = renderQuestion(numericInput2Item.question, {
                onFocusChange: function (newFocus, oldFocus) {
                    callCount++;
                    newFocusResult = newFocus;
                    oldFocusResult = oldFocus;
                },
            });

            const inputs =
                // $FlowFixMe[incompatible-use]
                // $FlowFixMe[prop-missing]
                ReactDOM.findDOMNode(renderer).querySelectorAll("input");
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
                expect(callCount).toBe(1);
                expect(oldFocusResult).toEqual(["numeric-input 1"]);
                expect(newFocusResult).toEqual(["numeric-input 2"]);
            });
        });
    });

    describe("widget placeholders", function () {
        it("should replace widgets with [WIDGET]", function () {
            const widgetPlaceholder = <span key="test">[WIDGET]</span>;
            const apiOptions = {
                widgetPlaceholder: widgetPlaceholder,
            };
            const renderer = TestUtils.renderIntoDocument(
                <Renderer
                    content={itemWidget.question.content}
                    images={itemWidget.question.images}
                    widgets={itemWidget.question.widgets}
                    problemNum={0}
                    apiOptions={apiOptions}
                />,
            );

            const spans = TestUtils.scryRenderedDOMComponentsWithTag(
                renderer,
                "span",
            );

            expect(spans[0].textContent).toEqual("[WIDGET]");
        });

        it("should replace images with [IMAGE]", function () {
            const imagePlaceholder = <span key="test">[IMAGE]</span>;
            const apiOptions = {
                imagePlaceholder: imagePlaceholder,
            };
            const renderer = TestUtils.renderIntoDocument(
                <Renderer
                    content={imageItem.question.content}
                    images={imageItem.question.images}
                    widgets={imageItem.question.widgets}
                    problemNum={0}
                    apiOptions={apiOptions}
                />,
            );

            const spans = TestUtils.scryRenderedDOMComponentsWithTag(
                renderer,
                "span",
            );

            expect(spans[0].textContent).toEqual("[IMAGE]");
        });
    });
});
