import {
    generateRadioChoice,
    generateRadioOptions,
    generateRadioWidget,
} from "@khanacademy/perseus-core";

import {themeModes} from "../../../../../../.storybook/modes";
import {rtlDecorator} from "../../__testutils__/story-decorators";

import {gradedGroupRendererDecorator} from "./graded-group-renderer-decorator";

import type {PerseusGradedGroupWidgetOptions} from "@khanacademy/perseus-core";
import type {Meta, StoryObj} from "@storybook/react-vite";

const meta: Meta<PerseusGradedGroupWidgetOptions> = {
    title: "Widgets/Graded Group/Visual Regression Tests/Initial State",
    tags: ["!autodocs", "!manifest"],
    parameters: {
        docs: {
            description: {
                component:
                    "Regression tests for the Graded Group widget that do NOT " +
                    "need any interactions to test.",
            },
        },
        chromatic: {disableSnapshot: false, modes: themeModes},
    },
};

export default meta;

type Story = StoryObj<typeof meta>;

const sharedArgs = {
    title: "Check your understanding!",
    content:
        "Which of the following is a renewable energy source?\n\n[[☃ radio 1]]\n\n",
    widgets: {
        "radio 1": generateRadioWidget({
            options: generateRadioOptions({
                choices: [
                    generateRadioChoice("Coal"),
                    generateRadioChoice("Natural gas"),
                    generateRadioChoice("Solar power", {correct: true}),
                    generateRadioChoice("Petroleum"),
                ],
            }),
        }),
    },
    hint: {
        content:
            "Solar power is renewable because sunlight is continuously available.",
        images: {},
        widgets: {},
    },
    hasHint: true,
    images: {},
} satisfies Partial<PerseusGradedGroupWidgetOptions>;

export const DefaultDesktop: Story = {
    decorators: [gradedGroupRendererDecorator],
    args: sharedArgs,
};

export const MobileUnanswered: Story = {
    decorators: [gradedGroupRendererDecorator],
    args: sharedArgs,
    parameters: {
        apiOptions: {isMobile: true},
    },
};

export const RightToLeft: Story = {
    decorators: [gradedGroupRendererDecorator, rtlDecorator],
    args: sharedArgs,
};

const texArgs = {
    title: "Check your understanding!",
    content:
        "Which of the following values of $x$ satisfies $\\sqrt{64}=x$?\n\n[[☃ radio 1]]\n\n",
    widgets: {
        "radio 1": generateRadioWidget({
            options: generateRadioOptions({
                choices: [
                    generateRadioChoice("$-8$"),
                    generateRadioChoice("$8$", {correct: true}),
                    generateRadioChoice("$64$"),
                    generateRadioChoice("No value of $x$ works"),
                ],
            }),
        }),
    },
    hint: {
        content: "$\\sqrt{64} = 8$ because $8^2 = 64$.",
        images: {},
        widgets: {},
    },
    hasHint: true,
    images: {},
} satisfies Partial<PerseusGradedGroupWidgetOptions>;

export const DesktopWithTex: Story = {
    decorators: [gradedGroupRendererDecorator],
    args: texArgs,
};
