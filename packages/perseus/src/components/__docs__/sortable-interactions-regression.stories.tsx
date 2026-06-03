import {expect, fireEvent, fn, waitFor, within} from "storybook/test";

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

// Verifies the dragging card state (gold background) with the card held in
// place. The placeholder is in the DOM (4 list items) but occluded by the
// absolutely-positioned dragging card. Use PlaceholderVisible for color coverage.
export const DraggingCard = {
    args: {
        layout: "horizontal",
        options: ["Apple", "Banana", "Cherry"],
        waitForTexRendererToLoad: false,
        onMeasure: fn(),
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

// Verifies the placeholder color (disabled background + neutral border) by
// moving the dragging card away from its original slot so the placeholder is
// no longer occluded by the absolutely-positioned dragging card.
export const PlaceholderVisible = {
    args: {
        layout: "horizontal",
        options: ["Apple", "Banana", "Cherry"],
        waitForTexRendererToLoad: false,
        onMeasure: fn(),
    },
    play: async ({canvasElement, userEvent}) => {
        const canvas = within(canvasElement);
        const cards = canvas.getAllByRole("listitem");
        const cardRect = cards[0].getBoundingClientRect();
        // Press and hold to trigger the DRAGGING state
        await userEvent.pointer({target: cards[0], keys: "[MouseLeft>]"});
        // Wait for the placeholder to appear in the DOM
        await waitFor(() =>
            expect(canvas.getAllByRole("listitem")).toHaveLength(4),
        );
        // Fire mousemove on document — Sortable's Draggable listens there, not
        // on the card element. userEvent.pointer({coords}) does not reach it.
        fireEvent.mouseMove(document, {
            clientX: cardRect.right + 150,
            clientY: cardRect.top + 20,
        });
    },
};
