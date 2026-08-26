import * as React from "react";

import {generateAnswerTileProps} from "../answer-tile/answer-tile.testdata";
import {ChoiceBank} from "../choice-bank";

import type {Meta, StoryObj} from "@storybook/react-vite";

/**
 * `ChoiceBank` holds the draggable answer tiles for the Drag-and-Drop widget
 * family.
 */
const meta: Meta<typeof ChoiceBank> = {
    title: "Components/Drag and Drop/Choice Bank",
    component: ChoiceBank,
};

export default meta;

type Story = StoryObj<typeof ChoiceBank>;

const SAMPLE_TILES = [
    "Numerator",
    "x²",
    "42",
    "Photosynthesis",
    "H₂O",
    "The mitochondria",
    "π",
    "Independent variable",
    "$\\sqrt{a^2 + b^2}$",
    "The mitochondria is the powerhouse of the cell",
];

const sampleTiles = SAMPLE_TILES.map((value, index) =>
    generateAnswerTileProps({
        tileId: `tile-${index}`,
        content: value,
        label: value,
    }),
);

const manyTiles = Array.from({length: 24}, (_, i) =>
    generateAnswerTileProps({
        tileId: `tile-${i}`,
        content: `Tile ${i + 1}`,
        label: `Tile ${i + 1}`,
    }),
);

/** The default bank: a handful of tiles of varying widths. */
export const Default: Story = {
    args: {
        label: "Choices",
        answerTiles: sampleTiles,
    },
};

/** Drag the bottom-right resize handle to watch the tiles wrap. */
export const Reflow: Story = {
    render: () => (
        <div
            style={{
                resize: "horizontal",
                overflow: "auto",
                maxInlineSize: 640,
                minInlineSize: 220,
                padding: 8,
                border: "1px dashed #ccc",
            }}
        >
            <ChoiceBank label="Choices" answerTiles={sampleTiles} />
        </div>
    ),
};

/** Many tiles, to stress the wrapping across several rows. */
export const ManyTiles: Story = {
    args: {
        label: "Choices",
        answerTiles: manyTiles,
    },
};

/** An empty bank still reads as a card. */
export const Empty: Story = {
    args: {
        label: "Choices",
        answerTiles: [],
    },
};

/** Right-to-left: the row direction reverses automatically. */
export const RightToLeft: Story = {
    render: () => (
        <div dir="rtl">
            <ChoiceBank label="الخيارات" answerTiles={sampleTiles} />
        </div>
    ),
};
