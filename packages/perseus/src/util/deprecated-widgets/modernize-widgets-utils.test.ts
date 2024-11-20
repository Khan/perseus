import {convertDeprecatedWidgets} from "./modernize-widgets-utils";
import {
    inputNumberMultiNested,
    inputNumberNested,
    inputNumberNestedWithNumeric,
    inputNumberSimple,
    numericInputMultiNested,
    numericInputNested,
    numericInputNestedWithNumeric,
    numericInputSimple,
} from "./modernize-widgets-utils.testdata";

describe("convertDeprecatedWidgets", () => {
    it("should be able to convert a simple input number widget into numeric input", () => {
        // Arrange
        const input = inputNumberSimple;
        const expected = numericInputSimple;

        // Act
        const result = convertDeprecatedWidgets(input);

        // Assert
        expect(result.content).toEqual(expected.content);
        expect(result.widgets).toEqual(expected.widgets);
    });

    it("should be able to convert a nested input number widget", () => {
        // This test has the inputNumber widget nested within a gradedGroup widget

        // Arrange
        const input = inputNumberNested;
        const expected = numericInputNested;

        // Act
        const result = convertDeprecatedWidgets(input);

        // Assert
        expect(result).toEqual(expected);
    });

    it("should be scope the widget ids of nested widgets", () => {
        // This test has 2 pre-existing numericInput widgets, with one of them being nested
        // within a graded group. As a result, the inputNumber widget should become "numeric-input 3".

        // Arrange
        const input = inputNumberNestedWithNumeric;
        const expected = numericInputNestedWithNumeric;

        // Act
        const result = convertDeprecatedWidgets(input);

        // Assert
        expect(result).toEqual(expected);
    });

    it("should be able to correctly generate ids for both top-level and nested widgets", () => {
        // This test has 2 pre-existing numericInput widgets, with one of them being nested
        // within a graded group. As a result, the inputNumber widget should become "numeric-input 3".

        // Arrange
        const input = inputNumberMultiNested;
        const expected = numericInputMultiNested;

        // Act
        const result = convertDeprecatedWidgets(input);

        // Assert
        expect(result).toEqual(expected);
    });
});
