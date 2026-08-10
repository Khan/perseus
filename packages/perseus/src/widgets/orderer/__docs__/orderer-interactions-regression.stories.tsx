import {expect, waitFor} from "storybook/test";

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
        options: [generateCard("First"), generateCard("Second")],
    },
    parameters: {
        initialUserInput: {"orderer 1": {current: ["First", "Second"]}},
    },
};

export const OrderedCardClicked: Story = {
    decorators: [ordererRendererDecorator],
    args: {
        options: [generateCard("First"), generateCard("Second")],
    },
    parameters: {
        initialUserInput: {
            "orderer 1": {current: ["First", "Second"]},
        },
    },
    play: async ({canvas, canvasElement, userEvent}) => {
        const card = canvas.getAllByText("First")[1].closest(".card-wrap");
        if (!card) {
            throw new Error("Expected a .card-wrap ancestor of the First card");
        }

        await mouseDown(card, userEvent);
        // Picking up a card that's already placed adds a placeholder in its
        // spot and a floating dragging copy, which increases the count of cards
        // by one (so 4 cards becomes 5) — both placeholder and floating copy
        // mount asynchronously after mousedown, so wait for them before moving
        // or snapshotting.
        await waitFor(() =>
            expect(canvasElement.querySelectorAll(".card-wrap")).toHaveLength(
                5,
            ),
        );
    },
};
