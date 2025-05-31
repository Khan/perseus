import {registerAllWidgetsAndEditorsForTesting} from "../util/register-all-widgets-and-editors-for-testing";

import EditorPageWithStorybookPreview from "./editor-page-with-storybook-preview";

import type {Meta, StoryObj} from "@storybook/react";

registerAllWidgetsAndEditorsForTesting(); // SIDE_EFFECTY!!!! :cry:

const meta: Meta<typeof EditorPageWithStorybookPreview> = {
    title: "PerseusEditor/EditorPage",
    component: EditorPageWithStorybookPreview,
    parameters: {
        docs: {
            description: {
                component:
                    "Perseus EditorPage with built-in preview functionality using Storybook iframe. ",
            },
        },
    },
};

export default meta;
type Story = StoryObj<typeof EditorPageWithStorybookPreview>;

export const BlankEditor: Story = {
    name: "Blank Editor with Preview",
    args: {},
    parameters: {
        docs: {
            description: {
                story: "A blank editor to create new Perseus content with live preview.",
            },
        },
    },
};

export const EditorWithSampleContent: Story = {
    name: "Editor with Sample Content",
    args: {
        question: {
            content:
                "What is the value of $x$ when $2x + 5 = 11$?\n\n[[☃ input-number 1]]",
            images: {},
            widgets: {
                "input-number 1": {
                    type: "input-number",
                    graded: true,
                    options: {
                        value: 3,
                        simplify: "required",
                        size: "normal",
                        inexact: false,
                        maxError: 0.1,
                        answerType: "number",
                    },
                    version: {
                        major: 0,
                        minor: 0,
                    },
                },
            },
        },
        hints: [
            {
                content:
                    "Start by subtracting 5 from both sides of the equation.",
                images: {},
                widgets: {},
            },
            {
                content: "Now you have $2x = 6$. What should you do next?",
                images: {},
                widgets: {},
            },
            {
                content: "Divide both sides by 2 to get $x = 3$.",
                images: {},
                widgets: {},
            },
        ],
    },
    parameters: {
        docs: {
            description: {
                story: "Editor with sample question content including math and widgets for testing preview functionality.",
            },
        },
    },
};

export const EditorWithDropdownWidget: Story = {
    name: "Editor with Dropdown Widget",
    args: {
        question: {
            content:
                "Which of the following is a prime number?\n\n[[☃ dropdown 1]]",
            images: {},
            widgets: {
                "dropdown 1": {
                    type: "dropdown",
                    graded: true,
                    options: {
                        choices: [
                            {
                                content: "Choose an answer",
                                correct: false,
                            },
                            {
                                content: "4",
                                correct: false,
                            },
                            {
                                content: "6",
                                correct: false,
                            },
                            {
                                content: "7",
                                correct: true,
                            },
                            {
                                content: "8",
                                correct: false,
                            },
                        ],
                        placeholder: "Choose an answer",
                        static: false,
                    },
                    version: {
                        major: 0,
                        minor: 0,
                    },
                },
            },
        },
        hints: [
            {
                content:
                    "A prime number is a number greater than 1 that has no positive divisors other than 1 and itself.",
                images: {},
                widgets: {},
            },
        ],
    },
    parameters: {
        docs: {
            description: {
                story: "Editor with dropdown widget to test preview frame communication and height adjustments.",
            },
        },
    },
};
