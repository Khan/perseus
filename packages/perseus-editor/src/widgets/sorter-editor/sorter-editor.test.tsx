import {Dependencies} from "@khanacademy/perseus";
import {generateSorterOptions} from "@khanacademy/perseus-core";
import {render, screen} from "@testing-library/react";
import {userEvent as userEventLib} from "@testing-library/user-event";
import * as React from "react";

import {testDependencies} from "../../testing/test-dependencies";

import SorterEditor from "./sorter-editor";

import type {PerseusSorterWidgetOptions} from "@khanacademy/perseus-core";
import type {UserEvent} from "@testing-library/user-event";

/**
 * Renders the editor the way the content editor does: every change is fed back
 * in as props. Tests that make more than one edit, or that depend on the editor
 * re-rendering, need this rather than a bare `render`.
 */
function renderControlled(
    options: PerseusSorterWidgetOptions,
    onChange?: (newOptions: Partial<PerseusSorterWidgetOptions>) => void,
) {
    function Controlled() {
        const [currentOptions, setCurrentOptions] = React.useState(options);

        return (
            <SorterEditor
                {...currentOptions}
                onChange={(newOptions) => {
                    onChange?.(newOptions);
                    setCurrentOptions((prev) => ({...prev, ...newOptions}));
                }}
            />
        );
    }

    return render(<Controlled />);
}

describe("sorter-editor", () => {
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
        render(<SorterEditor onChange={() => {}} />);

        expect(screen.getByText("Correct answer")).toBeInTheDocument();
    });

    it("should be possible to change layout to vertical", async () => {
        // Arrange
        const onChangeMock = jest.fn();
        render(
            <SorterEditor
                onChange={onChangeMock}
                {...generateSorterOptions({layout: "horizontal"})}
            />,
        );

        // Act
        await userEvent.click(screen.getByRole("combobox", {name: "Layout"}));
        await userEvent.click(screen.getByRole("option", {name: "Vertical"}));

        // Assert
        expect(onChangeMock).toHaveBeenCalledWith({layout: "vertical"});
    });

    it("should be possible to change layout to horizontal", async () => {
        // Arrange
        const onChangeMock = jest.fn();
        render(
            <SorterEditor
                onChange={onChangeMock}
                {...generateSorterOptions({layout: "vertical"})}
            />,
        );

        // Act
        await userEvent.click(screen.getByRole("combobox", {name: "Layout"}));
        await userEvent.click(screen.getByRole("option", {name: "Horizontal"}));

        // Assert
        expect(onChangeMock).toHaveBeenCalledWith({layout: "horizontal"});
    });

    it("should be possible to change padding", async () => {
        const onChangeMock = jest.fn();

        render(<SorterEditor onChange={onChangeMock} />);

        await userEvent.click(screen.getByRole("checkbox", {name: "Padding"}));

        expect(onChangeMock).toHaveBeenCalledWith({padding: false});
    });

    it("renders an input for each card in the correct answer", () => {
        // Arrange, Act
        render(
            <SorterEditor
                onChange={() => {}}
                {...generateSorterOptions({correct: ["Cat", "Dog", "Emu"]})}
            />,
        );

        // Assert
        expect(screen.getByDisplayValue("Cat")).toBeInTheDocument();
        expect(screen.getByDisplayValue("Dog")).toBeInTheDocument();
        expect(screen.getByDisplayValue("Emu")).toBeInTheDocument();
    });

    it("calls onChange with the updated correct answer when a card is edited", async () => {
        // Arrange
        const onChangeMock = jest.fn();
        renderControlled(
            generateSorterOptions({correct: ["Cat", "Dog"]}),
            onChangeMock,
        );

        // Act
        const card = screen.getByDisplayValue("Dog");
        await userEvent.clear(card);
        await userEvent.type(card, "Emu");

        // Assert
        expect(onChangeMock).toHaveBeenLastCalledWith({
            correct: ["Cat", "Emu"],
        });
    });

    it("calls onChange with an empty card appended when the add button is clicked", async () => {
        // Arrange
        const onChangeMock = jest.fn();
        render(
            <SorterEditor
                onChange={onChangeMock}
                {...generateSorterOptions({correct: ["Cat", "Dog"]})}
            />,
        );

        // Act
        await userEvent.click(screen.getByRole("button", {name: "Add a card"}));

        // Assert
        expect(onChangeMock).toHaveBeenCalledWith({
            correct: ["Cat", "Dog", ""],
        });
    });

    it("focuses the new card's input after a card is added", async () => {
        // Arrange
        renderControlled(generateSorterOptions({correct: ["Cat", "Dog"]}));

        // Act
        await userEvent.click(screen.getByRole("button", {name: "Add a card"}));

        // Assert
        expect(screen.getByRole("textbox", {name: "Card 3"})).toHaveFocus();
    });

    it("does not render an empty card until one is added", () => {
        // Arrange, Act
        render(
            <SorterEditor
                onChange={() => {}}
                {...generateSorterOptions({correct: ["Cat", "Dog"]})}
            />,
        );

        // Assert
        expect(screen.getAllByRole("textbox")).toHaveLength(2);
    });

    it("swaps a card with the one above it when move up is clicked", async () => {
        // Arrange
        const onChangeMock = jest.fn();
        render(
            <SorterEditor
                onChange={onChangeMock}
                {...generateSorterOptions({correct: ["Cat", "Dog", "Emu"]})}
            />,
        );

        // Act
        await userEvent.click(
            screen.getByRole("button", {name: "Move card 3 up"}),
        );

        // Assert
        expect(onChangeMock).toHaveBeenCalledWith({
            correct: ["Cat", "Emu", "Dog"],
        });
    });

    it("swaps a card with the one below it when move down is clicked", async () => {
        // Arrange
        const onChangeMock = jest.fn();
        render(
            <SorterEditor
                onChange={onChangeMock}
                {...generateSorterOptions({correct: ["Cat", "Dog", "Emu"]})}
            />,
        );

        // Act
        await userEvent.click(
            screen.getByRole("button", {name: "Move card 1 down"}),
        );

        // Assert
        expect(onChangeMock).toHaveBeenCalledWith({
            correct: ["Dog", "Cat", "Emu"],
        });
    });

    it("disables move up on the first card and move down on the last card", () => {
        // Arrange, Act
        render(
            <SorterEditor
                onChange={() => {}}
                {...generateSorterOptions({correct: ["Cat", "Dog", "Emu"]})}
            />,
        );

        // Assert
        expect(
            screen.getByRole("button", {name: "Move card 1 up"}),
        ).toHaveAttribute("aria-disabled", "true");
        expect(
            screen.getByRole("button", {name: "Move card 3 down"}),
        ).toHaveAttribute("aria-disabled", "true");
        expect(
            screen.getByRole("button", {name: "Move card 1 down"}),
        ).toHaveAttribute("aria-disabled", "false");
        expect(
            screen.getByRole("button", {name: "Move card 3 up"}),
        ).toHaveAttribute("aria-disabled", "false");
    });

    it("keeps focus on the moved card so it can be moved again", async () => {
        // Arrange
        renderControlled(
            generateSorterOptions({correct: ["Cat", "Dog", "Emu"]}),
        );

        // Act
        await userEvent.click(
            screen.getByRole("button", {name: "Move card 3 up"}),
        );

        // Assert: "Emu" is now the second card, so its own move up button is
        // the one that should have focus.
        expect(screen.getByDisplayValue("Emu")).toHaveAccessibleName("Card 2");
        expect(
            screen.getByRole("button", {name: "Move card 2 up"}),
        ).toHaveFocus();
    });

    it("removes a card when its delete button is clicked", async () => {
        // Arrange
        const onChangeMock = jest.fn();
        render(
            <SorterEditor
                onChange={onChangeMock}
                {...generateSorterOptions({correct: ["Cat", "Dog", "Emu"]})}
            />,
        );

        // Act
        await userEvent.click(
            screen.getByRole("button", {name: "Delete card 2"}),
        );

        // Assert
        expect(onChangeMock).toHaveBeenCalledWith({correct: ["Cat", "Emu"]});
    });

    it("focuses the card that takes the deleted card's place", async () => {
        // Arrange
        renderControlled(
            generateSorterOptions({correct: ["Cat", "Dog", "Emu"]}),
        );

        // Act
        await userEvent.click(
            screen.getByRole("button", {name: "Delete card 2"}),
        );

        // Assert: "Emu" moved up into the deleted card's slot.
        expect(screen.getByDisplayValue("Emu")).toHaveAccessibleName("Card 2");
        expect(
            screen.getByRole("button", {name: "Delete card 2"}),
        ).toHaveFocus();
    });

    it("focuses the last remaining card when the last card is deleted", async () => {
        // Arrange
        renderControlled(generateSorterOptions({correct: ["Cat", "Dog"]}));

        // Act
        await userEvent.click(
            screen.getByRole("button", {name: "Delete card 2"}),
        );

        // Assert
        expect(
            screen.getByRole("button", {name: "Delete card 1"}),
        ).toHaveFocus();
    });

    it("focuses the add button when the only card is deleted", async () => {
        // Arrange
        renderControlled(generateSorterOptions({correct: ["Cat"]}));

        // Act
        await userEvent.click(
            screen.getByRole("button", {name: "Delete card 1"}),
        );

        // Assert
        expect(screen.queryByRole("textbox")).not.toBeInTheDocument();
        expect(screen.getByRole("button", {name: "Add a card"})).toHaveFocus();
    });

    it("serializes the correct answer, layout, and padding", () => {
        // Arrange
        const editorRef = React.createRef<SorterEditor>();
        render(
            <SorterEditor
                ref={editorRef}
                onChange={() => {}}
                {...generateSorterOptions({
                    correct: ["Cat", "Dog"],
                    layout: "vertical",
                    padding: false,
                })}
            />,
        );

        // Act
        const serialized = editorRef.current?.serialize();

        // Assert
        expect(serialized).toEqual({
            correct: ["Cat", "Dog"],
            layout: "vertical",
            padding: false,
        });
    });
});
