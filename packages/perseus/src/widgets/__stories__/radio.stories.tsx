import * as React from "react";

import {RendererWithDebugUI} from "../../../../../testing/renderer-with-debug-ui";
import {
    questionWithPassage,
    multiChoiceQuestion,
    multiChoiceQuestionSimple,
} from "../__testdata__/radio.testdata";

import type {PerseusRenderer} from "../../perseus-types";
import type {APIOptions} from "../../types";
import type {Meta} from "@storybook/react";

interface StoryArgs {
    // Story Option
    question: PerseusRenderer;
    // Radio Options
    static: boolean;
    // API Options
    crossOutEnabled: boolean;
    // Renderer Options
    reviewMode: boolean;
    showRationales: "none" | "all" | "selected";
}

export default {
    title: "Perseus/Widgets/Radio",
    args: {
        static: false,
        crossOutEnabled: false,
        reviewMode: false,
        showRationales: "none",
        question: questionWithPassage,
    } satisfies StoryArgs,
    argTypes: {
        showRationales: {
            options: ["none", "all", "selected"],
            control: {
                type: "select",
            },
        },
    },
    render: (args: StoryArgs) => (
        <RendererWithDebugUI
            question={applyStoryArgs(args)}
            apiOptions={buildApiOptions(args)}
            reviewMode={args.reviewMode}
            showRationales={args.showRationales}
        />
    ),
} satisfies Meta;

const applyStoryArgs = (args: StoryArgs): PerseusRenderer => {
    const q = {
        ...args.question,
        widgets: {},
    } as const;

    for (const [widgetId, widget] of Object.entries(args.question.widgets)) {
        q.widgets[widgetId] = {...widget, static: args.static};
    }

    return q;
};

const buildApiOptions = (args: StoryArgs): APIOptions => ({
    crossOutEnabled: args.crossOutEnabled,
});

export const SingleSelect = {
    args: {
        question: questionWithPassage,
    },
};

export const MultiSelectSimple = {
    args: {
        question: multiChoiceQuestionSimple,
    },
};

export const MultiSelect = {
    args: {
        question: multiChoiceQuestion,
    },
};
