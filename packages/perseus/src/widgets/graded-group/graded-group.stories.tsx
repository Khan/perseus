import * as React from "react";

import {RendererWithDebugUI} from "../../../../../testing/renderer-with-debug-ui";

import {question1} from "./graded-group.testdata";

type StoryArgs = {
    isMobile: boolean;
};

type Story = {
    title: string;
    args: StoryArgs;
};

export const Question1 = (args: StoryArgs): React.ReactElement => {
    return (
        <RendererWithDebugUI
            question={question1}
            apiOptions={{
                isMobile: args.isMobile,
            }}
        />
    );
};

export default {
    title: "Perseus/Widgets/Graded Group",
    args: {
        isMobile: false,
    },
} as Story;
