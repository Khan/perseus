// @flow
import {foo} from "../index.js";

describe("#foo", () => {
    it("should return foo", () => {
        // Arrange

        // Act
        const result = foo();

        // Assert
        expect(result).toEqual("foo");
    });
});
