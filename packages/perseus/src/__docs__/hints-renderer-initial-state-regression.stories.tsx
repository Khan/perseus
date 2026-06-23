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
    generateTestPerseusRenderer,
    generateImageWidget,
    generateImageOptions,
    generateDefinitionOptions,
    generateDefinitionWidget,
} from "@khanacademy/perseus-core";
import {View} from "@khanacademy/wonder-blocks-core";
import React from "react";

import {themeModes} from "../../../../.storybook/modes";
import HintsRenderer from "../hints-renderer";
import {ApiOptions} from "../perseus-api";
import {storybookDependenciesV2} from "../testing/test-dependencies";
import {ipsumExample} from "../widgets/explanation/explanation.testdata";
import {earthMoonImage} from "../widgets/image/utils";

import {bibliotronExerciseDecorator} from "./hints-renderer-decorator";

import type {Meta, StoryObj} from "@storybook/react-vite";

const defaultApiOptions = ApiOptions.defaults;

const meta: Meta<typeof HintsRenderer> = {
    title: "Renderers/Hints Renderer/Visual Regression Tests/Initial State",
    component: HintsRenderer,
    tags: ["!autodocs", "!manifest"],
    decorators: [
        (Story) => {
            return (
                <View style={{paddingLeft: 80}}>
                    <Story />
                </View>
            );
        },
    ],
    parameters: {
        docs: {
            description: {
                component:
                    "Regression tests for the Hints renderer that do NOT " +
                    "need any interactions to test, which will be used with " +
                    "Chromatic.",
            },
        },
        chromatic: {disableSnapshot: false, modes: themeModes},
    },
};

export default meta;

type Story = StoryObj<typeof HintsRenderer>;

export const Interactive: Story = {
    decorators: [bibliotronExerciseDecorator],
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
    decorators: [bibliotronExerciseDecorator],
    args: {
        apiOptions: defaultApiOptions,
        dependencies: storybookDependenciesV2,
        hints: [
            {
                ...generateInteractiveGraphQuestion({
                    correct: generateIGAngleGraph(),
                }),
                replace: false,
            },
            {
                ...generateInteractiveGraphQuestion({
                    correct: generateIGCircleGraph(),
                }),
                replace: false,
            },
            {
                ...generateInteractiveGraphQuestion({
                    correct: generateIGLinearGraph(),
                }),
                replace: false,
            },
            {
                ...generateInteractiveGraphQuestion({
                    correct: generateIGLinearSystemGraph(),
                }),
                replace: false,
            },
            {
                ...generateInteractiveGraphQuestion({
                    correct: generateIGPointGraph({numPoints: 3}),
                }),
                replace: false,
            },
            {
                ...generateInteractiveGraphQuestion({
                    correct: generateIGPolygonGraph(),
                }),
                replace: false,
            },
            {
                ...generateInteractiveGraphQuestion({
                    correct: generateIGRayGraph(),
                }),
                replace: false,
            },
            {
                ...generateInteractiveGraphQuestion({
                    correct: generateIGSegmentGraph(),
                }),
                replace: false,
            },
            {
                ...generateInteractiveGraphQuestion({
                    correct: generateIGQuadraticGraph(),
                }),
                replace: false,
            },
            {
                ...generateInteractiveGraphQuestion({
                    correct: generateIGSinusoidGraph(),
                }),
                replace: false,
            },
        ],
    },
};

export const ImageWidgetInHint: Story = {
    decorators: [bibliotronExerciseDecorator],
    args: {
        dependencies: storybookDependenciesV2,
        hints: [
            {
                ...generateTestPerseusRenderer({
                    content: "[[☃ image 1]]",
                    widgets: {
                        "image 1": generateImageWidget({
                            options: generateImageOptions({
                                backgroundImage: earthMoonImage,
                                alt: "Earth and Moon",
                                title: "Earth and Moon",
                                caption: "Earth and Moon",
                            }),
                        }),
                    },
                }),
            },
        ],
    },
};

export const ExplanationWidgetInHint: Story = {
    decorators: [bibliotronExerciseDecorator],
    args: {
        dependencies: storybookDependenciesV2,
        hints: [{...ipsumExample, replace: false}],
    },
};

export const DefinitionWidgetInHint: Story = {
    decorators: [bibliotronExerciseDecorator],
    args: {
        dependencies: storybookDependenciesV2,
        hints: [
            {
                ...generateTestPerseusRenderer({
                    content:
                        "During World War II, in August of 1943, the [[☃ definition 1]] launched a massive bombing campaign on Milan and its outskirts.",
                    widgets: {
                        "definition 1": generateDefinitionWidget({
                            options: generateDefinitionOptions({
                                definition:
                                    "The Allies, led by the United Kingdom, the United States, and the Soviet Union, were the group of countries who opposed the Axis powers (Germany, Japan, and Italy) during World War II.",
                                togglePrompt: "Allies",
                            }),
                        }),
                    },
                }),
            },
        ],
    },
};
