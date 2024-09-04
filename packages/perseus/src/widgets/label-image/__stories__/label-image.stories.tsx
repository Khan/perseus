import * as React from "react";

import {RendererWithDebugUI} from "../../../../../../testing/renderer-with-debug-ui";
import {
    textQuestion,
    mathQuestion,
    numberline,
    longTextFromArticle,
    mixedContentQuestion,
} from "../__tests__/label-image.testdata";

import type {PerseusRenderer} from "../../../perseus-types";
import type {APIOptions} from "../../../types";

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
    isMobile: boolean;
    preferredPopoverDirection: string;
};

type ImageStory = {
    title: string;
    args: StoryArgs;
};

export const LabelWidgetWithText = (args: StoryArgs): React.ReactElement => {
    const apiOptions: APIOptions = {
        isMobile: args.isMobile,
    };

    return (
        <RendererWithDebugUI
            question={applyStoryArgs(textQuestion, args)}
            apiOptions={apiOptions}
        />
    );
};

export const LabelWidgetWithLongText = (
    args: StoryArgs,
): React.ReactElement => {
    const apiOptions: APIOptions = {
        isMobile: args.isMobile,
    };

    return (
        <RendererWithDebugUI
            question={applyStoryArgs(longTextFromArticle, args)}
            apiOptions={apiOptions}
        />
    );
};

export const LabelWidgetWithMath = (args: StoryArgs): React.ReactElement => {
    const apiOptions: APIOptions = {
        isMobile: args.isMobile,
    };

    return (
        <RendererWithDebugUI
            question={applyStoryArgs(mathQuestion, args)}
            apiOptions={apiOptions}
        />
    );
};

export const LabelImageNumberline = (args: StoryArgs): React.ReactElement => {
    const apiOptions: APIOptions = {
        isMobile: args.isMobile,
    };

    return (
        <RendererWithDebugUI
            question={applyStoryArgs(numberline, args)}
            apiOptions={apiOptions}
        />
    );
};

export const LabelImageMixedContent = (args: StoryArgs): React.ReactElement => {
    const apiOptions: APIOptions = {
        isMobile: args.isMobile,
    };

    return (
        <RendererWithDebugUI
            question={applyStoryArgs(mixedContentQuestion, args)}
            apiOptions={apiOptions}
        />
    );
};

export default {
    title: "Perseus/Widgets/Label Image",
    args: {
        isMobile: false,
        preferredPopoverDirection: "NONE",
    },
    argTypes: {
        preferredPopoverDirection: {
            control: "select",
            options: ["NONE", "UP", "DOWN", "LEFT", "RIGHT"],
        },
    },
} as ImageStory;
