import {generateTestPerseusItem} from "@khanacademy/perseus-core";

import WrappedServerItemRenderer from "../../../server-item-renderer";
import {storybookDependenciesV2} from "../../../testing/test-dependencies";
import {
    absoluteValueQuestion,
    allAvailableTypesQuestion,
    exponentialQuestion,
    linearQuestion,
    logarithmQuestion,
    quadraticQuestion,
    sinusoidQuestion,
    simpleQuestion,
    staticGrapher,
} from "../grapher.testdata";

import type {Meta, StoryObj} from "@storybook/react-vite";

const meta: Meta = {
    title: "Widgets/Grapher",
    component: WrappedServerItemRenderer,
    tags: ["!dev"],
    args: {
        dependencies: storybookDependenciesV2,
    },
    parameters: {
        docs: {
            description: {
                component:
                    "A widget that enables users to graph various mathematical functions,\
                    including linear, quadratic, exponential, and trigonometric equations on a coordinate plane.",
            },
        },
    },
};
export default meta;

type Story = StoryObj<typeof WrappedServerItemRenderer>;

export const AbsoluteValueQuestion: Story = {
    args: {
        item: generateTestPerseusItem({question: absoluteValueQuestion}),
    },
};

export const ExponentialQuestion: Story = {
    args: {
        item: generateTestPerseusItem({question: exponentialQuestion}),
    },
};

export const LinearQuestion: Story = {
    args: {
        item: generateTestPerseusItem({question: linearQuestion}),
    },
};

export const LogarithmQuestion: Story = {
    args: {
        item: generateTestPerseusItem({question: logarithmQuestion}),
    },
};

export const QuadraticQuestion: Story = {
    args: {
        item: generateTestPerseusItem({question: quadraticQuestion}),
    },
};

export const SinusoidQuestion: Story = {
    args: {
        item: generateTestPerseusItem({question: sinusoidQuestion}),
    },
};

export const ComplexQuestion: Story = {
    args: {
        item: generateTestPerseusItem({
            question: allAvailableTypesQuestion,
        }),
    },
};

export const AnswerlessQuestion: Story = {
    args: {
        item: generateTestPerseusItem({question: absoluteValueQuestion}),
    },
};

export const SimpleQuestion: Story = {
    args: {
        item: generateTestPerseusItem({question: simpleQuestion}),
    },
};

export const Static: Story = {
    args: {
        item: generateTestPerseusItem({question: staticGrapher}),
    },
};
