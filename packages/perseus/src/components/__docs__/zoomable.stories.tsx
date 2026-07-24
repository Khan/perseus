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
    title: "Components/Zoomable",
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

/**
 * The mobile apps honor the device font scale by applying CSS `zoom` to
 * the page. Zoomable fits content to the zoom-adjusted width, so the
 * fitted content's visual size grows with the font scale instead of being
 * scaled back down to its unzoomed size (LEMS-3885). The table below
 * should render with visibly larger text than the same story without the
 * zoomed container.
 */
export const UnderAncestorCSSZoom: Story = {
    args: {
        // Measure the actual table rather than the default story's
        // hard-coded bounds.
        computeChildBounds: undefined,
        children: (
            <table>
                <thead>
                    <tr>
                        <th>Planet</th>
                        <th>Diameter (km)</th>
                        <th>Distance from sun (AU)</th>
                        <th>Orbital period (years)</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>Mercury</td>
                        <td>4,879</td>
                        <td>0.39</td>
                        <td>0.24</td>
                    </tr>
                    <tr>
                        <td>Neptune</td>
                        <td>49,244</td>
                        <td>30.1</td>
                        <td>164.8</td>
                    </tr>
                </tbody>
            </table>
        ),
    },
    decorators: [
        (StoryComponent) => (
            <div style={{zoom: 1.6, width: 320, overflowX: "auto"}}>
                <StoryComponent />
            </div>
        ),
    ],
};
