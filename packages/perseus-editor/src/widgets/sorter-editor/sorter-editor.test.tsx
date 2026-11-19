import {Dependencies} from "@khanacademy/perseus";
import {
    generateSorterLegend,
    generateSorterOptions,
    sorterLogic,
    SORTER_MAX_HORIZONTAL_CARDS,
} from "@khanacademy/perseus-core";
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
        expect(onChangeMock).toHaveBeenCalledWith(
            expect.objectContaining({layout: "vertical"}),
        );
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
        expect(onChangeMock).toHaveBeenCalledWith(
            expect.objectContaining({layout: "horizontal"}),
        );
    });

    describe("layout warning", () => {
        const warningText = `Sorter widget with more than ${SORTER_MAX_HORIZONTAL_CARDS} options will display vertically, even if the layout is set to horizontal.`;

        function cards(count: number): string[] {
            return Array.from({length: count}, (_, i) => `Card ${i + 1}`);
        }

        it("warns when a horizontal sorter has more cards than the maximum", () => {
            // Arrange
            const options = generateSorterOptions({
                correct: cards(SORTER_MAX_HORIZONTAL_CARDS + 1),
                layout: "horizontal",
            });

            // Act
            render(<SorterEditor onChange={() => {}} {...options} />);

            // Assert
            expect(screen.getByRole("alert")).toHaveTextContent(warningText);
        });

        it("does not warn when a horizontal sorter has exactly the maximum number of cards", () => {
            // Arrange
            const options = generateSorterOptions({
                correct: cards(SORTER_MAX_HORIZONTAL_CARDS),
                layout: "horizontal",
            });

            // Act
            render(<SorterEditor onChange={() => {}} {...options} />);

            // Assert
            expect(screen.queryByRole("alert")).not.toBeInTheDocument();
        });

        it("does not warn when the layout is already vertical", () => {
            // Arrange
            const options = generateSorterOptions({
                correct: cards(SORTER_MAX_HORIZONTAL_CARDS + 1),
                layout: "vertical",
            });

            // Act
            render(<SorterEditor onChange={() => {}} {...options} />);

            // Assert
            expect(screen.queryByRole("alert")).not.toBeInTheDocument();
        });
    });

    it("should be possible to change padding", async () => {
        const onChangeMock = jest.fn();

        render(<SorterEditor onChange={onChangeMock} />);

        await userEvent.click(screen.getByRole("checkbox", {name: "Padding"}));

        expect(onChangeMock).toHaveBeenCalledWith(
            expect.objectContaining({padding: false}),
        );
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
        expect(onChangeMock).toHaveBeenLastCalledWith(
            expect.objectContaining({
                correct: ["Cat", "Emu"],
            }),
        );
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
        expect(onChangeMock).toHaveBeenCalledWith(
            expect.objectContaining({
                correct: ["Cat", "Dog", ""],
            }),
        );
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
            expect(
                screen.getAllByRole("textbox", {name: /^Card \d+$/}),
            ).toHaveLength(15);
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
            expect(onChangeMock).toHaveBeenLastCalledWith(
                expect.objectContaining({
                    correct: [...fifteenCards.slice(0, 14), "Emu"],
                }),
            );
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
            expect(onChangeMock).toHaveBeenCalledWith(
                expect.objectContaining({
                    correct: fifteenCards.slice(0, 14),
                }),
            );
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
        expect(onChangeMock).toHaveBeenCalledWith(
            expect.objectContaining({
                correct: ["Cat", "Emu", "Dog"],
            }),
        );
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
        expect(onChangeMock).toHaveBeenCalledWith(
            expect.objectContaining({
                correct: ["Dog", "Cat", "Emu"],
            }),
        );
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
        expect(onChangeMock).toHaveBeenCalledWith(
            expect.objectContaining({correct: ["Cat", "Emu"]}),
        );
    });

    it("renders no cards once the last one is deleted", async () => {
        // Arrange
        renderControlled(generateSorterOptions({correct: ["Cat"]}));

        // Act
        await userEvent.click(
            screen.getByRole("button", {name: "Delete card 1"}),
        );

        // Assert
        expect(
            screen.queryByRole("textbox", {name: /^Card \d+$/}),
        ).not.toBeInTheDocument();
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

    it("does not drop the legend when another option is edited", async () => {
        // Arrange
        const onChange = jest.fn();
        const legend: PerseusSorterWidgetOptions["legend"] = {
            startCap: "arrow",
            endCap: "bar",
            startLabel: "Lowest",
            endLabel: "Highest",
            ariaLabel: "Interest rates from lowest to highest",
            position: "above",
        };
        renderControlled(
            generateSorterOptions({correct: ["Cat", "Dog"], legend}),
            onChange,
        );

        // Act
        await userEvent.type(screen.getByDisplayValue("Dog"), "s");

        // Assert
        expect(onChange).toHaveBeenLastCalledWith(
            expect.objectContaining({legend}),
        );
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
        expect(
            screen.getAllByRole("textbox", {name: /^Card \d+$/}),
        ).toHaveLength(3);
        expect(screen.getByDisplayValue("$x$")).toBeInTheDocument();
        expect(screen.getByDisplayValue("$y$")).toBeInTheDocument();
        expect(screen.getByDisplayValue("$z$")).toBeInTheDocument();
    });

    describe("legend", () => {
        it("creates the full legend with arrow caps on the first legend edit of a scale", async () => {
            // Arrange
            const onChange = jest.fn();
            renderControlled(generateSorterOptions(), onChange);

            // Act
            await userEvent.type(
                screen.getByRole("textbox", {name: "Start label"}),
                "Low",
            );

            // Assert
            expect(onChange).toHaveBeenLastCalledWith(
                expect.objectContaining({
                    legend: {
                        startCap: "arrow",
                        endCap: "arrow",
                        startLabel: "Low",
                        endLabel: "",
                        ariaLabel: "",
                        position: "below",
                    },
                }),
            );
        });

        it("creates the legend with bar caps on the first legend edit of a timeline", async () => {
            // Arrange
            const onChange = jest.fn();
            renderControlled(
                generateSorterOptions({variant: "timeline"}),
                onChange,
            );

            // Act
            await userEvent.type(
                screen.getByRole("textbox", {name: "Start label"}),
                "1944",
            );

            // Assert
            expect(onChange).toHaveBeenLastCalledWith(
                expect.objectContaining({
                    legend: expect.objectContaining({
                        startCap: "bar",
                        endCap: "bar",
                    }),
                }),
            );
        });

        // TODO: Re-enable when the variant dropdown ships.
        it.skip("resets the caps when they're the old variant's defaults", async () => {
            // Arrange
            const onChange = jest.fn();
            renderControlled(
                generateSorterOptions({
                    variant: "scale",
                    legend: generateSorterLegend({
                        startCap: "arrow",
                        endCap: "arrow",
                    }),
                }),
                onChange,
            );

            // Act
            await userEvent.click(
                screen.getByRole("combobox", {name: "Variant"}),
            );
            await userEvent.click(
                screen.getByRole("option", {name: "Timeline"}),
            );

            // Assert
            expect(onChange).toHaveBeenLastCalledWith(
                expect.objectContaining({
                    variant: "timeline",
                    legend: generateSorterLegend({
                        startCap: "bar",
                        endCap: "bar",
                    }),
                }),
            );
        });

        // TODO: Re-enable when the variant dropdown ships.
        it.skip("keeps the caps when they aren't the old variant's defaults", async () => {
            // Arrange
            const onChange = jest.fn();
            const mixedCapsLegend = generateSorterLegend({
                startCap: "arrow",
                endCap: "bar",
            });
            renderControlled(
                generateSorterOptions({
                    variant: "scale",
                    legend: mixedCapsLegend,
                }),
                onChange,
            );

            // Act
            await userEvent.click(
                screen.getByRole("combobox", {name: "Variant"}),
            );
            await userEvent.click(
                screen.getByRole("option", {name: "Timeline"}),
            );

            // Assert
            expect(onChange).toHaveBeenLastCalledWith(
                expect.objectContaining({
                    variant: "timeline",
                    legend: mixedCapsLegend,
                }),
            );
        });

        // TODO: Re-enable when the variant dropdown ships.
        it.skip("does not add a legend when the variant changes before the legend exists", async () => {
            // Arrange
            const onChange = jest.fn();
            renderControlled(generateSorterOptions(), onChange);

            // Act
            await userEvent.click(
                screen.getByRole("combobox", {name: "Variant"}),
            );
            await userEvent.click(
                screen.getByRole("option", {name: "Timeline"}),
            );

            // Assert
            const lastOptions = onChange.mock.lastCall[0];
            expect(lastOptions.variant).toBe("timeline");
            expect(lastOptions.legend).toBeUndefined();
        });

        it("keeps the other legend fields when one is edited", async () => {
            // Arrange
            const onChange = jest.fn();
            renderControlled(
                generateSorterOptions({legend: generateSorterLegend()}),
                onChange,
            );

            // Act
            await userEvent.click(
                screen.getByRole("combobox", {name: "End cap"}),
            );
            await userEvent.click(screen.getByRole("option", {name: "None"}));

            // Assert
            expect(onChange).toHaveBeenLastCalledWith(
                expect.objectContaining({
                    legend: generateSorterLegend({endCap: "none"}),
                }),
            );
        });

        it("does not add a legend when another option is edited", async () => {
            // Arrange
            const onChange = jest.fn();
            renderControlled(
                generateSorterOptions({correct: ["Cat", "Dog"]}),
                onChange,
            );

            // Act
            await userEvent.type(screen.getByDisplayValue("Dog"), "s");

            // Assert
            expect(onChange.mock.lastCall[0].legend).toBeUndefined();
        });

        it("disables position when the layout is vertical", () => {
            // Arrange, Act
            render(
                <SorterEditor
                    {...generateSorterOptions({layout: "vertical"})}
                    onChange={() => {}}
                />,
            );

            // Assert
            expect(
                screen.getByRole("combobox", {name: "Position"}),
            ).toHaveAttribute("aria-disabled", "true");
        });

        it("disables position when a horizontal sorter has too many cards to display horizontally", () => {
            // Arrange, Act
            render(
                <SorterEditor
                    {...generateSorterOptions({
                        layout: "horizontal",
                        correct: Array.from(
                            {length: SORTER_MAX_HORIZONTAL_CARDS + 1},
                            (_, i) => `Card ${i}`,
                        ),
                    })}
                    onChange={() => {}}
                />,
            );

            // Assert
            expect(
                screen.getByRole("combobox", {name: "Position"}),
            ).toHaveAttribute("aria-disabled", "true");
        });

        it("enables position when the sorter displays horizontally", () => {
            // Arrange, Act
            render(
                <SorterEditor
                    {...generateSorterOptions({
                        layout: "horizontal",
                        correct: ["Cat", "Dog"],
                    })}
                    onChange={() => {}}
                />,
            );

            // Assert
            expect(
                screen.getByRole("combobox", {name: "Position"}),
            ).not.toHaveAttribute("aria-disabled", "true");
        });

        it("marks the description as required", () => {
            // Arrange, Act
            render(<SorterEditor onChange={() => {}} />);

            // Assert
            expect(
                screen.getByRole("textbox", {name: "Description"}),
            ).toBeRequired();
        });
    });
});
