import {generateTestPerseusItem} from "@khanacademy/perseus-core";

import {ApiOptions} from "../../../perseus-api";
import {ServerItemRendererWithDebugUI} from "../../../testing/server-item-renderer-with-debug-ui";
import {
    angleQuestion,
    circleQuestion,
    linearQuestion,
    linearSystemQuestion,
    pointQuestion,
    polygonQuestion,
    rayQuestion,
    segmentQuestion,
    segmentWithLockedPointsQuestion,
    segmentWithLockedLineQuestion,
    segmentWithAllLockedLineSegmentVariations,
    segmentWithAllLockedLineVariations,
    segmentWithAllLockedRayVariations,
    sinusoidQuestion,
    segmentWithLockedEllipses,
    segmentWithLockedVectors,
    segmentWithLockedPolygons,
    staticGraphQuestion,
    staticGraphQuestionWithAnotherWidget,
    segmentWithLockedLabels,
    unlimitedPolygonQuestion,
    unlimitedPointQuestion,
    floatingPointIssueQuestion,
} from "../interactive-graph.testdata";

import type {Meta, StoryObj} from "@storybook/react-vite";

const defaultApiOptions = ApiOptions.defaults;

const meta: Meta = {
    title: "Widgets/Interactive Graph",
    component: ServerItemRendererWithDebugUI,
    tags: ["!dev"],
    parameters: {
        docs: {
            description: {
                component:
                    "A widget that allows users to interact with mathematical graphs,\
                    supporting the creation and manipulation of various graph elements.",
            },
        },
    },
};
export default meta;

type Story = StoryObj<typeof ServerItemRendererWithDebugUI>;

export const Angle: Story = {
    args: {
        item: generateTestPerseusItem({question: angleQuestion}),
    },
};

export const Circle: Story = {
    args: {
        item: generateTestPerseusItem({question: circleQuestion}),
    },
};

export const Linear: Story = {
    args: {
        item: generateTestPerseusItem({question: linearQuestion}),
    },
};

export const LinearSystem: Story = {
    args: {
        item: generateTestPerseusItem({question: linearSystemQuestion}),
    },
};

export const Point: Story = {
    args: {
        item: generateTestPerseusItem({question: pointQuestion}),
    },
};

export const Polygon: Story = {
    args: {
        item: generateTestPerseusItem({question: polygonQuestion}),
    },
};

export const UnlimitedPolygon: Story = {
    args: {
        item: generateTestPerseusItem({question: unlimitedPolygonQuestion}),
    },
};

export const Ray: Story = {
    args: {
        item: generateTestPerseusItem({question: rayQuestion}),
    },
};

export const Segment: Story = {
    args: {
        item: generateTestPerseusItem({question: segmentQuestion}),
    },
};

export const Sinusoid: Story = {
    args: {
        item: generateTestPerseusItem({question: sinusoidQuestion}),
    },
};

export const LockedPoints: Story = {
    args: {
        item: generateTestPerseusItem({
            question: segmentWithLockedPointsQuestion,
        }),
    },
};

export const LockedLines: Story = {
    args: {
        item: generateTestPerseusItem({
            question: segmentWithLockedLineQuestion,
        }),
    },
};

export const AllLockedLineSegmentStyles: Story = {
    args: {
        item: generateTestPerseusItem({
            question: segmentWithAllLockedLineSegmentVariations,
        }),
    },
};

export const AllLockedLineStyles: Story = {
    args: {
        item: generateTestPerseusItem({
            question: segmentWithAllLockedLineVariations,
        }),
    },
};

export const AllLockedRayStyles: Story = {
    args: {
        item: generateTestPerseusItem({
            question: segmentWithAllLockedRayVariations,
        }),
    },
};

export const LockedVector: Story = {
    args: {
        item: generateTestPerseusItem({
            question: segmentWithLockedVectors,
        }),
    },
};

export const LockedEllipse: Story = {
    args: {
        item: generateTestPerseusItem({
            question: segmentWithLockedEllipses,
        }),
    },
};

export const LockedPolygon: Story = {
    args: {
        item: generateTestPerseusItem({
            question: segmentWithLockedPolygons,
        }),
    },
};

export const LockedLabel: Story = {
    args: {
        item: generateTestPerseusItem({
            question: segmentWithLockedLabels,
        }),
    },
};

/**
 * Read only mode appears after a question is answered.
 */
export const PolygonReadOnly: Story = {
    args: {
        item: generateTestPerseusItem({
            question: polygonQuestion,
        }),
        apiOptions: {...defaultApiOptions, readOnly: true},
    },
};

/**
 * Content authors can specify if they want a graph to be static, which
 * makes the graph non-interactive. This is generally used for hints.
 */
export const StaticGraph: Story = {
    args: {
        item: generateTestPerseusItem({
            question: staticGraphQuestion,
        }),
    },
};

export const StaticGraphWithAnotherWidget: Story = {
    args: {
        item: generateTestPerseusItem({
            question: staticGraphQuestionWithAnotherWidget(),
        }),
    },
};

export const TooltipsWithFloatingPointIssues: Story = {
    args: {
        item: generateTestPerseusItem({
            question: floatingPointIssueQuestion,
        }),
    },
};

export const AnswerlessAngle: Story = {
    args: {
        item: generateTestPerseusItem({
            question: angleQuestion,
        }),
    },
};

export const AnswerlessCircle: Story = {
    args: {
        item: generateTestPerseusItem({
            question: circleQuestion,
        }),
    },
};

export const AnswerlessLinear: Story = {
    args: {
        item: generateTestPerseusItem({
            question: linearQuestion,
        }),
    },
};

export const AnswerlessLinearSystem: Story = {
    args: {
        item: generateTestPerseusItem({
            question: linearSystemQuestion,
        }),
    },
};

export const AnswerlessPoint: Story = {
    args: {
        item: generateTestPerseusItem({
            question: pointQuestion,
        }),
    },
};

export const AnswerlessPolygon: Story = {
    args: {
        item: generateTestPerseusItem({
            question: polygonQuestion,
        }),
    },
};

export const AnswerlessUnlimitedPolygon: Story = {
    args: {
        item: generateTestPerseusItem({
            question: unlimitedPolygonQuestion,
        }),
    },
};

export const AnswerlessRay: Story = {
    args: {
        item: generateTestPerseusItem({
            question: rayQuestion,
        }),
    },
};

export const AnswerlessSegment: Story = {
    args: {
        item: generateTestPerseusItem({
            question: segmentQuestion,
        }),
    },
};

export const AnswerlessSinusoid: Story = {
    args: {
        item: generateTestPerseusItem({
            question: sinusoidQuestion,
        }),
    },
};

/**
 * Demonstrates that users can click anywhere on the graph to add new points.
 * The graph starts empty and each click places a point at the clicked location.
 */
export const ClickToAddPoints: Story = {
    args: {
        item: generateTestPerseusItem({question: unlimitedPointQuestion}),
    },
    play: async ({canvas, userEvent}) => {
        // The unlimited-point graph renders a transparent crosshair rect that
        // handles click events to add new points at the clicked coordinates.
        // eslint-disable-next-line testing-library/no-container, testing-library/no-node-access
        const graphArea = canvas.container.querySelector(
            'rect[style*="crosshair"]',
        );
        if (!graphArea) {
            return;
        }
        const rect = graphArea.getBoundingClientRect();
        // Click three positions across the graph to add three points
        await userEvent.click(graphArea, {
            clientX: rect.left + rect.width * 0.25,
            clientY: rect.top + rect.height * 0.5,
        });
        await userEvent.click(graphArea, {
            clientX: rect.left + rect.width * 0.5,
            clientY: rect.top + rect.height * 0.25,
        });
        await userEvent.click(graphArea, {
            clientX: rect.left + rect.width * 0.75,
            clientY: rect.top + rect.height * 0.5,
        });
    },
};
