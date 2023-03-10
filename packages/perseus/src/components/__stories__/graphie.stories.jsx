// @flow
import * as React from "react";

import {ItemRendererWithDebugUI} from "../../../../../testing/item-renderer-with-debug-ui.jsx";
import {itemWithPieChart} from "../../__testdata__/graphie_testdata.js";
import Graphie from "../graphie.jsx";

type StoryArgs = {||};

type Story = {|
    title: string,
|};

const size = 200;

export default ({
    title: "Perseus/Components/Graphie",
}: Story);

export const SquareBoxSizeAndOtherwiseEmpty = (args: StoryArgs): React.Node => {
    return (
        <Graphie
            box={[size, size]}
            setDrawingAreaAvailable={() => {}}
            setup={() => {}}
        />
    );
};

export const PieChartGraphieLabels = (args: StoryArgs): React.Node => {
    return <ItemRendererWithDebugUI item={itemWithPieChart} />;
};
