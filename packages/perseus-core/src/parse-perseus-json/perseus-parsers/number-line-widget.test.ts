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
        ["empty", []],
        ["one-element", [0]],
        ["three-element", [0, 5, 10]],
        ["non-numeric", [0, "a"]],
    ])("rejects an %s range", (_, range) => {
        // Arrange
        const widget = numberLineWithRange(range);

        // Act
        const result = parse(widget, parseNumberLineWidget);

        // Assert
        expect(result).toEqual(anyFailure);
    });
});
