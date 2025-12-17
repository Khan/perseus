import {clone} from "../../../testing/object-utils";

import {mapErrorToString, mockStrings} from "./strings";

describe("mapErrorToString", () => {
    it("handles translated strings", () => {
        // Assemble
        const translated = clone(mockStrings);
        translated.MISSING_PERCENT_ERROR =
            "pretend this is a different language";

        // Act
        const rv = mapErrorToString("MISSING_PERCENT_ERROR", translated);

        // Assert
        expect(rv).toBe("pretend this is a different language");
    });

    it("handles EMPTY_RESPONSE_ERROR", () => {
        expect(mapErrorToString("EMPTY_RESPONSE_ERROR", mockStrings)).toBe(
            "There are still more parts of this question to answer.",
        );
    });
});
