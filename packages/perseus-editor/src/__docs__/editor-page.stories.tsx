import {PerseusFeatureFlags} from "@khanacademy/perseus-core";
import * as React from "react";

import {question as definitionQuestion} from "../__testdata__/definition.testdata";
import {comprehensiveQuestion} from "../__testdata__/editing-disabled.testdata";
import {question1} from "../__testdata__/numeric-input.testdata";
import {singleSelectQuestion} from "../__testdata__/radio.testdata";
import {registerAllWidgetsAndEditorsForTesting} from "../util/register-all-widgets-and-editors-for-testing";

import EditorPageWithStorybookPreview from "./editor-page-with-storybook-preview";

import type {PerseusRenderer} from "@khanacademy/perseus-core";

// This is to address timing - Perseus widget editor registry accessed before initialization!
registerAllWidgetsAndEditorsForTesting();

export default {
    title: "Editors/EditorPage",
};

/**
 * Current state of the editor page. (All feature flags are off.)
 */
export const Demo = (): React.ReactElement => {
    return <EditorPageWithStorybookPreview />;
};

/**
 * Editor with all feature flags on.
 */
export const WithAllFlags = (): React.ReactElement => {
    const allFlags: Record<string, boolean> = {};

    for (const flag of PerseusFeatureFlags) {
        allFlags[flag] = true;
    }

    return (
        <EditorPageWithStorybookPreview
            apiOptions={{
                flags: allFlags,
            }}
        />
    );
};

export const WithNumericInput = (): React.ReactElement => {
    return <EditorPageWithStorybookPreview question={question1} />;
};

export const WithRadioWidget = (): React.ReactElement => {
    return <EditorPageWithStorybookPreview question={singleSelectQuestion} />;
};

export const WithDefinitionWidget = (): React.ReactElement => {
    return <EditorPageWithStorybookPreview question={definitionQuestion} />;
};

// Rich example with multiple widgets
export const WithMultipleWidgets = (): React.ReactElement => {
    const complexQuestion: PerseusRenderer = {
        content: `# Math Problem with Multiple Widgets

Solve the following equation and select the correct interpretation:

$\\sqrt{64} = x$

First, find the value of $x$: [[\u2603 numeric-input 1]]

Then, which statement is correct?

[[\u2603 radio 1]]

Finally, click on the definition below to learn more about [[\u2603 definition 1]].

---

*This problem demonstrates multiple widget types working together.*`,
        images: {},
        widgets: {
            "numeric-input 1": {
                graded: true,
                version: {major: 0, minor: 0},
                static: false,
                type: "numeric-input",
                options: {
                    coefficient: false,
                    static: false,
                    answers: [
                        {
                            status: "correct",
                            maxError: null,
                            strict: false,
                            value: 8,
                            simplify: "required",
                            message: "Correct! The square root of 64 is 8.",
                        },
                    ],
                    labelText: "Enter the value of x:",
                    size: "normal",
                },
            },
            "radio 1": {
                graded: true,
                version: {major: 1, minor: 0},
                static: false,
                type: "radio",
                options: {
                    choices: [
                        {
                            id: "choice-1",
                            content:
                                "Square roots can be both positive and negative",
                            correct: false,
                            rationale:
                                "While equations like $x^2 = 64$ have two solutions, the square root symbol $\\sqrt{64}$ refers only to the positive root.",
                        },
                        {
                            id: "choice-2",
                            content:
                                "The square root symbol always gives the positive value",
                            correct: true,
                            rationale:
                                "Correct! The radical symbol $\\sqrt{\\phantom{x}}$ is defined to give only the non-negative square root.",
                        },
                        {
                            id: "choice-3",
                            content: "This equation has no solution",
                            correct: false,
                            rationale:
                                "This is incorrect. The equation $\\sqrt{64} = x$ has the solution $x = 8$.",
                        },
                    ],
                    multipleSelect: false,
                    randomize: false,
                },
            },
            "definition 1": {
                graded: true,
                version: {major: 0, minor: 0},
                static: false,
                type: "definition",
                options: {
                    definition:
                        "A square root of a number is a value that, when multiplied by itself, gives the original number. The radical symbol √ specifically denotes the principal (non-negative) square root.",
                    togglePrompt: "square roots",
                    static: false,
                },
            },
        },
    };

    return <EditorPageWithStorybookPreview question={complexQuestion} />;
};

export const WithEditingDisabled = (): React.ReactElement => {
    const disabledApiOptions = {
        editingDisabled: true,
        isMobile: false,
    };

    return (
        <EditorPageWithStorybookPreview
            question={comprehensiveQuestion}
            apiOptions={disabledApiOptions}
        />
    );
};
