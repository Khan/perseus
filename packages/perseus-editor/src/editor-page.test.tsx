import {Dependencies} from "@khanacademy/perseus";
import {
    type PerseusOrdererWidgetOptions,
    type PerseusRenderer,
} from "@khanacademy/perseus-core";
import {render, screen} from "@testing-library/react";
import {userEvent as userEventLib} from "@testing-library/user-event";
import * as React from "react";

import {testDependencies} from "../../../testing/test-dependencies";

import EditorPage from "./editor-page";
import {registerAllWidgetsAndEditorsForTesting} from "./util/register-all-widgets-and-editors-for-testing";

import type {UserEvent} from "@testing-library/user-event";

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
                question={question}
                onChange={(next) => (callbackValue = next)}
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
        expect(callbackValue.question.widgets["categorizer 1"].static).toBe(
            true,
        );

        rerender(
            <EditorPage
                question={callbackValue.question}
                onChange={(next) => (callbackValue = next)}
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
                question={startRenderer}
                onChange={onChangeMock}
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
            onChangeMock.mock.lastCall[0].question.widgets["orderer 1"].options;

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
});
