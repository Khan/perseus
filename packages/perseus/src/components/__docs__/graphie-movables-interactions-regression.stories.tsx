import * as React from "react";
import {waitFor} from "storybook/test";

import {themeModes} from "../../../../../.storybook/modes";
import Graphie from "../graphie";
import Movables from "../graphie-movables";

import type {Meta, StoryObj} from "@storybook/react-vite";

const {MovablePoint} = Movables;

// Must be module-level — Graphie logs an error if the setup reference changes
// between renders
const noopSetup = () => {};

const meta: Meta = {
    title: "Components/Graphie Movables/Visual Regression Tests/Interactions",
    tags: ["!autodocs", "!manifest"],
    parameters: {
        docs: {
            description: {
                component:
                    "Regression tests for graphie-movables colors that DO " +
                    "need an interaction to test.",
            },
        },
        // delay: hovering animates the point to its highlight (scale 2) over
        // 50ms, and Raphael needs a beat to settle its detached SVG paper.
        // 300ms lets both finish before Chromatic captures the snapshot.
        chromatic: {disableSnapshot: false, modes: themeModes, delay: 300},
    },
};
export default meta;

type Story = StoryObj<typeof meta>;

// Hovering (or grabbing) a movable point enlarges it to its highlight style.
// Because the highlight color and the normal color are the same instructive
// token, the initial-state stories never exercise `highlightStyle` — this is
// the only story that verifies the enlarged/highlighted point renders in the
// correct color. Mousedown produces the identical visual, so hover covers it.
export const MovablePointHighlighted: Story = {
    render: () => (
        <Graphie
            box={[200, 200]}
            range={[
                [-5, 5],
                [-5, 5],
            ]}
            setup={noopSetup}
        >
            <MovablePoint coord={[0, 0]} />
        </Graphie>
    ),
    play: async ({canvasElement, userEvent}) => {
        // Graphie builds its Raphael layers asynchronously, so the mouse
        // target may not exist yet when play() first runs — wait for it.
        //
        // The `vmouseover` handler that triggers the highlight is bound to the
        // inner Raphael <ellipse> node (WrappedDrawing.getMouseTarget returns
        // `visibleShape[0]`), NOT the wrapper <div> that carries the
        // data-interactive-kind-for-testing attribute. userEvent.hover sets the
        // event target to exactly the element we pass it, so we must hover the
        // <ellipse> itself — hovering the wrapper never reaches the handler.
        const mouseTarget = await waitFor(() => {
            const el = canvasElement.querySelector(
                '[data-interactive-kind-for-testing="movable-point"] ellipse',
            );
            if (el == null) {
                throw new Error("Movable point mouse target not found");
            }
            return el;
        });
        await userEvent.hover(mouseTarget);
    },
};
