import {RenderStateRoot} from "@khanacademy/wonder-blocks-core";
import {render, screen} from "@testing-library/react";
import {userEvent as userEventLib} from "@testing-library/user-event";
import * as React from "react";

// eslint-disable-next-line import/no-relative-packages
import {testDependencies} from "../../../../../../testing/test-dependencies";
import * as Dependencies from "../../../dependencies";
import BaseRadio from "../base-radio";

import {generateChoice} from "./base-radio.testdata";

import type {APIOptions} from "../../../types";
import type {UserEvent} from "@testing-library/user-event";

function renderBaseRadio(props) {
    const apiOptions: APIOptions = Object.freeze({});

    const baseProps = {
        apiOptions,
        choices: [],
        deselectEnabled: false,
        editMode: false,
        labelWrap: false,
        countChoices: false,
        numCorrect: 1,
        multipleSelect: false,

        // A callback indicating that this choice has changed. Its argument is
        // an object with two keys: `checked` and `crossedOut`. Each contains
        // an array of boolean values, specifying the new checked and
        // crossed-out value of each choice.
        onChange: ({checked, crossedOut}) => {},
    } as const;

    const overwrittenProps = {...baseProps, ...props} as const;

    return render(<BaseRadio {...overwrittenProps} />, {
        wrapper: RenderStateRoot,
    });
}

describe("base-radio", () => {
    let userEvent: UserEvent;

    beforeEach(() => {
        userEvent = userEventLib.setup({
            advanceTimers: jest.advanceTimersByTime,
        });

        // because choice-none-above uses a Renderer
        // we need to stub dependencies when it's rendered
        // (this probably needs to be fixed)
        jest.spyOn(Dependencies, "getDependencies").mockReturnValue(
            testDependencies,
        );
    });

    it("renders a none of the above choice", () => {
        // Arrange / Act
        renderBaseRadio({
            choices: [
                generateChoice({
                    id: "choice-0",
                    content: "Option 1",
                    correct: false,
                }),
                generateChoice({
                    id: "choice-1",
                    content: "Option B",
                    correct: false,
                }),
                generateChoice({
                    id: "choice-2",
                    content: "Option Gamma",
                    correct: false,
                }),
                generateChoice({
                    id: "choice-3",
                    content: "Option Delta",
                    correct: false,
                }),
                generateChoice({
                    id: "choice-4",
                    isNoneOfTheAbove: true,
                    correct: true,
                }),
            ],
        });

        // Assert
        expect(
            screen.getByRole("radio", {
                name: "(Choice E) None of the above",
            }),
        ).toBeInTheDocument();
        expect(
            screen.getByLabelText("(Choice E) None of the above"),
        ).toBeInTheDocument();
        // Note(Tamara): There should be two of these options: one for the
        // screen reader only radio input and a button for learners
        // using the visual choices
        expect(screen.getAllByText("None of the above")).toHaveLength(2);
    });

    it("registers as checked when none of the above choice is clicked", async () => {
        // Arrange
        let updatedValues = null;
        const onChangeHandler = (newValues: {
            checked: ReadonlyArray<boolean>;
            crossedOut: ReadonlyArray<boolean>;
        }) => {
            // @ts-expect-error - TS2322 - Type '{ checked: readonly boolean[]; crossedOut: readonly boolean[]; }' is not assignable to type 'null'.
            updatedValues = newValues;
        };

        renderBaseRadio({
            choices: [
                generateChoice({
                    id: "choice-0",
                    content: "Option 1",
                    correct: false,
                }),
                generateChoice({
                    id: "choice-1",
                    content: "Option B",
                    correct: false,
                }),
                generateChoice({
                    id: "choice-2",
                    content: "Option Gamma",
                    correct: false,
                }),
                generateChoice({
                    id: "choice-3",
                    content: "Option Delta",
                    correct: false,
                }),
                generateChoice({
                    id: "choice-4",
                    isNoneOfTheAbove: true,
                    correct: true,
                }),
            ],
            onChange: onChangeHandler,
        });

        const noneOption = screen.getByRole("radio", {
            name: "(Choice E) None of the above",
        });

        // Act
        await userEvent.click(noneOption);

        // Assert
        expect(updatedValues).toEqual(["choice-4"]);
    });

    describe("edit mode", () => {
        it("should render <li>'s for each choice", () => {
            // Arrange / Act
            renderBaseRadio({
                editMode: true,
                choices: [
                    generateChoice({
                        id: "choice-0",
                        content: "Option 1",
                        correct: false,
                    }),
                    generateChoice({
                        id: "choice-1",
                        content: "Option B",
                        correct: false,
                    }),
                    generateChoice({
                        id: "choice-2",
                        content: "Option Gamma",
                        correct: true,
                    }),
                    generateChoice({
                        id: "choice-3",
                        content: "Option Delta",
                        correct: false,
                    }),
                ],
            });

            // Assert
            expect(screen.getAllByRole("listitem")).toHaveLength(4);
        });

        it("should not toggle choice when inner element clicked", async () => {
            // Arrange
            let updatedValues = null;
            const onChangeHandler = (newValues: {
                checked: ReadonlyArray<boolean>;
                crossedOut: ReadonlyArray<boolean>;
            }) => {
                // @ts-expect-error - TS2322 - Type '{ checked: readonly boolean[]; crossedOut: readonly boolean[]; }' is not assignable to type 'null'.
                updatedValues = newValues;
            };

            renderBaseRadio({
                editMode: true,
                choices: [
                    generateChoice({
                        id: "choice-0",
                        content: "Option 1",
                        correct: false,
                    }),
                    generateChoice({
                        id: "choice-1",
                        content: "Option B",
                        correct: false,
                    }),
                    generateChoice({
                        id: "choice-2",
                        content: "Option Gamma",
                        correct: true,
                    }),
                    generateChoice({
                        id: "choice-3",
                        content: "Option Delta",
                        correct: false,
                    }),
                ],
                onChange: onChangeHandler,
            });

            // Act
            await userEvent.click(
                screen.getByRole("radio", {
                    name: "(Choice C) Option Gamma",
                }),
            );

            // Assert
            expect(updatedValues).toBeNull();
        });

        it("should toggle choice when choice icon clicked", async () => {
            // Arrange
            let updatedValues = null;
            const onChangeHandler = (newValues: {
                checked: ReadonlyArray<boolean>;
                crossedOut: ReadonlyArray<boolean>;
            }) => {
                // @ts-expect-error - TS2322 - Type '{ checked: readonly boolean[]; crossedOut: readonly boolean[]; }' is not assignable to type 'null'.
                updatedValues = newValues;
            };

            renderBaseRadio({
                editMode: true,
                choices: [
                    generateChoice({
                        id: "choice-0",
                        content: "Option 1",
                        correct: false,
                    }),
                    generateChoice({
                        id: "choice-1",
                        content: "Option B",
                        correct: false,
                    }),
                    generateChoice({
                        id: "choice-2",
                        content: "Option Gamma",
                        correct: true,
                    }),
                    generateChoice({
                        id: "choice-3",
                        content: "Option Delta",
                        correct: false,
                    }),
                ],
                onChange: onChangeHandler,
            });

            // Act
            await userEvent.click(
                screen.getAllByTestId("choice-icon__library-choice-icon")[2],
            );

            // Assert
            expect(updatedValues).toEqual(["choice-2"]);
        });
    });

    describe("selecting and deselecting options", () => {
        it("deselects multi-select choice", async () => {
            // Arrange
            let updatedValues = null;
            const onChangeHandler = (newValues: {
                checked: ReadonlyArray<boolean>;
                crossedOut: ReadonlyArray<boolean>;
            }) => {
                // @ts-expect-error - TS2322 - Type '{ checked: readonly boolean[]; crossedOut: readonly boolean[]; }' is not assignable to type 'null'.
                updatedValues = newValues;
            };

            renderBaseRadio({
                multipleSelect: true,
                choices: [
                    generateChoice({
                        id: "choice-0",
                        content: "Option 1",
                        correct: false,
                        checked: false,
                    }),
                    generateChoice({
                        id: "choice-1",
                        content: "Option B",
                        correct: false,
                        checked: false,
                    }),
                    generateChoice({
                        id: "choice-2",
                        content: "Option Gamma",
                        correct: true,
                        checked: true,
                    }),
                    generateChoice({
                        id: "choice-3",
                        content: "Option Delta",
                        correct: false,
                        checked: false,
                    }),
                ],
                onChange: onChangeHandler,
            });

            // Act
            const radioButton = screen.getByRole("checkbox", {
                name: "(Choice C, Checked) Option Gamma",
            });
            await userEvent.click(radioButton);

            // Assert
            expect(updatedValues).toEqual([]);
        });

        // Equivalent to "should toggle choice when inner element clicked" but with editMode set to false
        it("selects single select choice", async () => {
            // Arrange
            let updatedValues = null;
            const onChangeHandler = (newValues: {
                checked: ReadonlyArray<boolean>;
                crossedOut: ReadonlyArray<boolean>;
            }) => {
                // @ts-expect-error - TS2322 - Type '{ checked: readonly boolean[]; crossedOut: readonly boolean[]; }' is not assignable to type 'null'.
                updatedValues = newValues;
            };

            renderBaseRadio({
                multipleSelect: false,
                choices: [
                    generateChoice({
                        id: "choice-0",
                        content: "Option 1",
                        correct: false,
                        checked: false,
                    }),
                    generateChoice({
                        id: "choice-1",
                        content: "Option B",
                        correct: false,
                        checked: false,
                    }),
                    generateChoice({
                        id: "choice-2",
                        content: "Option Gamma",
                        correct: true,
                        checked: false,
                    }),
                    generateChoice({
                        id: "choice-3",
                        content: "Option Delta",
                        correct: false,
                        checked: false,
                    }),
                ],
                onChange: onChangeHandler,
            });

            // Act
            await userEvent.click(
                screen.getByRole("radio", {
                    name: "(Choice C) Option Gamma",
                }),
            );

            // Assert
            expect(updatedValues).toEqual(["choice-2"]);
        });

        it("deselects single select choice", async () => {
            // Arrange
            let updatedValues = null;
            const onChangeHandler = (newValues: {
                checked: ReadonlyArray<boolean>;
                crossedOut: ReadonlyArray<boolean>;
            }) => {
                // @ts-expect-error - TS2322 - Type '{ checked: readonly boolean[]; crossedOut: readonly boolean[]; }' is not assignable to type 'null'.
                updatedValues = newValues;
            };

            renderBaseRadio({
                multipleSelect: false,
                choices: [
                    generateChoice({
                        id: "choice-0",
                        content: "Option 1",
                        correct: false,
                        checked: false,
                    }),
                    generateChoice({
                        id: "choice-1",
                        content: "Option B",
                        correct: false,
                        checked: false,
                    }),
                    generateChoice({
                        id: "choice-2",
                        content: "Option Gamma",
                        correct: true,
                        checked: true,
                    }),
                    generateChoice({
                        id: "choice-3",
                        content: "Option Delta",
                        correct: false,
                        checked: false,
                    }),
                ],
                onChange: onChangeHandler,
            });

            // Act
            const radioButton = screen.getByRole("radio", {
                name: "(Choice C, Checked) Option Gamma",
            });
            await userEvent.click(radioButton);

            // Assert
            expect(updatedValues).toEqual([]);
        });

        it("selects multi-select choice", async () => {
            // Arrange
            let updatedValues = null;
            const onChangeHandler = (newValues: {
                checked: ReadonlyArray<boolean>;
                crossedOut: ReadonlyArray<boolean>;
            }) => {
                // @ts-expect-error - TS2322 - Type '{ checked: readonly boolean[]; crossedOut: readonly boolean[]; }' is not assignable to type 'null'.
                updatedValues = newValues;
            };

            renderBaseRadio({
                multipleSelect: true,
                choices: [
                    generateChoice({
                        id: "choice-0",
                        content: "Option 1",
                        correct: false,
                    }),
                    generateChoice({
                        id: "choice-1",
                        content: "Option B",
                        correct: false,
                    }),
                    generateChoice({
                        id: "choice-2",
                        content: "Option Gamma",
                        correct: true,
                    }),
                    generateChoice({
                        id: "choice-3",
                        content: "Option Delta",
                        correct: false,
                    }),
                ],
                onChange: onChangeHandler,
            });

            // Act
            await userEvent.click(
                screen.getByRole("checkbox", {
                    name: "(Choice C) Option Gamma",
                }),
            );

            // Assert
            expect(updatedValues).toEqual(["choice-2"]);
        });
    });

    describe("instruction text", () => {
        it("displays correct text for single select", () => {
            // Arrange / Act
            renderBaseRadio({
                multipleSelect: false,
                choices: [
                    generateChoice({
                        id: "choice-0",
                        content: "Option 1",
                        correct: false,
                    }),
                    generateChoice({
                        id: "choice-1",
                        content: "Option B",
                        correct: false,
                    }),
                    generateChoice({
                        id: "choice-2",
                        content: "Option Gamma",
                        correct: true,
                    }),
                    generateChoice({
                        id: "choice-3",
                        content: "Option Delta",
                        correct: false,
                    }),
                ],
            });

            // Assert
            // note(matthewc) role=group is for the fieldset/legend
            // https://www.w3.org/TR/html-aria/
            const group = screen.getByRole("group", {
                name: "Choose 1 answer:",
            });
            expect(group).toBeInTheDocument();
            expect(group).toBeVisible();
        });

        it("displays correct text for multi select (count choices off)", () => {
            // Arrange / Act
            renderBaseRadio({
                multipleSelect: true,
                countChoices: false,
                choices: [
                    generateChoice({
                        id: "choice-0",
                        content: "Option 1",
                        correct: false,
                    }),
                    generateChoice({
                        id: "choice-1",
                        content: "Option B",
                        correct: false,
                    }),
                    generateChoice({
                        id: "choice-2",
                        content: "Option Gamma",
                        correct: true,
                    }),
                    generateChoice({
                        id: "choice-3",
                        content: "Option Delta",
                        correct: true,
                    }),
                ],
            });

            // Assert
            // note(matthewc) role=group is for the fieldset/legend
            // https://www.w3.org/TR/html-aria/
            const group = screen.getByRole("group", {
                name: "Choose all answers that apply:",
            });
            expect(group).toBeInTheDocument();
            expect(group).toBeVisible();
        });

        it("displays correct text for multi select (count choices on)", () => {
            // Arrange / Act
            renderBaseRadio({
                multipleSelect: true,
                countChoices: true,
                numCorrect: 2,
                choices: [
                    generateChoice({
                        id: "choice-0",
                        content: "Option 1",
                        correct: false,
                    }),
                    generateChoice({
                        id: "choice-1",
                        content: "Option B",
                        correct: false,
                    }),
                    generateChoice({
                        id: "choice-2",
                        content: "Option Gamma",
                        correct: true,
                    }),
                    generateChoice({
                        id: "choice-3",
                        content: "Option Delta",
                        correct: true,
                    }),
                ],
            });

            // Assert
            // note(matthewc) role=group is for the fieldset/legend
            // https://www.w3.org/TR/html-aria/
            const group = screen.getByRole("group", {
                name: "Choose 2 answers:",
            });
            expect(group).toBeInTheDocument();
            expect(group).toBeVisible();
        });
    });
});
