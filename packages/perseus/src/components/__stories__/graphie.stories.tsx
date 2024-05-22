import * as React from "react";

import {ServerItemRendererWithDebugUI} from "../../../../../testing/server-item-renderer-with-debug-ui";
import {itemWithPieChart} from "../../__testdata__/graphie.testdata";
import Graphie from "../graphie";

import type {StoryObj, Meta} from "@storybook/react";

type StoryArgs = StoryObj<Graphie>;

type Story = Meta<Graphie>;

const size = 200;

export default {
    title: "Perseus/Components/Graphie",
} as Story;

export const SquareBoxSizeAndOtherwiseEmpty = (
    args: StoryArgs,
): React.ReactElement => {
    return (
        <Graphie
            box={[size, size]}
            setDrawingAreaAvailable={() => {}}
            setup={() => {}}
        />
    );
};

export const PieChartGraphieLabels = (args: StoryArgs): React.ReactElement => {
    return <ServerItemRendererWithDebugUI item={itemWithPieChart} />;
};
