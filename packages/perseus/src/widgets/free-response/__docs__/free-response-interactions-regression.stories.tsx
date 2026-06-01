import {themeModes} from "../../../../../../.storybook/modes";
import {rtlDecorator} from "../../__testutils__/story-decorators";

import {freeResponseRendererDecorator} from "./free-response-renderer-decorator";

import type {PerseusFreeResponseWidgetOptions} from "@khanacademy/perseus-core";
import type {Meta, StoryObj} from "@storybook/react-vite";

const meta: Meta<PerseusFreeResponseWidgetOptions> = {
    title: "Widgets/Free Response/Visual Regression Tests/Interactions",
    tags: ["!autodocs", "!manifest"],
    parameters: {
        docs: {
            description: {
                component:
                    "Regression tests for the Free Response widget that DO " +
                    "need some sort of interaction to test, which will be used " +
                    "with Chromatic. Stories are displayed on their own page.",
            },
        },
        chromatic: {disableSnapshot: false, modes: themeModes},
    },
};
export default meta;

type Story = StoryObj<typeof meta>;

// Verifies the over-character-limit state: warning icon displays and the
// character count text switches to semanticColor.core.foreground.critical.default.
export const OverCharacterLimit: Story = {
    decorators: [freeResponseRendererDecorator],
    args: {
        allowUnlimitedCharacters: false,
        characterLimit: 10,
        placeholder: "Enter your answer here",
        question: "What is the theme of the essay?",
    },
    play: async ({canvas, userEvent}) => {
        const textarea = canvas.getByRole("textbox");
        await userEvent.type(textarea, "This answer is way too long");
    },
};

// Verifies the over-character-limit state in RTL layout, including the
// correct direction of spacing on the warning icon (marginInlineEnd).
export const RightToLeftOverCharacterLimit: Story = {
    decorators: [freeResponseRendererDecorator, rtlDecorator],
    args: {
        allowUnlimitedCharacters: false,
        characterLimit: 10,
        placeholder: "Enter your answer here",
        question: "What is the theme of the essay?",
    },
    play: async ({canvas, userEvent}) => {
        const textarea = canvas.getByRole("textbox");
        await userEvent.type(textarea, "This answer is way too long");
    },
};
