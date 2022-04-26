// @flow
import * as React from "react";

import Graph from "../graph.jsx";
// TODO(scottgrant): Katex is unavailable here. Fix!

type StoryArgs = {||};

type Story = {|
    title: string,
|};

const size = 200;

export default ({
    title: "Perseus/Components/Graph",
}: Story);

export const SquareBoxSizeAndOtherwiseEmpty = (args: StoryArgs): React.Node => {
    return <Graph box={[size, size]} />;
};

export const LabeledSquaredBox = (args: StoryArgs): React.Node => {
    return (
        <Graph box={[size, size]} labels={["First label", "Second label"]} />
    );
};
