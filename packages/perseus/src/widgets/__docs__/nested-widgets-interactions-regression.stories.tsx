import {themeModes} from "../../../../../.storybook/modes";
import {explanationRendererDecorator} from "../explanation/__docs__/explanation-renderer-decorator";

import {articleRendererDecorator} from "./nested-widgets-renderer-decorator";
import {
    gradedGroupWithRadioAndExplanation,
    imageInContent,
    videoInContent,
} from "./nested-widgets.testdata";

import type {
    GradedGroupWidget,
    PerseusExplanationWidgetOptions,
} from "@khanacademy/perseus-core";
import type {Meta, StoryObj} from "@storybook/react-vite";

const meta: Meta = {
    title: "Widgets/Nested Widgets/Visual Regression Tests/Interactions",
    tags: ["!autodocs", "!manifest"],
    parameters: {
        docs: {
            description: {
                component:
                    "Regression tests for widgets nested inside other widgets that DO need some sort of interaction to test, which will be used with Chromatic. Stories are displayed on their own page.",
            },
        },
        chromatic: {disableSnapshot: false, modes: themeModes},
        controls: {disable: true},
    },
};

export default meta;

type GradedGroupStory = StoryObj<GradedGroupWidget["options"]>;
type ExplanationStory = StoryObj<PerseusExplanationWidgetOptions>;

export const GradedGroupExplanationClicked: GradedGroupStory = {
    decorators: [articleRendererDecorator],
    parameters: {
        question: gradedGroupWithRadioAndExplanation,
    },
    play: async ({canvas, userEvent}) => {
        const explanationTrigger = canvas.getByRole("button", {
            name: "Show explanation",
        });
        await userEvent.click(explanationTrigger);
    },
};

const videoExample = videoInContent.widgets["explanation 1"].options;

export const VideoInContent: ExplanationStory = {
    decorators: [explanationRendererDecorator],
    args: {
        hidePrompt: videoExample.hidePrompt,
        explanation: videoExample.explanation,
        showPrompt: videoExample.showPrompt,
    },
    parameters: {
        content: videoInContent.content,
        widgets: videoExample.widgets,
    },
    play: async ({canvas, userEvent}) => {
        const explanationTrigger = canvas.getByRole("button", {
            name: videoExample.showPrompt,
        });
        await userEvent.click(explanationTrigger);
    },
};

const imageExample = imageInContent.widgets["explanation 1"].options;

export const ImageInContent: ExplanationStory = {
    decorators: [explanationRendererDecorator],
    args: {
        hidePrompt: imageExample.hidePrompt,
        explanation: imageExample.explanation,
        showPrompt: imageExample.showPrompt,
    },
    parameters: {
        content: imageInContent.content,
        widgets: imageExample.widgets,
    },
    play: async ({canvas, userEvent}) => {
        const explanationTrigger = canvas.getByRole("button", {
            name: imageExample.showPrompt,
        });
        await userEvent.click(explanationTrigger);
    },
};
