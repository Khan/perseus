import * as React from "react";

import Zoomable from "../zoomable";

import type {Meta, StoryObj} from "@storybook/react-vite";

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
    parameters: {
        chromatic: {
            // Disable the snapshot for this story because it's testing
            // behavior, not visuals.
            disableSnapshot: true,
        },
    },
};
export default meta;

type Story = StoryObj<typeof Zoomable>;

export const ZoomableExample: Story = {
    args: {
        children: (
            <span>
                Here&apos;s some zoomed-out content.
                <br />
                <br />
                Click on the content to zoom/unzoom.
            </span>
        ),
    },
};
