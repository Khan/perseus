import * as React from "react";

import {RendererWithDebugUI} from "../../../../../testing/renderer-with-debug-ui";

import {
    ipsumExample,
    question1,
    question2,
    wideButton,
} from "./explanation.testdata";

import type {Meta} from "@storybook/react";

const meta: Meta = {
    title: "Perseus/Widgets/Explanation",
    parameters: {
        chromatic: {
            // Visual snapshot testing for all the variants of this widget.
            disableSnapshot: false,
        },
    },
};

export default meta;

type StoryArgs = Record<any, any>;

export const Question1 = (args: StoryArgs): React.ReactElement => {
    return <RendererWithDebugUI question={question1} />;
};

export const Question2 = (args: StoryArgs): React.ReactElement => {
    return <RendererWithDebugUI question={question2} />;
};

export const IpsumExample = (args: StoryArgs): React.ReactElement => {
    return <RendererWithDebugUI question={ipsumExample} />;
};

export const WideButton = (args: StoryArgs): React.ReactElement => {
    return <RendererWithDebugUI question={wideButton} />;
};
