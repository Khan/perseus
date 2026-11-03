import {
    PolarMath,
    generatePolarGraphAngleGraph,
    generatePolarGraphCircleGraph,
    generatePolarGraphLemniscateGraph,
    generatePolarGraphLimaconGraph,
    generatePolarGraphLockedFigure,
    generatePolarGraphOptions,
    generatePolarGraphPointGraph,
    generatePolarGraphRayGraph,
    generatePolarGraphRoseGraph,
} from "@khanacademy/perseus-core";

import {themeModes} from "../../../../../../.storybook/modes";
import {rtlDecorator} from "../../__testutils__/story-decorators";

import {polarGraphRendererDecorator} from "./polar-graph-renderer-decorator";

import type {PerseusPolarGraphWidgetOptions} from "@khanacademy/perseus-core";
import type {Meta, StoryObj} from "@storybook/react-vite";

const meta: Meta<PerseusPolarGraphWidgetOptions> = {
    title: "Widgets/Polar Graph/Visual Regression Tests/Initial State",
    tags: ["!autodocs", "!manifest"],
    decorators: [polarGraphRendererDecorator],
    parameters: {
        docs: {
            description: {
                component:
                    "Regression tests for the polar graph widget that need " +
                    "no interaction, one story per sub-type, used with " +
                    "Chromatic.",
            },
        },
        chromatic: {disableSnapshot: false, modes: themeModes},
    },
};

export default meta;

type Story = StoryObj<typeof meta>;

export const PointDegrees: Story = {
    args: generatePolarGraphOptions({
        graph: generatePolarGraphPointGraph({numPoints: 2}),
    }),
};

export const PointRadians: Story = {
    args: generatePolarGraphOptions({
        angleUnit: "radians",
        angleStepDegrees: 30,
        graph: generatePolarGraphPointGraph({numPoints: 1}),
    }),
};

export const HalfUnitGrid: Story = {
    args: generatePolarGraphOptions({
        maxRadius: 2,
        radiusStep: 0.5,
        angleStepDegrees: 45,
        graph: generatePolarGraphPointGraph({numPoints: 1}),
    }),
};

export const Ray: Story = {
    args: generatePolarGraphOptions({graph: generatePolarGraphRayGraph()}),
};

export const AngleWithMeasure: Story = {
    args: generatePolarGraphOptions({
        angleUnit: "radians",
        angleStepDegrees: 30,
        graph: generatePolarGraphAngleGraph({
            showAngles: true,
            startCoords: [
                PolarMath.fromPolar(3, 0),
                PolarMath.fromPolar(3, 150),
            ],
        }),
    }),
};

export const Circle: Story = {
    args: generatePolarGraphOptions({graph: generatePolarGraphCircleGraph()}),
};

export const Cardioid: Story = {
    args: generatePolarGraphOptions({
        graph: generatePolarGraphLimaconGraph({
            startCoords: [
                [4, 0],
                [0, 0],
            ],
        }),
    }),
};

export const InnerLoopLimacon: Story = {
    args: generatePolarGraphOptions({
        graph: generatePolarGraphLimaconGraph({
            startCoords: [
                [3, 0],
                [1, 0],
            ],
        }),
    }),
};

export const Rose: Story = {
    args: generatePolarGraphOptions({
        graph: generatePolarGraphRoseGraph({k: 3, startCoords: [[4, 0]]}),
    }),
};

export const RoseFixedK: Story = {
    args: generatePolarGraphOptions({
        graph: generatePolarGraphRoseGraph({
            k: 4,
            fixedK: true,
            startCoords: [[3, 0]],
        }),
    }),
};

export const Lemniscate: Story = {
    args: generatePolarGraphOptions({
        graph: generatePolarGraphLemniscateGraph({startCoords: [[3, 0]]}),
    }),
};

export const ReadOnly: Story = {
    args: generatePolarGraphOptions({
        graph: generatePolarGraphPointGraph({numPoints: 1}),
    }),
    parameters: {apiOptions: {readOnly: true}},
};

/**
 * Perseus only measures the widget's width when `isMobile` is set, so this
 * is the layout a phone gets: the small 288px box with a 15° grid.
 */
export const PhoneWidth: Story = {
    args: generatePolarGraphOptions({
        graph: generatePolarGraphPointGraph({numPoints: 1}),
    }),
    parameters: {apiOptions: {isMobile: true}},
};

/** A graded static graph shows the answer in gray. */
export const StaticAnswer: Story = {
    args: generatePolarGraphOptions({
        correct: generatePolarGraphPointGraph({
            numPoints: 1,
            coords: [PolarMath.fromPolar(3, 45)],
        }),
    }),
    parameters: {isStatic: true},
};

/** An ungraded graph shows the "does not count" note above it. */
export const Ungraded: Story = {
    args: generatePolarGraphOptions({
        graph: generatePolarGraphRoseGraph({k: 3}),
    }),
    parameters: {graded: false},
};

// Only the locked figures: the learner's point figure starts with no
// points, so nothing draggable is drawn.
export const LockedFigures: Story = {
    args: generatePolarGraphOptions({
        graph: generatePolarGraphPointGraph({numPoints: 1}),
        lockedFigures: [
            generatePolarGraphLockedFigure(
                generatePolarGraphLimaconGraph({
                    coords: [
                        [4, 0],
                        [0, 0],
                    ],
                }),
                {
                    color: "purple",
                    strokeStyle: "dashed",
                    fillStyle: "translucent",
                },
            ),
            generatePolarGraphLockedFigure(
                generatePolarGraphCircleGraph({coords: [[2, 0]]}),
                {weight: "thick", fillStyle: "white"},
            ),
            generatePolarGraphLockedFigure(
                generatePolarGraphPointGraph({
                    coords: [PolarMath.fromPolar(3, 120)],
                }),
                {color: "green", filled: false},
            ),
            generatePolarGraphLockedFigure(
                generatePolarGraphPointGraph({
                    coords: [PolarMath.fromPolar(3, 240)],
                }),
                {color: "green"},
            ),
        ],
        lockedLabels: [
            {
                type: "label",
                coord: PolarMath.fromPolar(4.6, 25),
                text: "$r = 2 + 2\\cos\\theta$",
                color: "purple",
                size: "medium",
            },
        ],
    }),
    parameters: {
        initialUserInput: {
            "polar-graph 1": generatePolarGraphPointGraph({coords: []}),
        },
    },
};

export const LabeledPoints: Story = {
    args: generatePolarGraphOptions({
        graph: generatePolarGraphPointGraph({
            numPoints: 2,
            pointLabels: ["A", "B"],
            showPointLabels: true,
            startCoords: [
                PolarMath.fromPolar(3, 30),
                PolarMath.fromPolar(2, 210),
            ],
        }),
    }),
};

export const RightToLeft: Story = {
    decorators: [rtlDecorator],
    args: generatePolarGraphOptions({
        graph: generatePolarGraphPointGraph({numPoints: 1}),
    }),
};
