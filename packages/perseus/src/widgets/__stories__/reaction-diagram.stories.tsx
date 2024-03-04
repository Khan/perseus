import * as React from "react";

import {RendererWithDebugUI} from "../../../../../testing/renderer-with-debug-ui";

import type {PerseusRenderer} from "../../perseus-types";

export default {
    title: "Perseus/Widgets/ReactionDiagram",
};

const question1 = {
    content: "[[\u2603 reaction-diagram 1]]",
    images: {},
    widgets: {
        "reaction-diagram 1": {
            graded: true,
            version: {
                major: 0,
                minor: 0,
            },
            static: false,
            type: "reaction-diagram",
            options: {
                rotationAngle: [90, 90, 180],
                widgetId: "reaction-diagram 1",
                separators: [
                    {type: "right", topText: "", bottomText: ""},
                    {type: "points", topText: "", bottomText: ""},
                ],
                smiles: ["CCC(=O)O", "CC(CC)C", "CC(=O)[O-]"],
            },
            alignment: "default",
        },
    },
} as PerseusRenderer;

type StoryArgs = Record<any, any>;

export const Question1 = (args: StoryArgs): React.ReactElement => {
    return <RendererWithDebugUI question={question1} />;
};
