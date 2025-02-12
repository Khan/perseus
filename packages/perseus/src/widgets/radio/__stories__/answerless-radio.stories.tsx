import {
    getRadioPublicWidgetOptions,
    type PerseusRenderer,
} from "@khanacademy/perseus-core";
import * as React from "react";

import {RendererWithDebugUI} from "../../../../../../testing/renderer-with-debug-ui";

import type {APIOptions} from "../../../types";
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

const fullRadio = {
    choices: [
        {
            content: "Correct 1",
            correct: true,
        },
        {
            content: "Correct 2",
            correct: true,
        },
        {
            content: "Incorrect",
            correct: false,
        },
        {
            content: "None",
            isNoneOfTheAbove: true,
            correct: false,
        },
    ],

    numCorrect: 2,

    /*
    Radio derives `numCorrect` from answers
    and uses `numCorrect` for instruction text if both:
    1. multipleSelect is true
    2. countChoices is true

    Since answers can't continue to be on the FE,
    we need to assert that this functionality continues
    to work without answers
    */
    multipleSelect: true,
    countChoices: true,
};

const answerlessRadio = getRadioPublicWidgetOptions(fullRadio);

const fullItem: PerseusRenderer = {
    content: "[[☃ radio 1]]",
    images: {},
    widgets: {
        "radio 1": {
            type: "radio",
            options: fullRadio,
            version: {major: 2, minor: 0},
        },
    },
};

const publicItem: PerseusRenderer = {
    content: "[[☃ radio 1]]",
    images: {},
    widgets: {
        "radio 1": {
            type: "radio",
            options: answerlessRadio,
            version: {major: 2, minor: 0},
        },
    },
};

export default {
    title: "Perseus/Widgets/Radio/Answerless",
    args: {
        static: false,
        crossOutEnabled: false,
        reviewMode: false,
        showSolutions: "none",
        question: fullItem,
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
} satisfies Meta<StoryArgs>;

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

export const Answerless = {
    args: {
        question: fullItem,
        publicQuestion: publicItem,
    },
};
