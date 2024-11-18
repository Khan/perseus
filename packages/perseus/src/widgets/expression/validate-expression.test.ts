import {mockStrings} from "../../strings";

import validateExpression from "./validate-expression";

describe("expression validation", () => {
    it("should always return null", () => {
        const result = validateExpression("", {}, mockStrings, "en");
        expect(result).toBeNull();
    });

    it("should return null for empty user input", () => {
        const result = validateExpression("", {}, mockStrings, "en");
        expect(result).toBeNull();
    });

    it("should return null for non-empty user input", () => {
        const result = validateExpression("x+1", {}, mockStrings, "en");
        expect(result).toBeNull();
    });
});
