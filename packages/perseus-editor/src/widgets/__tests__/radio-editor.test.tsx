import {Dependencies, ApiOptions} from "@khanacademy/perseus";
import {RenderStateRoot} from "@khanacademy/wonder-blocks-core";
import {render, screen} from "@testing-library/react";
import {userEvent as userEventLib} from "@testing-library/user-event";
import * as React from "react";

import {testDependencies} from "../../../../../testing/test-dependencies";
import RadioEditor from "../radio/editor";

import type {PerseusRadioChoice} from "@khanacademy/perseus-core";
import type {UserEvent} from "@testing-library/user-event";

function renderRadioEditor(onChangeMock = () => undefined) {
    return render(
        <RadioEditor
            onChange={onChangeMock}
            apiOptions={ApiOptions.defaults}
            static={false}
        />,
        {wrapper: RenderStateRoot},
    );
}

describe("radio-editor", () => {
    let userEvent: UserEvent;
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
            screen.getByRole("checkbox", {
                name: "Multiple selections",
            }),
        );

        expect(onChangeMock).toBeCalledWith({multipleSelect: true});
    });

    it("should toggle randomize order checkbox", async () => {
        const onChangeMock = jest.fn();

        renderRadioEditor(onChangeMock);

        await userEvent.click(
            screen.getByRole("checkbox", {
                name: "Randomize order",
            }),
        );

        expect(onChangeMock).toBeCalledWith({randomize: true});
    });

    it("should be possible to add answer", async () => {
        const onChangeMock = jest.fn();

        renderRadioEditor(onChangeMock);

        await userEvent.click(
            screen.getAllByRole("link", {
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
        const onChangeMock = jest.fn();

        renderRadioEditor(onChangeMock);

        await userEvent.click(
            screen.getAllByRole("link", {
                name: "Remove this choice",
            })[0],
        );

        expect(onChangeMock).toBeCalledWith(
            expect.objectContaining({
                choices: [{}, {}, {}],
                hasNoneOfTheAbove: false,
            }),
        );
    });

    it("serializes", () => {
        const editorRef = React.createRef<RadioEditor>();

        render(
            <RadioEditor
                ref={editorRef}
                onChange={() => {}}
                apiOptions={ApiOptions.defaults}
                static={false}
            />,
            {wrapper: RenderStateRoot},
        );

        const options = editorRef.current?.serialize();

        expect(options).toEqual({
            choices: [{}, {}, {}, {}],
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
        const choices = screen.getAllByTestId(
            "choice-icon__library-choice-icon",
        );

        // switch an incorrect answer into a correct answer
        await userEvent.click(choices[0]);

        // now there should be 3 correct answers
        expect(onChangeMock).toHaveBeenCalledWith(
            expect.objectContaining({
                numCorrect: 3,
            }),
        );
    });
});
