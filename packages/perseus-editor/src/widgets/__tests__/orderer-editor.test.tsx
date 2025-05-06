import {Dependencies} from "@khanacademy/perseus";
import {render, screen} from "@testing-library/react";
import {userEvent as userEventLib} from "@testing-library/user-event";
import * as React from "react";

import {testDependencies} from "../../../../../testing/test-dependencies";
import OrdererEditor from "../orderer-editor";

import type {PerseusOrdererWidgetOptions} from "@khanacademy/perseus-core";
import type {UserEvent} from "@testing-library/user-event";

describe("OrdererEditor", () => {
    let userEvent: UserEvent;
    beforeEach(() => {
        userEvent = userEventLib.setup({
            advanceTimers: jest.advanceTimersByTime,
        });

        jest.spyOn(Dependencies, "getDependencies").mockReturnValue(
            testDependencies,
        );
    });

    it("updates state correctly", async () => {
        const onChangeMock = jest.fn();
        const editorRef = React.createRef<OrdererEditor>();

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

        render(
            <OrdererEditor
                ref={editorRef}
                onChange={onChangeMock}
                {...startWidgetOptions}
            />,
        );

        const input = screen.getByDisplayValue(noAltImage);
        await userEvent.clear(input);
        await userEvent.type(input, altImageTyped);

        expect(onChangeMock).toHaveBeenCalled();
        // Verify the options were updated correctly
        expect(onChangeMock).toHaveBeenCalledWith(
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
            undefined,
        );
    });

    it.only("sorts options correctly", async () => {
        const onChangeMock = jest.fn();
        const editorRef = React.createRef<OrdererEditor>();

        const startWidgetOptions: PerseusOrdererWidgetOptions = {
            correctOptions: [
                {
                    content: "3",
                    widgets: {},
                    images: {},
                },
                {
                    content: "$b$",
                    widgets: {},
                    images: {},
                },
            ],
            otherOptions: [
                {
                    content: "2",
                    widgets: {},
                    images: {},
                },
                {
                    content: "1",
                    widgets: {},
                    images: {},
                },
            ],
            height: "normal",
            layout: "horizontal",
            options: [],
        };

        render(
            <OrdererEditor
                ref={editorRef}
                onChange={onChangeMock}
                {...startWidgetOptions}
            />,
        );

        const input = screen.getByDisplayValue("1");
        await userEvent.clear(input);
        await userEvent.type(input, "a");

        // We should be sorted alphabetically, and then by category:
        // 1. Numbers
        // 2. $tex$ (but $tex$ without an initial number)
        // 3. Everything else
        expect(onChangeMock).toHaveBeenCalledWith(
            expect.objectContaining({
                options: [
                    {content: "2"},
                    {content: "3"},
                    {content: "$b$"},
                    {content: "a"},
                ],
            }),
            undefined,
        );
    });
});
