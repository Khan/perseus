import {themeModes} from "../../../../../../.storybook/modes";
import {mobileDecorator} from "../../__testutils__/story-decorators";
import {
    multipleAvailableTypesExponentialQuestion,
    multipleAvailableTypesQuestion,
    quadraticQuestion,
    staticExponentialQuestion,
} from "../grapher.testdata";

import {grapherRendererDecorator} from "./grapher-renderer-decorator";

import type {PerseusRenderer} from "@khanacademy/perseus-core";
import type {Meta, StoryObj} from "@storybook/react-vite";

const meta: Meta<{question: PerseusRenderer}> = {
    title: "Widgets/Grapher/Visual Regression Tests/Initial State",
    tags: ["!autodocs", "!manifest"],
    parameters: {
        docs: {
            description: {
                component:
                    "Regression tests for grapher colors for the two function types " +
                    "not being ported to Interactive Graph: quadratic and " +
                    "choose-your-own-function (multiple available types).",
            },
        },
        // delay: Raphael creates its SVG paper in a detached div before DOM
        // insertion, causing a timing race that can clip the initial ellipse.
        // 300ms lets Raphael settle before Chromatic captures the snapshot.
        chromatic: {disableSnapshot: false, modes: themeModes, delay: 300},
    },
};
export default meta;

type Story = StoryObj<typeof meta>;

export const DestktopQuadratic: Story = {
    decorators: [grapherRendererDecorator],
    args: {question: quadraticQuestion},
};

export const DesktopChooseYourOwnFunction: Story = {
    decorators: [grapherRendererDecorator],
    args: {question: multipleAvailableTypesQuestion},
};

export const MobileChooseYourOwnFunction: Story = {
    decorators: [grapherRendererDecorator, mobileDecorator],
    args: {question: multipleAvailableTypesQuestion},
    parameters: {
        apiOptions: {isMobile: true},
    },
};

export const DesktopStatic: Story = {
    decorators: [grapherRendererDecorator],
    args: {question: staticExponentialQuestion},
};

export const MobileStatic: Story = {
    decorators: [grapherRendererDecorator, mobileDecorator],
    args: {question: staticExponentialQuestion},
    parameters: {
        apiOptions: {isMobile: true},
    },
};

export const MobileQuadratic: Story = {
    decorators: [grapherRendererDecorator, mobileDecorator],
    args: {question: quadraticQuestion},
    parameters: {
        apiOptions: {isMobile: true},
    },
};

// Exponential's default asymptote position is normalized to the middle of
// the graph's range, which lands right on top of the x-axis and makes the
// dashed line indistinguishable from the axis. Seeding userInput directly
// lets us start the asymptote off-axis so the dashed styling is actually
// visible in the snapshot.
export const DesktopDashedAsymptote: Story = {
    decorators: [grapherRendererDecorator],
    args: {question: multipleAvailableTypesExponentialQuestion},
    parameters: {
        initialUserInput: {
            "grapher 1": {
                type: "exponential",
                coords: [
                    [0, 3],
                    [1, 4],
                ],
                asymptote: [
                    [-10, -3],
                    [10, -3],
                ],
            },
        },
    },
};
