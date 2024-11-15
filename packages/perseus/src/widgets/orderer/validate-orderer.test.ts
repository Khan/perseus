import {validateOrderer} from "./validate-orderer";

import type {PerseusOrdererUserInput} from "../../validation.types";

describe("validateOrderer", () => {
    it("is invalid when the user has not started ordering the options and current is empty", () => {
        // Arrange
        const userInput: PerseusOrdererUserInput = {
            current: [],
        };

        // Act
        const result = validateOrderer(userInput);

        // Assert
        expect(result).toHaveInvalidInput();
    });

    it("is null when the user has started ordering the options and current has at least one option", () => {
        // Arrange
        const userInput: PerseusOrdererUserInput = {
            current: ["$10.9$"],
        };

        // Act
        const result = validateOrderer(userInput);

        // Assert
        expect(result).toBeNull();
    });
});
