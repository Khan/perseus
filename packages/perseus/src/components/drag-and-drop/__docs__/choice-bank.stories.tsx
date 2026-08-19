import * as React from "react";

import {AnswerTile} from "../answer-tile";
import {generateAnswerTileMenu} from "../answer-tile/answer-tile.testdata";
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

function sampleTiles() {
    return SAMPLE_TILES.map((value, index) => (
        <AnswerTile
            key={value}
            tileId={`tile-${index}`}
            content={value}
            label={value}
            state="rest"
            menu={generateAnswerTileMenu()}
        />
    ));
}

/** The default bank: a handful of tiles of varying widths. */
export const Default: Story = {
    render: () => <ChoiceBank label="Choices">{sampleTiles()}</ChoiceBank>,
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
            <ChoiceBank label="Choices">{sampleTiles()}</ChoiceBank>
        </div>
    ),
};

/** Many tiles, to stress the wrapping across several rows. */
export const ManyTiles: Story = {
    render: () => (
        <ChoiceBank label="Choices">
            {Array.from({length: 24}, (_, i) => (
                <AnswerTile
                    key={i}
                    tileId={`tile-${i}`}
                    content={`Tile ${i + 1}`}
                    label={`Tile ${i + 1}`}
                    state="rest"
                    menu={generateAnswerTileMenu()}
                />
            ))}
        </ChoiceBank>
    ),
};

/** An empty bank still reads as a card. */
export const Empty: Story = {
    render: () => <ChoiceBank label="Choices">{[]}</ChoiceBank>,
};

/** Right-to-left: the row direction reverses automatically. */
export const RightToLeft: Story = {
    render: () => (
        <div dir="rtl">
            <ChoiceBank label="الخيارات">{sampleTiles()}</ChoiceBank>
        </div>
    ),
};
