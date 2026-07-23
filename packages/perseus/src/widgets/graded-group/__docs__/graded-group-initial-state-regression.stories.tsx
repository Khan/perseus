import {
    generateDropdownOptions,
    generateDropdownWidget,
} from "@khanacademy/perseus-core";

import {themeModes} from "../../../../../../.storybook/modes";
import {
    mobileDecorator,
    rtlDecorator,
} from "../../__testutils__/story-decorators";

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

// Content is kept to a bare dropdown so the snapshots stay focused on
// graded-group's own chrome (title, border, hint link) rather than the question.
const sharedArgs = {
    title: "Check your understanding!",
    content: "[[☃ dropdown 1]]",
    widgets: {
        "dropdown 1": generateDropdownWidget({
            options: generateDropdownOptions({
                placeholder: "Select an answer",
                choices: [
                    {content: "Correct answer", correct: true},
                    {content: "Incorrect answer", correct: false},
                ],
            }),
        }),
    },
    hint: {
        content: "This is a hint.",
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

export const DefaultMobile: Story = {
    decorators: [gradedGroupRendererDecorator, mobileDecorator],
    args: sharedArgs,
    parameters: {
        apiOptions: {isMobile: true},
    },
};

export const RightToLeft: Story = {
    decorators: [gradedGroupRendererDecorator, rtlDecorator],
    args: sharedArgs,
};

// TeX lives in the graded group's own content (rendered through <Renderer>),
// not inside a child widget — so this snapshot exercises graded-group TeX
// rendering rather than some other widget's. The title is intentionally
// plain: it's rendered as a bare string, not through <Renderer>, so it
// doesn't handle TeX.
const texArgs = {
    title: "Check your understanding!",
    content:
        "The square root of a number $x$ is written $\\sqrt{x}$. " +
        "For example, $\\sqrt{64} = 8$ because $8^2 = 64$.",
    widgets: {},
    hint: {
        content: "Remember: $\\sqrt{64} = 8$.",
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
