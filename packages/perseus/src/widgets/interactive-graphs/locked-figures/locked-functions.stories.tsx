import {generateTestPerseusItem} from "@khanacademy/perseus-core";

import {ServerItemRendererWithDebugUI} from "../../../../../../testing/server-item-renderer-with-debug-ui";
import {
    segmentWithLockedFunction,
    segmentWithLockedFunctionAndAsymmetricRange,
} from "../interactive-graph.testdata";

import type {Meta, StoryObj} from "@storybook/react-vite";

const meta: Meta = {
    title: "Widgets/Interactive Graph/Locked Functions",
    component: ServerItemRendererWithDebugUI,
    tags: ["autodocs", "!dev"],
    parameters: {
        // Since by default, we don't show all stories in autodocs; this will show all stories in autodocs only for this component.
        docs: {disable: false},
    },
};
export default meta;

type Story = StoryObj<typeof ServerItemRendererWithDebugUI>;

export const DefaultSettings: Story = {
    args: {
        item: generateTestPerseusItem({
            question: segmentWithLockedFunction(),
        }),
    },
};

export const StyledSettings: Story = {
    args: {
        item: generateTestPerseusItem({
            question: segmentWithLockedFunction("x^2", {
                color: "green",
                strokeStyle: "dashed",
            }),
        }),
    },
};

export const FunctionOfY: Story = {
    args: {
        item: generateTestPerseusItem({
            question: segmentWithLockedFunction("y^2", {
                directionalAxis: "y",
            }),
        }),
    },
};

export const FunctionOfYAsymmetricRange: Story = {
    args: {
        item: generateTestPerseusItem({
            question: segmentWithLockedFunctionAndAsymmetricRange("y/2", {
                directionalAxis: "y",
            }),
        }),
    },
};

export const DomainRestrictedMin: Story = {
    args: {
        item: generateTestPerseusItem({
            question: segmentWithLockedFunction("sin(x)", {
                domain: [-5, Infinity],
            }),
        }),
    },
};

export const DomainRestrictedMax: Story = {
    args: {
        item: generateTestPerseusItem({
            question: segmentWithLockedFunction("sin(x)", {
                domain: [-Infinity, 5],
            }),
        }),
    },
};

export const DomainRestrictedBoth: Story = {
    args: {
        item: generateTestPerseusItem({
            question: segmentWithLockedFunction("sin(x)", {
                domain: [-5, 5],
            }),
        }),
    },
};

export const Quadratic: Story = {
    args: {
        item: generateTestPerseusItem({
            question: segmentWithLockedFunction("x^2 + 2x + 3"),
        }),
    },
};

export const CubicPolynomial: Story = {
    args: {
        item: generateTestPerseusItem({
            question: segmentWithLockedFunction("(1/3)x^3 - 2x^2 + 3x - 4"),
        }),
    },
};

export const Tangent: Story = {
    args: {
        item: generateTestPerseusItem({
            question: segmentWithLockedFunction("tan(x)"),
        }),
    },
};

export const ArcTangent: Story = {
    args: {
        item: generateTestPerseusItem({
            question: segmentWithLockedFunction("arctan(x)"),
        }),
    },
};

export const Logarithmic: Story = {
    args: {
        item: generateTestPerseusItem({
            question: segmentWithLockedFunction("log(x)"),
        }),
    },
};

export const Exponent: Story = {
    args: {
        item: generateTestPerseusItem({
            question: segmentWithLockedFunction("e^x"),
        }),
    },
};

export const AbsoluteValue: Story = {
    args: {
        item: generateTestPerseusItem({
            question: segmentWithLockedFunction("abs(x)"),
        }),
    },
};
