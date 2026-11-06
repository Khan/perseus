import {generateTestPerseusItem} from "@khanacademy/perseus-core";

import WrappedServerItemRenderer from "../../../server-item-renderer";
import {storybookDependenciesV2} from "../../../testing/test-dependencies";
import {
    angleCongruent,
    angleStandardPosition,
    cardioid,
    circleRadiusThree,
    halfUnitGrid,
    labeledPoints,
    lemniscate,
    rayRadians,
    readFromCurve,
    singlePointDegrees,
    threePetalRose,
    twoPointsRadians,
    ungradedRose,
} from "../polar-graph.testdata";

import type {Meta, StoryObj} from "@storybook/react-vite";

const meta: Meta = {
    title: "Widgets/Polar Graph",
    component: WrappedServerItemRenderer,
    tags: ["!dev"],
    args: {
        dependencies: storybookDependenciesV2,
    },
    parameters: {
        docs: {
            description: {
                component:
                    "A graph of concentric circles and spokes where the " +
                    "learner places points and curves by radius and angle. " +
                    "Handles snap to the grid; arrow keys change the radius " +
                    "(up and down) and the angle (left and right).",
            },
        },
    },
};
export default meta;

type Story = StoryObj<typeof WrappedServerItemRenderer>;

export const SinglePointDegrees: Story = {
    args: {
        item: generateTestPerseusItem({question: singlePointDegrees}),
    },
};

export const TwoPointsRadians: Story = {
    args: {
        item: generateTestPerseusItem({question: twoPointsRadians}),
    },
};

export const HalfUnitGrid: Story = {
    args: {
        item: generateTestPerseusItem({question: halfUnitGrid}),
    },
};

export const Ray: Story = {
    args: {
        item: generateTestPerseusItem({question: rayRadians}),
    },
};

export const Circle: Story = {
    args: {
        item: generateTestPerseusItem({question: circleRadiusThree}),
    },
};

export const Cardioid: Story = {
    args: {
        item: generateTestPerseusItem({question: cardioid}),
    },
};

export const Rose: Story = {
    args: {
        item: generateTestPerseusItem({question: threePetalRose}),
    },
};

export const AngleInStandardPosition: Story = {
    args: {
        item: generateTestPerseusItem({question: angleStandardPosition}),
    },
};

export const AngleAnyPosition: Story = {
    args: {
        item: generateTestPerseusItem({question: angleCongruent}),
    },
};

export const Lemniscate: Story = {
    args: {
        item: generateTestPerseusItem({question: lemniscate}),
    },
};

export const ReadFromLockedCurve: Story = {
    args: {
        item: generateTestPerseusItem({question: readFromCurve}),
    },
};

export const LabeledPoints: Story = {
    args: {
        item: generateTestPerseusItem({question: labeledPoints}),
    },
};

export const UngradedSketchpad: Story = {
    args: {
        item: generateTestPerseusItem({question: ungradedRose}),
    },
};
