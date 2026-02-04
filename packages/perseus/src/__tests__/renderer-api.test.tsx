import {describe, beforeEach, it} from "@jest/globals";
import {act, render, screen} from "@testing-library/react";
import {userEvent as userEventLib} from "@testing-library/user-event";
import $ from "jquery";
import * as React from "react";
import ReactDOM from "react-dom";

import * as Dependencies from "../dependencies";
import {ClassNames} from "../perseus-api";
import Renderer from "../renderer";
import {mockStrings} from "../strings";
import {testDependencies} from "../testing/test-dependencies";
import {registerWidget} from "../widgets";
import {renderQuestion} from "../widgets/__testutils__/renderQuestion";
import {MockWidget} from "../widgets/mock-widgets";

import imageItem from "./test-items/image-item";
import mockWidget1Item from "./test-items/mock-widget-1-item";
import mockWidget2Item from "./test-items/mock-widget-2-item";
import tableItem from "./test-items/table-item";

import type {UserEvent} from "@testing-library/user-event";

const itemWidget = mockWidget1Item;

describe("Perseus API", function () {
    let userEvent: UserEvent;

    beforeEach(() => {
        userEvent = userEventLib.setup({
            advanceTimers: jest.advanceTimersByTime,
        });

        jest.spyOn(Dependencies, "getDependencies").mockReturnValue(
            testDependencies,
        );
        registerWidget("mock-widget", MockWidget);
    });

    describe("getInputPaths", function () {
        it("should be able to find all the input widgets", function () {
            const {renderer} = renderQuestion(mockWidget2Item.question);
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
            const {renderer} = renderQuestion(mockWidget2Item.question);
            const inputPaths = renderer.getInputPaths();

            const allInputs = screen.queryAllByRole("textbox");

            expect(inputPaths).toHaveLength(allInputs.length);
        });

        it("should find the right DOM nodes for the <input>s", function () {
            const {renderer} = renderQuestion(mockWidget2Item.question);
            const inputPaths = renderer.getInputPaths();

            const allInputs = screen.queryAllByRole("textbox");

            inputPaths.forEach((inputPath, i) => {
                // @ts-expect-error - TS2769 - No overload matches this call.
                const $node = $(renderer.getDOMNodeForPath(inputPath));
                // @ts-expect-error - TS2769 - No overload matches this call.
                const $input = $(ReactDOM.findDOMNode(allInputs[i]));
                // @ts-expect-error - TS2339 - Property 'closest' does not exist on type 'JQueryStatic'.
                // eslint-disable-next-line testing-library/no-node-access
                expect($input.closest($node).length).toBeTruthy();
            });
        });
    });

    describe("CSS ClassNames", function () {
        describe("perseus-focused", function () {
            it("should be on a mock-widget exactly when focused", async function () {
                // Feel free to change this if you change the class name,
                // but if you do, you must up the perseus api [major]
                // version
                expect(ClassNames.FOCUSED).toBe("perseus-focused");

                renderQuestion(mockWidget1Item.question);

                const input = screen.getByRole("textbox");
                expect(input).not.toHaveFocus();

                await userEvent.click(input);
                expect(input).toHaveFocus();

                await userEvent.tab();
                expect(input).not.toHaveFocus();
            });
        });
    });

    describe("onFocusChange", function () {
        it("should be called from focused to blurred to back on one input", async function () {
            const onFocusChange = jest.fn();
            renderQuestion(mockWidget1Item.question, {onFocusChange});

            const input = screen.getByRole("textbox");

            // Act - focus
            await userEvent.click(input);
            act(() => jest.runOnlyPendingTimers());

            // Assert
            expect(onFocusChange).toHaveBeenCalledTimes(1);
            expect(onFocusChange).toHaveBeenCalledWith(["mock-widget 1"], null);

            // Act - blur
            onFocusChange.mockReset();
            await userEvent.tab();
            act(() => jest.runOnlyPendingTimers());

            // Assert
            expect(onFocusChange).toHaveBeenCalledTimes(1);
            expect(onFocusChange).toHaveBeenCalledWith(null, ["mock-widget 1"]);
        });

        it("should be called focusing between two inputs", async function () {
            const onFocusChange = jest.fn();
            renderQuestion(mockWidget2Item.question, {onFocusChange});

            const inputs = screen.getAllByRole("textbox");
            const input1 = inputs[0];
            const input2 = inputs[1];
            await userEvent.click(input1);
            act(() => jest.runOnlyPendingTimers());

            // Act - move focus to new input
            onFocusChange.mockReset();
            await userEvent.click(input2);
            act(() => jest.runOnlyPendingTimers());

            expect(onFocusChange).toHaveBeenCalledTimes(1);
            expect(onFocusChange).toHaveBeenCalledWith(
                ["mock-widget 2"],
                ["mock-widget 1"],
            );
        });
    });

    describe("placeholders", function () {
        it("should replace widgets with widgetPlaceholder", function () {
            const widgetPlaceholder = (
                <span data-testid="widget-container" key="1">
                    [WIDGET]
                </span>
            );

            render(
                <Renderer
                    content={itemWidget.question.content}
                    images={itemWidget.question.images}
                    widgets={itemWidget.question.widgets}
                    problemNum={0}
                    apiOptions={{widgetPlaceholder}}
                    strings={mockStrings}
                />,
            );

            expect(screen.getByTestId("widget-container")).toBeInTheDocument();
            expect(screen.getByTestId("widget-container")).toHaveTextContent(
                "[WIDGET]",
            );
        });

        it("should replace images with imagePlaceholder", function () {
            const imagePlaceholder = (
                <span data-testid="image-container" key="1">
                    [IMAGE]
                </span>
            );
            render(
                <Renderer
                    content={imageItem.question.content}
                    images={imageItem.question.images}
                    widgets={imageItem.question.widgets}
                    problemNum={0}
                    strings={mockStrings}
                    apiOptions={{imagePlaceholder}}
                />,
            );

            expect(screen.getByTestId("image-container")).toBeInTheDocument();
            expect(screen.getByTestId("image-container")).toHaveTextContent(
                "[IMAGE]",
            );
        });
    });
});
