import {generateTestPerseusItem} from "@khanacademy/perseus-core";
import {waitFor} from "storybook/test";

import {themeModes} from "../../../../../../.storybook/modes";
import {ServerItemRendererWithDebugUI} from "../../../testing/server-item-renderer-with-debug-ui";
import {mobileDecorator} from "../../__testutils__/story-decorators";
import {quadraticQuestion} from "../grapher.testdata";

import type {Meta, StoryObj} from "@storybook/react-vite";

const meta: Meta = {
    title: "Widgets/Grapher/Visual Regression Tests/Interactions",
    component: ServerItemRendererWithDebugUI,
    tags: ["!autodocs", "!manifest"],
    parameters: {
        docs: {
            description: {
                component:
                    "Regression tests for grapher colors that require an " +
                    "interaction to test.",
            },
        },
        // delay: grabbing a point animates it and Raphael needs a beat to
        // settle its detached SVG paper. 300ms lets both finish before
        // Chromatic captures the snapshot.
        chromatic: {disableSnapshot: false, modes: themeModes, delay: 300},
    },
};
export default meta;

type Story = StoryObj<typeof ServerItemRendererWithDebugUI>;

// Grapher only draws its crosshair hairlines on mobile, and only while a
// movable control point is being grabbed. Pressing and holding a point keeps
// the grab — and thus the hairlines — active through the snapshot.
export const MobileHairlines: Story = {
    args: {
        item: generateTestPerseusItem({question: quadraticQuestion}),
        apiOptions: {isMobile: true},
    },
    decorators: [mobileDecorator],
    play: async ({canvasElement, userEvent}) => {
        // Graphie builds its Raphael layers asynchronously, so the mouse
        // target may not exist yet when play() first runs — wait for it. The
        // grab handler is bound to the inner Raphael <ellipse>, not the wrapper
        // <div> that carries the data-interactive-kind-for-testing attribute.
        const mouseTarget = await waitFor(() => {
            const el = canvasElement.querySelector(
                '[data-interactive-kind-for-testing="movable-point"] ellipse',
            );
            if (el == null) {
                throw new Error("Movable point mouse target not found");
            }
            return el;
        });
        // Grab a control point and nudge it so its move handler fires, which
        // renders the crosshair hairlines. We never release the button, so the
        // grab — and the hairlines — stay visible through the snapshot.
        //
        // In graphie's mobile touch mode the grabbed point maps to the corner
        // of the plot rather than following the synthetic pointer exactly, so
        // the hairlines render at the graph's edge. That's fine here: this
        // story exists to capture the hairline *color*, and it does so
        // deterministically.
        const rect = mouseTarget.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;
        await userEvent.pointer([
            {keys: "[MouseLeft>]", target: mouseTarget},
            {coords: {clientX: centerX + 4, clientY: centerY + 4}},
        ]);
    },
};
