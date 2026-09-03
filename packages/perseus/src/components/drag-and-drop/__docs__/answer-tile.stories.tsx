import * as React from "react";

import {AnswerTile} from "../answer-tile";
import {generateAnswerTileProps} from "../answer-tile/answer-tile.testdata";
import {ChoiceBank} from "../choice-bank";

import type {Meta, StoryObj} from "@storybook/react-vite";

/**
 * `AnswerTile` is the card that a learner moves into a blank. It is part
 * of the Drag-and-Drop widget family. The tile shows authored markdown
 * content: text, TeX, or an image. It puts the `DndActionMenu` at its
 * leading edge. The parent widget sets `scoring` once the question is
 * scored.
 *
 * Turn on Thunderblocks to match the provided designs.
 */
const meta: Meta<typeof AnswerTile> = {
    title: "Components/Drag and Drop/Answer Tile",
    component: AnswerTile,
    decorators: [
        (StoryComponent) => (
            // Tiles hug their content. Do not let the canvas stretch them.
            <div style={{display: "flex", margin: 32}}>
                <StoryComponent />
            </div>
        ),
    ],
    args: generateAnswerTileProps(),
};

export default meta;

type Story = StoryObj<typeof AnswerTile>;

export const Text: Story = {};

/** Text wraps when it is wider than the 200px content width limit. */
export const WrappingText: Story = {
    args: {
        content: "The mitochondria is the powerhouse of the cell",
        label: "The mitochondria is the powerhouse of the cell",
    },
};

export const TeX: Story = {
    args: {
        content: "$\\sqrt{a^2 + b^2}$",
        label: "square root of a squared plus b squared",
    },
};

/**
 * The image renders at the authored height (the editor offers 24-96 in
 * steps of 12). Without one, it shows at its natural size, up to the
 * tile's content width.
 */
export const Image: Story = {
    args: {
        content:
            "![2 micron diameter cell](https://ka-perseus-images.s3.amazonaws.com/b17cfb6a3270c6f41f66099462e495c841cf6ca9.png)",
        label: "2 micron diameter cell",
        imageHeight: 48,
    },
};

/** An empty tile keeps a minimum width. It has a spoken "(empty)" value. */
export const Empty: Story = {
    args: {
        content: "",
        label: "(empty)",
    },
};

export const Correct: Story = {
    args: {
        scoring: "correct",
    },
};

export const Incorrect: Story = {
    args: {
        scoring: "incorrect",
    },
};

/** A tile the learner left in the bank when the question was scored. */
export const Unused: Story = {
    args: {
        scoring: "unused",
    },
};

/** A scored bank: correct tiles next to unused ones. */
export const ScoredComposition: Story = {
    render: () => (
        <div style={{maxInlineSize: 480}}>
            <ChoiceBank label="Choices">
                <AnswerTile
                    {...generateAnswerTileProps({
                        tileId: "tile-1",
                        content: "2Mg",
                        label: "2Mg",
                        scoring: "correct",
                    })}
                />
                <AnswerTile
                    {...generateAnswerTileProps({
                        tileId: "tile-2",
                        content: "$O_2$",
                        label: "O 2",
                        scoring: "correct",
                    })}
                />
                <AnswerTile
                    {...generateAnswerTileProps({
                        tileId: "tile-3",
                        content: "acoustic",
                        label: "acoustic",
                        scoring: "unused",
                    })}
                />
                <AnswerTile
                    {...generateAnswerTileProps({
                        tileId: "tile-4",
                        content: "steel",
                        label: "steel",
                        scoring: "unused",
                    })}
                />
            </ChoiceBank>
        </div>
    ),
};

/** A placed tile in a one-blank exercise: the menu only offers Clear. */
export const OnlyClearAction: Story = {
    args: {
        moveTargets: [],
        clearFromLabel: "Blank 1",
        onClear: () => {},
    },
};
