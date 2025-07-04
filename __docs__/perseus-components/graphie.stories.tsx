import * as React from "react";

import {ServerItemRendererWithDebugUI} from "../../testing/server-item-renderer-with-debug-ui";
import {itemWithPieChart} from "../../packages/perseus/src/__testdata__/graphie.testdata";
import Graphie from "../../packages/perseus/src/components/graphie";

import type {StoryObj, Meta} from "@storybook/react-vite";

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

/**
 * A demonstration of a Graphie rendered using the Perseus `Renderer` complete
 * with overlaid labels and an image caption below.
 */
export const PieChartGraphieLabels = () => {
    return <ServerItemRendererWithDebugUI item={itemWithPieChart} />;
};
