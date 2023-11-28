import * as React from "react";

import {RendererWithDebugUI} from "../../../../../testing/renderer-with-debug-ui";
import {textQuestion, mathQuestion} from "../__testdata__/label-image.testdata";

import type {APIOptions} from "../../types";

type StoryArgs = {
    isMobile: boolean;
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
        <RendererWithDebugUI question={textQuestion} apiOptions={apiOptions} />
    );
};

export const LabelWidgetWithMath = (args: StoryArgs): React.ReactElement => {
    const apiOptions: APIOptions = {
        isMobile: args.isMobile,
    };

    return (
        <RendererWithDebugUI question={mathQuestion} apiOptions={apiOptions} />
    );
};

export default {
    title: "Perseus/Widgets/Label Image",
    args: {
        isMobile: false,
    },
} as ImageStory;
