import {mockStrings} from "../../../strings";

import {getInstructionsText} from "./string-utils";

describe("getInstructionsText", () => {
    it("returns choose one answer for single select", () => {
        expect(
            getInstructionsText({
                multipleSelect: false,
                countChoices: false,
                numCorrect: 1,
                strings: mockStrings,
            }),
        ).toEqual(mockStrings.chooseOneAnswer);
    });

    it("returns choose all answers for multiple select without count", () => {
        expect(
            getInstructionsText({
                multipleSelect: true,
                countChoices: false,
                numCorrect: 2,
                strings: mockStrings,
            }),
        ).toEqual(mockStrings.chooseAllAnswers);
    });

    it("returns choose N answers for multiple select with count", () => {
        expect(
            getInstructionsText({
                multipleSelect: true,
                countChoices: true,
                numCorrect: 3,
                strings: mockStrings,
            }),
        ).toEqual(
            mockStrings.chooseNumAnswers({
                numCorrect: "3",
            }),
        );
    });
});
