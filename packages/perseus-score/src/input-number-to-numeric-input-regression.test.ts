import type {PerseusWidgetsMap, UserInputMap} from "@khanacademy/perseus-core";

import {
    scorePerseusItem,
    scorePerseusItemWithInputNumberAsNumericInput,
} from "./index";

interface TestCase {
    title: string;
    userInput: UserInputMap;
    widgets: PerseusWidgetsMap;
}

// NOTE: To add a test case to this list:
// - Go to https://console.cloud.google.com/logs
// - Search for "side-by-side" in the Perseus service
// - select "Copy > Copy as JSON"
// - `pbpaste | jq '.jsonPayload.metadata | {userInput: .inputNumberUserInputs, widgets: .inputNumberWidgets}'`
const cases: TestCase[] = [
    {
        title: "???",
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
];

describe("scoring with input-number converted to numeric-input", () => {
    it.each(cases)("$title", ({widgets, userInput}) => {
        const content = Object.keys(widgets)
            .map((id) => `[[\u2603 ${id}]]`)
            .join("");

        const scoringArgs: Parameters<typeof scorePerseusItem> = [
            {content, widgets, images: {}},
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
