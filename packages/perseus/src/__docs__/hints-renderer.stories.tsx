import {
    generateTestPerseusRenderer,
    generateImageWidget,
    generateImageOptions,
} from "@khanacademy/perseus-core";
import {View} from "@khanacademy/wonder-blocks-core";
import React from "react";

import {themeModes} from "../../../../.storybook/modes";
import {storybookDependenciesV2} from "../testing/test-dependencies";
import {earthMoonImage} from "../widgets/image/utils";

import {bibliotronExerciseDecorator} from "./hints-renderer-decorator";
import {HintsRendererForStories} from "./hints-renderer-for-stories";

import type {Meta, StoryObj} from "@storybook/react-vite";

const meta: Meta<typeof HintsRendererForStories> = {
    title: "Renderers/Hints Renderer",
    component: HintsRendererForStories,
    decorators: [
        (Story) => {
            return (
                <View style={{paddingInlineStart: 80}}>
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

type Story = StoryObj<typeof HintsRendererForStories>;

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
