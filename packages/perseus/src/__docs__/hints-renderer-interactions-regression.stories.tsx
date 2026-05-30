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
            ipsumExample.widgets["explanation 1"]?.options.showPrompt;
        const explanationTrigger = canvas.getByRole("button", {
            name: buttonText,
        });
        await userEvent.click(explanationTrigger);
    },
};
