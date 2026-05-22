import {describe, expect, test} from "@jest/globals";

import type {PerseusRenderer, UserInputMap} from "@khanacademy/perseus-core";

import {
    scorePerseusItem,
    scorePerseusItemWithInputNumberAsNumericInput,
} from "./index";

interface TestCase {
    title: string;
    userInput: UserInputMap;
    // V0-format widget data from production logs; cast at use site
    // FIXME: use V0 type from data schema.
    widgets: Record<string, unknown>;
}

// NOTE: To add a test case to this list:
// - Go to https://console.cloud.google.com/logs
// - Search for "side-by-side" in the Perseus service
// - select "Copy > Copy as JSON"
// - `pbpaste | jq '.jsonPayload.metadata | {userInput: .inputNumberUserInputs, widgets: .inputNumberWidgets}'`
// TODO(LEMS-4085): Delete this test file.
const cases: TestCase[] = [
    {
        title: "when inexact = false",
        userInput: {
            "input-number 1": {
                currentValue: "6.336",
            },
            "input-number 2": {
                currentValue: "6.308",
            },
        },
        widgets: {
            "input-number 1": {
                options: {
                    value: 6.338,
                    answerType: "number",
                    rightAlign: false,
                    maxError: 0.1,
                    size: "normal",
                    simplify: "required",
                    inexact: false,
                },
                graded: true,
                static: false,
                version: {
                    minor: 0,
                    major: 0,
                },
                type: "input-number",
                alignment: "default",
            },
            "input-number 2": {
                type: "input-number",
                version: {
                    major: 0,
                    minor: 0,
                },
                static: false,
                alignment: "default",
                options: {
                    rightAlign: false,
                    maxError: 0.1,
                    size: "normal",
                    inexact: false,
                    simplify: "required",
                    value: 6.34,
                    answerType: "number",
                },
                graded: true,
            },
        },
    },
    {
        title: "when inexact = false and the correct answer has more than 9 decimal places",
        userInput: {
            "input-number 1": {
                currentValue: "1.123456789",
            },
        },
        widgets: {
            "input-number 1": {
                type: "input-number",
                version: {
                    major: 0,
                    minor: 0,
                },
                static: false,
                alignment: "default",
                options: {
                    rightAlign: false,
                    maxError: 0.1,
                    size: "normal",
                    inexact: false,
                    simplify: "required",
                    // rounds to 1.123456789
                    value: 1.1234567885,
                    answerType: "number",
                },
                graded: true,
            },
        },
    },
    {
        title: "when the user inputs a long decimal",
        userInput: {
            "input-number 1": {
                currentValue: "0.7692307692307",
            },
        },
        widgets: {
            "input-number 1": {
                options: {
                    maxError: 0.031,
                    simplify: "optional",
                    answerType: "number",
                    inexact: false,
                    size: "normal",
                    value: 0.7692307692307693,
                },
                graded: true,
                type: "input-number",
            },
        },
    },
];

describe("scoring with input-number converted to numeric-input", () => {
    test.each(cases)("$title", ({widgets, userInput}) => {
        const content = Object.keys(widgets)
            .map((id) => `[[\u2603 ${id}]]`)
            .join("");

        const scoringArgs: Parameters<typeof scorePerseusItem> = [
            // FIXME: remove this cast
            // eslint-disable-next-line no-restricted-syntax
            {content, widgets, images: {}} as unknown as PerseusRenderer,
            userInput,
            "en",
        ];

        const officialScore = scorePerseusItem(...scoringArgs);
        const inniScore = scorePerseusItemWithInputNumberAsNumericInput(
            ...scoringArgs,
        );

        expect(inniScore).toEqual(officialScore);
    });
});
