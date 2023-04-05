import * as React from "react";

import {ItemRendererWithDebugUI} from "../../../../../testing/item-renderer-with-debug-ui";
import {itemWithPieChart} from "../../__testdata__/graphie.testdata";
import Graphie from "../graphie";

type StoryArgs = Record<any, any>;

type Story = {
    title: string;
};

const size = 200;

export default {
    title: "Perseus/Components/Graphie",
} as Story;

export const SquareBoxSizeAndOtherwiseEmpty: React.FC<StoryArgs> = (
    args,
): React.ReactElement => {
    return (
        <Graphie
            box={[size, size]}
            setDrawingAreaAvailable={() => {}}
            setup={() => {}}
        />
    );
};

export const PieChartGraphieLabels: React.FC<StoryArgs> = (
    args,
): React.ReactElement => {
    return <ItemRendererWithDebugUI item={itemWithPieChart} />;
};
