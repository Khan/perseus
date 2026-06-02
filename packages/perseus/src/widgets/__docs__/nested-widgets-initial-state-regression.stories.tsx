import {themeModes} from "../../../../../.storybook/modes";

import {articleRendererDecorator} from "./nested-widgets-renderer-decorator";
import {gradedGroupWithRadioAndExplanation} from "./nested-widgets.testdata";

import type {GradedGroupWidget} from "@khanacademy/perseus-core";
import type {Meta, StoryObj} from "@storybook/react-vite";

const meta: Meta = {
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

type GradedGroupStory = StoryObj<GradedGroupWidget["options"]>;

export const GradedGroupWithRadioAndExplanation: GradedGroupStory = {
    decorators: [articleRendererDecorator],
    parameters: {
        question: gradedGroupWithRadioAndExplanation,
    },
};
