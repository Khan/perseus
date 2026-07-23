import {
    type GradedGroupWidget,
    type PerseusExplanationWidgetOptions,
} from "@khanacademy/perseus-core";

import {themeModes} from "../../../../../.storybook/modes";
import {explanationRendererDecorator} from "../explanation/__docs__/explanation-renderer-decorator";

import {articleRendererDecorator} from "./nested-widgets-renderer-decorator";
import {
    definitionInContentAndExplanation,
    explanationWithDefinitionOptions,
    gradedGroupWithRadioAndDefinition,
    gradedGroupWithRadioAndExplanation,
    imageInContent,
    numericInputInExplanation,
    videoInContent,
} from "./nested-widgets.testdata";

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

export const GradedGroupDefinitionClicked: GradedGroupStory = {
    decorators: [articleRendererDecorator],
    parameters: {
        question: gradedGroupWithRadioAndDefinition,
    },
    play: async ({canvas, userEvent}) => {
        const definitionTrigger = canvas.getByRole("button", {
            name: "Definition of: Jean-Luc Picard's",
        });
        await userEvent.click(definitionTrigger);
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

export const DefinitionInContentAndExplanation: StoryObj = {
    decorators: [articleRendererDecorator],
    parameters: {
        question: definitionInContentAndExplanation,
    },
    play: async ({canvas, userEvent}) => {
        // Reveal the explanation, then open the definition nested inside it.
        const explanationTrigger = canvas.getByRole("button", {
            name: "Show explanation",
        });
        await userEvent.click(explanationTrigger);
        const explanationDefinitionTrigger = canvas.getByRole("button", {
            name: "Definition of: Axis powers",
        });
        await userEvent.click(explanationDefinitionTrigger);

        // Open the definition that lives in the main article text.
        const contentDefinitionTrigger = canvas.getByRole("button", {
            name: "Definition of: Allies",
        });
        await userEvent.click(contentDefinitionTrigger);
    },
};

export const ExplanationWithDefinition: ExplanationStory = {
    decorators: [articleRendererDecorator, explanationRendererDecorator],
    args: explanationWithDefinitionOptions,
    play: async ({canvas, userEvent}) => {
        const explanationTrigger = canvas.getByRole("button", {
            name: "Explain",
        });
        await userEvent.click(explanationTrigger);
        const definitionTrigger = canvas.getByRole("button", {
            name: "Definition of: Allies",
        });
        await userEvent.click(definitionTrigger);
    },
};

export const NumericInputInExplanation: StoryObj = {
    decorators: [articleRendererDecorator],
    parameters: {
        question: numericInputInExplanation,
    },
    play: async ({canvas, userEvent}) => {
        const explanationTrigger = canvas.getByRole("button", {
            name: "Show practice problem",
        });
        await userEvent.click(explanationTrigger);
    },
};
