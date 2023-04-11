import * as React from "react";

import {RendererWithDebugUI} from "../../../../../testing/renderer-with-debug-ui";
import {question} from "../__testdata__/image.testdata";

import type {APIOptions} from "../../types";

type StoryArgs = {
    isMobile: boolean;
    title: string;
    caption: string;
};

type ImageStory = {
    title: string;
    args: StoryArgs;
};

export const Question1 = (args: StoryArgs): React.ReactElement => {
    const apiOptions: APIOptions = {
        isMobile: args.isMobile,
    };
    const imageOptions = question.widgets["image 1"].options;

    const questionWithArgs = {
        ...question,
        widgets: {
            ...question.widgets,
            "image 1": {
                ...question.widgets["image 1"],
                options:
                    // `options` is nullable so we have handle it explicitly
                    // to avoid spreading `null` and generating
                    // hard-to-understand type errors about missing keys
                    // in object literal.
                    imageOptions != null
                        ? {
                              ...imageOptions,
                              title: args.title,
                              caption: args.caption,
                          }
                        : null,
            },
        },
    } as const;
    return (
        <RendererWithDebugUI
            question={questionWithArgs}
            apiOptions={apiOptions}
        />
    );
};

export default {
    title: "Perseus/Widgets/Image",
    args: {
        isMobile: false,
        title: "",
        caption: "",
    },
} as ImageStory;
