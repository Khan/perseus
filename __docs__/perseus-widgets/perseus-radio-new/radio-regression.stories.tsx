import {generateTestPerseusItem} from "@khanacademy/perseus-core";
import * as React from "react";

import {ServerItemRendererWithDebugUI} from "../../../testing/server-item-renderer-with-debug-ui";
import {
    questionWithPassage,
    multiChoiceQuestion,
    choicesWithImages,
} from "../../../packages/perseus/src/widgets/radio/__tests__/radio.testdata";

import type {APIOptions} from "../../../packages/perseus/src/types";
import type {PerseusItem} from "@khanacademy/perseus-core";
import type {Meta} from "@storybook/react-vite";

type StoryArgs = {
    // Story Option
    item: PerseusItem;
    // Radio Options
    static: boolean;
    // Testing Options
    startAnswerless: boolean;
} & Pick<
    React.ComponentProps<typeof ServerItemRendererWithDebugUI>,
    "reviewMode" | "showSolutions"
>;

export default {
    title: "Perseus/Widgets/RadioNew/Regression Test",
    args: {
        static: false,
        startAnswerless: false,
        reviewMode: false,
        showSolutions: "none",
        item: generateTestPerseusItem({
            question: questionWithPassage,
        }),
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
        <ServerItemRendererWithDebugUI
            item={applyStoryArgs(args)}
            apiOptions={buildApiOptions(args)}
            reviewMode={args.reviewMode}
            showSolutions={args.showSolutions}
            startAnswerless={args.startAnswerless}
        />
    ),
} satisfies Meta<StoryArgs>;

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

export const RegressionSingleSelect = {
    args: {
        item: generateTestPerseusItem({
            question: questionWithPassage,
        }),
    },
    parameters: {
        chromatic: {disableSnapshot: false},
    },
};

export const RegressionMultiSelect = {
    args: {
        item: generateTestPerseusItem({
            question: multiChoiceQuestion,
        }),
    },
    parameters: {
        chromatic: {disableSnapshot: false},
    },
};

export const RegressionWithImages = {
    args: {
        item: generateTestPerseusItem({
            question: choicesWithImages,
        }),
    },
    parameters: {
        chromatic: {disableSnapshot: false},
    },
};

export const RegressionReviewMode = {
    args: {
        item: generateTestPerseusItem({
            question: questionWithPassage,
        }),
        reviewMode: true,
    },
    parameters: {
        chromatic: {disableSnapshot: false},
    },
};

export const RegressionShowAllSolutions = {
    args: {
        item: generateTestPerseusItem({
            question: questionWithPassage,
        }),
        showSolutions: "all",
    },
    parameters: {
        chromatic: {disableSnapshot: false},
    },
};
