import * as React from "react";

import InteractiveGraphSettings from "../../widgets/interactive-graph-editor/components/interactive-graph-settings";

import type {Meta, StoryObj} from "@storybook/react";

const meta: Meta = {
    title: "PerseusEditor/Components/Interactive Graph Settings",
    component: InteractiveGraphSettings,
    args: {
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
    },
};
export default meta;

type Story = StoryObj<typeof InteractiveGraphSettings>;

function StatefulDecorator(Story, context) {
    const reducer = (state, newState) => {
        return {
            ...state,
            ...newState,
        };
    };

    const [state, dispatch] = React.useReducer(reducer, context);
    return <Story {...state} onChange={dispatch} />;
}

export const Default: Story = {};

/**
 * Example of what the InteractiveGraphEditor experience is when all
 * props are controlled by the parent. (Checkboxes update when clicked, etc.)
 */
export const Controlled: Story = {
    decorators: [StatefulDecorator],
};
