import * as React from "react";

import {
    itemWithLabeledAngle,
    itemWithPieChart,
} from "../../__testdata__/graphie.testdata";
import {ServerItemRendererWithDebugUI} from "../../testing/server-item-renderer-with-debug-ui";
import Graphie from "../graphie";

import GraphieDocsPage from "./graphie.mdx";

import type {StoryObj, Meta} from "@storybook/react-vite";

type Story = StoryObj<typeof Graphie>;

const size = 200;

const meta: Meta = {
    title: "Components/Graphie",
    component: Graphie,
    parameters: {
        docs: {
            page: GraphieDocsPage,
        },
    },
};
export default meta;

/**
 * A demonstration of a Graphie rendered using the Perseus `Renderer` complete
 * with overlaid labels and an image caption below.
 */
export const PieChartGraphieLabels: Story = {
    render: () => <ServerItemRendererWithDebugUI item={itemWithPieChart} />,
};

export const AngleWithColoredGraphieLabels: Story = {
    render: () => <ServerItemRendererWithDebugUI item={itemWithLabeledAngle} />,
};

export const SquareBoxSizeAndOtherwiseEmpty: Story = {
    args: {
        box: [size, size],
        setup: () => {},
    },
};
