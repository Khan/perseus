// @flow
import * as React from "react";

import {RendererWithDebugUI} from "../../../../../testing/renderer-with-debug-ui.jsx";
import {question} from "../__testdata__/image_testdata.js";

import type {APIOptions} from "../../types.js";

type StoryArgs = {|
    isMobile: boolean,
    title: string,
    caption: string,
|};

type ImageStory = {|
    title: string,
    args: StoryArgs,
|};

export const Question1 = (args: StoryArgs): React.Node => {
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
                    // hard-to-understand Flow type errors about missing keys
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
    };
    return (
        <RendererWithDebugUI
            question={questionWithArgs}
            apiOptions={apiOptions}
        />
    );
};

export default ({
    title: "Perseus/Widgets/Image",
    args: {
        isMobile: false,
        title: "",
        caption: "",
    },
}: ImageStory);
