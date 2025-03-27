import {action} from "@storybook/addon-actions";
import type {Meta, StoryObj} from "@storybook/react";
import * as React from "react";
import InteractiveGraphEditor from "../interactive-graph-editor/interactive-graph-editor";

const meta: Meta = {
    title: "PerseusEditor/Widgets/Interactive Graph Editor",
    component: InteractiveGraphEditor,
    args: {
        box: [3000, 3000],
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
        onChange: action("onChange"),
    },
    argTypes: {
        // Readonly controls - so we can see what the args are
        lockedFigures: {table: {readonly: true}},
    },
};
export default meta;

type Story = StoryObj<typeof InteractiveGraphEditor>;

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

export const Controlled: Story = {
    decorators: [StatefulDecorator],
};
