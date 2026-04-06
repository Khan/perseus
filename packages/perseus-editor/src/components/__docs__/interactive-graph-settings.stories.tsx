import * as React from "react";

import InteractiveGraphSettings from "../../widgets/interactive-graph-editor/components/interactive-graph-settings";

import InteractiveGraphSettingsArgTypes from "./interactive-graph-settings.argtypes";

import type {StoryObj} from "@storybook/react-vite";

export default {
    title: "Editors/Components/Interactive Graph Settings",
    component: InteractiveGraphSettings,
    argTypes: InteractiveGraphSettingsArgTypes,
};

export const Default = (args): React.ReactElement => {
    return <InteractiveGraphSettings {...args} />;
};

type StoryComponentType = StoryObj<typeof InteractiveGraphSettings>;

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

        return <InteractiveGraphSettings {...state} onChange={dispatch} />;
    },
};
