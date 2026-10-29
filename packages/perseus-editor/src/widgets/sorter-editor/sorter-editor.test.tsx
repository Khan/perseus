import {ApiOptions, Dependencies} from "@khanacademy/perseus";
import {
    generateSorterOptions,
    sorterLogic,
    SORTER_MAX_HORIZONTAL_CARDS,
    SORTER_MAX_LEGEND_LABEL_LENGTH,
} from "@khanacademy/perseus-core";
import {render, screen} from "@testing-library/react";
import {userEvent as userEventLib} from "@testing-library/user-event";
import * as React from "react";

import {getFeatureFlags} from "../../testing/feature-flags-util";
import {testDependencies} from "../../testing/test-dependencies";

import SorterEditor from "./sorter-editor";

import type {APIOptions} from "@khanacademy/perseus";
import type {
    PerseusSorterWidgetOptions,
    SorterLegend,
} from "@khanacademy/perseus-core";
import type {UserEvent} from "@testing-library/user-event";

/**
 * WidgetEditor holds the editor by ref and calls `getSaveWarnings()` on it, so that
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
    options: PerseusSorterWidgetOptions & {apiOptions?: APIOptions},
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

const legendFlagOn = {
    ...ApiOptions.defaults,
    flags: getFeatureFlags({"dnd-widget-sorter": true}),
};

const completeLegend: SorterLegend = {
    startCap: "arrow",
    endCap: "bar",
    startLabel: "Lowest",
    endLabel: "Highest",
    ariaLabel: "Interest rates, lowest at the start to highest at the end",
    position: "above",
};

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

        // The warnings have to reflect the edit in progress.
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

    describe("variant", () => {
        it("hides the variant when the dnd-widget-sorter flag is off", () => {
            // Arrange, Act
            render(<SorterEditor onChange={() => {}} />);

            // Assert
            expect(
                screen.queryByRole("combobox", {name: "Variant"}),
            ).not.toBeInTheDocument();
        });

        it("shows the variant when the dnd-widget-sorter flag is on", () => {
            // Arrange, Act
            render(
                <SorterEditor apiOptions={legendFlagOn} onChange={() => {}} />,
            );

            // Assert
            expect(
                screen.getByRole("combobox", {name: "Variant"}),
            ).toBeInTheDocument();
        });
    });

    describe("legend", () => {
        it("hides the legend fields when the dnd-widget-sorter flag is off", () => {
            // Arrange, Act
            render(<SorterEditor onChange={() => {}} />);

            // Assert
            expect(
                screen.queryByRole("button", {name: "Legend"}),
            ).not.toBeInTheDocument();
        });

        it("shows the legend fields when the dnd-widget-sorter flag is on", () => {
            // Arrange, Act
            render(
                <SorterEditor apiOptions={legendFlagOn} onChange={() => {}} />,
            );

            // Assert
            expect(
                screen.getByRole("button", {name: "Legend"}),
            ).toBeInTheDocument();
        });

        it("starts with the Legend section expanded", () => {
            // Arrange, Act
            render(
                <SorterEditor apiOptions={legendFlagOn} onChange={() => {}} />,
            );

            // Assert
            expect(
                screen.getByRole("button", {name: "Legend"}),
            ).toHaveAttribute("aria-expanded", "true");
        });

        it("collapses the Legend section when its header is clicked", async () => {
            // Arrange
            render(
                <SorterEditor apiOptions={legendFlagOn} onChange={() => {}} />,
            );

            // Act
            await userEvent.click(screen.getByRole("button", {name: "Legend"}));

            // Assert
            expect(
                screen.getByRole("button", {name: "Legend"}),
            ).toHaveAttribute("aria-expanded", "false");
        });

        it("creates the full legend with arrow caps on the first legend edit of a scale", async () => {
            // Arrange
            const onChange = jest.fn();
            renderControlled(
                {...generateSorterOptions(), apiOptions: legendFlagOn},
                onChange,
            );

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
                {
                    ...generateSorterOptions({variant: "timeline"}),
                    apiOptions: legendFlagOn,
                },
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

        it("resets both caps to the new variant's defaults when the variant changes", async () => {
            // Arrange
            const onChange = jest.fn();
            renderControlled(
                {
                    ...generateSorterOptions({
                        variant: "scale",
                        legend: {
                            ...completeLegend,
                            startCap: "arrow",
                            endCap: "none",
                        },
                    }),
                    apiOptions: legendFlagOn,
                },
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
                    legend: {...completeLegend, startCap: "bar", endCap: "bar"},
                }),
            );
        });

        it("does not add a legend when the variant changes before the legend exists", async () => {
            // Arrange
            const onChange = jest.fn();
            renderControlled(
                {...generateSorterOptions(), apiOptions: legendFlagOn},
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
            const lastOptions = onChange.mock.lastCall[0];
            expect(lastOptions.variant).toBe("timeline");
            expect(lastOptions.legend).toBeUndefined();
        });

        it("keeps the other legend fields when one is edited", async () => {
            // Arrange
            const onChange = jest.fn();
            renderControlled(
                {
                    ...generateSorterOptions({legend: completeLegend}),
                    apiOptions: legendFlagOn,
                },
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
                    legend: {...completeLegend, endCap: "none"},
                }),
            );
        });

        it("does not add a legend when another option is edited", async () => {
            // Arrange
            const onChange = jest.fn();
            renderControlled(
                {
                    ...generateSorterOptions({correct: ["Cat", "Dog"]}),
                    apiOptions: legendFlagOn,
                },
                onChange,
            );

            // Act
            await userEvent.type(screen.getByDisplayValue("Dog"), "s");

            // Assert
            expect(onChange.mock.lastCall[0].legend).toBeUndefined();
        });

        it("shows how many characters each label has", () => {
            // Arrange, Act
            render(
                <SorterEditor
                    {...generateSorterOptions({
                        legend: {
                            ...completeLegend,
                            startLabel: "Lowest",
                            endLabel: "Highest",
                        },
                    })}
                    apiOptions={legendFlagOn}
                    onChange={() => {}}
                />,
            );

            // Assert
            expect(
                screen.getByRole("textbox", {name: "Start label"}),
            ).toHaveAccessibleDescription(
                `6 of ${SORTER_MAX_LEGEND_LABEL_LENGTH} characters`,
            );
            expect(
                screen.getByRole("textbox", {name: "End label"}),
            ).toHaveAccessibleDescription(
                `7 of ${SORTER_MAX_LEGEND_LABEL_LENGTH} characters`,
            );
        });

        it("warns when a label is over the character limit", () => {
            // Arrange, Act
            render(
                <SorterEditor
                    {...generateSorterOptions({
                        legend: {
                            ...completeLegend,
                            startLabel: "a".repeat(
                                SORTER_MAX_LEGEND_LABEL_LENGTH + 1,
                            ),
                        },
                    })}
                    apiOptions={legendFlagOn}
                    onChange={() => {}}
                />,
            );

            // Assert
            expect(screen.getByRole("alert")).toHaveTextContent(
                `Labels longer than ${SORTER_MAX_LEGEND_LABEL_LENGTH} characters may not fit on the legend.`,
            );
        });

        it("does not warn when a label is exactly at the character limit", () => {
            // Arrange, Act
            render(
                <SorterEditor
                    {...generateSorterOptions({
                        legend: {
                            ...completeLegend,
                            startLabel: "a".repeat(
                                SORTER_MAX_LEGEND_LABEL_LENGTH,
                            ),
                        },
                    })}
                    apiOptions={legendFlagOn}
                    onChange={() => {}}
                />,
            );

            // Assert
            expect(screen.queryByRole("alert")).not.toBeInTheDocument();
        });

        it("disables position when the layout is vertical", () => {
            // Arrange, Act
            render(
                <SorterEditor
                    {...generateSorterOptions({layout: "vertical"})}
                    apiOptions={legendFlagOn}
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
                    apiOptions={legendFlagOn}
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
                    apiOptions={legendFlagOn}
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
            render(
                <SorterEditor apiOptions={legendFlagOn} onChange={() => {}} />,
            );

            // Assert
            expect(
                screen.getByRole("textbox", {name: "Description"}),
            ).toBeRequired();
        });
    });
});
