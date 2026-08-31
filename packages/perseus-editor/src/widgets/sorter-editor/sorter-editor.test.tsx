import {Dependencies} from "@khanacademy/perseus";
import {generateSorterOptions, sorterLogic} from "@khanacademy/perseus-core";
import {render, screen} from "@testing-library/react";
import {userEvent as userEventLib} from "@testing-library/user-event";
import * as React from "react";

import {testDependencies} from "../../testing/test-dependencies";

import SorterEditor from "./sorter-editor";

import type {PerseusSorterWidgetOptions} from "@khanacademy/perseus-core";
import type {UserEvent} from "@testing-library/user-event";

/**
 * WidgetEditor holds the editor by ref and calls `serialize()` on it, so that
 * handle is part of the editor's contract with the rest of the system. Deriving
 * the type from the component keeps these tests tied to the contract rather than
 * to how the component happens to be written.
 */
type SorterEditorHandle = React.ElementRef<typeof SorterEditor>;

/**
 * Renders the editor the way the content editor does: every change is fed back
 * in as props. Tests that make more than one edit, or that depend on the editor
 * re-rendering, need this rather than a bare `render`.
 */
function renderControlled(
    options: PerseusSorterWidgetOptions,
    onChange?: (newOptions: Partial<PerseusSorterWidgetOptions>) => void,
    ref?: React.Ref<SorterEditorHandle>,
) {
    function Controlled() {
        const [currentOptions, setCurrentOptions] = React.useState(options);

        return (
            <SorterEditor
                ref={ref}
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

    it("disables the add button once there are ten cards", () => {
        // Arrange, Act
        render(
            <SorterEditor
                onChange={() => {}}
                {...generateSorterOptions({
                    correct: Array.from({length: 10}, (_, i) => `Card ${i}`),
                })}
            />,
        );

        // Assert
        expect(
            screen.getByRole("button", {name: "Add a card"}),
        ).toHaveAttribute("aria-disabled", "true");
    });

    it("does not add an eleventh card when the add button is clicked", async () => {
        // Arrange
        const onChangeMock = jest.fn();
        render(
            <SorterEditor
                onChange={onChangeMock}
                {...generateSorterOptions({
                    correct: Array.from({length: 10}, (_, i) => `Card ${i}`),
                })}
            />,
        );

        // Act
        await userEvent.click(screen.getByRole("button", {name: "Add a card"}));

        // Assert
        expect(onChangeMock).not.toHaveBeenCalled();
    });

    it("keeps the add button enabled below ten cards", () => {
        // Arrange, Act
        render(
            <SorterEditor
                onChange={() => {}}
                {...generateSorterOptions({
                    correct: Array.from({length: 9}, (_, i) => `Card ${i}`),
                })}
            />,
        );

        // Assert
        expect(
            screen.getByRole("button", {name: "Add a card"}),
        ).toHaveAttribute("aria-disabled", "false");
    });

    // Content authored before the ten-card cap can have more cards than the
    // editor now lets you add. The cap only blocks growth: those cards must
    // still be visible and editable, and the extras must not be dropped.
    describe("existing content over the ten-card limit", () => {
        const fifteenCards = Array.from(
            {length: 15},
            (_, i) => `Item ${i + 1}`,
        );

        it("renders an input for every card", () => {
            // Arrange, Act
            render(
                <SorterEditor
                    onChange={() => {}}
                    {...generateSorterOptions({correct: fifteenCards})}
                />,
            );

            // Assert
            expect(screen.getAllByRole("textbox")).toHaveLength(15);
            expect(screen.getByDisplayValue("Item 15")).toBeInTheDocument();
        });

        it("calls onChange with the updated correct answer when a card past the limit is edited", async () => {
            // Arrange
            const onChangeMock = jest.fn();
            renderControlled(
                generateSorterOptions({correct: fifteenCards}),
                onChangeMock,
            );

            // Act
            const card = screen.getByDisplayValue("Item 15");
            await userEvent.clear(card);
            await userEvent.type(card, "Emu");

            // Assert
            expect(onChangeMock).toHaveBeenLastCalledWith({
                correct: [...fifteenCards.slice(0, 14), "Emu"],
            });
        });

        it("removes a card past the limit when its delete button is clicked", async () => {
            // Arrange
            const onChangeMock = jest.fn();
            render(
                <SorterEditor
                    onChange={onChangeMock}
                    {...generateSorterOptions({correct: fifteenCards})}
                />,
            );

            // Act
            await userEvent.click(
                screen.getByRole("button", {name: "Delete card 15"}),
            );

            // Assert
            expect(onChangeMock).toHaveBeenCalledWith({
                correct: fifteenCards.slice(0, 14),
            });
        });

        it("serializes all of the cards, including the ones past the limit", () => {
            // Arrange
            const editorRef = React.createRef<SorterEditorHandle>();
            render(
                <SorterEditor
                    ref={editorRef}
                    onChange={() => {}}
                    {...generateSorterOptions({correct: fifteenCards})}
                />,
            );

            // Act
            const serialized = editorRef.current?.serialize();

            // Assert
            expect(serialized?.correct).toEqual(fifteenCards);
        });

        it("disables the add button", () => {
            // Arrange, Act
            render(
                <SorterEditor
                    onChange={() => {}}
                    {...generateSorterOptions({correct: fifteenCards})}
                />,
            );

            // Assert
            expect(
                screen.getByRole("button", {name: "Add a card"}),
            ).toHaveAttribute("aria-disabled", "true");
        });
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

    it("renders no cards once the last one is deleted", async () => {
        // Arrange
        renderControlled(generateSorterOptions({correct: ["Cat"]}));

        // Act
        await userEvent.click(
            screen.getByRole("button", {name: "Delete card 1"}),
        );

        // Assert
        expect(screen.queryByRole("textbox")).not.toBeInTheDocument();
    });

    it("renumbers the remaining cards after one is deleted", async () => {
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
    });

    it("serializes the correct answer, layout, and padding", () => {
        // Arrange
        const editorRef = React.createRef<SorterEditorHandle>();
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

    // WidgetEditor serializes the editor *during* an edit, to fold the editor's
    // current options into the change it's about to publish. A handle that
    // captured the props it was created with would serialize pre-edit options
    // and quietly revert the author's work, so serializing has to see the props
    // from the latest render, not the first one.
    it("serializes card edits made after the first render", async () => {
        // Arrange
        const editorRef = React.createRef<SorterEditorHandle>();
        renderControlled(
            generateSorterOptions({correct: ["Cat", "Dog"]}),
            undefined,
            editorRef,
        );

        // Act
        const card = screen.getByDisplayValue("Dog");
        await userEvent.clear(card);
        await userEvent.type(card, "Emu");

        // Assert
        expect(editorRef.current?.serialize()).toMatchObject({
            correct: ["Cat", "Emu"],
        });
    });

    it("serializes layout changes made after the first render", async () => {
        // Arrange
        const editorRef = React.createRef<SorterEditorHandle>();
        renderControlled(
            generateSorterOptions({layout: "horizontal"}),
            undefined,
            editorRef,
        );

        // Act
        await userEvent.click(screen.getByRole("combobox", {name: "Layout"}));
        await userEvent.click(screen.getByRole("option", {name: "Vertical"}));

        // Assert
        expect(editorRef.current?.serialize()).toMatchObject({
            layout: "vertical",
        });
    });

    // The editor page reads the default options off the component itself to
    // seed a newly inserted sorter, so they're part of its public surface, not
    // implementation detail.
    it("exposes the default widget options a new sorter starts with", () => {
        // Arrange, Act, Assert
        expect(SorterEditor.defaultProps).toEqual(
            sorterLogic.defaultWidgetOptions,
        );
    });

    it("renders the default cards when no options are given", () => {
        // Arrange, Act
        render(<SorterEditor onChange={() => {}} />);

        // Assert
        expect(screen.getAllByRole("textbox")).toHaveLength(3);
        expect(screen.getByDisplayValue("$x$")).toBeInTheDocument();
        expect(screen.getByDisplayValue("$y$")).toBeInTheDocument();
        expect(screen.getByDisplayValue("$z$")).toBeInTheDocument();
    });

    describe("getSaveWarnings", () => {
        function renderForWarnings(correct: string[]) {
            const editorRef = React.createRef<SorterEditorHandle>();
            renderControlled(
                generateSorterOptions({correct}),
                undefined,
                editorRef,
            );
            return editorRef;
        }

        it("returns no warnings when every card has text", () => {
            // Arrange, Act
            const editorRef = renderForWarnings(["Cat", "Dog"]);

            // Assert
            expect(editorRef.current?.getSaveWarnings()).toEqual([]);
        });

        it("warns when a card is blank", () => {
            // Arrange, Act
            const editorRef = renderForWarnings(["Cat", ""]);

            // Assert
            expect(editorRef.current?.getSaveWarnings()).toEqual([
                "Sorter cards cannot be blank.",
            ]);
        });

        it("warns when a card holds only whitespace", () => {
            // Arrange, Act
            const editorRef = renderForWarnings(["Cat", "   "]);

            // Assert
            expect(editorRef.current?.getSaveWarnings()).toEqual([
                "Sorter cards cannot be blank.",
            ]);
        });

        it("warns when there are fewer than two cards", () => {
            // Arrange, Act
            const editorRef = renderForWarnings(["Cat"]);

            // Assert
            expect(editorRef.current?.getSaveWarnings()).toEqual([
                "Sorter requires at least 2 cards.",
            ]);
        });

        it("warns when every card has been deleted", () => {
            // Arrange, Act
            const editorRef = renderForWarnings([]);

            // Assert
            expect(editorRef.current?.getSaveWarnings()).toEqual([
                "Sorter requires at least 2 cards.",
            ]);
        });

        // The warnings have to reflect the edit in progress, the same way
        // `serialize` does — WidgetEditor asks for both mid-edit.
        it("warns about a card the author has just cleared", async () => {
            // Arrange
            const editorRef = renderForWarnings(["Cat", "Dog"]);

            // Act
            await userEvent.clear(screen.getByDisplayValue("Dog"));

            // Assert
            expect(editorRef.current?.getSaveWarnings()).toEqual([
                "Sorter cards cannot be blank.",
            ]);
        });

        it("warns about a newly added card before it has text", async () => {
            // Arrange
            const editorRef = renderForWarnings(["Cat", "Dog"]);

            // Act
            await userEvent.click(
                screen.getByRole("button", {name: "Add a card"}),
            );

            // Assert
            expect(editorRef.current?.getSaveWarnings()).toEqual([
                "Sorter cards cannot be blank.",
            ]);
        });
    });
});
