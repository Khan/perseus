import * as React from "react";

import {RendererWithDebugUI} from "../../../../../testing/renderer-with-debug-ui";

import type {PerseusRenderer} from "../../perseus-types";

type Story = {
    title: string;
    args: StoryArgs;
};

type StoryArgs = Record<any, any>;

export default {
    title: "Perseus/Widgets/Show Your Work",
    args: {},
} as Story;

const question1: PerseusRenderer = {
    content: "[[\u2603 show-your-work 1]]",
    images: {},
    widgets: {
        "show-your-work 1": {
            graded: true,
            version: {
                major: 0,
                minor: 0,
            },
            // NOTE: The explanation widget doesn't consume this directly,
            // instead, Perseus renders an overlay <div /> over top of the
            // widget that intercepts interactions to it.
            static: false,
            type: "show-your-work",
            options: {
                foo: "bar",
            },
            alignment: "default",
        },
    },
};

export const ShowYourWork1 = (args: StoryArgs): React.ReactElement => {
    return <RendererWithDebugUI question={question1} />;
};
