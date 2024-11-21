import * as React from "react";

import {RendererWithDebugUI} from "../../../../../testing/renderer-with-debug-ui";

import {article1} from "./graded-group-set.testdata";

import type {Meta} from "@storybook/react";

const meta: Meta = {
    title: "Perseus/Widgets/Graded Group Set",
    args: {
        isMobile: false,
    },
};
export default meta;

type StoryArgs = {
    isMobile: boolean;
};

export const Article1 = {
    render: (args: StoryArgs) => (
        <RendererWithDebugUI
            apiOptions={{
                isMobile: args.isMobile,
            }}
            question={article1}
        />
    ),
    parameters: {
        chromatic: {
            // Visual snapshot testing for this widget.
            disableSnapshot: false,
        },
    },
};
