import {parse} from "../parse";
import {failure, success} from "../result";

import {parseRadioWidget} from "./radio-widget";

describe("parseRadioWidget", () => {
    it("migrates v1 options to v2", () => {
        const widget = {
            type: "radio",
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

        expect(parse(widget, parseRadioWidget)).toEqual(
            success({
                type: "radio",
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
                version: {
                    major: 2,
                    minor: 0,
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
});
