import {PerseusFeatureFlags} from "@khanacademy/perseus-core";
import * as React from "react";

import {question as definitionQuestion} from "../__testdata__/definition.testdata";
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
    const testApiOptions = {
        editingDisabled: true,
        isMobile: false,
    };

    return (
        <EditorPageWithStorybookPreview
            question={singleSelectQuestion}
            apiOptions={testApiOptions}
        />
    );
};

export const AllWidgetsDisabled = (): React.ReactElement => {
    const comprehensiveQuestion: PerseusRenderer = {
        content: `# Perseus Editor - All Widgets Showcase (Disabled)

This demonstrates all Perseus widget types in a disabled editing state.

## Math & Input Widgets

**Numeric Input:** Solve for x: $2x + 5 = 13$ → x = [[\u2603 numeric-input 1]]

**Expression Input:** Enter the expanded form: [[\u2603 expression 1]]

## Choice Widgets

**Radio (Single Select):** Which is the correct answer?
[[\u2603 radio 1]]

**Radio (Multiple Select):** Select all that apply:
[[\u2603 radio 2]]

**Dropdown:** The answer is [[\u2603 dropdown 1]] than 10.

**Categorizer:** Drag items to correct categories:
[[\u2603 categorizer 1]]

## Interactive Widgets

**Interactive Graph:** Plot the function y = 2x + 1:
[[\u2603 interactive-graph 1]]

**Number Line:** Mark the solution on the number line:
[[\u2603 number-line 1]]

**Matrix:** Enter the 2×2 identity matrix:
[[\u2603 matrix 1]]

## Content Widgets

**Definition:** Click to learn about [[\u2603 definition 1]].

**Explanation:** [[\u2603 explanation 1]]

**Image:** Label the parts of this diagram:
[[\u2603 image 1]]

## Advanced Widgets

**Table:** Fill in the multiplication table:
[[\u2603 table 1]]

**Plotter:** Plot points on the coordinate plane:
[[\u2603 plotter 1]]

**Sorter:** Arrange in ascending order:
[[\u2603 sorter 1]]

---
*All widgets above should be in disabled editing mode - you can see their configuration but cannot modify settings.*`,
        images: {
            "https://ka-perseus-images.s3.amazonaws.com/sample-diagram.png": {
                width: 300,
                height: 200,
            },
        },
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
                            value: 4,
                            simplify: "required",
                            message: "Correct! 2x + 5 = 13, so x = 4.",
                        },
                    ],
                    labelText: "Enter your answer:",
                    size: "normal",
                },
            },
            "expression 1": {
                graded: true,
                version: {major: 1, minor: 0},
                static: false,
                type: "expression",
                options: {
                    answerForms: [
                        {
                            considered: "correct",
                            form: true,
                            simplify: false,
                            value: "x^2 + 2x + 1",
                            key: "1",
                        },
                    ],
                    functions: ["f", "g", "h"],
                    times: false,
                    buttonSets: ["basic"],
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
                            content: "Option A",
                            correct: true,
                            rationale: "This is the correct answer.",
                        },
                        {
                            id: "choice-2",
                            content: "Option B",
                            correct: false,
                            rationale: "This is incorrect.",
                        },
                        {
                            id: "choice-3",
                            content: "Option C",
                            correct: false,
                            rationale: "This is also incorrect.",
                        },
                    ],
                    multipleSelect: false,
                    randomize: true,
                },
            },
            "radio 2": {
                graded: true,
                version: {major: 1, minor: 0},
                static: false,
                type: "radio",
                options: {
                    choices: [
                        {
                            id: "choice-a",
                            content: "First correct option",
                            correct: true,
                            rationale: "This should be selected.",
                        },
                        {
                            id: "choice-b",
                            content: "Second correct option",
                            correct: true,
                            rationale: "This should also be selected.",
                        },
                        {
                            id: "choice-c",
                            content: "Incorrect option",
                            correct: false,
                            rationale: "This should not be selected.",
                        },
                    ],
                    multipleSelect: true,
                    countChoices: true,
                    randomize: false,
                },
            },
            "dropdown 1": {
                graded: true,
                version: {major: 0, minor: 0},
                static: false,
                type: "dropdown",
                options: {
                    static: false,
                    placeholder: "choose one",
                    choices: [
                        {content: "greater", correct: true},
                        {content: "less", correct: false},
                        {content: "equal", correct: false},
                    ],
                },
            },
            "categorizer 1": {
                graded: true,
                version: {major: 0, minor: 0},
                static: false,
                type: "categorizer",
                options: {
                    items: ["Apple", "Carrot", "Banana", "Broccoli"],
                    categories: ["Fruits", "Vegetables"],
                    values: [0, 1, 0, 1],
                    randomizeItems: false,
                },
            },
            "interactive-graph 1": {
                graded: true,
                version: {major: 0, minor: 0},
                static: false,
                type: "interactive-graph",
                options: {
                    labels: ["x", "y"],
                    range: [
                        [-10, 10],
                        [-10, 10],
                    ],
                    step: [1, 1],
                    gridStep: [1, 1],
                    snapStep: [1, 1],
                    graph: {
                        type: "linear",
                        coords: [
                            [0, 1],
                            [1, 3],
                        ],
                    },
                    correct: {
                        type: "linear",
                        coords: [
                            [0, 1],
                            [1, 3],
                        ],
                    },
                },
            },
            "number-line 1": {
                graded: true,
                version: {major: 0, minor: 0},
                static: false,
                type: "number-line",
                options: {
                    range: [-5, 5],
                    initialX: 2,
                    correctX: 2,
                },
            },
            "matrix 1": {
                graded: true,
                version: {major: 0, minor: 0},
                static: false,
                type: "matrix",
                options: {
                    matrixBoardSize: [2, 2],
                    answers: [
                        ["1", "0"],
                        ["0", "1"],
                    ],
                },
            },
            "definition 1": {
                graded: true,
                version: {major: 0, minor: 0},
                static: false,
                type: "definition",
                options: {
                    definition:
                        "A mathematical expression that represents a relationship between variables.",
                    togglePrompt: "function",
                    static: false,
                },
            },
            "explanation 1": {
                graded: true,
                version: {major: 0, minor: 0},
                static: false,
                type: "explanation",
                options: {
                    showPrompt: "Show explanation",
                    hidePrompt: "Hide explanation",
                    explanation:
                        "This is a detailed explanation of the concept with step-by-step reasoning.",
                    static: false,
                },
            },
            "image 1": {
                graded: true,
                version: {major: 0, minor: 0},
                static: false,
                type: "image",
                options: {
                    backgroundImage: {
                        url: "https://ka-perseus-images.s3.amazonaws.com/sample-diagram.png",
                        width: 300,
                        height: 200,
                    },
                    labels: [
                        {
                            content: "Point A",
                            coordinates: [100, 50],
                            alignment: "center",
                        },
                    ],
                },
            },
            "table 1": {
                graded: true,
                version: {major: 0, minor: 0},
                static: false,
                type: "table",
                options: {
                    headers: ["×", "2", "3"],
                    rows: 2,
                    columns: 3,
                    answers: [
                        ["2", "4", "6"],
                        ["3", "6", "9"],
                    ],
                },
            },
            "plotter 1": {
                graded: true,
                version: {major: 0, minor: 0},
                static: false,
                type: "plotter",
                options: {
                    type: "pic",
                    labels: ["x", "y"],
                    categories: ["blue"],
                    scaleY: 1,
                    maxY: 10,
                    snapsPerLine: 2,
                    correct: [
                        [2, 4],
                        [3, 6],
                    ],
                },
            },
            "sorter 1": {
                graded: true,
                version: {major: 0, minor: 0},
                static: false,
                type: "sorter",
                options: {
                    correct: ["1", "2", "3", "4", "5"],
                    layout: "horizontal",
                    padding: true,
                },
            },
        },
    };

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
