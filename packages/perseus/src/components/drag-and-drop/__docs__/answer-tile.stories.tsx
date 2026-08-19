import * as React from "react";

import {AnswerTile} from "../answer-tile";
import {generateAnswerTileMenu} from "../answer-tile/answer-tile.testdata";
import {ChoiceBank} from "../choice-bank";

import type {Meta, StoryObj} from "@storybook/react-vite";

/**
 * `AnswerTile` is the card a learner moves into a blank in the Drag-and-Drop
 * widget family. It renders authored markdown content (text, TeX, or an
 * image), composes the `DndActionMenu` at its leading edge, and shows the
 * parent-set scored states.
 *
 * Turn on Thunderblocks to match the provided designs.
 */
const meta: Meta<typeof AnswerTile> = {
    title: "Components/Drag and Drop/Answer Tile",
    component: AnswerTile,
    decorators: [
        (StoryComponent) => (
            // Tiles hug their content; don't let the canvas stretch them.
            <div style={{display: "flex", margin: 32}}>
                <StoryComponent />
            </div>
        ),
    ],
    args: {
        tileId: "tile-1",
        content: "Bongo",
        label: "Bongo",
        state: "rest",
        menu: generateAnswerTileMenu(),
    },
};

export default meta;

type Story = StoryObj<typeof AnswerTile>;

export const Text: Story = {};

/** Text wraps once it reaches the 200px content width cap. */
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
 * The image renders at its natural size, capped by the tile's content
 * width. The authored height presets come later, from the widget, via
 * the Renderer's `images` size mapping.
 */
export const Image: Story = {
    args: {
        content:
            "![2 micron diameter cell](https://ka-perseus-images.s3.amazonaws.com/b17cfb6a3270c6f41f66099462e495c841cf6ca9.png)",
        label: "2 micron diameter cell",
    },
};

/** An empty tile keeps a minimum width and a spoken "(empty)" value. */
export const Empty: Story = {
    args: {
        content: "",
        label: "(empty)",
    },
};

export const Correct: Story = {
    args: {
        state: "correct",
    },
};

export const Incorrect: Story = {
    args: {
        state: "incorrect",
    },
};

export const Disabled: Story = {
    args: {
        state: "disabled",
    },
};

/** In an inline blank the menu shows only on hover or keyboard focus. */
export const MenuOnHoverOrFocus: Story = {
    args: {
        menuVisibility: "on-hover-or-focus",
    },
};

/** A scored bank: correct tiles beside disabled (unused) ones. */
export const ScoredComposition: Story = {
    render: () => (
        <div style={{maxInlineSize: 480}}>
            <ChoiceBank label="Choices">
                <AnswerTile
                    tileId="tile-1"
                    content="2Mg"
                    label="2Mg"
                    state="correct"
                    menu={null}
                />
                <AnswerTile
                    tileId="tile-2"
                    content="$O_2$"
                    label="O 2"
                    state="correct"
                    menu={null}
                />
                <AnswerTile
                    tileId="tile-3"
                    content="acoustic"
                    label="acoustic"
                    state="disabled"
                    menu={null}
                />
                <AnswerTile
                    tileId="tile-4"
                    content="steel"
                    label="steel"
                    state="disabled"
                    menu={null}
                />
            </ChoiceBank>
        </div>
    ),
};

/** Mixed-width tiles wrapping in a ChoiceBank. */
export const InAChoiceBank: Story = {
    render: () => (
        <div style={{maxInlineSize: 480}}>
            <ChoiceBank label="Choices">
                {[
                    "Numerator",
                    "42",
                    "Photosynthesis",
                    "π",
                    "Independent variable",
                    "The mitochondria is the powerhouse of the cell",
                ].map((value, index) => (
                    <AnswerTile
                        key={value}
                        tileId={`tile-${index}`}
                        content={value}
                        label={value}
                        state="rest"
                        menu={generateAnswerTileMenu()}
                    />
                ))}
            </ChoiceBank>
        </div>
    ),
};
