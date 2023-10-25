import * as React from "react";

import {RendererWithDebugUI} from "../../../../../testing/renderer-with-debug-ui";
import {question} from "../__testdata__/label-image.testdata";

import type {APIOptions} from "../../types";

type StoryArgs = {
    isMobile: boolean;
};

type ImageStory = {
    title: string;
    args: StoryArgs;
};

export const Question1 = (args: StoryArgs): React.ReactElement => {
    const apiOptions: APIOptions = {
        isMobile: args.isMobile,
    };

    return <RendererWithDebugUI question={question} apiOptions={apiOptions} />;
};

export default {
    title: "Perseus/Widgets/Label Image",
    args: {
        isMobile: false,
    },
} as ImageStory;
