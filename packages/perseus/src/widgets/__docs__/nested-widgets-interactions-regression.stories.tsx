import {themeModes} from "../../../../../.storybook/modes";
import {imageInContent} from "../explanation/explanation.testdata";

import {explanationRendererDecorator} from "../explanation/__docs__/explanation-renderer-decorator";

import type {PerseusExplanationWidgetOptions} from "@khanacademy/perseus-core";
import type {Meta, StoryObj} from "@storybook/react-vite";

const meta: Meta<PerseusExplanationWidgetOptions> = {
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
    },
};

export default meta;

type Story = StoryObj<typeof meta>;

const imageExample = imageInContent.widgets["explanation 1"]?.options;

export const ImageInContent: Story = {
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
