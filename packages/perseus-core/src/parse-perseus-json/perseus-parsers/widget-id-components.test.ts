import {
    anyFailure,
    ctx,
    parseFailureWith,
} from "../general-purpose-parsers/test-helpers";
import {success} from "../result";

import {parseWidgetIdComponents} from "./widget-id-components";

describe("parseWidgetIdComponents", () => {
    describe("valid widget ID components", () => {
        it("accepts valid widget ID components for all widget types", () => {
            expect(parseWidgetIdComponents(["dropdown", "1"], ctx())).toEqual(
                success(["dropdown", 1]),
            );
            expect(parseWidgetIdComponents(["radio", "1"], ctx())).toEqual(
                success(["radio", 1]),
            );
            expect(
                parseWidgetIdComponents(["numeric-input", "1"], ctx()),
            ).toEqual(success(["numeric-input", 1]));
            expect(
                parseWidgetIdComponents(["free-response", "1"], ctx()),
            ).toEqual(success(["free-response", 1]));
            expect(
                parseWidgetIdComponents(["categorizer", "1"], ctx()),
            ).toEqual(success(["categorizer", 1]));
            expect(parseWidgetIdComponents(["matrix", "1"], ctx())).toEqual(
                success(["matrix", 1]),
            );
            expect(parseWidgetIdComponents(["table", "1"], ctx())).toEqual(
                success(["table", 1]),
            );
            expect(parseWidgetIdComponents(["plotter", "1"], ctx())).toEqual(
                success(["plotter", 1]),
            );
            expect(
                parseWidgetIdComponents(["number-line", "1"], ctx()),
            ).toEqual(success(["number-line", 1]));
            expect(parseWidgetIdComponents(["expression", "1"], ctx())).toEqual(
                success(["expression", 1]),
            );
            expect(parseWidgetIdComponents(["group", "1"], ctx())).toEqual(
                success(["group", 1]),
            );
            expect(parseWidgetIdComponents(["image", "1"], ctx())).toEqual(
                success(["image", 1]),
            );
            expect(
                parseWidgetIdComponents(["input-number", "1"], ctx()),
            ).toEqual(success(["input-number", 1]));
            expect(
                parseWidgetIdComponents(["interactive-graph", "1"], ctx()),
            ).toEqual(success(["interactive-graph", 1]));
            expect(parseWidgetIdComponents(["grapher", "1"], ctx())).toEqual(
                success(["grapher", 1]),
            );
            expect(parseWidgetIdComponents(["orderer", "1"], ctx())).toEqual(
                success(["orderer", 1]),
            );
            expect(parseWidgetIdComponents(["definition", "1"], ctx())).toEqual(
                success(["definition", 1]),
            );
            expect(
                parseWidgetIdComponents(["label-image", "1"], ctx()),
            ).toEqual(success(["label-image", 1]));
            expect(parseWidgetIdComponents(["cs-program", "1"], ctx())).toEqual(
                success(["cs-program", 1]),
            );
            expect(
                parseWidgetIdComponents(["graded-group", "1"], ctx()),
            ).toEqual(success(["graded-group", 1]));
            expect(
                parseWidgetIdComponents(["graded-group-set", "1"], ctx()),
            ).toEqual(success(["graded-group-set", 1]));
            expect(
                parseWidgetIdComponents(["interaction", "1"], ctx()),
            ).toEqual(success(["interaction", 1]));
        });

        it("accepts zero as widget number", () => {
            expect(parseWidgetIdComponents(["dropdown", "0"], ctx())).toEqual(
                success(["dropdown", 0]),
            );
        });

        it("accepts large widget numbers", () => {
            expect(parseWidgetIdComponents(["radio", "999"], ctx())).toEqual(
                success(["radio", 999]),
            );
        });
    });

    describe("invalid widget ID components", () => {
        it("rejects components with negative number", () => {
            const result = parseWidgetIdComponents(["radio", "-1"], ctx());
            expect(result).toEqual(anyFailure);
        });

        it("rejects components with non-integer number", () => {
            const result = parseWidgetIdComponents(["radio", "1.5"], ctx());
            expect(result).toEqual(anyFailure);
        });

        it("rejects components with non-numeric strings", () => {
            const result = parseWidgetIdComponents(["radio", "abc"], ctx());
            expect(result).toEqual(anyFailure);
        });

        it("rejects empty string as number", () => {
            const result = parseWidgetIdComponents(["radio", ""], ctx());
            expect(result).toEqual(anyFailure);
        });

        it("rejects components with non-string widget type", () => {
            const result = parseWidgetIdComponents([123 as any, "1"], ctx());
            expect(result).toEqual(anyFailure);
        });

        it("rejects components with non-string number", () => {
            const result = parseWidgetIdComponents(["radio", 1 as any], ctx());
            expect(result).toEqual(anyFailure);
        });

        it("provides appropriate error message for invalid number component", () => {
            const result = parseWidgetIdComponents(["radio", "-1"], ctx());

            expect(result).toEqual(
                parseFailureWith({
                    path: [1],
                    expected: ["a string representing a non-negative integer"],
                    badValue: "-1",
                }),
            );
        });

        it("provides appropriate error message for invalid widget type", () => {
            const result = parseWidgetIdComponents([123 as any, "1"], ctx());

            expect(result).toEqual(
                parseFailureWith({
                    path: [0],
                    expected: ["string"],
                    badValue: 123,
                }),
            );
        });
    });
});
