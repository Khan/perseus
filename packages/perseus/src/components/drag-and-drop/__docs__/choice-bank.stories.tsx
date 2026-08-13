import * as React from "react";

import {ChoiceBank} from "../choice-bank";

import type {Meta, StoryObj} from "@storybook/react-vite";

/**
 * `ChoiceBank` holds the draggable answer tiles for the Drag-and-Drop widget
 * family.
 *
 * TODO(LEMS-4363): The tiles below are throwaway placeholders standing in for
 * the real `AnswerTile` component; they only demonstrate how the bank wraps.
 */
const meta: Meta<typeof ChoiceBank> = {
    title: "Components/Drag and Drop/Choice Bank",
    component: ChoiceBank,
};

export default meta;

type Story = StoryObj<typeof ChoiceBank>;

/** TODO(LEMS-4363): Placeholder tile to be replaced by the real `AnswerTile`. */
function PlaceholderTile({children}: {children: React.ReactNode}) {
    return (
        <button
            type="button"
            style={{
                display: "inline-flex",
                alignItems: "center",
                minBlockSize: 48,
                paddingBlock: 8,
                paddingInline: 12,
                borderRadius: 8,
                border: "1px solid var(--wb-semanticColor-core-border-neutral-default)",
                background:
                    "var(--wb-semanticColor-core-background-base-default)",
                font: "inherit",
                cursor: "grab",
            }}
        >
            {children}
        </button>
    );
}

const SAMPLE_TILES = [
    "Numerator",
    "x²",
    "42",
    "Photosynthesis",
    "H₂O",
    "The mitochondria",
    "π",
    "Independent variable",
    "\\sqrt{a^2 + b^2}",
    "The mitochondria is the powerhouse of the cell",
];

/** The default bank: a handful of tiles of varying widths. */
export const Default: Story = {
    render: () => (
        <ChoiceBank label="Choices">
            {SAMPLE_TILES.map((label) => (
                <PlaceholderTile key={label}>{label}</PlaceholderTile>
            ))}
        </ChoiceBank>
    ),
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
            <ChoiceBank label="Choices">
                {SAMPLE_TILES.map((label) => (
                    <PlaceholderTile key={label}>{label}</PlaceholderTile>
                ))}
            </ChoiceBank>
        </div>
    ),
};

/** Many tiles, to stress the wrapping across several rows. */
export const ManyTiles: Story = {
    render: () => (
        <ChoiceBank label="Choices">
            {Array.from({length: 24}, (_, i) => (
                <PlaceholderTile key={i}>{`Tile ${i + 1}`}</PlaceholderTile>
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
            <ChoiceBank label="الخيارات">
                {SAMPLE_TILES.map((label) => (
                    <PlaceholderTile key={label}>{label}</PlaceholderTile>
                ))}
            </ChoiceBank>
        </div>
    ),
};
