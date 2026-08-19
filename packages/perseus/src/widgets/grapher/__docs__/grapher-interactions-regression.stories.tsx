import {waitFor} from "storybook/test";

import {themeModes} from "../../../../../../.storybook/modes";
import {mobileDecorator} from "../../__testutils__/story-decorators";
import {quadraticQuestion} from "../grapher.testdata";

import {grapherRendererDecorator} from "./grapher-renderer-decorator";

import type {PerseusRenderer} from "@khanacademy/perseus-core";
import type {Meta, StoryObj} from "@storybook/react-vite";

const meta: Meta<{question: PerseusRenderer}> = {
    title: "Widgets/Grapher/Visual Regression Tests/Interactions",
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

type Story = StoryObj<typeof meta>;

// Grapher draws crosshair hairlines on both platforms, but only while a
// movable control point is being grabbed. Pressing and holding a point keeps
// the grab — and thus the hairlines — active through the snapshot.
export const MobileHairlines: Story = {
    args: {question: quadraticQuestion},
    decorators: [grapherRendererDecorator, mobileDecorator],
    parameters: {
        apiOptions: {isMobile: true},
    },
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
        const rect = mouseTarget.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;
        await userEvent.pointer([
            {keys: "[MouseLeft>]", target: mouseTarget},
            {coords: {clientX: centerX + 4, clientY: centerY + 4}},
        ]);
    },
};

export const DesktopHairlines: Story = {
    args: {question: quadraticQuestion},
    decorators: [grapherRendererDecorator],
    play: async ({canvasElement, userEvent}) => {
        // See MobileHairlines above — same async-Raphael-layer wait, same
        // inner-<ellipse> mouse target.
        const mouseTarget = await waitFor(() => {
            const el = canvasElement.querySelector(
                '[data-interactive-kind-for-testing="movable-point"] ellipse',
            );
            if (el == null) {
                throw new Error("Movable point mouse target not found");
            }
            return el;
        });
        const rect = mouseTarget.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;
        await userEvent.pointer([
            {keys: "[MouseLeft>]", target: mouseTarget},
            {coords: {clientX: centerX, clientY: centerY}},
        ]);
    },
};
