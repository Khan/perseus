import {Dependencies} from "@khanacademy/perseus";
import {
    generateOrdererOption,
    generateOrdererOptions,
} from "@khanacademy/perseus-core";
import {render, screen} from "@testing-library/react";
import {userEvent as userEventLib} from "@testing-library/user-event";
import * as React from "react";

import {testDependencies} from "../../testing/test-dependencies";

import OrdererEditor, {mergeCards} from "./orderer-editor";

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
            undefined,
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
        expect(onChangeMock).toHaveBeenLastCalledWith(
            {
                otherOptions: [generateOrdererOption("Emu")],
                options: [
                    generateOrdererOption("Cat"),
                    generateOrdererOption("Emu"),
                ],
            },
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
});

describe("mergeCards", () => {
    it("combines the correct cards and the other cards", () => {
        // Arrange, Act
        const cards = mergeCards(
            [generateOrdererOption("a")],
            [generateOrdererOption("b")],
        );

        // Assert
        expect(cards).toEqual([
            generateOrdererOption("a"),
            generateOrdererOption("b"),
        ]);
    });

    it("sorts content with numbers ahead of content without", () => {
        // Arrange, Act
        const cards = mergeCards(
            [generateOrdererOption("3"), generateOrdererOption("$b$")],
            [generateOrdererOption("2"), generateOrdererOption("a")],
        );

        // Assert
        expect(cards).toEqual([
            generateOrdererOption("2"),
            generateOrdererOption("3"),
            generateOrdererOption("$b$"),
            generateOrdererOption("a"),
        ]);
    });

    it("sorts bare variables last", () => {
        // Arrange, Act
        const cards = mergeCards(
            [generateOrdererOption("x + 1"), generateOrdererOption("$y$")],
            [generateOrdererOption("hello world")],
        );

        // Assert
        expect(cards).toEqual([
            generateOrdererOption("x + 1"),
            generateOrdererOption("hello world"),
            generateOrdererOption("$y$"),
        ]);
    });

    it("removes duplicate cards", () => {
        // Arrange, Act
        const cards = mergeCards(
            [
                generateOrdererOption("duplicate"),
                generateOrdererOption("unique"),
            ],
            [generateOrdererOption("duplicate")],
        );

        // Assert
        expect(cards).toEqual([
            generateOrdererOption("duplicate"),
            generateOrdererOption("unique"),
        ]);
    });

    it("removes empty cards", () => {
        // Arrange, Act
        const cards = mergeCards(
            [generateOrdererOption(""), generateOrdererOption("existing")],
            [generateOrdererOption(""), generateOrdererOption("valid")],
        );

        // Assert
        expect(cards).toEqual([
            generateOrdererOption("existing"),
            generateOrdererOption("valid"),
        ]);
    });
});
