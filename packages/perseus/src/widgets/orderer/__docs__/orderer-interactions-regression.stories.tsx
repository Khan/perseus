import {expect, fireEvent, waitFor} from "storybook/test";

import {themeModes} from "../../../../../../.storybook/modes";
import {mouseDown} from "../../../../../../.storybook/play-utils";

import {
    generateCard,
    ordererRendererDecorator,
} from "./orderer-renderer-decorator";

import type {PerseusOrdererWidgetOptions} from "@khanacademy/perseus-core";
import type {Meta, StoryObj} from "@storybook/react-vite";

const meta: Meta<PerseusOrdererWidgetOptions> = {
    title: "Widgets/Orderer/Visual Regression Tests/Interactions",
    tags: ["!autodocs", "!manifest"],
    parameters: {
        docs: {
            description: {
                component:
                    "Regression tests for the Orderer widget that DO need" +
                    "some sort of interaction to test, which will be used with " +
                    "Chromatic. Stories are displayed on their own page.",
            },
        },
        chromatic: {disableSnapshot: false, modes: themeModes},
    },
};
export default meta;

type Story = StoryObj<typeof meta>;

export const CardsOrdered: Story = {
    decorators: [ordererRendererDecorator],
    args: {
        options: [generateCard("$\\sqrt{5}$"), generateCard("2.5")],
    },
    parameters: {
        initialUserInput: {"orderer 1": {current: ["$\\sqrt{5}$", "2.5"]}},
    },
};

export const OrderedCardClicked: Story = {
    decorators: [ordererRendererDecorator],
    args: {
        options: [generateCard("Apple"), generateCard("Banana")],
    },
    parameters: {
        initialUserInput: {
            "orderer 1": {current: ["Apple", "Banana"]},
        },
    },
    play: async ({canvas, canvasElement, userEvent}) => {
        const card = canvas.getAllByText("Apple")[1].closest(".card-wrap");
        if (!card) {
            throw new Error("Expected a .card-wrap ancestor of the Apple card");
        }
        const rect = card.getBoundingClientRect();

        await mouseDown(card, userEvent);
        // Picking up a card that's already placed adds a placeholder in its
        // spot and a floating dragging copy — both mount asynchronously
        // after mousedown, so wait for them before moving or snapshotting.
        await waitFor(() =>
            expect(canvasElement.querySelectorAll(".card-wrap")).toHaveLength(
                5,
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
