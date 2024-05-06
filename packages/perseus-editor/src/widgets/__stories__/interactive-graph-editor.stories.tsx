import * as React from "react";

import {flags} from "../../__stories__/flags-for-api-options";
import InteractiveGraphEditor from "../interactive-graph-editor";

import InteractiveGraphEditorArgTypes from "./interactive-graph-editor.argtypes";

import type {Meta, StoryObj} from "@storybook/react";

const mafsOptions = {
    apiOptions: {
        flags,
    },
    graph: {
        type: "segment",
    },
    correct: {
        type: "segment",
    },
};

const defaultPointProps = {
    type: "point",
    color: "blue",
    filled: true,
};

export default {
    title: "PerseusEditor/Widgets/Interactive Graph Editor",
    component: InteractiveGraphEditor,
    argTypes: InteractiveGraphEditorArgTypes,
} as Meta<typeof InteractiveGraphEditor>;

export const Default = (args): React.ReactElement => {
    return <InteractiveGraphEditor {...args} />;
};

type StoryComponentType = StoryObj<typeof InteractiveGraphEditor>;

// Set the default values in the control panel.
Default.args = {
    box: [288, 288],
    gridStep: [1, 1],
    labels: ["x", "y"],
    markings: "graph",
    range: [
        [-10, 10],
        [-10, 10],
    ],
    rulerLabel: "",
    rulerTicks: 10,
    showProtractor: false,
    showRuler: false,
    showTooltips: false,
    snapStep: [1, 1],
    step: [1, 1],
};

/**
 * Example of what the InteractiveGraphEditor experience is when all
 * props are controlled by the parent. (Checkboxes update when clicked, etc.)
 */
export const Controlled: StoryComponentType = {
    render: function Render() {
        const reducer = (state, newState) => {
            return {
                ...state,
                ...newState,
            };
        };

        const [state, dispatch] = React.useReducer(reducer, {});

        return <InteractiveGraphEditor {...state} onChange={dispatch} />;
    },
};

/**
 * Example of what the InteractiveGraphEditor experience is when using
 * a Mafs-based InteractiveGraph.
 */
export const WithMafs: StoryComponentType = {
    render: function Render() {
        const reducer = (state, newState) => {
            return {
                ...state,
                ...newState,
            };
        };

        const [state, dispatch] = React.useReducer(reducer, mafsOptions);

        return <InteractiveGraphEditor {...state} onChange={dispatch} />;
    },
};

/**
 * This InteractiveGraphEditor has locked points.
 *
 * Locked figures are graph elements such as points, lines, line segements,
 * etc. that are locked in place and not interactive. They can be added
 * with the "Add element" dropdown at the bottom.
 */
export const WithLockedPoints: StoryComponentType = {
    render: function Render() {
        const reducer = (state, newState) => {
            return {
                ...state,
                ...newState,
            };
        };

        const [state, dispatch] = React.useReducer(reducer, {
            // Use locked figures with mafs only.
            ...mafsOptions,
            lockedFigures: [
                {
                    ...defaultPointProps,
                    coord: [1, 1],
                },
                {
                    ...defaultPointProps,
                    coord: [-1, -1],
                },
            ],
        });

        return <InteractiveGraphEditor {...state} onChange={dispatch} />;
    },
};

/**
 * This InteractiveGraphEditor has a locked line segment, line, and ray.
 *
 * Locked figures are graph elements such as points, lines, line segements,
 * etc. that are locked in place and not interactive. They can be added
 * with the "Add element" dropdown at the bottom.
 */
export const WithLockedLines: StoryComponentType = {
    render: function Render() {
        const reducer = (state, newState) => {
            return {
                ...state,
                ...newState,
            };
        };

        const [state, dispatch] = React.useReducer(reducer, {
            // Use locked figures with mafs only.
            ...mafsOptions,
            lockedFigures: [
                {
                    type: "line",
                    kind: "line",
                    points: [
                        {...defaultPointProps, coord: [0, 2]},
                        {...defaultPointProps, coord: [2, 3]},
                    ],
                    color: "blue",
                    lineStyle: "solid",
                    showStartPoint: false,
                    showEndPoint: false,
                },
                {
                    type: "line",
                    kind: "ray",
                    points: [
                        {...defaultPointProps, color: "pink", coord: [0, 0]},
                        {...defaultPointProps, color: "pink", coord: [4, 2]},
                    ],
                    color: "pink",
                    lineStyle: "solid",
                    showStartPoint: true,
                    showEndPoint: false,
                },
                {
                    type: "line",
                    kind: "segment",
                    points: [
                        {...defaultPointProps, color: "green", coord: [0, -2]},
                        {...defaultPointProps, color: "green", coord: [4, 0]},
                    ],
                    color: "green",
                    lineStyle: "solid",
                    showStartPoint: true,
                    showEndPoint: true,
                },
            ],
        });

        return <InteractiveGraphEditor {...state} onChange={dispatch} />;
    },
};
