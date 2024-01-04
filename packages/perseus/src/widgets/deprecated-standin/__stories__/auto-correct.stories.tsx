import * as React from "react";

import {RendererWithDebugUI} from "../../../../../../testing/renderer-with-debug-ui";

export default {
    title: "Perseus/Widgets/Auto Correct",
};

const question1 = {
    content:
        "Read the excerpt and answer the question below. \n\nThe Governor and Council of the Massachusetts had much conference many days; and at last . . . . concluded a peace and friendship with [[\u2603 definition 1]], upon these conditions.",
    images: {},
    widgets: {
        "definition 1": {
            graded: true,
            version: {
                major: 0,
                minor: 0,
            },
            static: false,
            type: "deprecated-standin",
            options: {
                static: false,
            },
            alignment: "default",
        },
    },
} as const;

type StoryArgs = Record<any, any>;

export const Question1 = (args: StoryArgs): React.ReactElement => {
    return <RendererWithDebugUI question={question1} />;
};
