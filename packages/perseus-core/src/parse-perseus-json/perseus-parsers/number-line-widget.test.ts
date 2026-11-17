import {anyFailure} from "../general-purpose-parsers/parser.testutils";
import {parse} from "../parse";
import {success} from "../result";

import {parseNumberLineWidget} from "./number-line-widget";

function numberLineWithRange(range: unknown) {
    return {
        type: "number-line",
        version: {major: 0, minor: 0},
        options: {
            range,
            labelRange: [null, null],
            labelStyle: "decimal",
            labelTicks: true,
            isTickCtrl: false,
            isInequality: false,
            divisionRange: [1, 10],
            snapDivisions: 2,
            correctX: null,
        },
    };
}

describe("parseNumberLineWidget", () => {
    it("accepts a range of two numbers", () => {
        // Arrange
        const widget = numberLineWithRange([0, 10]);

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
        const widget = numberLineWithRange(range);

        // Act
        const result = parse(widget, parseNumberLineWidget);

        // Assert
        expect(result).toEqual(anyFailure);
    });
});
