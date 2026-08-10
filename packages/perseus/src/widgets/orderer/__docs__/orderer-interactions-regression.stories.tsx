import {expect, fireEvent, waitFor} from "storybook/test";

import {themeModes} from "../../../../../../.storybook/modes";
import {mouseDown} from "../../../../../../.storybook/play-utils";

import {ordererRendererDecorator} from "./orderer-renderer-decorator";

import type {PerseusOrdererWidgetOptions} from "@khanacademy/perseus-core";
import type {Meta, StoryObj} from "@storybook/react-vite";

const meta: Meta<PerseusOrdererWidgetOptions> = {
    title: "Widgets/Orderer/Visual Regression Tests/Interactions",
    tags: ["!autodocs", "!manifest"],
    parameters: {
        chromatic: {disableSnapshot: false, modes: themeModes},
    },
};
export default meta;

type Story = StoryObj<typeof meta>;

const sharedArgs = {
    options: [],
} satisfies Partial<PerseusOrdererWidgetOptions>;

const sharedParameters = {
    initialUserInput: {"orderer 1": {current: ["Apple", "Banana", "Cherry"]}},
};

/*
 * NOTE: `.card` also has a `hover` state (border-color and box-shadow), but
 * it cannot be tested accurately with Chromatic at this time (2026) — the
 * same limitation already documented in the Definition widget's regression
 * stories. `:hover` only activates from OS-trusted pointer input; anything
 * dispatched from `play` function code (`userEvent.hover`, `fireEvent`,
 * etc.) is untrusted and Chromium never applies the pseudo-class from it.
 * Confirmed empirically: a `userEvent.hover()` story here produced no
 * visual change at all. Verify this state manually in a running Storybook
 * instead.
 */

export const DraggingCard: Story = {
    decorators: [ordererRendererDecorator],
    args: sharedArgs,
    parameters: sharedParameters,
    play: async ({canvas, canvasElement, userEvent}) => {
        const cardEl = canvas.getByText("Apple").closest(".card-wrap");
        if (!cardEl) {
            throw new Error("Expected a .card-wrap ancestor of the Apple card");
        }
        const rect = cardEl.getBoundingClientRect();

        await mouseDown(cardEl, userEvent);
        // Picking up a card that's already placed adds a placeholder in its
        // spot and a floating dragging copy — both mount asynchronously
        // after mousedown, so wait for them before moving or snapshotting.
        await waitFor(() =>
            expect(canvasElement.querySelectorAll(".card-wrap")).toHaveLength(
                4,
            ),
        );
        // The card's mousemove listener is bound to `document` (not the
        // card) via jQuery, and userEvent-dispatched events don't bubble to
        // `document`, so fire it directly — same approach as the sibling
        // Sortable component's own DraggingCard/PlaceholderVisible stories.
        // eslint-disable-next-line testing-library/prefer-user-event
        fireEvent.mouseMove(document, {
            clientX: rect.right + 40,
            clientY: rect.top,
        });
    },
};
