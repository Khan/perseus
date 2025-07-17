import {generateTestPerseusItem} from "@khanacademy/perseus-core";

import {ServerItemRendererWithDebugUI} from "../../../../../testing/server-item-renderer-with-debug-ui";

import {
    absoluteValueQuestion,
    multipleAvailableTypesQuestion,
    exponentialQuestion,
    linearQuestion,
    logarithmQuestion,
    quadraticQuestion,
    sinusoidQuestion,
    simpleQuestion,
    staticGrapher,
} from "./grapher.testdata";

import type {Meta, StoryObj} from "@storybook/react-vite";

const meta: Meta = {
    title: "Widgets/Grapher",
    component: ServerItemRendererWithDebugUI,
};
export default meta;

type Story = StoryObj<typeof ServerItemRendererWithDebugUI>;

export const AbsoluteValueQuestion: Story = {
    args: {
        item: generateTestPerseusItem({question: absoluteValueQuestion}),
    },
    parameters: {
        docs: {
            disable: false, // This specific story will be shown in autodocs as the default story
        },
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
            question: multipleAvailableTypesQuestion,
        }),
    },
};

export const AnswerlessQuestion: Story = {
    args: {
        item: generateTestPerseusItem({question: absoluteValueQuestion}),
        startAnswerless: true,
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
