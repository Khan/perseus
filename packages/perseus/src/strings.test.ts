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
});
