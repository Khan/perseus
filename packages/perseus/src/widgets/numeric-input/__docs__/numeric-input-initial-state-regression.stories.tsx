import {
    generateDropdownOptions,
    generateDropdownWidget,
    generateNumericInputOptions,
    generateNumericInputWidget,
    generateTestPerseusRenderer,
} from "@khanacademy/perseus-core";
import * as React from "react";

import {themeModes} from "../../../../../../.storybook/modes";
import QuestionRendererForStories from "../../__testutils__/question-renderer-for-stories";

import {numericInputRendererDecorator} from "./numeric-input-renderer-decorator";

import type {PerseusNumericInputWidgetOptions} from "@khanacademy/perseus-core";
import type {Meta, StoryObj} from "@storybook/react-vite";

const meta: Meta<PerseusNumericInputWidgetOptions> = {
    title: "Widgets/Numeric Input/Visual Regression Tests/Initial State",
    tags: ["!autodocs", "!manifest"],
    parameters: {
        docs: {
            description: {
                component:
                    "Regression tests for the Numeric Input widget that do NOT " +
                    "need any interactions to test, which will be used with " +
                    "Chromatic. Stories are all displayed on one page.",
            },
        },
        chromatic: {disableSnapshot: false, modes: themeModes},
    },
};
export default meta;

type Story = StoryObj<typeof meta>;

// Verifies the default normal-size input (8rem width) with a pre-filled value
export const SizeNormal: Story = {
    decorators: [numericInputRendererDecorator],
    parameters: {
        initialUserInput: {"numeric-input 1": {currentValue: "1701"}},
    },
    args: {
        size: "normal",
    },
};

// Verifies the small-size input (4rem width) variant with a pre-filled value
export const SizeSmall: Story = {
    decorators: [numericInputRendererDecorator],
    parameters: {
        initialUserInput: {"numeric-input 1": {currentValue: "1701"}},
    },
    args: {
        size: "small",
    },
};

// Verifies the right-aligned text input variant with a pre-filled value — the "5" should appear on the right
export const RightAligned: Story = {
    decorators: [numericInputRendererDecorator],
    parameters: {
        initialUserInput: {"numeric-input 1": {currentValue: "1701"}},
    },
    args: {
        size: "normal",
        rightAlign: true,
    },
};

// Verifies that a very long number does not overflow or distort the input box
export const LongNumber: Story = {
    decorators: [numericInputRendererDecorator],
    parameters: {
        initialUserInput: {
            "numeric-input 1": {currentValue: "12345678901234567890"},
        },
    },
    args: {
        size: "normal",
    },
};

export const MultipleInputsInParagraph: Story = {
    decorators: [
        (Story) => (
            // Limit the width to force two inputs to stack vertically.
            <div style={{maxWidth: "500px"}}>
                <Story />
            </div>
        ),
    ],
    render: function Render() {
        return (
            <QuestionRendererForStories
                question={generateTestPerseusRenderer({
                    content:
                        "On long-range sensors, the bridge crew counted " +
                        "[[☃ numeric-input 1]] Borg cubes, [[☃ numeric-input 2]] " +
                        "Romulan warbirds, and [[☃ numeric-input 3]] Klingon " +
                        "birds-of-prey approaching the neutral zone.",
                    widgets: {
                        "numeric-input 1": generateNumericInputWidget({
                            options: generateNumericInputOptions({
                                size: "normal",
                            }),
                        }),
                        "numeric-input 2": generateNumericInputWidget({
                            options: generateNumericInputOptions({
                                size: "normal",
                            }),
                        }),
                        "numeric-input 3": generateNumericInputWidget({
                            options: generateNumericInputOptions({
                                size: "normal",
                            }),
                        }),
                    },
                })}
                initialUserInput={{
                    "numeric-input 1": {currentValue: "12"},
                    "numeric-input 2": {currentValue: "7"},
                    "numeric-input 3": {currentValue: "23"},
                }}
            />
        );
    },
};

/**
 * Verifies the vertical spacing/baseline alignment when a numeric input sits
 * inline with a dropdown in the same paragraph.
 */
export const InlineWithDropdown: Story = {
    render: function Render() {
        return (
            <QuestionRendererForStories
                question={generateTestPerseusRenderer({
                    content:
                        "The shuttlecraft can carry [[☃ numeric-input 1]] " +
                        "supply crates, which is [[☃ dropdown 1]] the cargo " +
                        "limit set by Starfleet.",
                    widgets: {
                        "numeric-input 1": generateNumericInputWidget({
                            options: generateNumericInputOptions({
                                size: "normal",
                            }),
                        }),
                        "dropdown 1": generateDropdownWidget({
                            options: generateDropdownOptions({
                                placeholder: "greater/less than or equal to",
                                choices: [
                                    {
                                        content: "greater than or equal to",
                                        correct: false,
                                    },
                                    {
                                        content: "less than or equal to",
                                        correct: true,
                                    },
                                ],
                            }),
                        }),
                    },
                })}
                initialUserInput={{
                    "numeric-input 1": {currentValue: "42"},
                }}
            />
        );
    },
};
