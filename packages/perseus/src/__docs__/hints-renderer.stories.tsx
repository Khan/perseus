import {
    generateInteractiveGraphQuestion,
    generateIGAngleGraph,
    generateIGCircleGraph,
    generateIGLinearGraph,
    generateIGLinearSystemGraph,
    generateIGPointGraph,
    generateIGPolygonGraph,
    generateIGQuadraticGraph,
    generateIGRayGraph,
    generateIGSegmentGraph,
    generateIGSinusoidGraph,
} from "@khanacademy/perseus-core";
import {View} from "@khanacademy/wonder-blocks-core";
import React from "react";

import HintsRenderer from "../hints-renderer";
import {ApiOptions} from "../perseus-api";
import {storybookDependenciesV2} from "../testing/test-dependencies";

import type {Meta, StoryObj} from "@storybook/react-vite";

const defaultApiOptions = ApiOptions.defaults;

const meta: Meta<typeof HintsRenderer> = {
    title: "Renderers/Hints Renderer",
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
        dependencies: storybookDependenciesV2,
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
        dependencies: storybookDependenciesV2,
        hints: [
            {
                ...generateInteractiveGraphQuestion({correct: generateIGAngleGraph()}),
                replace: false,
            },
            {
                ...generateInteractiveGraphQuestion({correct: generateIGCircleGraph()}),
                replace: false,
            },
            {
                ...generateInteractiveGraphQuestion({correct: generateIGLinearGraph()}),
                replace: false,
            },
            {
                ...generateInteractiveGraphQuestion({correct: generateIGLinearSystemGraph()}),
                replace: false,
            },
            {
                ...generateInteractiveGraphQuestion({correct: generateIGPointGraph({numPoints: 3})}),
                replace: false,
            },
            {
                ...generateInteractiveGraphQuestion({correct: generateIGPolygonGraph()}),
                replace: false,
            },
            {
                ...generateInteractiveGraphQuestion({correct: generateIGRayGraph()}),
                replace: false,
            },
            {
                ...generateInteractiveGraphQuestion({correct: generateIGSegmentGraph()}),
                replace: false,
            },
            {
                ...generateInteractiveGraphQuestion({correct: generateIGQuadraticGraph()}),
                replace: false,
            },
            {
                ...generateInteractiveGraphQuestion({correct: generateIGSinusoidGraph()}),
                replace: false,
            },
        ],
    },
};
