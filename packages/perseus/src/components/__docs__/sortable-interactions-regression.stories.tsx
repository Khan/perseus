import {expect, fireEvent, fn, waitFor, within} from "storybook/test";

import {themeModes} from "../../../../../.storybook/modes";
import {mouseDown} from "../../../../../.storybook/play-utils";
import Sortable from "../sortable";

import type {Meta} from "@storybook/react-vite";

const meta: Meta<typeof Sortable> = {
    title: "Components/Sortable/Visual Regression Tests/Interactions",
    component: Sortable,
    tags: ["!autodocs", "!manifest"],
    parameters: {
        docs: {
            description: {
                component:
                    "Regression tests for the Sortable component that DO need " +
                    "some sort of interaction to test.",
            },
        },
        chromatic: {disableSnapshot: false, modes: themeModes},
    },
};
export default meta;

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
        await mouseDown(cards[0], userEvent);
        // requestAnimationFrame inside onMouseDown fires asynchronously;
        // wait for the placeholder to appear before Chromatic snapshots.
        await waitFor(() =>
            expect(canvas.getAllByRole("listitem")).toHaveLength(4),
        );
    },
};

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
        await mouseDown(cards[0], userEvent);
        // Wait for the placeholder to appear in the DOM
        await waitFor(() =>
            expect(canvas.getAllByRole("listitem")).toHaveLength(4),
        );
        // To move the sortable card, we need to "fire" a "mouseMove" event on the "document" element
        // because the sortable's event listener is registered on the "document" instead of the card.
        // Also, events dispatched via "userEvent" don't bubble up to the "document".
        // eslint-disable-next-line testing-library/prefer-user-event
        fireEvent.mouseMove(document, {
            clientX: cardRect.right + 150,
            clientY: cardRect.top + 20,
        });
    },
};
