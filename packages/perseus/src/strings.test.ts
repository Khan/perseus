import {clone} from "../../../testing/object-utils";

import {mapErrorToString, mockStrings} from "./strings";

describe("mapErrorToString", () => {
    it("handles translated strings", () => {
        // Assemble
        const translated = clone(mockStrings);
        // TODO(LEMS-3083): Remove eslint suppression
        // eslint-disable-next-line functional/immutable-data
        translated.MISSING_PERCENT_ERROR =
            "pretend this is a different language";

        // Act
        const rv = mapErrorToString("MISSING_PERCENT_ERROR", translated);

        // Assert
        expect(rv).toBe("pretend this is a different language");
    });
});
