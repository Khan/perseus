import {
    anyFailure,
    ctx,
    parseFailureWith,
} from "../general-purpose-parsers/test-helpers";
import {assertFailure, success} from "../result";

import {parseUserInputMap} from "./user-input-map";

describe("parseUserInputMap", () => {
    describe("basic structure validation", () => {
        it("accepts an empty user input map", () => {
            const result = parseUserInputMap({}, ctx());
            expect(result).toEqual(success({}));
        });

        it("rejects a non-object", () => {
            const result = parseUserInputMap("not an object", ctx());
            expect(result).toEqual(anyFailure);
        });

        it("rejects null", () => {
            const result = parseUserInputMap(null, ctx());
            expect(result).toEqual(anyFailure);
        });

        it("rejects an array", () => {
            const result = parseUserInputMap([], ctx());
            expect(result).toEqual(anyFailure);
        });

        it("provides appropriate error message for non-object", () => {
            const result = parseUserInputMap("not an object", ctx());
            expect(result).toEqual(
                parseFailureWith({
                    expected: ["UserInputMap"],
                    badValue: "not an object",
                }),
            );
        });
    });

    describe("invalid widget ID keys", () => {
        it("rejects empty string as widget ID", () => {
            const userInputMap = {
                "": {value: 1},
            };
            const result = parseUserInputMap(userInputMap, ctx());
            expect(result).toEqual(anyFailure);
        });

        it("rejects widget ID with negative number", () => {
            const userInputMap = {
                "radio -1": {choicesSelected: [false]},
            };
            const result = parseUserInputMap(userInputMap, ctx());
            expect(result).toEqual(anyFailure);
        });

        it("rejects widget ID with non-integer number", () => {
            const userInputMap = {
                "radio 1.5": {choicesSelected: [false]},
            };
            const result = parseUserInputMap(userInputMap, ctx());
            expect(result).toEqual(anyFailure);
        });

        it("rejects widget ID with too many components", () => {
            const userInputMap = {
                "radio 1 extra": {choicesSelected: [false]},
            };
            const result = parseUserInputMap(userInputMap, ctx());
            expect(result).toEqual(anyFailure);
        });

        it("rejects widget ID with only one component", () => {
            const userInputMap = {
                radio: {choicesSelected: [false]},
            };
            const result = parseUserInputMap(userInputMap, ctx());
            expect(result).toEqual(anyFailure);
        });

        it("provides appropriate error message for invalid widget ID format", () => {
            const userInputMap = {
                "radio -1": {choicesSelected: [false]},
            };
            const result = parseUserInputMap(userInputMap, ctx());

            assertFailure(result);
            expect(result.detail[0].path).toEqual([
                "radio -1",
                "(widget ID)",
                1,
            ]);
            expect(result.detail[0].expected).toEqual([
                "a string representing a non-negative integer",
            ]);
        });
    });

    describe("valid user input for known widget types", () => {
        it("accepts valid dropdown user input", () => {
            const userInputMap = {
                "dropdown 1": {value: 0},
            };
            const result = parseUserInputMap(userInputMap, ctx());
            expect(result).toEqual(
                success({
                    "dropdown 1": {value: 0},
                }),
            );
        });

        it("accepts valid radio user input", () => {
            const userInputMap = {
                "radio 1": {choicesSelected: [true, false, false]},
            };
            const result = parseUserInputMap(userInputMap, ctx());
            expect(result).toEqual(
                success({
                    "radio 1": {choicesSelected: [true, false, false]},
                }),
            );
        });

        it("accepts valid numeric-input user input", () => {
            const userInputMap = {
                "numeric-input 1": {currentValue: "42"},
            };
            const result = parseUserInputMap(userInputMap, ctx());
            expect(result).toEqual(
                success({
                    "numeric-input 1": {currentValue: "42"},
                }),
            );
        });

        it("accepts valid free-response user input", () => {
            const userInputMap = {
                "free-response 1": {currentValue: "Sample answer"},
            };
            const result = parseUserInputMap(userInputMap, ctx());
            expect(result).toEqual(
                success({
                    "free-response 1": {currentValue: "Sample answer"},
                }),
            );
        });

        it("accepts valid categorizer user input", () => {
            const userInputMap = {
                "categorizer 1": {values: [0, 1, 2]},
            };
            const result = parseUserInputMap(userInputMap, ctx());
            expect(result).toEqual(
                success({
                    "categorizer 1": {values: [0, 1, 2]},
                }),
            );
        });

        it("accepts valid matrix user input", () => {
            const userInputMap = {
                "matrix 1": {
                    answers: [
                        [1, 2],
                        [3, 4],
                    ],
                },
            };
            const result = parseUserInputMap(userInputMap, ctx());
            expect(result).toEqual(
                success({
                    "matrix 1": {
                        answers: [
                            [1, 2],
                            [3, 4],
                        ],
                    },
                }),
            );
        });

        it("accepts valid table user input", () => {
            const userInputMap = {
                "table 1": [
                    ["cell1", "cell2"],
                    ["cell3", "cell4"],
                ],
            };
            const result = parseUserInputMap(userInputMap, ctx());
            expect(result).toEqual(
                success({
                    "table 1": [
                        ["cell1", "cell2"],
                        ["cell3", "cell4"],
                    ],
                }),
            );
        });

        it("accepts valid plotter user input", () => {
            const userInputMap = {
                "plotter 1": [1, 2, 3, 4],
            };
            const result = parseUserInputMap(userInputMap, ctx());
            expect(result).toEqual(
                success({
                    "plotter 1": [1, 2, 3, 4],
                }),
            );
        });

        it("accepts valid number-line user input", () => {
            const userInputMap = {
                "number-line 1": {
                    numLinePosition: 5,
                    rel: "eq",
                    numDivisions: 10,
                    divisionRange: [0, 10],
                },
            };
            const result = parseUserInputMap(userInputMap, ctx());
            expect(result).toEqual(
                success({
                    "number-line 1": {
                        numLinePosition: 5,
                        rel: "eq",
                        numDivisions: 10,
                        divisionRange: [0, 10],
                    },
                }),
            );
        });

        it("accepts multiple valid widgets in the same map", () => {
            const userInputMap = {
                "dropdown 1": {value: 0},
                "radio 2": {choicesSelected: [false, true]},
                "numeric-input 3": {currentValue: "123"},
            };
            const result = parseUserInputMap(userInputMap, ctx());
            expect(result).toEqual(
                success({
                    "dropdown 1": {value: 0},
                    "radio 2": {choicesSelected: [false, true]},
                    "numeric-input 3": {currentValue: "123"},
                }),
            );
        });
    });

    describe("invalid user input for known widget types", () => {
        it("rejects invalid dropdown user input", () => {
            const userInputMap = {
                "dropdown 1": {value: "not a number"},
            };
            const result = parseUserInputMap(userInputMap, ctx());
            expect(result).toEqual(anyFailure);
        });

        it("rejects invalid radio user input", () => {
            const userInputMap = {
                "radio 1": {choicesSelected: "not an array"},
            };
            const result = parseUserInputMap(userInputMap, ctx());
            expect(result).toEqual(anyFailure);
        });

        it("rejects invalid numeric-input user input", () => {
            const userInputMap = {
                "numeric-input 1": {currentValue: 123}, // should be string
            };
            const result = parseUserInputMap(userInputMap, ctx());
            expect(result).toEqual(anyFailure);
        });

        it("rejects missing required fields in known widget types", () => {
            const userInputMap = {
                "dropdown 1": {}, // missing required 'value' field
            };
            const result = parseUserInputMap(userInputMap, ctx());
            expect(result).toEqual(anyFailure);
        });

        it("provides appropriate error message for invalid widget user input", () => {
            const userInputMap = {
                "dropdown 1": {value: "not a number"},
            };
            const result = parseUserInputMap(userInputMap, ctx());

            assertFailure(result);
            expect(result.detail[0].path).toEqual(["dropdown 1", "value"]);
            expect(result.detail[0].expected).toEqual(["number"]);
            expect(result.detail[0].badValue).toBe("not a number");
        });

        it("rejects invalid categorizer user input structure", () => {
            const userInputMap = {
                "categorizer 1": {values: ["string", "not", "numbers"]},
            };
            const result = parseUserInputMap(userInputMap, ctx());
            expect(result).toEqual(anyFailure);
        });

        it("stops at first invalid widget and provides appropriate error", () => {
            const userInputMap = {
                "dropdown 1": {value: "invalid"},
                "radio 2": {choicesSelected: [true]}, // this one is valid
            };
            const result = parseUserInputMap(userInputMap, ctx());

            assertFailure(result);
            // Should fail on the first invalid widget (dropdown 1)
            expect(result.detail[0].path).toEqual(["dropdown 1", "value"]);
        });
    });

    describe("unrecognized widget types", () => {
        it("accepts user input for unrecognized widget types", () => {
            const userInputMap = {
                "unknown-widget 1": {anyField: "anyValue", someNumber: 42},
            };
            const result = parseUserInputMap(userInputMap, ctx());
            expect(result).toEqual(
                success({
                    "unknown-widget 1": {anyField: "anyValue", someNumber: 42},
                }),
            );
        });

        it("passes through any data structure for unrecognized widgets", () => {
            const userInputMap = {
                "mystery-widget 1": {
                    complex: {
                        nested: {
                            structure: [1, 2, 3],
                            withBooleans: true,
                        },
                    },
                    nullValue: null,
                    arrayOfObjects: [{a: 1}, {b: 2}],
                },
            };
            const result = parseUserInputMap(userInputMap, ctx());
            expect(result).toEqual(
                success({
                    "mystery-widget 1": {
                        complex: {
                            nested: {
                                structure: [1, 2, 3],
                                withBooleans: true,
                            },
                        },
                        nullValue: null,
                        arrayOfObjects: [{a: 1}, {b: 2}],
                    },
                }),
            );
        });

        it("accepts primitive values for unrecognized widget types", () => {
            const userInputMap = {
                "unknown-widget 1": "just a string",
                "another-unknown 2": 42,
                "third-unknown 3": true,
            };
            const result = parseUserInputMap(userInputMap, ctx());
            expect(result).toEqual(
                success({
                    "unknown-widget 1": "just a string",
                    "another-unknown 2": 42,
                    "third-unknown 3": true,
                }),
            );
        });

        it("mixes known and unknown widget types correctly", () => {
            const userInputMap = {
                "dropdown 1": {value: 2},
                "unknown-widget 1": {customField: "custom value"},
                "radio 2": {choicesSelected: [false, true]},
                "another-mystery 3": [1, 2, 3],
            };
            const result = parseUserInputMap(userInputMap, ctx());
            expect(result).toEqual(
                success({
                    "dropdown 1": {value: 2},
                    "unknown-widget 1": {customField: "custom value"},
                    "radio 2": {choicesSelected: [false, true]},
                    "another-mystery 3": [1, 2, 3],
                }),
            );
        });

        it("validates widget ID format even for unknown widget types", () => {
            const userInputMap = {
                "unknown-widget -1": {someField: "value"},
            };
            const result = parseUserInputMap(userInputMap, ctx());
            expect(result).toEqual(anyFailure);
        });
    });

    describe("recursive group widget handling", () => {
        it("accepts nested group widgets", () => {
            const userInputMap = {
                "group 1": {
                    "dropdown 1": {value: 0},
                    "group 2": {
                        "radio 1": {choicesSelected: [true, false]},
                    },
                },
            };
            const result = parseUserInputMap(userInputMap, ctx());
            expect(result).toEqual(
                success({
                    "group 1": {
                        "dropdown 1": {value: 0},
                        "group 2": {
                            "radio 1": {choicesSelected: [true, false]},
                        },
                    },
                }),
            );
        });

        it("validates nested widgets in group widgets", () => {
            const userInputMap = {
                "group 1": {
                    "dropdown 1": {value: "invalid"}, // should be number
                },
            };
            const result = parseUserInputMap(userInputMap, ctx());
            expect(result).toEqual(anyFailure);
        });

        it("provides correct error path for nested validation failures", () => {
            const userInputMap = {
                "group 1": {
                    "dropdown 1": {value: "invalid"},
                },
            };
            const result = parseUserInputMap(userInputMap, ctx());

            assertFailure(result);
            expect(result.detail[0].path).toEqual([
                "group 1",
                "dropdown 1",
                "value",
            ]);
            expect(result.detail[0].expected).toEqual(["number"]);
        });
    });
});
