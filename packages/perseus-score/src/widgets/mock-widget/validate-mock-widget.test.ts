import validateMockWidget from "./validate-mock-widget";

import type {PerseusMockWidgetUserInput} from "./mock-widget-validation.types";

describe("mock-widget", () => {
    it("should be invalid if the user input is undefined", () => {
        const input = undefined;

        const result = validateMockWidget(input);

        expect(result).toHaveInvalidInput();
    });

    it("should be invalid if no value provided", () => {
        const input: PerseusMockWidgetUserInput = {currentValue: ""};

        const result = validateMockWidget(input);

        expect(result).toHaveInvalidInput();
    });

    it("should be valid if a value provided", () => {
        const input: PerseusMockWidgetUserInput = {currentValue: "a"};

        const result = validateMockWidget(input);

        expect(result).toBeNull();
    });
});
