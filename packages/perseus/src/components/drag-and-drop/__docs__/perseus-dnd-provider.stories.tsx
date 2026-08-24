import * as React from "react";

import {generateAnswerTileProps} from "../answer-tile/answer-tile.testdata";
import {ChoiceBank} from "../choice-bank";
import {PerseusDndProvider} from "../perseus-dnd-provider";

import type {Meta, StoryObj} from "@storybook/react-vite";

/**
 * `PerseusDndProvider` is the drag-and-drop context that the Drag-and-Drop
 * widget family renders around its draggables (`AnswerTile`) and droppables
 * (`ChoiceBank`, and later the blanks). Without it, the tiles render but do
 * not respond to a drag.
 *
 * Drag a tile and watch the browser console: the provider logs each stage of
 * the gesture (start, move, over, end).
 */
const meta: Meta<typeof PerseusDndProvider> = {
    title: "Components/Drag and Drop/Perseus Dnd Provider",
    component: PerseusDndProvider,
};

export default meta;

type Story = StoryObj<typeof PerseusDndProvider>;

const SAMPLE_TILES = [
    "Numerator",
    "x²",
    "42",
    "Photosynthesis",
    "H₂O",
    "$\\sqrt{a^2 + b^2}$",
];

const sampleTiles = SAMPLE_TILES.map((value, index) =>
    generateAnswerTileProps({
        tileId: `tile-${index}`,
        content: value,
        label: value,
    }),
);

const sampleTile2 = SAMPLE_TILES.map((value, index) =>
    generateAnswerTileProps({
        tileId: `tile-${index}-${index}`,
        content: value + "2",
        label: value + "2",
    }),
);

/** A choice bank whose tiles can be dragged and reordered within the bank. */
export const Default: Story = {
    render: () => (
        <PerseusDndProvider>
            <ChoiceBank label="Choices" answerTiles={sampleTiles} />
            <ChoiceBank label="Choices" answerTiles={sampleTile2} />
        </PerseusDndProvider>
    ),
};

/** An empty bank: the provider has a droppable, but nothing to drag into it. */
export const EmptyChoiceBank: Story = {
    render: () => (
        <PerseusDndProvider>
            <ChoiceBank label="Choices" answerTiles={[]} />
        </PerseusDndProvider>
    ),
};
