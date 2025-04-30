import {anySuccess} from "../general-purpose-parsers/test-helpers";
import {parse} from "../parse";
import {failure, success} from "../result";

import {parseRadioWidget} from "./radio-widget";
import {
    migrateV0ToV1,
    migrateV1ToV2,
    migrateV2toV3,
    parseRadioWidget,
} from "./radio-widget";

const previousVersion = {major: 2, minor: 0};
const latestVersion = {major: 3, minor: 0};

describe("parseRadioWidget", () => {
    it("migrates v1 options to v2", () => {
        const widget = {
            type: "radio",
            graded: true,
            version: previousVersion,
            options: {
                choices: [
                    {
                        content: "Correct 1",
                        correct: true,
                    },
                    {
                        content: "Correct 2",
                        correct: true,
                    },
                    {
                        content: "Incorrect",
                        correct: false,
                    },
                ],
                hasNoneOfTheAbove: false,
                countChoices: false,
                randomize: false,
                multipleSelect: false,
                deselectEnabled: false,
                onePerLine: false,
                displayCount: false,
                noneOfTheAbove: undefined,
            },
            version: {
                major: 1,
                minor: 0,
            },
        };

        expect(parse(widget, parseRadioWidget)).toEqual(
            success({
                type: "radio",
                version: latestVersion,
                graded: true,
                options: {
                    choices: [],
                    countChoices: false,
                    deselectEnabled: false,
                    hasNoneOfTheAbove: false,
                    multipleSelect: false,
                    numCorrect: 0,
                    randomize: false,
                },
            }),
        );
    });

    it("rejects a widget with unrecognized version", () => {
        const widget = {
            type: "radio",
            version: {
                major: -1,
                minor: 0,
            },
            graded: true,
            options: {},
        };

        expect(parse(widget, parseRadioWidget)).toEqual(
            failure(
                expect.stringContaining(
                    "At (root) -- expected widget options with a known version number",
                ),
            ),
        );
    });

    it("allows a null key", () => {
        const widget = {
            type: "radio",
            key: null,
            graded: true,
            version: {
                major: 2,
                minor: 0,
            },
            options: {
                choices: [],
            },
        };

        expect(parse(widget, parseRadioWidget)).toEqual(success(widget));
    });

    it("accepts `null` for a choice's widgets map in version 0", () => {
        const widget = {
            type: "radio",
            version: {major: 0, minor: 0},
            options: {
                choices: [
                    {
                        widgets: null,
                    },
                ],
            },
        };

        expect(parse(widget, parseRadioWidget)).toEqual(anySuccess);
    });

    it("accepts `null` for a choice's widgets map in version 1", () => {
        const widget = {
            type: "radio",
            version: {major: 1, minor: 0},
            options: {
                choices: [
                    {
                        widgets: null,
                    },
                ],
            },
        };

        expect(parse(widget, parseRadioWidget)).toEqual(anySuccess);
    });

    it("accepts `null` for a choice's widgets map in version 2", () => {
        const widget = {
            type: "radio",
            version: {major: 2, minor: 0},
            options: {
                choices: [
                    {
                        widgets: null,
                    },
                ],
            },
        };

        expect(parse(widget, parseRadioWidget)).toEqual(anySuccess);
    });
});

describe("migration functions", () => {
    it("migrates v0 to v1", () => {
        const v0Widget = {
            type: "radio" as const,
            version: {major: 0, minor: 0},
            options: {
                choices: [{content: ""}, {content: ""}, {content: ""}],
                hasNoneOfTheAbove: false,
                noneOfTheAbove: undefined,
            },
        };

        expect(migrateV0ToV1(v0Widget)).toEqual({
            options: {
                choices: [{content: ""}, {content: ""}, {content: ""}],
                hasNoneOfTheAbove: false,
                noneOfTheAbove: undefined,
            },
            type: "radio",
            version: {major: 1, minor: 0},
        });
    });

    it("migrates v1 to v2", () => {
        const v1Widget = {
            type: "radio" as const,
            graded: true,
            options: {
                choices: [
                    {
                        content: "Correct 1",
                        correct: true,
                    },
                    {
                        content: "Correct 2",
                        correct: true,
                    },
                    {
                        content: "Incorrect",
                        correct: false,
                    },
                ],
            },
            version: {
                major: 1,
                minor: 0,
            },
        };

        expect(migrateV1ToV2(v1Widget)).toEqual({
            graded: true,
            options: {
                choices: [
                    {
                        content: "Correct 1",
                        correct: true,
                    },
                    {
                        content: "Correct 2",
                        correct: true,
                    },
                    {
                        content: "Incorrect",
                        correct: false,
                    },
                ],
                numCorrect: 2,
            },
            type: "radio",
            version: {
                major: 2,
                minor: 0,
            },
        });
    });

    it("migrates v2 to v3", () => {
        const v2Widget = {
            type: "radio" as const,
            version: {major: 2, minor: 0},
            graded: true,
            options: {
                numCorrect: 1,
                choices: [
                    {
                        content: "Content 1",
                        clue: "no clue",
                        correct: true,
                        isNoneOfTheAbove: false,
                    },
                ],
                hasNoneOfTheAbove: false,
                countChoices: false,
                randomize: false,
                multipleSelect: false,
                deselectEnabled: false,
                onePerLine: false,
                displayCount: false,
                noneOfTheAbove: undefined,
            },
        };

        expect(migrateV2toV3(v2Widget)).toEqual({
            graded: true,
            options: {
                choices: [
                    {
                        content: "Content 1",
                        correct: true,
                        clue: "no clue",
                        isNoneOfTheAbove: false,
                    },
                ],
                countChoices: false,
                deselectEnabled: false,
                hasNoneOfTheAbove: false,
                multipleSelect: false,
                numCorrect: 1,
                randomize: false,
            },
            type: "radio",
            version: {major: 3, minor: 0},
        });
    });
});
