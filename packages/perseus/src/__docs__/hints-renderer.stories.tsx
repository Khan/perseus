import {
    generateTestPerseusRenderer,
    generateImageWidget,
    generateImageOptions,
} from "@khanacademy/perseus-core";
import {View} from "@khanacademy/wonder-blocks-core";
import React from "react";

import {themeModes} from "../../../../.storybook/modes";
import HintsRenderer from "../hints-renderer";
import {getFeatureFlags} from "../testing/feature-flags-util";
import {storybookDependenciesV2} from "../testing/test-dependencies";
import {earthMoonImage} from "../widgets/image/utils";

import {bibliotronExerciseDecorator} from "./hints-renderer-decorator";

import type {Meta, StoryObj} from "@storybook/react-vite";

const meta: Meta<typeof HintsRenderer> = {
    title: "Renderers/Hints Renderer",
    component: HintsRenderer,
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
                component: "Examples of Hint renderer.",
            },
        },
        chromatic: {disableSnapshot: false, modes: themeModes},
    },
};

export default meta;

type Story = StoryObj<typeof HintsRenderer>;

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

export const ImageWidgetInHintWithRendererUpgrade: Story = {
    decorators: [bibliotronExerciseDecorator],
    args: {
        dependencies: storybookDependenciesV2,
        apiOptions: {
            flags: getFeatureFlags({
                "perseus-renderer-upgrade": true,
            }),
        },
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
