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
});
