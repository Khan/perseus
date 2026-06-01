import {expect, waitFor, within} from "storybook/test";

import {themeModes} from "../../../../../.storybook/modes";
import Sortable from "../sortable";

import type {Meta} from "@storybook/react-vite";

const meta: Meta<typeof Sortable> = {
    title: "Components/Sortable/Visual Regression Tests/Interactions",
    component: Sortable,
    tags: ["!autodocs", "!manifest"],
    parameters: {
        chromatic: {disableSnapshot: false, modes: themeModes},
    },
};
export default meta;

// Verifies the dragging card state (orange background) and the placeholder
// that appears in the card's original position (gray background and border).
// Pressing and holding the mouse button triggers the DRAGGING item state.
export const DraggingCard = {
    args: {
        layout: "horizontal",
        options: ["Apple", "Banana", "Cherry"],
        waitForTexRendererToLoad: false,
    },
    play: async ({canvasElement, userEvent}) => {
        const canvas = within(canvasElement);
        const cards = canvas.getAllByRole("listitem");
        // Press and hold to trigger the DRAGGING state without releasing
        await userEvent.pointer({target: cards[0], keys: "[MouseLeft>]"});
        // requestAnimationFrame inside onMouseDown fires asynchronously;
        // wait for the placeholder to appear before Chromatic snapshots.
        await waitFor(() =>
            expect(canvas.getAllByRole("listitem")).toHaveLength(4),
        );
    },
};
