import {lineLabelText} from "./grid";

import type {vec} from "mafs";

describe("grid", () => {
    describe("lineLabelText", () => {
        it("shows tick label on correct step", () => {
            // Arrange
            const number = 2;
            const tickStep = 2;
            const range: vec.Vector2 = [-10, 10];

            // Act
            const result = lineLabelText(number, tickStep, range);

            // Assert
            expect(result).toBe("2");
        });

        it("returns empty string on incorrect step", () => {
            // Arrange
            const number = 3;
            const tickStep = 2;
            const range: vec.Vector2 = [-10, 10];

            // Act
            const result = lineLabelText(number, tickStep, range);

            // Assert
            expect(result).toBe("");
        });

        it("returns empty string for -1", () => {
            // Arrange
            const number = -1;
            const tickStep = 1;
            const range: vec.Vector2 = [-10, 10];

            // Act
            const result = lineLabelText(number, tickStep, range);

            // Assert
            expect(result).toBe("");
        });

        it("returns empty string for range min", () => {
            // Arrange
            const range: vec.Vector2 = [-10, 10];
            const tickStep = 1;
            const number = range[0];

            // Act
            const result = lineLabelText(number, tickStep, range);

            // Assert
            expect(result).toBe("");
        });

        it("returns empty string for range max", () => {
            // Arrange
            const range: vec.Vector2 = [-10, 10];
            const tickStep = 1;
            const number = range[1];

            // Act
            const result = lineLabelText(number, tickStep, range);

            // Assert
            expect(result).toBe("");
        });
    });
});
