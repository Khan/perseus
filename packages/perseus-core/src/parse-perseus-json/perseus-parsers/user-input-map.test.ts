import {
    anyFailure,
    ctx,
    parseFailureWith,
} from "../general-purpose-parsers/test-helpers";
import {success} from "../result";

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
        it("rejects an invalid widget ID", () => {
            const userInputMap = {
                "radio -1": {choicesSelected: [false]},
            };
            const result = parseUserInputMap(userInputMap, ctx());
            expect(result).toEqual(
                parseFailureWith({
                    path: ["radio -1", "(widget ID)", 1],
                    expected: ["a string representing a non-negative integer"],
                }),
            );
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

            expect(result).toEqual(
                parseFailureWith({
                    path: ["dropdown 1", "value"],
                    expected: ["number"],
                    badValue: "not a number",
                }),
            );
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

            expect(result).toEqual(
                parseFailureWith({
                    path: ["dropdown 1", "value"],
                }),
            );
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

            expect(result).toEqual(
                parseFailureWith({
                    path: ["group 1", "dropdown 1", "value"],
                    expected: ["number"],
                }),
            );
        });
    });
});
