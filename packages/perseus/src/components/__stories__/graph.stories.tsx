import * as React from "react";

import Graph from "../graph";

import type {StoryObj, Meta} from "@storybook/react";

type StoryArgs = StoryObj<Graph>;

type Story = Meta<Graph>;

const size = 200;

export default {
    title: "Perseus/Components/Graph",
} as Story;

export const SquareBoxSizeAndOtherwiseEmpty = (
    args: StoryArgs,
): React.ReactElement => {
    return <Graph box={[size, size]} />;
};

export const LabeledSquaredBox = (args: StoryArgs): React.ReactElement => {
    return (
        <Graph box={[size, size]} labels={["First label", "Second label"]} />
    );
};
