import {generateTestPerseusItem} from "@khanacademy/perseus-core";
import * as React from "react";

import {ServerItemRendererWithDebugUI} from "../../../../../../testing/server-item-renderer-with-debug-ui";
import {question} from "../definition.testdata";

import type {PerseusItem} from "@khanacademy/perseus-core";
import type {Meta} from "@storybook/react-vite";

type StoryArgs = {
    // Story Option
    item: PerseusItem;
    // Definition Options
    static: boolean;
    // Testing Options
    startAnswerless: boolean;
} & Pick<
    React.ComponentProps<typeof ServerItemRendererWithDebugUI>,
    "reviewMode" | "showSolutions"
>;

export default {
    title: "Widgets/Definition/Visual Regression Tests/Interactive",
    component: ServerItemRendererWithDebugUI,
    tags: ["!autodocs"],
    parameters: {
        docs: {
            description: {
                component:
                    "Regression tests for the definition widget that DO need some sort of interaction to test, which will be used with Chromatic. Stories are displayed on their own page.",
            },
        },
        chromatic: {disableSnapshot: false},
    },
    args: {
        static: false,
        startAnswerless: false,
        reviewMode: false,
        showSolutions: "none",
        item: generateTestPerseusItem({
            question,
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
    };
    for (const [widgetId, widget] of Object.entries(
        args.item.question.widgets,
    )) {
        storyItem.question.widgets[widgetId] = {...widget, static: args.static};
    }

    return storyItem;
};

export const FocusedState = {
    play: async ({canvas}) => {
        // eslint-disable-next-line testing-library/prefer-screen-queries
        const definitionTrigger = canvas.getByRole("button", {
            name: "the Pequots",
        });
        definitionTrigger.focus();
    },
};

export const ClickedState = {
    play: async ({canvas, userEvent}) => {
        // eslint-disable-next-line testing-library/prefer-screen-queries
        const definitionTrigger = canvas.getByRole("button", {
            name: "the Pequots",
        });
        await userEvent.click(definitionTrigger);
    },
};
