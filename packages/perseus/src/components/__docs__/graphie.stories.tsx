import * as React from "react";

import {ServerItemRendererWithDebugUI} from "../../testing/server-item-renderer-with-debug-ui";
import {itemWithPieChart} from "../../__testdata__/graphie.testdata";
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
    args: {
        box: [size, size],
        setup: () => {},
        setDrawingAreaAvailable: () => {},
    },
    render: (args) => <ServerItemRendererWithDebugUI item={itemWithPieChart} />,
};

export const SquareBoxSizeAndOtherwiseEmpty: Story = {
    args: {
        box: [size, size],
        setup: () => {},
        setDrawingAreaAvailable: () => {},
    },
};
