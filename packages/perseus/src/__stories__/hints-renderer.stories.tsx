import {View} from "@khanacademy/wonder-blocks-core";
import React from "react";

import HintsRenderer from "../hints-renderer";
import {ApiOptions} from "../perseus-api";
import {interactiveGraphQuestionBuilder} from "../widgets/interactive-graphs/interactive-graph-question-builder";

import type {Meta, StoryObj} from "@storybook/react";

const defaultApiOptions = ApiOptions.defaults;

const meta: Meta<typeof HintsRenderer> = {
    title: "Perseus/Renderers/Hints Renderer",
    component: HintsRenderer,
    decorators: [
        (Story) => {
            return (
                <View style={{left: 80}}>
                    <Story />
                </View>
            );
        },
    ],
    argTypes: {
        hintsVisible: {
            control: {min: 0},
            defaultValue: 3,
        },
    },
};

export default meta;

type Story = StoryObj<typeof HintsRenderer>;

export const Interactive: Story = {
    args: {
        hints: [
            {
                content: "this is hint 1",
                images: {},
                replace: false,
                widgets: {},
            },
            {
                content: "this is hint 2",
                images: {},
                replace: false,
                widgets: {},
            },
            {
                content: "this is hint 3",
                images: {},
                replace: false,
                widgets: {},
            },
        ],
    },
};

export const WithAllInteractiveGraphs: Story = {
    args: {
        apiOptions: defaultApiOptions,
        hints: [
            {
                ...interactiveGraphQuestionBuilder().withAngle().build(),
                replace: false,
            },
            {
                ...interactiveGraphQuestionBuilder().withCircle().build(),
                replace: false,
            },
            {
                ...interactiveGraphQuestionBuilder().withLinear().build(),
                replace: false,
            },
            {
                ...interactiveGraphQuestionBuilder().withLinearSystem().build(),
                replace: false,
            },
            {
                ...interactiveGraphQuestionBuilder().withPoints(3).build(),
                replace: false,
            },
            {
                ...interactiveGraphQuestionBuilder().withPolygon().build(),
                replace: false,
            },
            {
                ...interactiveGraphQuestionBuilder().withRay().build(),
                replace: false,
            },
            {
                ...interactiveGraphQuestionBuilder().withSegments().build(),
                replace: false,
            },
            {
                ...interactiveGraphQuestionBuilder().withQuadratic().build(),
                replace: false,
            },
            {
                ...interactiveGraphQuestionBuilder().withSinusoid().build(),
                replace: false,
            },
        ],
    },
};

export const WithSegmentInteractiveGraph: Story = {
    args: {
        apiOptions: defaultApiOptions,
        hints: [
            {
                ...interactiveGraphQuestionBuilder().build(),
                replace: false,
            },
        ],
    },
};

export const WithLinearInteractiveGraph: Story = {
    args: {
        apiOptions: defaultApiOptions,
        hints: [
            {
                ...interactiveGraphQuestionBuilder().withLinear().build(),
                replace: false,
            },
        ],
    },
};

export const WithLinearSystemsInteractiveGraph: Story = {
    args: {
        apiOptions: defaultApiOptions,
        hints: [
            {
                ...interactiveGraphQuestionBuilder().withLinearSystem().build(),
                replace: false,
            },
        ],
    },
};

export const WithRayInteractiveGraph: Story = {
    args: {
        apiOptions: defaultApiOptions,
        hints: [
            {
                ...interactiveGraphQuestionBuilder().withRay().build(),
                replace: false,
            },
        ],
    },
};

export const WithCircleInteractiveGraph: Story = {
    args: {
        apiOptions: defaultApiOptions,
        hints: [
            {
                ...interactiveGraphQuestionBuilder().withCircle().build(),
                replace: false,
            },
        ],
    },
};

export const WithQuadraticInteractiveGraph: Story = {
    args: {
        apiOptions: defaultApiOptions,
        hints: [
            {
                ...interactiveGraphQuestionBuilder().withQuadratic().build(),
                replace: false,
            },
        ],
    },
};

export const WithSinusoidInteractiveGraph: Story = {
    args: {
        apiOptions: defaultApiOptions,
        hints: [
            {
                ...interactiveGraphQuestionBuilder().withSinusoid().build(),
                replace: false,
            },
        ],
    },
};

export const WithPolygonInteractiveGraph: Story = {
    args: {
        apiOptions: defaultApiOptions,
        hints: [
            {
                ...interactiveGraphQuestionBuilder().withPolygon().build(),
                replace: false,
            },
            {
                ...interactiveGraphQuestionBuilder()
                    .withPolygon("angles")
                    .build(),
                replace: false,
            },
            {
                ...interactiveGraphQuestionBuilder()
                    .withPolygon("sides")
                    .build(),
                replace: false,
            },
        ],
    },
};

export const WithPointsInteractiveGraph: Story = {
    args: {
        apiOptions: defaultApiOptions,
        hints: [
            {
                ...interactiveGraphQuestionBuilder().withPoints(3).build(),
                replace: false,
            },
        ],
    },
};

export const WithAngleInteractiveGraph: Story = {
    args: {
        apiOptions: defaultApiOptions,
        hints: [
            {
                ...interactiveGraphQuestionBuilder().withAngle().build(),
                replace: false,
            },
        ],
    },
};
