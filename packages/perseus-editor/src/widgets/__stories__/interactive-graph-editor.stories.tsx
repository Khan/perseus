import * as React from "react";

import InteractiveGraphEditor from "../interactive-graph-editor";

import InteractiveGraphEditorArgTypes from "./interactive-graph-editor.argtypes";

import type {Meta, StoryObj} from "@storybook/react";

export default {
    title: "Perseus/Editor/Widgets/Interactive Graph Editor",
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
 * props are controlled by the parent.
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
