import * as React from "react";

import Zoomable from '../zoomable';

type StoryArgs = Record<any, any>;

type Story = {
    title: string
};

export default {
    title: "Perseus/Components/Zoomable",
} as Story;

type Bounds = {
    width: number,
    height: number
};

const computeChildBounds = (parentNode: HTMLElement, parentBounds?: Bounds): Bounds => {
    return {
        width: 1000,
        height: 500,
    };
};

export const ZoomableExample: React.FC<StoryArgs> = (args): React.ReactElement => {
    return (
        <Zoomable computeChildBounds={computeChildBounds}>
            <span>
                Here's some zoomed-out content.
                <br />
                <br />
                Click on the content to zoom/unzoom.
            </span>
        </Zoomable>
    );
};
