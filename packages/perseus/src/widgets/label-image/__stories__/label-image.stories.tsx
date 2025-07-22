import {
    generateTestPerseusItem,
    type PerseusRenderer,
} from "@khanacademy/perseus-core";
import * as React from "react";

import {ServerItemRendererWithDebugUI} from "../../../../../../testing/server-item-renderer-with-debug-ui";
import {
    textQuestion,
    mathQuestion,
    numberline,
    longTextFromArticle,
    mixedContentQuestion,
} from "../__tests__/label-image.testdata";

const applyStoryArgs = (
    question: PerseusRenderer,
    args: StoryArgs,
): PerseusRenderer => {
    const q = {
        ...question,
        widgets: {},
    } as const;

    for (const [widgetId, widget] of Object.entries(question.widgets)) {
        const modified = {
            ...widget,
            options: {
                ...widget.options,
                preferredPopoverDirection: args.preferredPopoverDirection,
            },
        };

        q.widgets[widgetId] = {
            ...modified,
        };
    }

    return q;
};

type StoryArgs = {
    preferredPopoverDirection: string;
};

type ImageStory = {
    title: string;
    args: StoryArgs;
};

export const LabelWidgetWithText = (args: StoryArgs): React.ReactElement => {
    return (
        <ServerItemRendererWithDebugUI
            item={generateTestPerseusItem({
                question: applyStoryArgs(textQuestion, args),
            })}
        />
    );
};

export const LabelWidgetWithLongText = (
    args: StoryArgs,
): React.ReactElement => {
    return (
        <ServerItemRendererWithDebugUI
            item={generateTestPerseusItem({
                question: applyStoryArgs(longTextFromArticle, args),
            })}
        />
    );
};

export const LabelWidgetWithMath = (args: StoryArgs): React.ReactElement => {
    return (
        <ServerItemRendererWithDebugUI
            item={generateTestPerseusItem({
                question: applyStoryArgs(mathQuestion, args),
            })}
        />
    );
};

export const LabelImageNumberline = (args: StoryArgs): React.ReactElement => {
    return (
        <ServerItemRendererWithDebugUI
            item={generateTestPerseusItem({
                question: applyStoryArgs(numberline, args),
            })}
        />
    );
};

export const LabelImageMixedContent = (args: StoryArgs): React.ReactElement => {
    return (
        <ServerItemRendererWithDebugUI
            item={generateTestPerseusItem({
                question: applyStoryArgs(mixedContentQuestion, args),
            })}
        />
    );
};

export const LabelWidgetAnswerless = (args: StoryArgs): React.ReactElement => {
    return (
        <ServerItemRendererWithDebugUI
            item={generateTestPerseusItem({
                question: applyStoryArgs(textQuestion, args),
            })}
            startAnswerless={true}
        />
    );
};

export default {
    title: "Widgets/Label Image",
    args: {
        preferredPopoverDirection: "NONE",
    },
    argTypes: {
        preferredPopoverDirection: {
            control: "select",
            options: ["NONE", "UP", "DOWN", "LEFT", "RIGHT"],
        },
    },
    tags: ["autodocs", "!dev"],
    parameters: {
        // Since by default, we don't show all stories in autodocs; this will show all stories in autodocs only for this component.
        docs: {disable: false},
    },
} as ImageStory;
