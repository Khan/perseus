import {Dependencies} from "@khanacademy/perseus";
import {
    generateOrdererOption,
    generateOrdererOptions,
} from "@khanacademy/perseus-core";
import {render, screen} from "@testing-library/react";
import {userEvent as userEventLib} from "@testing-library/user-event";
import * as React from "react";

import {testDependencies} from "../../testing/test-dependencies";

import OrdererEditor from "./orderer-editor";

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
                correctOptions: [generateOrdererOption(altImage)],
                options: [generateOrdererOption(altImage)],
            }),
        );
    });

    it("calls onChange with the merged cards when an other card is edited", async () => {
        // Arrange
        const onChangeMock = jest.fn();
        render(
            <OrdererEditor
                onChange={onChangeMock}
                {...generateOrdererOptions({
                    correctOptions: [generateOrdererOption("Cat")],
                    otherOptions: [generateOrdererOption("Dog")],
                })}
            />,
        );

        // Act
        const otherCard = screen.getByDisplayValue("Dog");
        await userEvent.clear(otherCard);
        await userEvent.type(otherCard, "Emu");

        // Assert
        expect(onChangeMock).toHaveBeenLastCalledWith({
            otherOptions: [generateOrdererOption("Emu")],
            options: [
                generateOrdererOption("Cat"),
                generateOrdererOption("Emu"),
            ],
        });
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
                generateOrdererOption("Option 1"),
                generateOrdererOption("Option 2"),
                generateOrdererOption("Option 3"),
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

    it("renders an input for each correct and other card", () => {
        // Arrange, Act
        render(
            <OrdererEditor
                onChange={() => {}}
                {...generateOrdererOptions({
                    correctOptions: [
                        generateOrdererOption("Cat"),
                        generateOrdererOption("Dog"),
                    ],
                    otherOptions: [generateOrdererOption("Emu")],
                })}
            />,
        );

        // Assert
        expect(screen.getByDisplayValue("Cat")).toBeInTheDocument();
        expect(screen.getByDisplayValue("Dog")).toBeInTheDocument();
        expect(screen.getByDisplayValue("Emu")).toBeInTheDocument();
    });

    it("calls onChange with the new layout when the layout is changed", async () => {
        // Arrange
        const onChangeMock = jest.fn();
        render(
            <OrdererEditor
                onChange={onChangeMock}
                {...generateOrdererOptions({layout: "horizontal"})}
            />,
        );

        // Act
        await userEvent.selectOptions(
            screen.getByRole("combobox", {name: "Layout:"}),
            "vertical",
        );

        // Assert
        expect(onChangeMock).toHaveBeenCalledWith({layout: "vertical"});
    });

    it("calls onChange with the new height when the height is changed", async () => {
        // Arrange
        const onChangeMock = jest.fn();
        render(
            <OrdererEditor
                onChange={onChangeMock}
                {...generateOrdererOptions({height: "normal"})}
            />,
        );

        // Act
        await userEvent.selectOptions(
            screen.getByRole("combobox", {name: "Height:"}),
            "auto",
        );

        // Assert
        expect(onChangeMock).toHaveBeenCalledWith({height: "auto"});
    });
});
