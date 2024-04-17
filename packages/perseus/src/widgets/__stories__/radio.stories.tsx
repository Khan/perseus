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

type StoryArgs = {
    // Story Option
    question: PerseusRenderer;
    // Radio Options
    static: boolean;
    // API Options
    crossOutEnabled: boolean;
} & Pick<
    React.ComponentProps<typeof RendererWithDebugUI>,
    "reviewMode" | "showSolutions"
>;

export default {
    title: "Perseus/Widgets/Radio",
    args: {
        static: false,
        crossOutEnabled: false,
        reviewMode: false,
        showSolutions: "none",
        question: questionWithPassage,
    } satisfies StoryArgs,
    argTypes: {
        showSolutions: {
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
            showSolutions={args.showSolutions}
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
