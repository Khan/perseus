import * as React from "react";

import {flags} from "../../__stories__/flags-for-api-options";
import InteractiveGraphEditor from "../interactive-graph-editor";

import InteractiveGraphEditorArgTypes from "./interactive-graph-editor.argtypes";

import type {Meta, StoryObj} from "@storybook/react";

export default {
    title: "Perseus Editor/Widgets/Interactive Graph Editor",
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
 * This InteractiveGraphEditor has locked figures. Locked figures are graph
 * elements such as points, lines, line segements, etc. that are locked in
 * place and not interactive.
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
            apiOptions: {flags},
            graph: {
                type: "segment",
            },
            correct: {
                type: "segment",
            },
            lockedFigures: [
                {
                    type: "point",
                    coord: [1, 1],
                    color: "blue",
                    filled: true,
                },
                {
                    type: "point",
                    coord: [-1, -1],
                    color: "purple",
                    filled: false,
                },
            ],
        });

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

        const [state, dispatch] = React.useReducer(reducer, {
            apiOptions: {flags},
            graph: {
                type: "segment",
            },
            correct: {
                type: "segment",
            },
        });

        return <InteractiveGraphEditor {...state} onChange={dispatch} />;
    },
};
