import {themeModes} from "../../../../../../.storybook/modes";
import {getWidget} from "../../../widgets";
import {freeResponseRendererDecorator} from "../../__testutils__/free-response-renderer-decorator";
import {rtlDecorator} from "../../__testutils__/story-decorators";

import type {Meta, StoryObj} from "@storybook/react-vite";

const FreeResponseWidget = getWidget("free-response")!;

const meta: Meta<typeof FreeResponseWidget> = {
    title: "Widgets/Free Response/Visual Regression Tests/Initial State",
    component: FreeResponseWidget,
    tags: ["!dev"],
    parameters: {
        docs: {
            description: {
                component:
                    "Regression tests for the Free Response widget that do NOT " +
                    "need any interactions to test, which will be used with " +
                    "Chromatic. Stories are all displayed on one page.",
            },
        },
        chromatic: {disableSnapshot: false, modes: themeModes},
    },
};
export default meta;

type Story = StoryObj<typeof FreeResponseWidget>;

// Verifies the default state with a character count displayed using
// semanticColor.core.foreground.neutral.default and font.size.small.
export const DefaultWithCharacterCount: Story = {
    decorators: [freeResponseRendererDecorator],
    args: {
        allowUnlimitedCharacters: false,
        characterLimit: 500,
        placeholder: "Enter your answer here",
        question: "What is the theme of the essay?",
    },
};

// Verifies the RTL layout of the default state, including correct spacing
// direction of the warning icon (marginInlineEnd).
export const RightToLeft: Story = {
    decorators: [freeResponseRendererDecorator, rtlDecorator],
    args: {
        allowUnlimitedCharacters: false,
        characterLimit: 500,
        placeholder: "Enter your answer here",
        question: "What is the theme of the essay?",
    },
};

// Verifies the state where no character count is shown (allowUnlimitedCharacters: true).
export const UnlimitedCharacters: Story = {
    decorators: [freeResponseRendererDecorator],
    args: {
        allowUnlimitedCharacters: true,
        characterLimit: 500,
        placeholder: "Enter your answer here",
        question: "What is the theme of the essay?",
    },
};
