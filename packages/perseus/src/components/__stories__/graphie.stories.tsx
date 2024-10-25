import * as React from "react";

import {ServerItemRendererWithDebugUI} from "../../../../../testing/server-item-renderer-with-debug-ui";
import {itemWithPieChart} from "../../__testdata__/graphie.testdata";
import Graphie from "../graphie";

import type {StoryObj, Meta} from "@storybook/react";

type Story = StoryObj<typeof Graphie>;

const size = 200;

const meta: Meta = {
    title: "Perseus/Components/Graphie",
    component: Graphie,
    args: {
        box: [size, size],
        setup: () => {},
        setDrawingAreaAvailable: () => {},
    },
};
export default meta;

export const SquareBoxSizeAndOtherwiseEmpty: Story = {};

export const PieChartGraphieLabels = () => {
    return <ServerItemRendererWithDebugUI item={itemWithPieChart} />;
};
