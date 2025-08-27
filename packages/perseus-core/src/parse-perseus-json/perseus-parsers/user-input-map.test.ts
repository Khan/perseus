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
                "radio -1": {selectedChoiceIds: []},
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
                "radio 1": {selectedChoiceIds: "not an array"},
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

        it("rejects invalid free-response user input", () => {
            const userInputMap = {
                "free-response 1": {currentValue: 123}, // should be string
            };
            const result = parseUserInputMap(userInputMap, ctx());
            expect(result).toEqual(anyFailure);
        });

        it("rejects invalid categorizer user input structure", () => {
            const userInputMap = {
                "categorizer 1": {values: ["string", "not", "numbers"]},
            };
            const result = parseUserInputMap(userInputMap, ctx());
            expect(result).toEqual(anyFailure);
        });

        it("rejects invalid matrix user input", () => {
            const userInputMap = {
                "matrix 1": {answers: "not an array"},
            };
            const result = parseUserInputMap(userInputMap, ctx());
            expect(result).toEqual(anyFailure);
        });

        it("rejects invalid table user input", () => {
            const userInputMap = {
                "table 1": "not an array",
            };
            const result = parseUserInputMap(userInputMap, ctx());
            expect(result).toEqual(anyFailure);
        });

        it("rejects invalid plotter user input", () => {
            const userInputMap = {
                "plotter 1": ["not", "numbers"],
            };
            const result = parseUserInputMap(userInputMap, ctx());
            expect(result).toEqual(anyFailure);
        });

        it("rejects invalid number-line user input", () => {
            const userInputMap = {
                "number-line 1": {numLinePosition: "not a number"},
            };
            const result = parseUserInputMap(userInputMap, ctx());
            expect(result).toEqual(anyFailure);
        });

        it("rejects invalid expression user input", () => {
            const userInputMap = {
                "expression 1": 123, // should be string
            };
            const result = parseUserInputMap(userInputMap, ctx());
            expect(result).toEqual(anyFailure);
        });

        it("rejects invalid input-number user input", () => {
            const userInputMap = {
                "input-number 1": {currentValue: 123}, // should be string
            };
            const result = parseUserInputMap(userInputMap, ctx());
            expect(result).toEqual(anyFailure);
        });

        it("rejects invalid interactive-graph user input", () => {
            const userInputMap = {
                "interactive-graph 1": "not a valid graph object",
            };
            const result = parseUserInputMap(userInputMap, ctx());
            expect(result).toEqual(anyFailure);
        });

        it("rejects invalid grapher user input", () => {
            const userInputMap = {
                "grapher 1": "not a valid grapher object",
            };
            const result = parseUserInputMap(userInputMap, ctx());
            expect(result).toEqual(anyFailure);
        });

        it("rejects invalid orderer user input", () => {
            const userInputMap = {
                "orderer 1": {current: "not an array"},
            };
            const result = parseUserInputMap(userInputMap, ctx());
            expect(result).toEqual(anyFailure);
        });

        it("rejects invalid matcher user input", () => {
            const userInputMap = {
                "matcher 1": {left: "not an array"},
            };
            const result = parseUserInputMap(userInputMap, ctx());
            expect(result).toEqual(anyFailure);
        });

        it("rejects invalid sorter user input", () => {
            const userInputMap = {
                "sorter 1": {options: "not an array"},
            };
            const result = parseUserInputMap(userInputMap, ctx());
            expect(result).toEqual(anyFailure);
        });

        it("rejects invalid label-image user input", () => {
            const userInputMap = {
                "label-image 1": {markers: "not an array"},
            };
            const result = parseUserInputMap(userInputMap, ctx());
            expect(result).toEqual(anyFailure);
        });

        it("rejects invalid cs-program user input", () => {
            const userInputMap = {
                "cs-program 1": {code: 123}, // should be "correct", "incorrect", or "incomplete"
            };
            const result = parseUserInputMap(userInputMap, ctx());
            expect(result).toEqual(anyFailure);
        });

        it("rejects invalid iframe user input", () => {
            const userInputMap = {
                "iframe 1": {status: 123}, // should be "correct", "incorrect", or "incomplete"
            };
            const result = parseUserInputMap(userInputMap, ctx());
            expect(result).toEqual(anyFailure);
        });

        it("stops at first invalid widget and provides appropriate error", () => {
            const userInputMap = {
                "dropdown 1": {value: "invalid"},
                "radio 2": {selectedChoiceIds: ["0-0-0-0-0"]}, // this one is valid
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
                        "radio 1": {selectedChoiceIds: ["0-0-0-0-0"]},
                    },
                },
            };
            const result = parseUserInputMap(userInputMap, ctx());
            expect(result).toEqual(
                success({
                    "group 1": {
                        "dropdown 1": {value: 0},
                        "group 2": {
                            "radio 1": {selectedChoiceIds: ["0-0-0-0-0"]},
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
