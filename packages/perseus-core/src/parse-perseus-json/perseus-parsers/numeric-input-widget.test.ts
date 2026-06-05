import {anyFailure} from "../general-purpose-parsers/test-helpers";
import {parse} from "../parse";
import {assertSuccess, success} from "../result";

import {parseNumericInputWidget, parseSimplify} from "./numeric-input-widget";

function numericInputWidget(
    options: Record<string, unknown>,
    version: {major: number; minor: number},
) {
    return {
        type: "numeric-input",
        options: {
            answers: [{status: "correct", simplify: "required"}],
            size: "normal",
            coefficient: false,
            ...options,
        },
        version,
    };
}

describe("parseSimplify", () => {
    it(`preserves "required"`, () => {
        expect(parse("required", parseSimplify)).toEqual(success("required"));
    });

    it(`preserves "enforced"`, () => {
        expect(parse("enforced", parseSimplify)).toEqual(success("enforced"));
    });

    it(`preserves "optional"`, () => {
        expect(parse("optional", parseSimplify)).toEqual(success("optional"));
    });

    it(`converts null to "required"`, () => {
        expect(parse(null, parseSimplify)).toEqual(success("required"));
    });

    it(`converts undefined to "required"`, () => {
        expect(parse(undefined, parseSimplify)).toEqual(success("required"));
    });

    it(`converts true to "required"`, () => {
        expect(parse(true, parseSimplify)).toEqual(success("required"));
    });

    it(`converts false to "required"`, () => {
        expect(parse(false, parseSimplify)).toEqual(success("required"));
    });

    it(`converts "accepted" to "required"`, () => {
        expect(parse("accepted", parseSimplify)).toEqual(success("required"));
    });

    it(`converts "correct" to "required"`, () => {
        expect(parse("correct", parseSimplify)).toEqual(success("required"));
    });

    it(`rejects an arbitrary string`, () => {
        expect(parse("foobar", parseSimplify)).toEqual(anyFailure);
    });
});

describe("textAlign", () => {
    it("migrates from v0 to v1 when rightAlign is undefined", () => {
        // Arrange
        const widget = numericInputWidget({}, {major: 0, minor: 0});

        // Act
        const result = parse(widget, parseNumericInputWidget);

        // Assert
        assertSuccess(result);
        expect(result.value.version).toEqual({major: 1, minor: 0});
        expect(result.value.options.textAlign).toBe("start");
    });

    it("migrates from v0 to v1 when textAlign is true", () => {
        // Arrange
        const widget = numericInputWidget(
            {rightAlign: true},
            {major: 0, minor: 0},
        );

        // Act
        const result = parse(widget, parseNumericInputWidget);

        // Assert
        assertSuccess(result);
        expect(result.value.version).toEqual({major: 1, minor: 0});
        expect(result.value.options.textAlign).toBe("end");
    });

    it("migrates from v0 to v1 when rightAlign is false", () => {
        // Arrange
        const widget = numericInputWidget(
            {rightAlign: false},
            {major: 0, minor: 0},
        );

        // Act
        const result = parse(widget, parseNumericInputWidget);

        // Assert
        assertSuccess(result);
        expect(result.value.version).toEqual({major: 1, minor: 0});
        expect(result.value.options.textAlign).toBe("start");
    });

    it("handles v1 undefined textAlign", () => {
        // Arrange
        const widget = numericInputWidget({}, {major: 1, minor: 0});

        // Act
        const result = parse(widget, parseNumericInputWidget);

        // Assert
        assertSuccess(result);
        expect(result.value.version).toEqual({major: 1, minor: 0});
        expect(result.value.options.textAlign).toBe("start");
    });

    it("handles v1 start textAlign", () => {
        // Arrange
        const widget = numericInputWidget(
            {textAlign: "start"},
            {major: 1, minor: 0},
        );

        // Act
        const result = parse(widget, parseNumericInputWidget);

        // Assert
        assertSuccess(result);
        expect(result.value.options.textAlign).toBe("start");
    });

    it("handles v1 end textAlign", () => {
        // Arrange
        const widget = numericInputWidget(
            {textAlign: "end"},
            {major: 1, minor: 0},
        );

        // Act
        const result = parse(widget, parseNumericInputWidget);

        // Assert
        assertSuccess(result);
        expect(result.value.options.textAlign).toBe("end");
    });

    it("handles v1 center textAlign", () => {
        // Arrange
        const widget = numericInputWidget(
            {textAlign: "center"},
            {major: 1, minor: 0},
        );

        // Act
        const result = parse(widget, parseNumericInputWidget);

        // Assert
        assertSuccess(result);
        expect(result.value.options.textAlign).toBe("center");
    });
});
