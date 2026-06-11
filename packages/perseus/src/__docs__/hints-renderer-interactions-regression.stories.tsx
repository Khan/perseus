import {
    generateDefinitionOptions,
    generateDefinitionWidget,
    generateTestPerseusRenderer,
} from "@khanacademy/perseus-core";
import {View} from "@khanacademy/wonder-blocks-core";
import React from "react";

import {themeModes} from "../../../../.storybook/modes";
import HintsRenderer from "../hints-renderer";
import {storybookDependenciesV2} from "../testing/test-dependencies";
import {ipsumExample} from "../widgets/explanation/explanation.testdata";

import {bibliotronExerciseDecorator} from "./hints-renderer-decorator";

import type {Meta, StoryObj} from "@storybook/react-vite";

const meta: Meta<typeof HintsRenderer> = {
    title: "Renderers/Hints Renderer/Visual Regression Tests/Interactions",
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
                    "Regression tests for the Hints renderer that DO need " +
                    "some sort of interaction to test, which will be used with " +
                    "Chromatic.",
            },
        },
        chromatic: {disableSnapshot: false, modes: themeModes},
    },
};

export default meta;

type Story = StoryObj<typeof HintsRenderer>;

export const ExplanationWidgetInHint: Story = {
    decorators: [bibliotronExerciseDecorator],
    args: {
        dependencies: storybookDependenciesV2,
        hints: [{...ipsumExample, replace: false}],
    },
    play: async ({canvas, userEvent}) => {
        const buttonText =
            ipsumExample.widgets["explanation 1"].options.showPrompt;
        const explanationTrigger = canvas.getByRole("button", {
            name: buttonText,
        });
        await userEvent.click(explanationTrigger);
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
    play: async ({canvas, userEvent}) => {
        const definitionTrigger = canvas.getByRole("button", {
            name: "Definition of: Allies",
        });
        await userEvent.click(definitionTrigger);
    },
};
