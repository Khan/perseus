import {themeModes} from "../../../../../../.storybook/modes";
import {getWidget} from "../../../widgets";
import {freeResponseRendererDecorator} from "../../__testutils__/free-response-renderer-decorator";
import {rtlDecorator} from "../../__testutils__/story-decorators";

import type {Meta} from "@storybook/react-vite";

const FreeResponseWidget = getWidget("free-response")!;

const meta: Meta = {
    title: "Widgets/Free Response/Visual Regression Tests/Interactions",
    component: FreeResponseWidget,
    tags: ["!autodocs"],
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

// Verifies the over-character-limit state: warning icon displays and the
// character count text switches to semanticColor.core.foreground.critical.default.
export const OverCharacterLimit = {
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
export const RightToLeftOverCharacterLimit = {
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
