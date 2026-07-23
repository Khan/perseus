import {generateCategorizerOptions} from "@khanacademy/perseus-core";

import {themeModes} from "../../../../../../.storybook/modes";
import {
    mobileDecorator,
    rtlDecorator,
} from "../../__testutils__/story-decorators";

import {categorizerRendererDecorator} from "./categorizer-renderer-decorator";

import type {PerseusCategorizerWidgetOptions} from "@khanacademy/perseus-core";
import type {Meta, StoryObj} from "@storybook/react-vite";

// Shared by most stories below (Default, Answered, AnsweredMobile,
// RightToLeft, Static), so it lives at the top of the file.
const categorizerOptions = generateCategorizerOptions({
    items: ["Apple", "Broccoli", "Banana", "Carrot"],
    categories: ["Fruit", "Vegetable"],
    values: [0, 1, 0, 1],
    randomizeItems: false,
});

const meta: Meta<PerseusCategorizerWidgetOptions> = {
    title: "Widgets/Categorizer/Visual Regression Tests/Initial State",
    tags: ["!autodocs", "!manifest"],
    parameters: {
        docs: {
            description: {
                component:
                    "Regression tests for the Categorizer widget that do NOT " +
                    "need any interactions to test.",
            },
        },
        chromatic: {disableSnapshot: false, modes: themeModes},
    },
};
export default meta;

type Story = StoryObj<typeof meta>;

// The user's answer replays the options' `values` (the answer key), so the
// "answered" grids stay in sync with the test data.
const answer = {
    "categorizer 1": {values: [...categorizerOptions.values]},
};

export const Default: Story = {
    decorators: [categorizerRendererDecorator],
    args: categorizerOptions,
};

export const WithImages: Story = {
    decorators: [categorizerRendererDecorator],
    args: generateCategorizerOptions({
        items: [
            "![Graph 1](web+graphie://ka-perseus-graphie.s3.amazonaws.com/1e06f6d4071f30cee2cc3ccb7435b3a66a62fe3f)",
            "![Graph 2](web+graphie://cdn.kastatic.org/ka-perseus-graphie/7c0a5afb8670fad738df800ffe16c5e516b48777)",
        ],
        categories: [
            "No relationship",
            "Positive linear relationship",
            "Negative linear relationship",
            "Nonlinear relationship",
        ],
        values: [1, 3],
        randomizeItems: false,
    }),
};

export const WithMath: Story = {
    decorators: [categorizerRendererDecorator],
    args: generateCategorizerOptions({
        items: ["$2x + 4$", "$x^2 - 9$", "$3x$", "$x^2 + 5x + 6$"],
        categories: ["$\\text{Linear}$", "$\\text{Quadratic}$"],
        values: [0, 1, 0, 1],
        randomizeItems: false,
    }),
};

export const Answered: Story = {
    decorators: [categorizerRendererDecorator],
    args: categorizerOptions,
    parameters: {
        initialUserInput: answer,
    },
};

export const AnsweredMobile: Story = {
    decorators: [categorizerRendererDecorator, mobileDecorator],
    args: categorizerOptions,
    parameters: {
        apiOptions: {isMobile: true},
        initialUserInput: answer,
    },
};

export const RightToLeft: Story = {
    decorators: [categorizerRendererDecorator, rtlDecorator],
    args: categorizerOptions,
    parameters: {
        initialUserInput: answer,
    },
};
