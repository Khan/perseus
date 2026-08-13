import {Dependencies} from "@khanacademy/perseus";
import {generateMatcherOptions} from "@khanacademy/perseus-core";
import {render, screen} from "@testing-library/react";
import {userEvent as userEventLib} from "@testing-library/user-event";
import * as React from "react";

import {testDependencies} from "../../testing/test-dependencies";

import MatcherEditor from "./matcher-editor";

import type {UserEvent} from "@testing-library/user-event";

describe("matcher-editor", () => {
    let userEvent: UserEvent;
    beforeEach(() => {
        userEvent = userEventLib.setup({
            advanceTimers: jest.advanceTimersByTime,
        });

        jest.spyOn(Dependencies, "getDependencies").mockReturnValue(
            testDependencies,
        );
    });

    it("renders", async () => {
        render(<MatcherEditor onChange={() => {}} />);

        expect(screen.getByText("Correct answer:")).toBeInTheDocument();
    });

    it("is possible to change option: order of matched pairs matters", async () => {
        const onChangeMock = jest.fn();

        render(<MatcherEditor onChange={onChangeMock} />);

        await userEvent.click(
            screen.getByRole("checkbox", {
                name: "Order of the matched pairs matters:",
            }),
        );

        expect(onChangeMock).toHaveBeenCalledWith({orderMatters: true});
    });

    it("should be possible to change padding", async () => {
        const onChangeMock = jest.fn();

        render(<MatcherEditor onChange={onChangeMock} />);

        await userEvent.click(screen.getByRole("checkbox", {name: "Padding:"}));

        expect(onChangeMock).toHaveBeenCalledWith({padding: false});
    });

    it("renders an input for each card and label", () => {
        // Arrange, Act
        render(
            <MatcherEditor
                onChange={() => {}}
                {...generateMatcherOptions({
                    left: ["Cat", "Dog"],
                    right: ["Meow", "Woof"],
                    labels: ["Animal", "Sound"],
                })}
            />,
        );

        // Assert
        expect(screen.getByDisplayValue("Cat")).toBeInTheDocument();
        expect(screen.getByDisplayValue("Dog")).toBeInTheDocument();
        expect(screen.getByDisplayValue("Meow")).toBeInTheDocument();
        expect(screen.getByDisplayValue("Woof")).toBeInTheDocument();
        expect(screen.getByDisplayValue("Animal")).toBeInTheDocument();
        expect(screen.getByDisplayValue("Sound")).toBeInTheDocument();
    });

    it("calls onChange with the updated cards when a left card is edited", async () => {
        // Arrange
        const onChangeMock = jest.fn();
        render(
            <MatcherEditor
                onChange={onChangeMock}
                {...generateMatcherOptions({
                    left: ["Cat", "Dog"],
                    right: ["Meow", "Woof"],
                })}
            />,
        );

        // Act
        const leftCard = screen.getByDisplayValue("Dog");
        await userEvent.clear(leftCard);
        await userEvent.type(leftCard, "Emu");

        // Assert
        expect(onChangeMock).toHaveBeenLastCalledWith({left: ["Cat", "Emu"]});
    });

    it("calls onChange with the updated cards when a right card is edited", async () => {
        // Arrange
        const onChangeMock = jest.fn();
        render(
            <MatcherEditor
                onChange={onChangeMock}
                {...generateMatcherOptions({
                    left: ["Cat", "Dog"],
                    right: ["Meow", "Woof"],
                })}
            />,
        );

        // Act
        const rightCard = screen.getByDisplayValue("Woof");
        await userEvent.clear(rightCard);
        await userEvent.type(rightCard, "Purr");

        // Assert
        expect(onChangeMock).toHaveBeenLastCalledWith({
            right: ["Meow", "Purr"],
        });
    });

    it("calls onChange with the updated labels when the first label is edited", async () => {
        // Arrange
        const onChangeMock = jest.fn();
        render(
            <MatcherEditor
                onChange={onChangeMock}
                {...generateMatcherOptions({labels: ["Animal", "Sound"]})}
            />,
        );

        // Act
        const firstLabel = screen.getByDisplayValue("Animal");
        await userEvent.clear(firstLabel);
        await userEvent.type(firstLabel, "Beast");

        // Assert
        expect(onChangeMock).toHaveBeenLastCalledWith({
            labels: ["Beast", "Sound"],
        });
    });

    it("calls onChange with the updated labels when the second label is edited", async () => {
        // Arrange
        const onChangeMock = jest.fn();
        render(
            <MatcherEditor
                onChange={onChangeMock}
                {...generateMatcherOptions({labels: ["Animal", "Sound"]})}
            />,
        );

        // Act
        const secondLabel = screen.getByDisplayValue("Sound");
        await userEvent.clear(secondLabel);
        await userEvent.type(secondLabel, "Noise");

        // Assert
        expect(onChangeMock).toHaveBeenLastCalledWith({
            labels: ["Animal", "Noise"],
        });
    });

    it("serializes the cards, labels, and options", () => {
        // Arrange
        const editorRef = React.createRef<MatcherEditor>();
        render(
            <MatcherEditor
                ref={editorRef}
                onChange={() => {}}
                {...generateMatcherOptions({
                    left: ["Cat", "Dog"],
                    right: ["Meow", "Woof"],
                    labels: ["Animal", "Sound"],
                    orderMatters: true,
                    padding: false,
                })}
            />,
        );

        // Act
        const serialized = editorRef.current?.serialize();

        // Assert
        expect(serialized).toEqual({
            left: ["Cat", "Dog"],
            right: ["Meow", "Woof"],
            labels: ["Animal", "Sound"],
            orderMatters: true,
            padding: false,
        });
    });

    describe("getSaveWarnings", () => {
        it("returns a warning when the two halves have different numbers of cards", () => {
            // Arrange
            const editorRef = React.createRef<MatcherEditor>();
            render(
                <MatcherEditor
                    ref={editorRef}
                    onChange={() => {}}
                    {...generateMatcherOptions({
                        left: ["Cat", "Dog"],
                        right: ["Meow"],
                    })}
                />,
            );

            // Act
            const warnings = editorRef.current?.getSaveWarnings();

            // Assert
            expect(warnings).toEqual([
                "The two halves of the matcher have different numbers of cards.",
            ]);
        });

        it("returns no warnings when the two halves have the same number of cards", () => {
            // Arrange
            const editorRef = React.createRef<MatcherEditor>();
            render(
                <MatcherEditor
                    ref={editorRef}
                    onChange={() => {}}
                    {...generateMatcherOptions({
                        left: ["Cat", "Dog"],
                        right: ["Meow", "Woof"],
                    })}
                />,
            );

            // Act
            const warnings = editorRef.current?.getSaveWarnings();

            // Assert
            expect(warnings).toEqual([]);
        });
    });
});
