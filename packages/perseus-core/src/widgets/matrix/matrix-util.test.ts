import getMatrixPublicWidgetOptions from "./matrix-util";

import type {PerseusMatrixWidgetOptions} from "../../data-schema";

describe("getMatrixPublicWidgetOptions", () => {
    it("removes the `answers` field", () => {
        const options: PerseusMatrixWidgetOptions = {
            answers: [
                [1, 2],
                [3, 4],
            ],
            cursorPosition: [0, 0],
            matrixBoardSize: [2, 2],
            prefix: "the prefix",
            suffix: "the suffix",
        };

        const publicOptions = getMatrixPublicWidgetOptions(options);

        expect(publicOptions).toEqual({
            cursorPosition: [0, 0],
            matrixBoardSize: [2, 2],
            prefix: "the prefix",
            suffix: "the suffix",
        });
    });
});
