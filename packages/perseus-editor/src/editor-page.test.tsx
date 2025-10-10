import {Dependencies} from "@khanacademy/perseus";
import {
    type PerseusOrdererWidgetOptions,
    type PerseusRenderer,
} from "@khanacademy/perseus-core";
import {render, screen} from "@testing-library/react";
import {userEvent as userEventLib} from "@testing-library/user-event";
import * as React from "react";

import {
    testDependencies,
    testDependenciesV2,
} from "../../../testing/test-dependencies";

import EditorPage from "./editor-page";
import {registerAllWidgetsAndEditorsForTesting} from "./util/register-all-widgets-and-editors-for-testing";

import type {UserEvent} from "@testing-library/user-event";

const defaultAnswerArea = {
    calculator: false,
    periodicTable: false,
    financialCalculatorMonthlyPayment: false,
    financialCalculatorTotalAmount: false,
    financialCalculatorTimeToPayOff: false,
    periodicTableWithKey: false,
};

describe("EditorPage", () => {
    beforeAll(() => {
        registerAllWidgetsAndEditorsForTesting();
    });

    let userEvent: UserEvent;
    beforeEach(() => {
        userEvent = userEventLib.setup({
            advanceTimers: jest.advanceTimersByTime,
        });

        jest.spyOn(Dependencies, "getDependencies").mockReturnValue(
            testDependencies,
        );
    });

    // Regression (LEMS-3252)
    it("updates static toggle correctly", async () => {
        let callbackValue: any = null;

        const question: PerseusRenderer = {
            content: "[[☃ categorizer 1]]",
            images: {},
            widgets: {
                "categorizer 1": {
                    type: "categorizer",
                    static: false, // <= important
                    options: {
                        static: false, // <= maybe important?
                        items: ["Zero", "One", "Uno"],
                        categories: ["Column 0", "Column 1"],
                        values: [0, 1, 1],
                        randomizeItems: false,
                    },
                },
            },
        };

        const {rerender} = render(
            <EditorPage
                dependencies={testDependenciesV2}
                question={question}
                hints={[]}
                answerArea={defaultAnswerArea}
                onChange={(next) => (callbackValue = next)}
                onJsonModeChange={() => {}}
                onPreviewDeviceChange={() => {}}
                previewDevice="desktop"
                previewURL=""
                itemId="itemId"
                developerMode={false}
                jsonMode={false}
                widgetsAreOpen={true}
            />,
        );

        const staticSwitch = screen.getByRole("switch", {name: "Static"});
        await userEvent.click(staticSwitch);

        expect(staticSwitch).not.toBeChecked();
        expect(question.widgets["categorizer 1"].static).toBe(false);
        expect(
            callbackValue.perseusItem.question.widgets["categorizer 1"].static,
        ).toBe(true);

        rerender(
            <EditorPage
                dependencies={testDependenciesV2}
                question={callbackValue.perseusItem.question}
                hints={callbackValue.perseusItem.hints}
                answerArea={callbackValue.perseusItem.answerArea}
                onChange={(next) => (callbackValue = next)}
                onJsonModeChange={() => {}}
                onPreviewDeviceChange={() => {}}
                previewDevice="desktop"
                previewURL=""
                itemId="itemId"
                developerMode={false}
                jsonMode={false}
                widgetsAreOpen={true}
            />,
        );

        expect(staticSwitch).toBeChecked();
    });

    it("updates Orderer state correctly", async () => {
        const onChangeMock = jest.fn();

        const imageUrl =
            "https://ka-perseus-graphie.s3.amazonaws.com/6e68574abb61d2b4a12644d777006fcfa8a73cff.png";
        const noAltImage = `![](${imageUrl})`;
        const altImage = `![a fox](${imageUrl})`;
        // "[" is a special char in UserEvent, so I need to do it twice when typing
        const altImageTyped = `![[a fox](${imageUrl})`;

        const startWidgetOptions: PerseusOrdererWidgetOptions = {
            options: [
                {
                    content: noAltImage,
                    widgets: {},
                    images: {},
                },
            ],
            correctOptions: [
                {
                    content: noAltImage,
                    widgets: {},
                    images: {},
                },
            ],
            otherOptions: [],
            height: "normal",
            layout: "horizontal",
        };

        const startRenderer: PerseusRenderer = {
            content: "[[☃ orderer 1]]",
            widgets: {
                "orderer 1": {
                    type: "orderer",
                    options: startWidgetOptions,
                },
            },
            images: {},
        };

        render(
            <EditorPage
                dependencies={testDependenciesV2}
                question={startRenderer}
                hints={[]}
                answerArea={defaultAnswerArea}
                onChange={onChangeMock}
                onJsonModeChange={() => {}}
                onPreviewDeviceChange={() => {}}
                previewDevice="desktop"
                previewURL=""
                itemId="itemId"
                developerMode={false}
                jsonMode={false}
                widgetsAreOpen={true}
            />,
        );

        const input = screen.getByDisplayValue(noAltImage);
        await userEvent.clear(input);
        await userEvent.type(input, altImageTyped);

        // Verify the mock was called
        expect(onChangeMock).toHaveBeenCalled();

        // Get the widget options directly to avoid having to mock the entire PerseusItem
        const widgetOptions =
            onChangeMock.mock.lastCall[0].perseusItem.question.widgets[
                "orderer 1"
            ].options;

        // Verify the options were updated correctly
        expect(widgetOptions).toEqual(
            expect.objectContaining({
                correctOptions: [
                    {
                        content: altImage,
                    },
                ],
                options: [
                    {
                        content: altImage,
                    },
                ],
            }),
        );
    });

    it("calls onChange with new text", async () => {
        const onChangeMock = jest.fn();
        render(
            // Editor page with minimal text and no widgets
            <EditorPage
                dependencies={testDependenciesV2}
                question={{
                    content: "ab",
                    widgets: {},
                    images: {},
                }}
                onChange={onChangeMock}
                onJsonModeChange={() => {}}
                onPreviewDeviceChange={() => {}}
                previewDevice="desktop"
                previewURL=""
                itemId="itemId"
                developerMode={false}
                jsonMode={false}
                widgetsAreOpen={true}
                hints={[]}
                answerArea={defaultAnswerArea}
            />,
        );

        const input = screen.getByDisplayValue("ab");
        await userEvent.type(input, "c");

        expect(onChangeMock).toHaveBeenCalledWith(
            {
                type: "valid",
                perseusItem: expect.objectContaining({
                    question: expect.objectContaining({
                        content: "abc",
                    }),
                }),
            },
            undefined,
            undefined,
        );
    });

    it("calls onChange with new widget", async () => {
        const onChangeMock = jest.fn();
        render(
            // Editor page with minimal text and no widgets
            <EditorPage
                dependencies={testDependenciesV2}
                question={{
                    content: "ab",
                    widgets: {},
                    images: {},
                }}
                onChange={onChangeMock}
                onJsonModeChange={() => {}}
                onPreviewDeviceChange={() => {}}
                previewDevice="desktop"
                previewURL=""
                itemId="itemId"
                developerMode={false}
                jsonMode={false}
                widgetsAreOpen={true}
                hints={[]}
                answerArea={defaultAnswerArea}
            />,
        );

        const widgetDropdown = screen.getByTestId("editor__widget-select");

        // Use selectOptions instead of clicking on individual options
        await userEvent.selectOptions(widgetDropdown, "image");

        expect(onChangeMock).toHaveBeenCalledWith(
            {
                type: "valid",
                perseusItem: expect.objectContaining({
                    question: expect.objectContaining({
                        content: "ab[[☃ image 1]]\n\nab",
                        widgets: expect.objectContaining({
                            "image 1": expect.objectContaining({
                                type: "image",
                            }),
                        }),
                    }),
                }),
            },
            expect.any(Function),
            undefined,
        );
    });
});
