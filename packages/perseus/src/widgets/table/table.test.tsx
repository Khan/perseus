import {
    generateTestPerseusItem,
    splitPerseusItem,
    type PerseusItem,
} from "@khanacademy/perseus-core";
import {scorePerseusItem} from "@khanacademy/perseus-score";
import {act, screen} from "@testing-library/react";
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

    describe("imperative handle", () => {
        function renderTable(apiOptions?: {customKeypad: boolean}) {
            const {renderer} = renderQuestion(
                generateTableRenderer({
                    content: "[[☃ table 1]]",
                    widgets: {
                        "table 1": {
                            type: "table",
                            options: {
                                headers: ["Column 1", "Column 2", "Column 3"],
                                rows: 2,
                                columns: 3,
                                answers: [
                                    ["1", "2", "3"],
                                    ["4", "5", "6"],
                                ],
                            },
                        },
                    },
                }),
                apiOptions,
            );
            return renderer.findWidgets("table 1")[0];
        }

        it("focus() focuses the cell at row 0, column 0", () => {
            const table = renderTable();

            act(() => table.focus());

            expect(screen.getAllByRole("textbox")[0]).toHaveFocus();
        });

        it("focusInputPath and blurInputPath act on the addressed cell", () => {
            const table = renderTable();
            // Row 1, column 0 is the fourth cell of a 2x3 table.
            const cell = screen.getAllByRole("textbox")[3];

            act(() => table.focusInputPath(["1", "0"]));
            expect(cell).toHaveFocus();

            act(() => table.blurInputPath(["1", "0"]));
            expect(cell).not.toHaveFocus();
        });

        it("getInputPaths returns every cell path in row-major order", () => {
            const table = renderTable();

            expect(table.getInputPaths()).toEqual([
                ["0", "0"],
                ["0", "1"],
                ["0", "2"],
                ["1", "0"],
                ["1", "1"],
                ["1", "2"],
            ]);
        });

        it("getDOMNodeForPath returns the input element for the cell", () => {
            const table = renderTable();

            expect(table.getDOMNodeForPath(["0", "1"])).toBe(
                screen.getAllByRole("textbox")[1],
            );
        });

        // With a custom keypad the cell is a SimpleKeypadInput rather than an
        // <input>, but callers still get back the element the learner types into.
        it("getDOMNodeForPath returns the cell's textbox element with a custom keypad", () => {
            const table = renderTable({customKeypad: true});

            expect(table.getDOMNodeForPath(["0", "1"])).toBe(
                screen.getAllByRole("textbox")[1],
            );
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

            expect(renderer.getUserInputMap()).toEqual({
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

            const userInput = renderer.getUserInputMap();
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

            const userInput = renderer.getUserInputMap();
            expect(userInput).toEqual({
                "table 1": [
                    ["0", "1"],
                    ["2", "3"],
                ],
            });
        });
    });
});
