import * as React from "react";

import {RendererWithDebugUI} from "../../../../../testing/renderer-with-debug-ui";

import {question1} from "./graded-group.testdata";

import type {Meta} from "@storybook/react";

const meta: Meta = {
    title: "Perseus/Widgets/Graded Group",
    args: {
        isMobile: false,
    },
};
export default meta;

type StoryArgs = {
    isMobile: boolean;
};

export const Question1 = {
    render: (args: StoryArgs) => (
        <RendererWithDebugUI
            question={question1}
            apiOptions={{
                isMobile: args.isMobile,
            }}
        />
    ),
    parameters: {
        chromatic: {
            // Visual snapshot testing for this widget.
            disableSnapshot: false,
        },
    },
};
