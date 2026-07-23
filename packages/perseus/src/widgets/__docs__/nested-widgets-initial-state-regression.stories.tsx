import {
    type GradedGroupWidget,
    type PerseusExplanationWidgetOptions,
    type PerseusRenderer,
} from "@khanacademy/perseus-core";

import {themeModes} from "../../../../../.storybook/modes";
import {explanationRendererDecorator} from "../explanation/__docs__/explanation-renderer-decorator";

import {articleRendererDecorator} from "./nested-widgets-renderer-decorator";
import {
    explanationWithDefinitionOptions,
    gradedGroupWithRadioAndDefinition,
    gradedGroupWithRadioAndExplanation,
    numericInputInGradedGroup,
    numericInputInTable,
    gradedGroupWithInteractiveGraphAndRadio,
} from "./nested-widgets.testdata";

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

export const GradedGroupWithRadioAndDefinition: GradedGroupStory = {
    decorators: [articleRendererDecorator],
    parameters: {
        question: gradedGroupWithRadioAndDefinition,
    },
};

export const GradedGroupWithRadioAndInteractiveGraph: GradedGroupStory = {
    decorators: [articleRendererDecorator],
    parameters: {
        question: gradedGroupWithInteractiveGraphAndRadio,
    },
};

type ExplanationStory = StoryObj<PerseusExplanationWidgetOptions>;

export const ExplanationWithDefinition: ExplanationStory = {
    decorators: [articleRendererDecorator, explanationRendererDecorator],
    args: explanationWithDefinitionOptions,
};

type RendererStory = StoryObj<PerseusRenderer>;

export const NumericInputInTable: RendererStory = {
    decorators: [articleRendererDecorator],
    parameters: {
        question: numericInputInTable,
    },
};

export const NumericInputInGradedGroup: RendererStory = {
    decorators: [articleRendererDecorator],
    parameters: {
        question: numericInputInGradedGroup,
    },
};
