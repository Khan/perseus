import {
    generateFreeResponseOptions,
    generateFreeResponseWidget,
} from "../../utils/generators/free-response-widget-generator";
import {parse} from "../parse";
import {failure, success} from "../result";

import {parseFreeResponseWidget} from "./free-response-widget";

describe("freeResponseWidget", () => {
    it("accepts a free-response widget with valid data", () => {
        const widget = generateFreeResponseWidget({
            graded: false,
            options: generateFreeResponseOptions({
                question: "What is your favorite color?",
                scoringCriteria: [
                    {
                        text: "test-criterion",
                    },
                ],
            }),
        });

        expect(parse(widget, parseFreeResponseWidget)).toEqual(
            success({
                type: "free-response",
                version: {
                    major: 0,
                    minor: 0,
                },
                graded: false,
                static: false,
                alignment: "default",
                options: {
                    allowUnlimitedCharacters: false,
                    characterLimit: 500,
                    placeholder: "test-placeholder",
                    question: "What is your favorite color?",
                    scoringCriteria: [
                        {
                            text: "test-criterion",
                        },
                    ],
                },
            }),
        );
    });

    it("rejects a free-response widget with no question", () => {
        const widget = generateFreeResponseWidget({
            graded: false,
            options: generateFreeResponseOptions({
                question: undefined,
            }),
        });

        expect(parse(widget, parseFreeResponseWidget)).toEqual(
            failure(
                expect.stringContaining(
                    "At (root).options.question -- expected string, but got undefined",
                ),
            ),
        );
    });
});
