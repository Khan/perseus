import {themeModes} from "../../../../../../.storybook/modes";
import {mobileDecorator} from "../../__testutils__/story-decorators";
import {
    definitionQuestionContent,
    definitionQuestionOptions,
} from "../definition.testdata";

import {definitionRendererDecorator} from "./definition-renderer-decorator";

import type {DefinitionDefaultWidgetOptions} from "@khanacademy/perseus-core";
import type {Meta, StoryObj} from "@storybook/react-vite";

const meta: Meta<DefinitionDefaultWidgetOptions> = {
    title: "Widgets/Definition/Visual Regression Tests/Interactions",
    tags: ["!autodocs", "!manifest"],
    parameters: {
        docs: {
            description: {
                component:
                    "Regression tests for the definition widget that DO need some sort of interaction to test, which will be used with Chromatic. Stories are displayed on their own page.",
            },
        },
        chromatic: {disableSnapshot: false, modes: themeModes},
    },
    decorators: [definitionRendererDecorator],
};

export default meta;

type Story = StoryObj<typeof meta>;

export const FocusedState: Story = {
    args: definitionQuestionOptions,
    parameters: {
        content: definitionQuestionContent,
    },
    play: async ({canvas}) => {
        const definitionTrigger = canvas.getByRole("button", {
            name: "Definition of: Allies",
        });
        definitionTrigger.focus();
    },
};

export const ClickedState: Story = {
    args: definitionQuestionOptions,
    parameters: {
        content: definitionQuestionContent,
    },
    play: async ({canvas, userEvent}) => {
        const definitionTrigger = canvas.getByRole("button", {
            name: "Definition of: Allies",
        });
        await userEvent.click(definitionTrigger);
    },
};

export const MobileClickedState: Story = {
    decorators: [mobileDecorator],
    args: definitionQuestionOptions,
    parameters: {
        content: definitionQuestionContent,
    },
    play: async ({canvas, userEvent}) => {
        const definitionTrigger = canvas.getByRole("button", {
            name: "Definition of: Allies",
        });
        await userEvent.click(definitionTrigger);
    },
};
