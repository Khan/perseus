import {Dependencies} from "@khanacademy/perseus";
import {render, screen} from "@testing-library/react";
import {userEvent as userEventLib} from "@testing-library/user-event";
import * as React from "react";

import {testDependencies} from "../../testing/test-dependencies";
import OrdererEditor, {getUpdatedOptions} from "../orderer-editor";

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
        // Arrange
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

        // Act
        const input = screen.getByDisplayValue(noAltImage);
        await userEvent.clear(input);
        await userEvent.type(input, altImageTyped);

        // Assert
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

    it("serializes content correctly", () => {
        // Arrange
        const onChangeMock = jest.fn();
        const editorRef = React.createRef<OrdererEditor>();

        const widgetOptions: PerseusOrdererWidgetOptions = {
            // While technically an invalid state, it's helpful for emphasizing
            // that serialize() handles the updating of options correctly
            options: [],
            correctOptions: [
                {content: "Option 1", widgets: {}, images: {}},
                {content: "Option 3", widgets: {}, images: {}},
            ],
            otherOptions: [{content: "Option 2", widgets: {}, images: {}}],
            height: "normal",
            layout: "horizontal",
        };

        render(
            <OrdererEditor
                ref={editorRef}
                onChange={onChangeMock}
                {...widgetOptions}
            />,
        );

        // Act
        const serialized = editorRef.current?.serialize();

        // Assert
        expect(serialized).toEqual({
            options: [
                {content: "Option 1"},
                {content: "Option 2"},
                {content: "Option 3"},
            ],
            correctOptions: [
                {content: "Option 1", widgets: {}, images: {}},
                {content: "Option 3", widgets: {}, images: {}},
            ],
            otherOptions: [{content: "Option 2", widgets: {}, images: {}}],
            height: "normal",
            layout: "horizontal",
        });
    });
});

describe("getUpdatedOptions", () => {
    it("correctly updates correctOptions", () => {
        // Arrange
        const existingCorrect = [{content: "existing correct"}];
        const existingOther = [{content: "existing other"}];
        const newOptions = ["new option"];

        // Act
        const props = getUpdatedOptions(
            existingCorrect,
            existingOther,
            "correctOptions",
            newOptions,
        );

        // Assert
        expect(props).toEqual({
            correctOptions: [{content: "new option"}],
            options: [{content: "existing other"}, {content: "new option"}],
        });
    });

    it("correctly updates otherOptions", () => {
        // Arrange
        const existingCorrect = [{content: "existing correct"}];
        const existingOther = [{content: "existing other"}];
        const newOptions = ["new other"];

        // Act
        const props = getUpdatedOptions(
            existingCorrect,
            existingOther,
            "otherOptions",
            newOptions,
        );

        // Assert
        expect(props).toEqual({
            otherOptions: [{content: "new other"}],
            options: [{content: "existing correct"}, {content: "new other"}],
        });
    });

    it("sorts options correctly", () => {
        // Arrange
        const existingCorrect = [{content: "3"}, {content: "$b$"}];
        const existingOther = [{content: "2"}, {content: "1"}];
        const newOptions = ["2", "a"];

        // Act
        const props = getUpdatedOptions(
            existingCorrect,
            existingOther,
            "otherOptions",
            newOptions,
        );

        // Assert
        // Sort order should be:
        // 1. Numbers (2, 3)
        // 2. $tex$ without numbers ($b$)
        // 3. Everything else (a)
        expect(props.options).toEqual([
            {content: "2"},
            {content: "3"},
            {content: "$b$"},
            {content: "a"},
        ]);
    });

    it("removes duplicate options", () => {
        // Arrange
        const existingCorrect = [{content: "duplicate"}, {content: "unique"}];
        const existingOther = [{content: "duplicate"}];
        const newOptions = ["duplicate"];

        // Act
        const props = getUpdatedOptions(
            existingCorrect,
            existingOther,
            "otherOptions",
            newOptions,
        );

        // Assert
        expect(props.options).toEqual([
            {content: "duplicate"},
            {content: "unique"},
        ]);
    });

    it("filters out empty strings", () => {
        // Arrange
        const existingCorrect = [{content: ""}, {content: "existing"}];
        const existingOther = [{content: ""}];
        const newOptions = ["", "valid"];

        // Act
        const props = getUpdatedOptions(
            existingCorrect,
            existingOther,
            "otherOptions",
            newOptions,
        );

        // Assert
        expect(props.options).toEqual([
            {content: "existing"},
            {content: "valid"},
        ]);
    });
});
