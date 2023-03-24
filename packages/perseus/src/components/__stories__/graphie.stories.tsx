import * as React from "react";

import {ItemRendererWithDebugUI} from '../../../../../testing/item-renderer-with-debug-ui';
// @ts-expect-error [FEI-5003] - TS2307 - Cannot find module '../../__testdata__/graphie_testdata' or its corresponding type declarations.
import {itemWithPieChart} from '../../__testdata__/graphie_testdata';
import Graphie from '../graphie';

type StoryArgs = Record<any, any>;

type Story = {
    title: string
};

const size = 200;

export default {
    title: "Perseus/Components/Graphie",
} as Story;

export const SquareBoxSizeAndOtherwiseEmpty: React.FC<StoryArgs> = (args): React.ReactElement => {
    return (
        <Graphie
            box={[size, size]}
            setDrawingAreaAvailable={() => {}}
            setup={() => {}}
        />
    );
};

export const PieChartGraphieLabels: React.FC<StoryArgs> = (args): React.ReactElement => {
    return <ItemRendererWithDebugUI item={itemWithPieChart} />;
};
