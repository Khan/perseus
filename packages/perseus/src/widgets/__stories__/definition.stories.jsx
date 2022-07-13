// @flow
import * as React from "react";

import {RendererWithDebugUI} from "../../../../../testing/renderer-with-debug-ui.jsx";

export default {
    title: "Perseus/Widgets/Definition",
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
            type: "definition",
            options: {
                definition:
                    "A Native American people in Connecticut; white settlers in New England, the Pequots, and their respective allies were at war from 1636-1638.",
                togglePrompt: "the Pequots",
                static: false,
            },
            alignment: "default",
        },
    },
};

const question2 = {
    content:
        "Read the excerpt and answer the question below. \n\nThe [[\u2603 definition 2]] and Council of the Massachusetts had much conference many days; and at last . . . . concluded a peace and friendship with [[\u2603 definition 1]], upon these conditions.",
    images: {},
    widgets: {
        "definition 1": {
            graded: true,
            version: {
                major: 0,
                minor: 0,
            },
            static: false,
            type: "definition",
            options: {
                definition:
                    "A Native American people in Connecticut; white settlers in New England, the Pequots, and their respective allies were at war from 1636-1638.",
                togglePrompt: "the Pequots",
                static: false,
            },
            alignment: "default",
        },
        "definition 2": {
            graded: true,
            version: {
                major: 0,
                minor: 0,
            },
            static: false,
            type: "definition",
            options: {
                definition:
                    "A governor is an administrative leader and head of a polity or political region, ranking under the head of state and in some cases, such as governors-general, as the head of state's official representative.",
                togglePrompt: "Governor",
                static: false,
            },
            alignment: "default",
        },
    },
};

type StoryArgs = {||};

export const Question1 = (args: StoryArgs): React.Node => {
    return <RendererWithDebugUI question={question1} />;
};

export const MultipleDefintions = (args: StoryArgs): React.Node => {
    return <RendererWithDebugUI question={question2} />;
};
