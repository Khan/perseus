import * as React from "react";

import {RendererWithDebugUI} from "../../../../../testing/renderer-with-debug-ui";

import type {PerseusRenderer} from "../../perseus-types";

export default {
    title: "Perseus/Widgets/LightsPuzzle",
};

const question1 = {
    content: "[[\u2603 lights-puzzle 1]]",
    images: {},
    widgets: {
        "lights-puzzle 1": {
            graded: true,
            version: {
                major: 0,
                minor: 0,
            },
            static: false,
            type: "lights-puzzle",
            options: {
                startCells: [[false, false, false, false, false]],
            },
            alignment: "default",
        },
    },
} as PerseusRenderer;

type StoryArgs = Record<any, any>;

export const Question1 = (args: StoryArgs): React.ReactElement => {
    return <RendererWithDebugUI question={question1} />;
};
