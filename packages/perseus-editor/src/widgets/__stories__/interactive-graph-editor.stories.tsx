import {action} from "@storybook/addon-actions";
import * as React from "react";

import {apiOptionsWithDefaults} from "../../__stories__/flags-for-api-options";
import InteractiveGraphEditor from "../interactive-graph-editor/interactive-graph-editor";
import {getDefaultFigureForType} from "../interactive-graph-editor/locked-figures/util";

import type {Meta, StoryObj} from "@storybook/react";

const mafsOptions = {
    apiOptions: apiOptionsWithDefaults,
    graph: {
        type: "segment" as const,
    },
    correct: {
        type: "segment" as const,
    },
};

const defaultPointProps = getDefaultFigureForType("point");

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
        // Hide controls that don't make sense to edit, or aren't easily
        // editable, in Storybook.
        apiOptions: {table: {disable: true}},
        backgroundImage: {table: {disable: true}},
        correct: {table: {disable: true}},
        graph: {table: {disable: true}},
        onChange: {table: {disable: true}},
        valid: {table: {disable: true}},
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

/**
 * Example of what the InteractiveGraphEditor experience is when all
 * props are controlled by the parent. (Checkboxes update when clicked, etc.)
 */
export const Controlled: Story = {
    decorators: [StatefulDecorator],
};

/**
 * Example of what the InteractiveGraphEditor experience is when using
 * a Mafs-based InteractiveGraph.
 */
export const WithMafs: Story = {
    args: mafsOptions,
    decorators: [StatefulDecorator],
};

/**
 * Example of what the InteractiveGraphEditor experience is when using
 * a Mafs-based InteractiveGraph to create Polygons.
 */
export const WithMafsPolygon: Story = {
    args: {
        ...mafsOptions,
        graph: {type: "polygon"},
        correct: {
            type: "polygon",
            numSides: 4,
            showAngles: true,
            showSides: true,
            snapTo: "angles",
        },
    },
    decorators: [StatefulDecorator],
};

/**
 * This InteractiveGraphEditor has locked points.
 *
 * Locked figures are graph elements such as points, lines, line segements,
 * etc. that are locked in place and not interactive. They can be added
 * with the "Add element" dropdown at the bottom.
 */
export const WithLockedPoints: Story = {
    args: {
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
    },
    decorators: [StatefulDecorator],
};

/**
 * This InteractiveGraphEditor has a locked line segment, line, and ray.
 *
 * Locked figures are graph elements such as points, lines, line segements,
 * etc. that are locked in place and not interactive. They can be added
 * with the "Add element" dropdown at the bottom.
 */
export const WithLockedLines: Story = {
    args: {
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
                color: "green",
                lineStyle: "solid",
                showPoint1: false,
                showPoint2: false,
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
                showPoint1: true,
                showPoint2: false,
            },
            {
                type: "line",
                kind: "segment",
                points: [
                    {...defaultPointProps, color: "grayH", coord: [0, -2]},
                    {...defaultPointProps, color: "grayH", coord: [4, 0]},
                ],
                color: "grayH",
                lineStyle: "solid",
                showPoint1: true,
                showPoint2: true,
            },
        ],
    },
    decorators: [StatefulDecorator],
};

export const WithLockedEllipses: Story = {
    args: {
        // Use locked figures with mafs only.
        ...mafsOptions,
        lockedFigures: [
            {
                type: "ellipse",
                center: [0, 0],
                radius: [5, 2],
                angle: 0,
                color: "green",
                fillStyle: "translucent",
                strokeStyle: "solid",
            },
        ],
    },
    decorators: [StatefulDecorator],
};

export const WithLockedPolygons: Story = {
    args: {
        // Use locked figures with mafs only.
        ...mafsOptions,
        lockedFigures: [
            {
                type: "polygon",
                points: [
                    [-9, 4],
                    [-6, 4],
                    [-6, 1],
                    [-9, 1],
                ],
                color: "green",
                fillStyle: "translucent",
                strokeStyle: "solid",
                showVertices: true,
            },
        ],
    },
    decorators: [StatefulDecorator],
};
