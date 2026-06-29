import {waitFor} from "storybook/test";

import {themeModes} from "../../../../../../.storybook/modes";
import {mobileDecorator} from "../../__testutils__/story-decorators";

import {plotterRendererDecorator} from "./plotter-renderer-decorator";

import type {PerseusPlotterWidgetOptions} from "@khanacademy/perseus-core";
import type {Meta, StoryObj} from "@storybook/react-vite";

const earthImageUrl = "https://cdn.kastatic.org/images/badges/earth-small.png";

const meta: Meta<PerseusPlotterWidgetOptions> = {
    title: "Widgets/Plotter/Visual Regression Tests/Initial State",
    tags: ["!autodocs", "!manifest"],
    decorators: [plotterRendererDecorator],
    parameters: {
        docs: {
            description: {
                component:
                    "Regression tests for the Plotter widget that do NOT " +
                    "need any interactions to test, which will be used with " +
                    "Chromatic. Stories are all displayed on one page.",
            },
        },
        chromatic: {disableSnapshot: false, modes: themeModes},
    },
};
export default meta;

type Story = StoryObj<typeof meta>;

export const BarChart: Story = {
    args: {
        type: "bar",
        labels: ["School grade", "Number of absent students"],
        categories: ["1st", "2nd", "3rd", "4th", "5th"],
        starting: [15, 25, 5, 10, 10],
        correct: [15, 25, 5, 10, 10],
        maxY: 30,
        scaleY: 5,
    },
};

export const BarChartMobile: Story = {
    decorators: [mobileDecorator],
    parameters: {
        apiOptions: {isMobile: true},
    },
    args: {
        type: "bar",
        labels: ["School grade", "Number of absent students"],
        categories: ["1st", "2nd", "3rd", "4th", "5th"],
        starting: [15, 25, 5, 10, 10],
        correct: [15, 25, 5, 10, 10],
        maxY: 30,
        scaleY: 5,
    },
};

export const DotPlot: Story = {
    args: {
        type: "dotplot",
        labels: ["", "Average Temp"],
        categories: ["Spring", "Summer", "Fall", "Winter"],
        starting: [3, 6, 4, 2],
        correct: [3, 6, 4, 2],
        maxY: 10,
        scaleY: 1,
        snapsPerLine: 2,
    },
};

export const LinePlot: Story = {
    args: {
        type: "line",
        labels: ["Day", "Temperature"],
        categories: ["Mon", "Tue", "Wed", "Thu", "Fri"],
        starting: [3, 3, 3, 3, 3],
        correct: [4, 6, 5, 7, 8],
        maxY: 10,
        scaleY: 1,
    },
};

export const LinePlotMobile: Story = {
    decorators: [mobileDecorator],
    parameters: {
        apiOptions: {isMobile: true},
    },
    args: {
        type: "line",
        labels: ["Day", "Temperature"],
        categories: ["Mon", "Tue", "Wed", "Thu", "Fri"],
        starting: [3, 3, 3, 3, 3],
        correct: [4, 6, 5, 7, 8],
        maxY: 10,
        scaleY: 1,
    },
};

export const Histogram: Story = {
    args: {
        type: "histogram",
        labels: ["Score range", "Frequency"],
        categories: ["0-10", "10-20", "20-30", "30-40", "40-50"],
        starting: [2, 5, 8, 4, 1],
        correct: [2, 5, 8, 4, 1],
        maxY: 10,
        scaleY: 1,
    },
};

// Uses the `play` function to wait for the image to load so the snapshot is
// captured with the pictograph fully rendered rather than mid-load.
export const Pictograph: Story = {
    args: {
        type: "pic",
        labels: ["Planet", "Count"],
        categories: ["Mercury", "Venus", "Earth", "Mars"],
        starting: [2, 4, 3, 1],
        correct: [2, 4, 3, 1],
        maxY: 6,
        scaleY: 1,
        picUrl: earthImageUrl,
        picSize: 40,
        picBoxHeight: 40,
    },
    play: async ({canvasElement}) => {
        // The pictograph renders each tile as an SVG <image> element (via
        // Raphael). Wait until at least one is present in the DOM.
        await waitFor(() => {
            if (canvasElement.querySelectorAll("image").length === 0) {
                throw new Error("Pictograph images have not rendered yet");
            }
        });
        // Then preload the source so the bitmap is decoded and painted
        // before Chromatic snapshots the story.
        await new Promise<void>((resolve) => {
            const img = new Image();
            // Resolve on error too so a failed load can't hang the story.
            img.onload = () => resolve();
            img.onerror = () => resolve();
            img.src = earthImageUrl;
        });
    },
};
