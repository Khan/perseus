import {expect, fireEvent, fn, waitFor, within} from "storybook/test";

import {themeModes} from "../../../../../.storybook/modes";
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
        // Press and hold to trigger the DRAGGING state without releasing
        await userEvent.pointer({target: cards[0], keys: "[MouseLeft>]"});
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
        // Press and hold to trigger the DRAGGING state
        await userEvent.pointer({target: cards[0], keys: "[MouseLeft>]"});
        // Wait for the placeholder to appear in the DOM
        await waitFor(() =>
            expect(canvas.getAllByRole("listitem")).toHaveLength(4),
        );
        // Sortable's Draggable binds mousemove on document directly; userEvent
        // does not dispatch events that reach document-level native listeners.
        // eslint-disable-next-line testing-library/prefer-user-event
        fireEvent.mouseMove(document, {
            clientX: cardRect.right + 150,
            clientY: cardRect.top + 20,
        });
    },
};
