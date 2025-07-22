import {Dependencies, ApiOptions} from "@khanacademy/perseus";
import {RenderStateRoot} from "@khanacademy/wonder-blocks-core";
import {render, screen} from "@testing-library/react";
import {userEvent as userEventLib} from "@testing-library/user-event";
import * as React from "react";

import {testDependencies} from "../../../../../testing/test-dependencies";
import RadioEditor from "../radio/editor";

import type {RadioEditorProps} from "../radio/editor";
import type {PerseusRadioChoice} from "@khanacademy/perseus-core";
import type {UserEvent} from "@testing-library/user-event";

function renderRadioEditor(
    onChangeMock = () => undefined,
    props: Partial<RadioEditorProps> = {},
) {
    return render(
        <RadioEditor
            onChange={onChangeMock}
            apiOptions={ApiOptions.defaults}
            static={false}
            {...props}
        />,
        {wrapper: RenderStateRoot},
    );
}

describe("radio-editor", () => {
    let userEvent: UserEvent;
    function getCorrectChoice(): PerseusRadioChoice {
        return {
            content: "",
            correct: true,
        };
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
    });

    it("should render", async () => {
        renderRadioEditor();

        expect(screen.getByText(/Multiple selections/)).toBeInTheDocument();
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
                    {},
                    {},
                    {},
                    {},
                    {content: "", isNoneOfTheAbove: false},
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
            choices: [
                {content: "Choice 1"},
                {content: "Choice 2", correct: true},
                {content: "Choice 3"},
                {content: "None of the above", isNoneOfTheAbove: true},
            ],
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
                choices: [
                    {content: "Choice 2", correct: true},
                    {content: "Choice 3"},
                    {content: "None of the above", isNoneOfTheAbove: true},
                ],
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
            choices: [
                {content: "Choice 1"},
                {content: "Choice 2", correct: true},
                {content: "Choice 3"},
                {content: "None of the above", isNoneOfTheAbove: true},
            ],
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
                choices: [
                    {content: "Choice 1"},
                    {content: "Choice 2", correct: true},
                    {content: "Choice 3"},
                ],
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
            choices: [
                {content: "Choice 1"},
                {content: "Choice 2", correct: true},
                {content: "Choice 3"},
                {content: "None of the above", isNoneOfTheAbove: true},
            ],
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

    it("shows the 'None of the above' button when there is no 'None of the above' choice", async () => {
        renderRadioEditor();
        expect(
            screen.getByRole("button", {name: "None of the above"}),
        ).toBeInTheDocument();
    });

    it("hides the 'None of the above' button when there is a 'None of the above' choice", async () => {
        renderRadioEditor(() => {}, {
            choices: [
                {content: "Choice 1", isNoneOfTheAbove: false},
                {content: "Choice 2", isNoneOfTheAbove: false},
                {content: "Choice 3", isNoneOfTheAbove: false},
                {content: "None of the above", isNoneOfTheAbove: true},
            ],
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
                apiOptions={ApiOptions.defaults}
                static={false}
                choices={[
                    {content: "Choice 1"},
                    {content: "Choice 2"},
                    {content: "Choice 3"},
                    {content: "Choice 4"},
                ]}
            />,
            {wrapper: RenderStateRoot},
        );

        const options = editorRef.current?.serialize();

        expect(options).toEqual({
            choices: [
                {content: "Choice 1"},
                {content: "Choice 2"},
                {content: "Choice 3"},
                {content: "Choice 4"},
            ],
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
                apiOptions={ApiOptions.defaults}
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
                apiOptions={ApiOptions.defaults}
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
            choices: [
                {content: "Choice 1"},
                {content: "Choice 2"},
                {content: "Choice 3"},
                {content: "Choice 4"},
            ],
        });

        const choices = screen.getAllByRole("button", {name: "Correct"});

        await userEvent.click(choices[0]);

        expect(onChangeMock).toHaveBeenCalledWith(
            expect.objectContaining({
                choices: [
                    {content: "Choice 1", correct: true},
                    {content: "Choice 2", correct: false},
                    {content: "Choice 3", correct: false},
                    {content: "Choice 4", correct: false},
                ],
            }),
        );
    });

    it("calls onChange when the correct choice is picked (indicator pill)", async () => {
        const onChangeMock = jest.fn();

        renderRadioEditor(onChangeMock, {
            choices: [
                {content: "Choice 1"},
                {content: "Choice 2"},
                {content: "Choice 3"},
                {content: "Choice 4"},
            ],
        });

        const choice = screen.getByRole("button", {name: "A"});

        await userEvent.click(choice);

        expect(onChangeMock).toHaveBeenCalledWith(
            expect.objectContaining({
                choices: [
                    {content: "Choice 1", correct: true},
                    {content: "Choice 2", correct: false},
                    {content: "Choice 3", correct: false},
                    {content: "Choice 4", correct: false},
                ],
            }),
        );
    });

    it("calls onChange when the correct choice is changed (status badges)", async () => {
        const onChangeMock = jest.fn();

        renderRadioEditor(onChangeMock, {
            choices: [
                {content: "Choice 1", correct: true},
                {content: "Choice 2", correct: false},
                {content: "Choice 3", correct: false},
                {content: "Choice 4", correct: false},
            ],
        });

        const choices = screen.getAllByRole("button", {name: "Correct"});

        await userEvent.click(choices[1]);

        expect(onChangeMock).toHaveBeenCalledWith(
            expect.objectContaining({
                choices: [
                    // Automatically change the previous correct choice to incorrect
                    {content: "Choice 1", correct: false},
                    {content: "Choice 2", correct: true},
                    {content: "Choice 3", correct: false},
                    {content: "Choice 4", correct: false},
                ],
            }),
        );
    });

    it("calls onChange when the correct choice is changed (indicator pill)", async () => {
        const onChangeMock = jest.fn();

        renderRadioEditor(onChangeMock, {
            choices: [
                {content: "Choice 1", correct: true},
                {content: "Choice 2", correct: false},
                {content: "Choice 3", correct: false},
                {content: "Choice 4", correct: false},
            ],
        });

        const choice = screen.getByRole("button", {name: "B"});

        await userEvent.click(choice);

        expect(onChangeMock).toHaveBeenCalledWith(
            expect.objectContaining({
                choices: [
                    // Automatically change the previous correct choice to incorrect
                    {content: "Choice 1", correct: false},
                    {content: "Choice 2", correct: true},
                    {content: "Choice 3", correct: false},
                    {content: "Choice 4", correct: false},
                ],
            }),
        );
    });

    it("calls onChange when the previously correct choice is marked wrong (status badges)", async () => {
        const onChangeMock = jest.fn();

        renderRadioEditor(onChangeMock, {
            choices: [
                {content: "Choice 1", correct: true},
                {content: "Choice 2", correct: false},
                {content: "Choice 3", correct: false},
                {content: "Choice 4", correct: false},
            ],
        });

        const choices = screen.getAllByRole("button", {name: "Incorrect"});

        await userEvent.click(choices[0]);

        expect(onChangeMock).toHaveBeenCalledWith(
            expect.objectContaining({
                choices: [
                    // All choices are now incorrect.
                    {content: "Choice 1", correct: false},
                    {content: "Choice 2", correct: false},
                    {content: "Choice 3", correct: false},
                    {content: "Choice 4", correct: false},
                ],
            }),
        );
    });

    it("calls onChange when the previously correct choice is marked wrong (indicator pill)", async () => {
        const onChangeMock = jest.fn();

        renderRadioEditor(onChangeMock, {
            choices: [
                {content: "Choice 1", correct: true},
                {content: "Choice 2", correct: false},
                {content: "Choice 3", correct: false},
                {content: "Choice 4", correct: false},
            ],
        });

        const choice = screen.getByRole("button", {name: "A"});

        await userEvent.click(choice);

        expect(onChangeMock).toHaveBeenCalledWith(
            expect.objectContaining({
                choices: [
                    // All choices are now incorrect.
                    {content: "Choice 1", correct: false},
                    {content: "Choice 2", correct: false},
                    {content: "Choice 3", correct: false},
                    {content: "Choice 4", correct: false},
                ],
            }),
        );
    });

    it("calls onChange when the correct choices are updated with multipleSelect", async () => {
        const onChangeMock = jest.fn();

        renderRadioEditor(onChangeMock, {
            choices: [
                {content: "Choice 1", correct: true},
                {content: "Choice 2", correct: false},
                {content: "Choice 3", correct: false},
                {content: "Choice 4", correct: false},
            ],
            multipleSelect: true,
        });

        const choices = screen.getAllByRole("button", {name: "Correct"});

        await userEvent.click(choices[1]);

        expect(onChangeMock).toHaveBeenCalledWith(
            expect.objectContaining({
                choices: [
                    // Previous correct choice is still correct.
                    // New correct choice is also correct.
                    {content: "Choice 1", correct: true},
                    {content: "Choice 2", correct: true},
                    {content: "Choice 3", correct: false},
                    {content: "Choice 4", correct: false},
                ],
            }),
        );
    });

    it("calls onChange when the content is changed", async () => {
        const onChangeMock = jest.fn();

        renderRadioEditor(onChangeMock, {
            choices: [
                {content: "Choice 1"},
                {content: "Choice 2"},
                {content: "Choice 3"},
                {content: "Choice 4"},
            ],
        });

        const textAreas = screen.getAllByRole("textbox", {name: "Content"});

        await userEvent.type(textAreas[0], "A");

        expect(onChangeMock).toHaveBeenCalledWith(
            expect.objectContaining({
                choices: [
                    {content: "Choice 1A"},
                    {content: "Choice 2"},
                    {content: "Choice 3"},
                    {content: "Choice 4"},
                ],
            }),
        );
    });

    it("calls onChange when the rationale is changed", async () => {
        const onChangeMock = jest.fn();

        renderRadioEditor(onChangeMock, {
            choices: [
                {content: "Choice 1"},
                {content: "Choice 2"},
                {content: "Choice 3"},
                {content: "Choice 4"},
            ],
        });

        const textAreas = screen.getAllByRole("textbox", {name: "Rationale"});

        await userEvent.type(textAreas[0], "A");

        expect(onChangeMock).toHaveBeenCalledWith(
            expect.objectContaining({
                choices: [
                    {content: "Choice 1", rationale: "A"},
                    {content: "Choice 2"},
                    {content: "Choice 3"},
                    {content: "Choice 4"},
                ],
            }),
        );
    });

    it("calls onChange when the rationale is cleared", async () => {
        const onChangeMock = jest.fn();

        renderRadioEditor(onChangeMock, {
            choices: [
                {content: "Choice 1", rationale: "A"},
                {content: "Choice 2"},
                {content: "Choice 3"},
                {content: "Choice 4"},
            ],
        });

        const textAreas = screen.getAllByRole("textbox", {name: "Rationale"});

        await userEvent.clear(textAreas[0]);

        expect(onChangeMock).toHaveBeenCalledWith(
            expect.objectContaining({
                choices: [
                    // Rationale is deleted if it's an empty string.
                    {content: "Choice 1"},
                    {content: "Choice 2"},
                    {content: "Choice 3"},
                    {content: "Choice 4"},
                ],
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
                apiOptions={ApiOptions.defaults}
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
                apiOptions={ApiOptions.defaults}
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
                apiOptions={ApiOptions.defaults}
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
                apiOptions={ApiOptions.defaults}
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
});
