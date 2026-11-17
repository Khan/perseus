import {anyFailure} from "../general-purpose-parsers/parser.testutils";
import {parse} from "../parse";
import {success} from "../result";

import {parseNumberLineWidget} from "./number-line-widget";

function numberLine(options: Record<string, unknown>) {
    return {
        type: "number-line",
        version: {major: 0, minor: 0},
        options: {
            range: [0, 10],
            labelRange: [null, null],
            labelStyle: "decimal",
            labelTicks: true,
            isTickCtrl: false,
            isInequality: false,
            divisionRange: [1, 10],
            snapDivisions: 2,
            correctX: null,
            ...options,
        },
    };
}

describe("parseNumberLineWidget", () => {
    it("accepts a range of two numbers", () => {
        // Arrange
        const widget = numberLine({range: [0, 10]});

        // Act
        const result = parse(widget, parseNumberLineWidget);

        // Assert
        expect(result).toEqual(success(widget));
    });

    it.each([
        ["an empty range", []],
        ["a one-element range", [0]],
        ["a three-element range", [0, 5, 10]],
        ["a non-numeric range max", [0, "a"]],
        ["a non-numeric range min", ["a", 0]],
    ])("rejects %s", (_, range) => {
        // Arrange
        const widget = numberLine({range});

        // Act
        const result = parse(widget, parseNumberLineWidget);

        // Assert
        expect(result).toEqual(anyFailure);
    });

    it.each([
        ["two numbers", [-5, 5]],
        ["two nulls", [null, null]],
        ["a number and a null", [3, null]],
    ])("accepts a labelRange of %s", (_, labelRange) => {
        // Arrange
        const widget = numberLine({labelRange});

        // Act
        const result = parse(widget, parseNumberLineWidget);

        // Assert
        expect(result).toEqual(success(widget));
    });

    it("converts empty-string labels to null", () => {
        // Arrange
        const widget = numberLine({labelRange: ["", 4]});

        // Act
        const result = parse(widget, parseNumberLineWidget);

        // Assert
        expect(result).toEqual(
            success(
                expect.objectContaining({
                    options: expect.objectContaining({labelRange: [null, 4]}),
                }),
            ),
        );
    });

    it("accepts a divisionRange of two numbers", () => {
        // Arrange
        const widget = numberLine({divisionRange: [2, 8]});

        // Act
        const result = parse(widget, parseNumberLineWidget);

        // Assert
        expect(result).toEqual(success(widget));
    });

    it.each([
        ["an empty labelRange", []],
        ["a one-element labelRange", [null]],
        ["a three-element labelRange", [1, 2, 3]],
    ])("rejects %s", (_, labelRange) => {
        // Arrange
        const widget = numberLine({labelRange});

        // Act
        const result = parse(widget, parseNumberLineWidget);

        // Assert
        expect(result).toEqual(anyFailure);
    });

    it.each([
        ["an empty divisionRange", []],
        ["a one-element divisionRange", [1]],
        ["a three-element divisionRange", [1, 5, 10]],
        ["a divisionRange containing null", [1, null]],
    ])("rejects %s", (_, divisionRange) => {
        // Arrange
        const widget = numberLine({divisionRange});

        // Act
        const result = parse(widget, parseNumberLineWidget);

        // Assert
        expect(result).toEqual(anyFailure);
    });
});
