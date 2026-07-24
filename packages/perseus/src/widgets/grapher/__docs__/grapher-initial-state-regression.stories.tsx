import {generateTestPerseusItem} from "@khanacademy/perseus-core";

import {themeModes} from "../../../../../../.storybook/modes";
import {ServerItemRendererWithDebugUI} from "../../../testing/server-item-renderer-with-debug-ui";
import {mobileDecorator} from "../../__testutils__/story-decorators";
import {
    multipleAvailableTypesQuestion,
    quadraticQuestion,
    staticExponentialQuestion,
} from "../grapher.testdata";

import type {Meta, StoryObj} from "@storybook/react-vite";

const meta: Meta = {
    title: "Widgets/Grapher/Visual Regression Tests/Initial State",
    component: ServerItemRendererWithDebugUI,
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

type Story = StoryObj<typeof ServerItemRendererWithDebugUI>;

export const Quadratic: Story = {
    args: {
        item: generateTestPerseusItem({question: quadraticQuestion}),
    },
};

export const ChooseYourOwnFunction: Story = {
    args: {
        item: generateTestPerseusItem({
            question: multipleAvailableTypesQuestion,
        }),
    },
};

// When the grapher is static, all of its movables should render in a muted
// gray (rather than the interactive blue) to signal that they can't be
// manipulated — matching the interactive-graph's static styling. This uses a
// multi-function grapher with an exponential answer so a single story covers
// the movable points, the plotted curve, and the asymptote MovableLine.
export const Static: Story = {
    args: {
        item: generateTestPerseusItem({question: staticExponentialQuestion}),
    },
};

// On mobile the plotted curve renders in a different stroke color and width
// than on desktop, so it needs its own snapshot.
export const Mobile: Story = {
    args: {
        item: generateTestPerseusItem({question: quadraticQuestion}),
        apiOptions: {isMobile: true},
    },
    decorators: [mobileDecorator],
};
