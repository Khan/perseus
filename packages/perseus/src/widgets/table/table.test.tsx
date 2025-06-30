import {
    generateTestPerseusItem,
    splitPerseusItem,
    type PerseusItem,
} from "@khanacademy/perseus-core";
import {scorePerseusItem} from "@khanacademy/perseus-score";
import {screen} from "@testing-library/react";
import {userEvent as userEventLib} from "@testing-library/user-event";

import {renderQuestion} from "../__testutils__/renderQuestion";

import {generateTableRenderer} from "./test-util";

import type {UserEvent} from "@testing-library/user-event";

function getFullItem(): PerseusItem {
    return generateTestPerseusItem({question: generateTableRenderer()});
}

function getSplitItem(): PerseusItem {
    const item = getFullItem();
    return splitPerseusItem(item);
}

describe("table", () => {
    let userEvent: UserEvent;
    beforeEach(() => {
        userEvent = userEventLib.setup({
            advanceTimers: jest.advanceTimersByTime,
        });
    });

    describe.each([
        {optionsMode: "answerful", renderItem: getFullItem()},
        {optionsMode: "answerless", renderItem: getSplitItem()},
    ])("answerful vs answerless", ({optionsMode, renderItem}) => {
        it(`${optionsMode}: renders`, () => {
            renderQuestion(renderItem.question);

            expect(screen.getByText("Column 1")).toBeInTheDocument();
            expect(screen.getByText("Column 2")).toBeInTheDocument();
        });

        it(`${optionsMode}: snapshots`, () => {
            const {container} = renderQuestion(renderItem.question);

            expect(container).toMatchSnapshot();
        });

        it(`${optionsMode}: can be answered`, async () => {
            const {renderer} = renderQuestion(renderItem.question);

            const inputs = screen.getAllByRole("textbox");
            for (let i = 0; i < 4; i++) {
                await userEvent.type(inputs[i], "8675309");
            }

            expect(renderer.getUserInput()).toEqual({
                "table 1": [
                    ["8675309", "8675309"],
                    ["8675309", "8675309"],
                ],
            });
        });

        it(`${optionsMode}: can be scored`, async () => {
            const {renderer} = renderQuestion(renderItem.question);

            const inputs = screen.getAllByRole("textbox");
            for (let i = 0; i < 4; i++) {
                await userEvent.type(inputs[i], "42");
            }

            const userInput = renderer.getUserInput();
            const answerful = generateTableRenderer();
            const score = scorePerseusItem(answerful, userInput, "en");

            expect(score).toHaveBeenAnsweredCorrectly();
        });

        it(`${optionsMode}: returns user input in correct order`, async () => {
            const {renderer} = renderQuestion(renderItem.question);

            const inputs = screen.getAllByRole("textbox");
            for (let i = 0; i < 4; i++) {
                await userEvent.type(inputs[i], `${i}`);
            }

            const userInput = renderer.getUserInput();
            expect(userInput).toEqual({
                "table 1": [
                    ["0", "1"],
                    ["2", "3"],
                ],
            });
        });
    });
});
