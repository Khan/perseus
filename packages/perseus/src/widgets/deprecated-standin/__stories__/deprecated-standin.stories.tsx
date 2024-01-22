import * as React from "react";

import {RendererWithDebugUI} from "../../../../../../testing/renderer-with-debug-ui";

export default {
    title: "Perseus/Widgets/Deprecated Standin",
};

const question1 = {
    content:
        "$\\overleftrightarrow{MN}$ is the perpendicular bisector of segment $\\overline{JL}$.  \n\n**Perform a reflection that proves $M$ must be equidistant from $J$ and $L$ and select the option which explains the proof.**  \nThe statement must be true for any point $M$ which lies on the perpendicular bisector.  \n\n[[☃ standin 1]]  \n\n",
    images: {
        "https://ka-perseus-images.s3.amazonaws.com/6cf0d9f007084e9d06e3ce0e241416dde920ec9c.png":
            {height: 503, width: 504},
    },
    widgets: {
        "standin 1": {
            graded: true,
            options: {},
            type: "deprecated-standin",
            version: {major: 0, minor: 0},
        },
    },
} as const;

type StoryArgs = Record<any, any>;

export const Question1 = (args: StoryArgs): React.ReactElement => {
    return <RendererWithDebugUI question={question1} />;
};
