import {Dependencies, ApiOptions} from "@khanacademy/perseus";
import {RenderStateRoot} from "@khanacademy/wonder-blocks-core";
import {render, screen} from "@testing-library/react";
import {userEvent as userEventLib} from "@testing-library/user-event";
import * as React from "react";

import {testDependencies} from "../../../../../testing/test-dependencies";
import RadioEditor from "../radio/editor";

import {
    mockIds,
    fourChoices,
    fourChoicesWithOneRationale,
    fourChoicesWithTwoCorrect,
    fourChoicesWithOneChoice1A,
    fourChoicesWithNoneOfTheAboveAndCorrect,
    fourChoicesWithAllIncorrect,
    fourChoicesWithFirstCorrect,
    fourChoicesWithSecondCorrect,
    singleChoice,
    threeChoicesWithCorrect,
    threeChoicesWithCorrectAndNoneOfTheAbove,
} from "./radio-editor.mockData";

import type {RadioEditorProps} from "../radio/editor";
import type {PerseusRadioChoice} from "@khanacademy/perseus-core";
import type {UserEvent} from "@testing-library/user-event";

// Get the mocked function so we can control it in tests
const mockedRandomUuid = jest.fn();
crypto.randomUUID = mockedRandomUuid;

function renderRadioEditor(
    onChangeMock = () => undefined,
    props: Partial<RadioEditorProps> = {},
) {
    return render(
        <RadioEditor onChange={onChangeMock} static={false} {...props} />,
        {wrapper: RenderStateRoot},
    );
}

describe("radio-editor", () => {
    let userEvent: UserEvent;
    function getCorrectChoice(): PerseusRadioChoice {
        return {content: "", correct: true, id: mockIds[0]};
    }

    function getIncorrectChoice(): PerseusRadioChoice {
        const choice = getCorrectChoice();
        choice.correct = false;
        return choice;
    }

    beforeEach(() => {
        userEvent = userEventLib.setup({
            advanceTimers: jest.advanceTimersByTime,
        });

        jest.spyOn(Dependencies, "getDependencies").mockReturnValue(
            testDependencies,
        );

        // Reset and setup UUID mock for each test
        mockedRandomUuid.mockReset();
        mockedRandomUuid
            .mockReturnValueOnce(mockIds[0])
            .mockReturnValueOnce(mockIds[1])
            .mockReturnValueOnce(mockIds[2])
            .mockReturnValueOnce(mockIds[3])
            .mockReturnValue(mockIds[4]);
    });

    it("should render", () => {
        renderRadioEditor();

        expect(screen.getByText(/Multiple selections/)).toBeInTheDocument();
    });

    describe("Id generation", () => {
        it("should generate IDs for choices with missing IDs on mount", () => {
            const onChangeMock = jest.fn();
            const choicesWithMissingIds = [
                {id: "", content: "Choice 1"}, // empty string ID
                {id: "valid-id", content: "Choice 2"}, // valid ID
                {content: "Choice 3"}, // missing ID property
            ];

            renderRadioEditor(onChangeMock, {
                choices: choicesWithMissingIds as any,
            });

            // Should call onChange with corrected choices
            expect(onChangeMock).toHaveBeenCalledWith({
                choices: [
                    {id: "radio-choice-0", content: "Choice 1"},
                    {id: "valid-id", content: "Choice 2"},
                    {id: "radio-choice-2", content: "Choice 3"},
                ],
            });
        });

        it("should not call onChange if all choices already have valid IDs", () => {
            const onChangeMock = jest.fn();
            const choicesWithValidIds = [
                {id: "valid-id-1", content: "Choice 1"},
                {id: "valid-id-2", content: "Choice 2"},
            ];

            renderRadioEditor(onChangeMock, {
                choices: choicesWithValidIds as any,
            });

            // Should not call onChange since no IDs need fixing
            expect(onChangeMock).not.toHaveBeenCalled();
        });

        it("should generate IDs for choices with whitespace-only IDs", () => {
            const onChangeMock = jest.fn();
            const choicesWithWhitespaceIds = [
                {id: "   ", content: "Choice 1"}, // whitespace-only ID
                {id: "\t\n", content: "Choice 2"}, // tabs and newlines
            ];

            renderRadioEditor(onChangeMock, {
                choices: choicesWithWhitespaceIds as any,
            });

            // Should call onChange with corrected choices
            expect(onChangeMock).toHaveBeenCalledWith({
                choices: [
                    {id: "radio-choice-0", content: "Choice 1"},
                    {id: "radio-choice-1", content: "Choice 2"},
                ],
            });
        });
    });

    it("should toggle multiple select checkbox", async () => {
        const onChangeMock = jest.fn();

        renderRadioEditor(onChangeMock);

        await userEvent.click(
            screen.getByRole("switch", {
                name: "Multiple selections",
            }),
        );

        expect(onChangeMock).toBeCalledWith(
            expect.objectContaining({
                multipleSelect: true,
                numCorrect: 0,
            }),
        );
    });

    it("should toggle count choices checkbox", async () => {
        const onChangeMock = jest.fn();

        renderRadioEditor(onChangeMock, {
            multipleSelect: true,
            countChoices: false,
        });

        await userEvent.click(
            screen.getByRole("switch", {
                name: "Specify number correct",
            }),
        );

        expect(onChangeMock).toBeCalledWith({countChoices: true});
    });

    it("should toggle randomize order checkbox", async () => {
        const onChangeMock = jest.fn();

        renderRadioEditor(onChangeMock);

        await userEvent.click(
            screen.getByRole("switch", {
                name: "Randomize order",
            }),
        );

        expect(onChangeMock).toBeCalledWith({randomize: true});
    });

    it("should be possible to add answer", async () => {
        const onChangeMock = jest.fn();

        renderRadioEditor(onChangeMock);

        await userEvent.click(
            screen.getAllByRole("button", {
                name: "Add a choice",
            })[0],
        );

        expect(onChangeMock).toBeCalledWith(
            expect.objectContaining({
                choices: [
                    {content: "", id: "radio-choice-0"},
                    {content: "", id: "radio-choice-1"},
                    {content: "", id: "radio-choice-2"},
                    {content: "", id: "radio-choice-3"},
                    {
                        content: "",
                        id: mockIds[0],
                        isNoneOfTheAbove: false,
                    },
                ],
                hasNoneOfTheAbove: false,
            }),
            // there's some anonymous function that's also passed
            expect.anything(),
        );
    });

    it("should be possible to delete answer", async () => {
        const confirmSpy = jest.spyOn(window, "confirm").mockImplementation(
            // Confirm button clicked
            () => true,
        );
        const onChangeMock = jest.fn();

        renderRadioEditor(onChangeMock, {
            choices: fourChoicesWithNoneOfTheAboveAndCorrect,
            hasNoneOfTheAbove: true,
        });

        // Remove first choice
        await userEvent.click(
            screen.getAllByRole("button", {
                name: "Remove",
            })[0],
        );

        expect(confirmSpy).toBeCalled();
        expect(onChangeMock).toBeCalledWith(
            expect.objectContaining({
                choices: threeChoicesWithCorrectAndNoneOfTheAbove,
                hasNoneOfTheAbove: true,
            }),
        );
    });

    it("removes noneOfTheAbove when a 'none of the above' choice is deleted", async () => {
        const onChangeMock = jest.fn();
        const confirmSpy = jest.spyOn(window, "confirm").mockImplementation(
            // Confirm button clicked
            () => true,
        );

        renderRadioEditor(onChangeMock, {
            choices: fourChoicesWithNoneOfTheAboveAndCorrect,
            hasNoneOfTheAbove: true,
        });

        // Remove first choice
        await userEvent.click(
            screen.getAllByRole("button", {
                name: "Remove",
            })[3],
        );

        expect(confirmSpy).toBeCalled();
        expect(onChangeMock).toBeCalledWith(
            expect.objectContaining({
                choices: threeChoicesWithCorrect,
                hasNoneOfTheAbove: false,
            }),
        );
    });

    it("should not delete answer if the user cancels the confirmation", async () => {
        const confirmSpy = jest.spyOn(window, "confirm").mockImplementation(
            // Confirm button clicked
            () => false,
        );
        const onChangeMock = jest.fn();

        renderRadioEditor(onChangeMock, {
            choices: fourChoicesWithNoneOfTheAboveAndCorrect,
            hasNoneOfTheAbove: true,
        });

        // Remove first choice
        await userEvent.click(
            screen.getAllByRole("button", {
                name: "Remove",
            })[0],
        );

        expect(confirmSpy).toBeCalled();
        expect(onChangeMock).not.toBeCalled();
    });

    it("shows the 'None of the above' button when there is no 'None of the above' choice", () => {
        renderRadioEditor();
        expect(
            screen.getByRole("button", {name: "None of the above"}),
        ).toBeInTheDocument();
    });

    it("hides the 'None of the above' button when there is a 'None of the above' choice", () => {
        renderRadioEditor(() => {}, {
            choices: fourChoicesWithNoneOfTheAboveAndCorrect,
            hasNoneOfTheAbove: true,
        });
        expect(
            screen.queryByRole("button", {name: "None of the above"}),
        ).not.toBeInTheDocument();
    });

    it("serializes", () => {
        const editorRef = React.createRef<RadioEditor>();

        render(
            <RadioEditor
                ref={editorRef}
                onChange={() => {}}
                static={false}
                choices={fourChoices}
            />,
            {wrapper: RenderStateRoot},
        );

        const options = editorRef.current?.serialize();

        expect(options).toEqual({
            choices: fourChoices,
            randomize: false,
            multipleSelect: false,
            countChoices: false,
            hasNoneOfTheAbove: false,
            deselectEnabled: false,
            numCorrect: 0,
        });
    });

    it("derives num correct when serializing", () => {
        const editorRef = React.createRef<RadioEditor>();

        render(
            <RadioEditor
                ref={editorRef}
                onChange={() => {}}
                static={false}
                choices={[
                    getCorrectChoice(),
                    getIncorrectChoice(),
                    getCorrectChoice(),
                    getIncorrectChoice(),
                ]}
            />,
            {wrapper: RenderStateRoot},
        );

        const options = editorRef.current?.serialize();

        expect(options?.numCorrect).toEqual(2);
    });

    it("derives num correct when calling onChange", async () => {
        const onChangeMock = jest.fn();

        render(
            <RadioEditor
                onChange={onChangeMock}
                static={false}
                multipleSelect={true}
                countChoices={true}
                choices={[
                    // start with 2 correct, 2 incorrect
                    getIncorrectChoice(),
                    getIncorrectChoice(),
                    getCorrectChoice(),
                    getCorrectChoice(),
                ]}
            />,
            {wrapper: RenderStateRoot},
        );

        /**
         * This was super annoying to figure out.
         * When in "edit" mode (which the editor is obviously)
         * the only way to select an option from the radio
         * is to click the A/B/C/etc icons themselves.
         * We have a `elem.getAttribute("data-is-radio-icon")` check
         * to make sure that what we're clicking is the icon and
         * not some other part of the radio choice.
         * It's just a div, hence the test ID.
         */
        const choices = screen.getAllByRole("button", {name: "Correct"});

        // switch an incorrect answer into a correct answer
        await userEvent.click(choices[0]);

        // now there should be 3 correct answers
        expect(onChangeMock).toHaveBeenCalledWith(
            expect.objectContaining({
                numCorrect: 3,
            }),
        );
    });

    it("calls onChange when the correct choice is picked (status badges)", async () => {
        const onChangeMock = jest.fn();

        renderRadioEditor(onChangeMock, {
            choices: fourChoices,
        });

        const choices = screen.getAllByRole("button", {name: "Correct"});

        await userEvent.click(choices[0]);

        expect(onChangeMock).toHaveBeenCalledWith(
            expect.objectContaining({
                choices: fourChoicesWithFirstCorrect,
            }),
        );
    });

    it("calls onChange when the correct choice is picked (indicator pill)", async () => {
        const onChangeMock = jest.fn();

        renderRadioEditor(onChangeMock, {
            choices: fourChoices,
        });

        const choice = screen.getByRole("button", {name: "A"});

        await userEvent.click(choice);

        expect(onChangeMock).toHaveBeenCalledWith(
            expect.objectContaining({
                choices: fourChoicesWithFirstCorrect,
            }),
        );
    });

    it("calls onChange when the correct choice is changed (status badges)", async () => {
        const onChangeMock = jest.fn();

        renderRadioEditor(onChangeMock, {
            choices: fourChoicesWithFirstCorrect,
        });

        const choices = screen.getAllByRole("button", {name: "Correct"});

        await userEvent.click(choices[1]);

        expect(onChangeMock).toHaveBeenCalledWith(
            expect.objectContaining({
                // Automatically change the previous correct choice to incorrect
                choices: fourChoicesWithSecondCorrect,
            }),
        );
    });

    it("calls onChange when the correct choice is changed (indicator pill)", async () => {
        const onChangeMock = jest.fn();

        renderRadioEditor(onChangeMock, {
            choices: fourChoicesWithFirstCorrect,
        });

        const choice = screen.getByRole("button", {name: "B"});

        await userEvent.click(choice);

        expect(onChangeMock).toHaveBeenCalledWith(
            expect.objectContaining({
                // Automatically change the previous correct choice to incorrect
                choices: fourChoicesWithSecondCorrect,
            }),
        );
    });

    it("calls onChange when the previously correct choice is marked wrong (status badges)", async () => {
        const onChangeMock = jest.fn();

        renderRadioEditor(onChangeMock, {
            choices: fourChoicesWithFirstCorrect,
        });

        const choices = screen.getAllByRole("button", {name: "Incorrect"});

        await userEvent.click(choices[0]);

        expect(onChangeMock).toHaveBeenCalledWith(
            expect.objectContaining({
                // All choices are now incorrect
                choices: fourChoicesWithAllIncorrect,
            }),
        );
    });

    it("calls onChange when the previously correct choice is marked wrong (indicator pill)", async () => {
        const onChangeMock = jest.fn();

        renderRadioEditor(onChangeMock, {
            choices: fourChoicesWithFirstCorrect,
        });

        const choice = screen.getByRole("button", {name: "A"});

        await userEvent.click(choice);

        expect(onChangeMock).toHaveBeenCalledWith(
            expect.objectContaining({
                // All choices are now incorrect.
                choices: fourChoicesWithAllIncorrect,
            }),
        );
    });

    it("calls onChange when the correct choices are updated with multipleSelect", async () => {
        const onChangeMock = jest.fn();

        renderRadioEditor(onChangeMock, {
            choices: fourChoicesWithFirstCorrect,
            multipleSelect: true,
        });

        const choices = screen.getAllByRole("button", {name: "Correct"});

        await userEvent.click(choices[1]);

        expect(onChangeMock).toHaveBeenCalledWith(
            expect.objectContaining({
                // Previous correct choice is still correct.
                // New correct choice is also correct.
                choices: fourChoicesWithTwoCorrect,
            }),
        );
    });

    it("calls onChange when the content is changed", async () => {
        const onChangeMock = jest.fn();

        renderRadioEditor(onChangeMock, {
            choices: fourChoices,
        });

        const textAreas = screen.getAllByRole("textbox", {name: "Content"});

        await userEvent.type(textAreas[0], "A");

        expect(onChangeMock).toHaveBeenCalledWith(
            expect.objectContaining({
                choices: fourChoicesWithOneChoice1A,
            }),
        );
    });

    it("calls onChange when the rationale is changed", async () => {
        const onChangeMock = jest.fn();

        renderRadioEditor(onChangeMock, {
            choices: fourChoices,
        });

        const textAreas = screen.getAllByRole("textbox", {name: "Rationale"});

        await userEvent.type(textAreas[0], "A");

        expect(onChangeMock).toHaveBeenCalledWith(
            expect.objectContaining({
                choices: fourChoicesWithOneRationale,
            }),
        );
    });

    it("calls onChange when the rationale is cleared", async () => {
        const onChangeMock = jest.fn();

        renderRadioEditor(onChangeMock, {
            choices: fourChoicesWithOneRationale,
        });

        const textAreas = screen.getAllByRole("textbox", {name: "Rationale"});

        await userEvent.clear(textAreas[0]);

        expect(onChangeMock).toHaveBeenCalledWith(
            expect.objectContaining({
                // Rationale is deleted if it's an empty string.
                choices: fourChoices,
            }),
        );
    });

    it("updates numCorrect when deleting an option", async () => {
        jest.spyOn(window, "confirm").mockImplementation(
            // Confirm button clicked
            () => true,
        );
        const onChangeMock = jest.fn();

        render(
            <RadioEditor
                onChange={onChangeMock}
                static={false}
                choices={[
                    getCorrectChoice(),
                    getIncorrectChoice(),
                    getCorrectChoice(),
                    getIncorrectChoice(),
                ]}
            />,
            {wrapper: RenderStateRoot},
        );

        // Delete the first correct choice
        await userEvent.click(
            screen.getAllByRole("button", {
                name: "Remove",
            })[0],
        );

        // numCorrect should be updated to 1
        expect(onChangeMock).toHaveBeenCalledWith(
            expect.objectContaining({
                numCorrect: 1,
            }),
        );
    });

    it("resets numCorrect when switching from multiple select to single select with multiple correct choices", async () => {
        const onChangeMock = jest.fn();

        render(
            <RadioEditor
                onChange={onChangeMock}
                static={false}
                multipleSelect={true}
                choices={[
                    getCorrectChoice(),
                    getIncorrectChoice(),
                    getCorrectChoice(),
                    getIncorrectChoice(),
                ]}
            />,
            {wrapper: RenderStateRoot},
        );

        // Switch from multiple select to single select
        await userEvent.click(
            screen.getByRole("switch", {
                name: "Multiple selections",
            }),
        );

        // Ensure that numCorrect is reset (0) when switching from multiple select to single select
        expect(onChangeMock).toHaveBeenCalledWith(
            expect.objectContaining({
                numCorrect: 0,
                multipleSelect: false,
            }),
        );
    });

    it("preserves numCorrect when switching from single select to multiple select", async () => {
        const onChangeMock = jest.fn();

        render(
            <RadioEditor
                onChange={onChangeMock}
                static={false}
                multipleSelect={false}
                choices={[
                    getCorrectChoice(),
                    getIncorrectChoice(),
                    getIncorrectChoice(),
                    getIncorrectChoice(),
                ]}
            />,
            {wrapper: RenderStateRoot},
        );

        // Switch from single select to multiple select
        await userEvent.click(
            screen.getByRole("switch", {
                name: "Multiple selections",
            }),
        );

        // Check that numCorrect still has the same value
        expect(onChangeMock).toHaveBeenCalledWith(
            expect.objectContaining({
                numCorrect: 1,
                multipleSelect: true,
            }),
        );
    });

    it("preserves numCorrect when switching from multiple select to single select with a single correct choice", async () => {
        const onChangeMock = jest.fn();

        render(
            <RadioEditor
                onChange={onChangeMock}
                static={false}
                multipleSelect={true}
                choices={[
                    getCorrectChoice(),
                    getIncorrectChoice(),
                    getIncorrectChoice(),
                    getIncorrectChoice(),
                ]}
            />,
            {wrapper: RenderStateRoot},
        );

        // Switch from multiple select to single select
        await userEvent.click(
            screen.getByRole("switch", {
                name: "Multiple selections",
            }),
        );

        // Ensure that numCorrect is reset (0) when switching from multiple select to single select
        expect(onChangeMock).toHaveBeenCalledWith(
            expect.objectContaining({
                numCorrect: 1,
                multipleSelect: false,
            }),
        );
    });

    it.each([
        // Button index for Choice 2 specifically.
        // (Add 4 to index to skip Choice 1 buttons.)
        {case: "top", buttonIndex: 4, expectedOrder: [2, 1, 3, 4]},
        {case: "up", buttonIndex: 5, expectedOrder: [2, 1, 3, 4]},
        {case: "down", buttonIndex: 6, expectedOrder: [1, 3, 2, 4]},
        {case: "bottom", buttonIndex: 7, expectedOrder: [1, 3, 4, 2]},
    ])(
        "calls onChange when choice 2 is moved ($case)",
        async ({buttonIndex, expectedOrder}) => {
            const onChangeMock = jest.fn();

            renderRadioEditor(onChangeMock, {
                choices: fourChoices,
            });

            const moveButtons = screen.getAllByRole("button", {name: /Move/});

            await userEvent.click(moveButtons[buttonIndex]);

            const expectedChoices = expectedOrder.map((index) => ({
                content: `Choice ${index}`,
                id: mockIds[index - 1],
            }));

            expect(onChangeMock).toHaveBeenCalledWith(
                expect.objectContaining({
                    choices: expectedChoices,
                }),
            );
        },
    );

    it("does not render movement buttons when there is only one choice", () => {
        renderRadioEditor(() => {}, {
            choices: [singleChoice],
        });

        const moveButtons = screen.queryAllByRole("button", {
            name: /Move/,
        });

        expect(moveButtons).toHaveLength(0);
    });

    it("does not render movement buttons when the choice is None of the above", () => {
        renderRadioEditor(() => {}, {
            choices: fourChoicesWithNoneOfTheAboveAndCorrect,
        });

        const moveButtons = screen.getAllByRole("button", {name: /Move/});

        // 3 valid choices (4 total choices) * 4 movement buttons = 12 buttons
        expect(moveButtons).toHaveLength(12);
    });

    describe("images in content", () => {
        it("should show the nicer content in the editor when an image is in the content", () => {
            // Arrange

            // Act - render
            renderRadioEditor(() => {}, {
                choices: [
                    {
                        id: "0-0-0-0-0",
                        content:
                            "Choice 1\n![Image alt text](https://example.com/image.jpg)",
                    },
                ],
            });

            const contentTextField = screen.getByRole("textbox", {
                name: "Content",
            });

            // Assert
            expect(contentTextField).toHaveValue("Choice 1\n![Image 1]");
        });

        it("should call onChange when an image is pasted into the content", async () => {
            // Arrange
            const onChangeMock = jest.fn();
            renderRadioEditor(onChangeMock, {
                choices: [{id: "0-0-0-0-0", content: "Choice 1"}],
            });

            // Act
            const contentTextField = screen.getByRole("textbox", {
                name: "Content",
            });
            contentTextField.focus();
            await userEvent.paste("graphie");

            // Assert
            expect(onChangeMock).toHaveBeenCalledWith(
                expect.objectContaining({
                    choices: [
                        {id: "0-0-0-0-0", content: "Choice 1\n![](graphie)"},
                    ],
                }),
            );
        });

        /***** Tests for image adder tile *****/

        it("should show the 'Add image' button by default", () => {
            // Arrange

            // Act - render
            renderRadioEditor(() => {}, {
                choices: [{id: "0-0-0-0-0", content: "Choice 1"}],
            });

            // Assert
            const addImageButton = screen.getByRole("button", {
                name: "Add image",
            });
            expect(addImageButton).toBeInTheDocument();
        });

        it("should stop showing the 'Add image' button while an image is being added", async () => {
            // Arrange
            renderRadioEditor(() => {}, {
                choices: [{id: "0-0-0-0-0", content: "Choice 1"}],
            });

            // Act - click the 'Add image' button
            const addImageButton = screen.getByRole("button", {
                name: "Add image",
            });
            await userEvent.click(addImageButton);

            // Assert
            expect(screen.queryByText("Add image")).not.toBeInTheDocument();
        });

        it("should remove the tile when the close button is clicked", async () => {
            // Arrange
            renderRadioEditor(() => {}, {
                choices: [{id: "0-0-0-0-0", content: "Choice 1"}],
            });

            // Act
            // Click the 'Add image' button to show the tile with
            // the close button.
            let addImageButton = screen.getByRole("button", {
                name: "Add image",
            });
            await userEvent.click(addImageButton);
            expect(addImageButton).not.toBeInTheDocument();

            // Click the close button
            const closeButton = screen.getByRole("button", {name: "Close"});
            await userEvent.click(closeButton);

            // Assert
            // Re-find the add image button since it was removed.
            addImageButton = screen.getByRole("button", {
                name: "Add image",
            });
            expect(addImageButton).toBeInTheDocument();

            // Image adding text fields should be removed.
            const imageUrlInput = screen.queryByRole("textbox", {
                name: "Image URL",
            });
            expect(imageUrlInput).not.toBeInTheDocument();

            const imageAltTextInput = screen.queryByRole("textbox", {
                name: "Image Alt Text",
            });
            expect(imageAltTextInput).not.toBeInTheDocument();
        });

        it("should stop showing the image adder tile when the image is being added", async () => {
            // Arrange
            renderRadioEditor(() => {}, {
                choices: [{id: "0-0-0-0-0", content: "Choice 1"}],
            });

            // Act - click the 'Add image' button
            const addImageButton = screen.getByRole("button", {
                name: "Add image",
            });
            await userEvent.click(addImageButton);

            // Assert - Check all the "Add" editor elements are present
            // Note the "Delete this image" button is not present - that
            // is only used within the "Edit image" editor accordion.
            expect(
                screen.getByRole("button", {name: "Close"}),
            ).toBeInTheDocument();
            expect(
                screen.getByRole("textbox", {name: "Image URL"}),
            ).toBeInTheDocument();
            expect(
                screen.getByRole("textbox", {name: "Image Alt Text"}),
            ).toBeInTheDocument();
            expect(
                screen.getByRole("button", {name: "Save image"}),
            ).toBeInTheDocument();
        });

        it("should call onChange when the 'Save image' button is clicked", async () => {
            // Arrange
            const onChangeMock = jest.fn();
            renderRadioEditor(onChangeMock, {
                choices: [{id: "0-0-0-0-0", content: "Choice 1"}],
            });

            // Act
            // Click the 'Add image' button
            const addImageButton = screen.getByRole("button", {
                name: "Add image",
            });
            await userEvent.click(addImageButton);

            // Fill in the image URL and alt text
            const imageUrlInput = screen.getByRole("textbox", {
                name: "Image URL",
            });
            await userEvent.type(
                imageUrlInput,
                "https://example.com/image.jpg",
            );

            const imageAltTextInput = screen.getByRole("textbox", {
                name: "Image Alt Text",
            });
            await userEvent.type(imageAltTextInput, "Image alt text");

            // Click the 'Save image' button
            const saveImageButton = screen.getByRole("button", {
                name: "Save image",
            });
            await userEvent.click(saveImageButton);

            // Assert
            expect(onChangeMock).toHaveBeenCalledWith(
                expect.objectContaining({
                    choices: [
                        {
                            id: "0-0-0-0-0",
                            content:
                                "Choice 1\n![Image alt text](https://example.com/image.jpg)",
                        },
                    ],
                }),
            );
        });

        /***** Tests for image editor accordion *****/

        it("should render the image editor accordion when an image is in the content", () => {
            // Arrange

            // Act - render
            renderRadioEditor(() => {}, {
                choices: [
                    {
                        id: "0-0-0-0-0",
                        content: "Choice 1\n![Alt](image.jpg)",
                    },
                ],
            });

            const accordionHeader = screen.getByRole("button", {
                name: "Image 1",
            });
            const imageUrlInput = screen.getByRole("textbox", {
                name: "Image URL",
            });
            const imageAltTextInput = screen.getByRole("textbox", {
                name: "Image Alt Text",
            });
            const saveImageButton = screen.getByRole("button", {
                name: "Save image",
            });
            const deleteImageButton = screen.getByRole("button", {
                name: "Delete this image",
            });

            // Assert - Check all the accordion elements are present.
            // Note the "Delete this image" button is present and the "Close"
            // button is not. This differeniates the image editor accordion
            // from the image adder tile.
            expect(accordionHeader).toBeInTheDocument();
            expect(imageUrlInput).toBeInTheDocument();
            expect(imageAltTextInput).toBeInTheDocument();
            expect(saveImageButton).toBeInTheDocument();
            expect(deleteImageButton).toBeInTheDocument();
        });

        it("should render multiple image editors when there are multiple images in the content", () => {
            // Arrange

            // Act - render
            renderRadioEditor(() => {}, {
                choices: [
                    {
                        id: "0-0-0-0-0",
                        content:
                            "Choice 1\n![Alt](image.jpg)\n![Alt2](image2.jpg)",
                    },
                ],
            });

            const accordionHeader = screen.getByRole("button", {
                name: "Image 1",
            });
            const accordionHeader2 = screen.getByRole("button", {
                name: "Image 2",
            });
            const imageUrlInputs = screen.getAllByRole("textbox", {
                name: "Image URL",
            });
            const imageAltTextInputs = screen.getAllByRole("textbox", {
                name: "Image Alt Text",
            });
            const saveImageButtons = screen.getAllByRole("button", {
                name: "Save image",
            });
            const deleteImageButtons = screen.getAllByRole("button", {
                name: "Delete this image",
            });

            // Assert - Check all the accordion elements are present.
            expect(accordionHeader).toBeInTheDocument();
            expect(accordionHeader2).toBeInTheDocument();
            expect(imageUrlInputs).toHaveLength(2);
            expect(imageAltTextInputs).toHaveLength(2);
            expect(saveImageButtons).toHaveLength(2);
            expect(deleteImageButtons).toHaveLength(2);
        });

        it("should disable the 'Save image' button when the image URL and alt text are not changed", async () => {
            // Arrange
            renderRadioEditor(() => {}, {
                choices: [
                    {
                        id: "0-0-0-0-0",
                        content: "Choice 1\n![Alt](image.jpg)",
                    },
                ],
            });

            // Act
            const saveImageButton = screen.getByRole("button", {
                name: "Save image",
            });

            // Assert
            expect(saveImageButton).toHaveAttribute("aria-disabled", "true");
        });

        it("should enable the 'Save image' button when the image URL and alt text are changed", async () => {
            // Arrange
            renderRadioEditor(() => {}, {
                choices: [
                    {id: "0-0-0-0-0", content: "Choice 1\n![Alt](image.jpg)"},
                ],
            });

            // Act
            const saveImageButton = screen.getByRole("button", {
                name: "Save image",
            });

            // Update the image alt text
            const imageAltTextInput = screen.getByRole("textbox", {
                name: "Image Alt Text",
            });
            await userEvent.type(imageAltTextInput, "Alt2");

            // Assert
            expect(saveImageButton).toHaveAttribute("aria-disabled", "false");
        });

        it("should call onChange when the 'Save image' button is clicked", async () => {
            // Arrange
            const onChangeMock = jest.fn();
            renderRadioEditor(onChangeMock, {
                choices: [
                    {
                        id: "0-0-0-0-0",
                        content: "Choice 1\n![Alt1](image1.jpg)",
                    },
                ],
            });

            // Act
            // Update the image URL and alt text
            const imageUrlInput = screen.getByRole("textbox", {
                name: "Image URL",
            });
            await userEvent.clear(imageUrlInput);
            await userEvent.type(imageUrlInput, "image2.jpg");

            const imageAltTextInput = screen.getByRole("textbox", {
                name: "Image Alt Text",
            });
            await userEvent.clear(imageAltTextInput);
            await userEvent.type(imageAltTextInput, "Alt2");

            // Click the 'Save image' button
            const saveImageButton = screen.getByRole("button", {
                name: "Save image",
            });
            await userEvent.click(saveImageButton);

            // Assert
            expect(onChangeMock).toHaveBeenCalledTimes(1);
            expect(onChangeMock).toHaveBeenCalledWith(
                expect.objectContaining({
                    choices: [
                        {
                            id: "0-0-0-0-0",
                            content: "Choice 1\n![Alt2](image2.jpg)",
                        },
                    ],
                }),
            );
        });

        it("should call onChange when the 'Save image' button is clicked with multiple images in the content", async () => {
            // Arrange
            const onChangeMock = jest.fn();
            renderRadioEditor(onChangeMock, {
                choices: [
                    {
                        id: "0-0-0-0-0",
                        content:
                            "Choice 1\n![Alt1](image1.jpg)\n![Alt2](image2.jpg)",
                    },
                ],
            });

            // Act
            // Update the image URL and alt text for the second image
            const imageUrlInputs = screen.getAllByRole("textbox", {
                name: "Image URL",
            });
            const imageUrlInput2 = imageUrlInputs[1];
            await userEvent.clear(imageUrlInput2);
            await userEvent.type(imageUrlInput2, "foo.jpg");

            const imageAltTextInputs = screen.getAllByRole("textbox", {
                name: "Image Alt Text",
            });
            const imageAltTextInput2 = imageAltTextInputs[1];
            await userEvent.clear(imageAltTextInput2);
            await userEvent.type(imageAltTextInput2, "bar");

            // Click the 'Save image' button for the second image
            const saveImageButtons = screen.getAllByRole("button", {
                name: "Save image",
            });
            await userEvent.click(saveImageButtons[1]);

            // Assert
            expect(onChangeMock).toHaveBeenCalledTimes(1);
            expect(onChangeMock).toHaveBeenCalledWith(
                expect.objectContaining({
                    choices: [
                        {
                            id: "0-0-0-0-0",
                            content:
                                "Choice 1\n![Alt1](image1.jpg)\n![bar](foo.jpg)",
                        },
                    ],
                }),
            );
        });

        it("should call onChange when the 'Delete image' button is clicked", async () => {
            // Arrange
            jest.spyOn(window, "confirm").mockImplementation(
                // Confirm button clicked
                () => true,
            );
            const onChangeMock = jest.fn();
            renderRadioEditor(onChangeMock, {
                choices: [
                    {id: "0-0-0-0-0", content: "Choice 1\n![Alt](image.jpg)"},
                ],
            });

            // Act
            const deleteImageButton = screen.getByRole("button", {
                name: "Delete this image",
            });
            await userEvent.click(deleteImageButton);

            // Assert
            expect(onChangeMock).toHaveBeenCalledWith(
                expect.objectContaining({
                    choices: [{id: "0-0-0-0-0", content: "Choice 1\n"}],
                }),
            );
        });

        it("should call onChange when the 'Delete image' button is clicked with multiple images in the content", async () => {
            // Arrange
            jest.spyOn(window, "confirm").mockImplementation(
                // Confirm button clicked
                () => true,
            );
            const onChangeMock = jest.fn();
            renderRadioEditor(onChangeMock, {
                choices: [
                    {
                        id: "0-0-0-0-0",
                        content:
                            "Choice 1\n![Alt1](image1.jpg)\n![Alt2](image2.jpg)",
                    },
                ],
            });

            // Act
            const deleteImageButtons = screen.getAllByText("Delete this image");
            await userEvent.click(deleteImageButtons[1]);

            // Assert
            expect(onChangeMock).toHaveBeenCalledWith(
                expect.objectContaining({
                    choices: [
                        {
                            id: "0-0-0-0-0",
                            content: "Choice 1\n![Alt1](image1.jpg)\n",
                        },
                    ],
                }),
            );
        });

        it("should call onChange when the 'Delete image' button is clicked with multiple images in the content (first image)", async () => {
            // Arrange
            jest.spyOn(window, "confirm").mockImplementation(
                // Confirm button clicked
                () => true,
            );
            const onChangeMock = jest.fn();
            renderRadioEditor(onChangeMock, {
                choices: [
                    {
                        id: "0-0-0-0-0",
                        content:
                            "hello\n![Alt1](image1.jpg)\n![Alt2](image2.jpg)",
                    },
                ],
            });

            // Act
            const deleteImageButtons = screen.getAllByText("Delete this image");
            await userEvent.click(deleteImageButtons[0]);

            // Assert
            expect(onChangeMock).toHaveBeenCalledWith(
                expect.objectContaining({
                    choices: [
                        {
                            id: "0-0-0-0-0",
                            content: "hello\n\n![Alt2](image2.jpg)",
                        },
                    ],
                }),
            );
        });
    });

    describe("ensureValidIds", () => {
        it("should generate new ID for empty string", () => {
            // Reset mock and set specific return value
            mockedRandomUuid.mockReset();
            mockedRandomUuid.mockReturnValue("2-3-4-5-6");

            const editorRef = React.createRef<RadioEditor>();

            render(
                <RadioEditor
                    ref={editorRef}
                    onChange={() => {}}
                    static={false}
                />,
                {wrapper: RenderStateRoot},
            );

            // Test the method directly
            const result = editorRef.current?.ensureValidIds("", 0);
            expect(result).toBe("radio-choice-0");
        });

        it("should preserve valid ID", () => {
            const editorRef = React.createRef<RadioEditor>();
            const validId = "1-2-3-4-5";
            render(
                <RadioEditor
                    ref={editorRef}
                    onChange={() => {}}
                    static={false}
                />,
                {wrapper: RenderStateRoot},
            );

            const result = editorRef.current?.ensureValidIds(validId, 1);
            expect(result).toBe("1-2-3-4-5");
        });

        it("should generate new ID for whitespace-only string", () => {
            // Reset mock and set specific return value
            mockedRandomUuid.mockReset();
            mockedRandomUuid.mockReturnValue("4-5-6-7-8");

            const whitespaceOnlyString = "   \t  ";

            const editorRef = React.createRef<RadioEditor>();

            render(
                <RadioEditor
                    ref={editorRef}
                    onChange={() => {}}
                    static={false}
                />,
                {wrapper: RenderStateRoot},
            );

            const result = editorRef.current?.ensureValidIds(
                whitespaceOnlyString,
                2,
            );
            expect(result).toBe("radio-choice-2");
        });

        it("should generate new ID for null/undefined ID", () => {
            // Reset mock and set specific return value
            mockedRandomUuid.mockReset();
            mockedRandomUuid.mockReturnValue("5-6-7-8-9");

            const editorRef = React.createRef<RadioEditor>();

            render(
                <RadioEditor
                    ref={editorRef}
                    onChange={() => {}}
                    static={false}
                />,
                {wrapper: RenderStateRoot},
            );

            const result = editorRef.current?.ensureValidIds(null as any, 3);
            expect(result).toBe("radio-choice-3");
        });
    });
});
