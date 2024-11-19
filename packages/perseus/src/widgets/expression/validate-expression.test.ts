import {mockStrings} from "../../strings";

import validateExpression from "./validate-expression";

describe("expression validation", () => {
    it("should return invalid for empty user input", () => {
        const result = validateExpression("", {}, mockStrings, "en");
        expect(result).toHaveInvalidInput();
    });

    it("should return null for non-empty user input", () => {
        const result = validateExpression("x+1", {}, mockStrings, "en");
        expect(result).toBeNull();
    });
});
