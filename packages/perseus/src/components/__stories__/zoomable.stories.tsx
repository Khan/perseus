import * as React from "react";

import Zoomable from "../zoomable";

import type {Meta, StoryObj} from "@storybook/react";

type Bounds = {
    width: number;
    height: number;
};

const computeChildBounds = (
    parentNode: HTMLElement,
    parentBounds?: Bounds,
): Bounds => {
    return {
        width: 1000,
        height: 500,
    };
};

const meta: Meta = {
    title: "Perseus/Components/Zoomable",
    component: Zoomable,
    args: {
        computeChildBounds,
    },
    argTypes: {
        children: {table: {disable: true}},
    },
};
export default meta;

type Story = StoryObj<typeof Zoomable>;

export const ZoomableExample: Story = {
    args: {
        children: (
            <span>
                Here's some zoomed-out content.
                <br />
                <br />
                Click on the content to zoom/unzoom.
            </span>
        ),
    },
};
