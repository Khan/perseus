import {describe, it, expect} from "@jest/globals";

import {generateTestPerseusItem} from "./test-utils";
import {
    basicObject,
    customQuestionInfo,
    expectedQuestionInfoAdded,
    customAnswerAreaInfo,
    expectedAnswerAreaInfoAdded,
    customHintsInfo,
    expectedHintsInfoAdded,
} from "./test-utils.testdata";

describe("generateTestPerseusItem", () => {
    it("should provide a basic Perseus item object with no inputs", () => {
        expect(generateTestPerseusItem()).toEqual(basicObject);
    });

    it("should replace question parts when given question custom info", () => {
        expect(generateTestPerseusItem(customQuestionInfo)).toEqual(
            expectedQuestionInfoAdded,
        );
    });

    it("should replace answer area parts when given answer area custom info", () => {
        expect(generateTestPerseusItem(customAnswerAreaInfo)).toEqual(
            expectedAnswerAreaInfoAdded,
        );
    });

    it("should add hints when given custom info containing hints", () => {
        expect(generateTestPerseusItem(customHintsInfo)).toEqual(
            expectedHintsInfoAdded,
        );
    });
});
