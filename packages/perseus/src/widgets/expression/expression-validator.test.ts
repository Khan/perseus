import {mockStrings} from "../../strings";

import validate from "./expression-validator";
import {expressionItem3Options} from "./expression.testdata";

describe("expression-validator", () => {
    it("should handle ungraded answers with no error callback", function () {
        const err = validate(
            "x+1",
            expressionItem3Options,
            undefined,
            mockStrings,
            "en",
        );
        expect(err).toStrictEqual({message: "", type: "invalid"});
    });

    it("should handle ungraded answers with no error callback", function () {
        const err = validate(
            "x+^1",
            expressionItem3Options,
            undefined,
            mockStrings,
            "en",
        );
        expect(err).toStrictEqual({message: null, type: "invalid"});
    });

    it("should handle listed incorrect answers as wrong", function () {
        const result = validate(
            "y+1",
            expressionItem3Options,
            undefined,
            mockStrings,
            "en",
        );
        expect(result).toStrictEqual({
            earned: 0,
            message: "",
            total: 1,
            type: "points",
        });
    });

    it("should handle unlisted answers as wrong", function () {
        const result = validate(
            "2+2",
            expressionItem3Options,
            undefined,
            mockStrings,
            "en",
        );
        expect(result).toStrictEqual({
            earned: 0,
            total: 1,
            type: "points",
        });
    });

    it("should handle correct answers", function () {
        const result = validate(
            "z+1",
            expressionItem3Options,
            undefined,
            mockStrings,
            "en",
        );
        expect(result).toStrictEqual({
            earned: 1,
            message: "",
            total: 1,
            type: "points",
        });
    });

    it("should handle multiple correct answers", function () {
        // First possible correct answer
        const result1 = validate(
            "z+1",
            expressionItem3Options,
            undefined,
            mockStrings,
            "en",
        );
        expect(result1).toStrictEqual({
            earned: 1,
            message: "",
            total: 1,
            type: "points",
        });
        // Second possible correct answer
        const result2 = validate(
            "a+1",
            expressionItem3Options,
            undefined,
            mockStrings,
            "en",
        );
        expect(result2).toStrictEqual({
            earned: 1,
            message: "",
            total: 1,
            type: "points",
        });
    });
});
