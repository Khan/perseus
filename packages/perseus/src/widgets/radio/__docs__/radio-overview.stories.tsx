import {generateTestPerseusItem} from "@khanacademy/perseus-core";
import * as React from "react";

import {ServerItemRendererWithDebugUI} from "../../../../../../testing/server-item-renderer-with-debug-ui";
import {questionWithPassage} from "../__tests__/radio.testdata";

import type {APIOptions} from "../../../types";
import type {PerseusItem} from "@khanacademy/perseus-core";
import type {StoryObj} from "@storybook/react-vite";

export default {
    title: "Widgets/RadioNew",
    component: ServerItemRendererWithDebugUI,
    tags: ["autodocs", "!dev"],
    parameters: {
        componentSubtitle:
            "A widget for creating single-select and multiple-choice questions. TODO: Provide detailed description of the widget here.",
        docs: {
            description: {
                component: `
                    TODO: Provide code examples and usage instructions for the Radio widget.
                    To help the user understand how to implement and customize the widget.
                `,
            },
        },
    },
};

type StoryArgs = {
    // Story Option
    item: PerseusItem;
    // Radio Options
    static: boolean;
    // Testing Options
    startAnswerless: boolean;
    // Renderer Options
    reviewMode: boolean;
    showSolutions: "none" | "all" | "selected";
};

/**
 * This is the primary example showing a single select radio question with a passage.
 */
export const SingleSelect: StoryObj<StoryArgs> = {
    args: {
        item: generateTestPerseusItem({
            question: questionWithPassage,
        }),
        static: false,
        startAnswerless: false,
        reviewMode: false,
        showSolutions: "none",
    },
    render: (args) => (
        <ServerItemRendererWithDebugUI
            item={applyStoryArgs(args)}
            apiOptions={buildApiOptions(args)}
            reviewMode={args.reviewMode}
            showSolutions={args.showSolutions}
            startAnswerless={args.startAnswerless}
        />
    ),
    parameters: {
        docs: {
            description: {
                story: "A basic single select radio question with an associated reading passage.",
            },
        },
    },
};

const applyStoryArgs = (args: StoryArgs): PerseusItem => {
    const storyItem = {
        ...args.item,
        question: {
            ...args.item.question,
            widgets: {},
        },
        apiOptions: {
            flags: {
                "new-radio-widget": true,
            },
        },
    };
    for (const [widgetId, widget] of Object.entries(
        args.item.question.widgets,
    )) {
        storyItem.question.widgets[widgetId] = {...widget, static: args.static};
    }

    return storyItem;
};

const buildApiOptions = (args: StoryArgs): APIOptions => ({
    flags: {
        "new-radio-widget": true,
    },
});
