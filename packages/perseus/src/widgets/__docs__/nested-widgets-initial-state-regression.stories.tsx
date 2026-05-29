import {themeModes} from "../../../../../.storybook/modes";
import {gradedGroupWithRadioAndExplanation} from "./nested-widgets.testdata";
import {articleRendererDecorator} from "./nested-widgets-renderer-decorator";

import type {GradedGroupWidget, PerseusExplanationWidgetOptions} from "@khanacademy/perseus-core";
import type {Meta, StoryObj} from "@storybook/react-vite";

type NestedWidgetStoryArgs =
    | PerseusExplanationWidgetOptions
    | GradedGroupWidget["options"];

const meta: Meta<NestedWidgetStoryArgs> = {
    title: "Widgets/Nested Widgets/Visual Regression Tests/Initial State",
    tags: ["!autodocs", "!manifest"],
    parameters: {
        docs: {
            description: {
                component:
                    "Regression tests for widgets nested inside other widgets that do NOT " +
                    "need any interactions to test, which will be used with " +
                    "Chromatic. Stories are all displayed on one page.",
            },
        },
        chromatic: {disableSnapshot: false, modes: themeModes},
        controls: {disable: true},
    },
};

export default meta;

type Story = StoryObj<typeof meta>;

export const GradedGroupWithRadioAndExplanation: Story = {
    decorators: [articleRendererDecorator],
    parameters: {
        question: gradedGroupWithRadioAndExplanation,
    },
};
