// @flow
import {bar} from "../index.js";

describe("#foo", () => {
    it("should return foo", () => {
        // Arrange
        const logSpy = jest.spyOn(console, "log");

        // Act
        bar();

        // Assert
        expect(logSpy).toHaveBeenCalledWith("foo() = foo");
    });
});
