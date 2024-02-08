import {describe, it, expect} from "@jest/globals";

import {generateTestPerseusItem} from "../util/test-utils";

import {
    basicObject,
    expected1,
    questionCustomInfo,
    expected2,
    answerAreaCustomInfo,
    hintsCustomInfo,
    expected3,
} from "./test-items/test-utils-items";

describe("generateTestPerseusItem", () => {
    it("should provide a basic Perseus item object with no inputs", () => {
        expect(generateTestPerseusItem()).toEqual(basicObject);
    });

    it("should replace question parts when given question custom info", () => {
        expect(generateTestPerseusItem(questionCustomInfo)).toEqual(expected1);
    });

    it("should replace answer area parts when given answer area custom info", () => {
        expect(generateTestPerseusItem(answerAreaCustomInfo)).toEqual(
            expected2,
        );
    });

    it("should hints when given custom info containing hints", () => {
        expect(generateTestPerseusItem(hintsCustomInfo)).toEqual(expected3);
    });
});
