// @flow

import * as React from "react";

import Zoomable from "../zoomable.jsx";

type StoryArgs = {||};

type Story = {|
    title: string,
|};

export default ({
    title: "Perseus/Components/Zoomable",
}: Story);

type Bounds = {|
    width: number,
    height: number,
|};

const computeChildBounds = (parentNode, parentBounds?: Bounds): Bounds => {
    return {
        width: 1000,
        height: 500,
    };
};

export const ZoomableExample = (args: StoryArgs): React.Node => {
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
