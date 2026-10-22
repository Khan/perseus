import {generateBlankWidget} from "@khanacademy/perseus-core";
import * as React from "react";

import {FillInTheBlank} from "../fill-in-the-blank";
import {generateFillInTheBlankProps} from "../fill-in-the-blank.testdata";

import type {Meta, StoryObj} from "@storybook/react-vite";

/**
 * `FillInTheBlank` is the render side of the upcoming Fill in the Blank
 * widget: an answer zone with inline blanks above a choice bank of
 * tiles. Drag tiles into the blanks, or use each tile's menu.
 */
const meta: Meta<typeof FillInTheBlank> = {
    title: "Components/Drag and Drop/Fill in the Blank",
    component: FillInTheBlank,
    // FillInTheBlank is controlled, so the story holds the placements.
    render: function Render(args) {
        const [placements, setPlacements] = React.useState(args.placements);
        return (
            <FillInTheBlank
                {...args}
                placements={placements}
                onPlacementsChange={setPlacements}
            />
        );
    },
    tags: ["!autodocs"],
};

export default meta;

type Story = StoryObj<typeof FillInTheBlank>;

const paragraphArgs = generateFillInTheBlankProps({
    content:
        "There are several different types of drums. The [[☃ blank 1]] " +
        "drum is a long-bodied drum typically held between the knees " +
        "and played with the fingers. A drum with small metal disks " +
        "around the edge played by being shaken is a [[☃ blank 2]]. " +
        "Many years ago, a [[☃ blank 3]] drum was used to announce an " +
        "army's arrival onto a battlefield. Finally, the biggest drum " +
        "in a marching band is a [[☃ blank 4]] drum.",
    widgets: {
        "blank 1": generateBlankWidget(),
        "blank 2": generateBlankWidget(),
        "blank 3": generateBlankWidget(),
        "blank 4": generateBlankWidget(),
    },
    tiles: [
        {id: "bongo", content: "bongo", label: "bongo"},
        {id: "acoustic", content: "acoustic", label: "acoustic"},
        {id: "snare", content: "snare", label: "snare"},
        {id: "tambourine", content: "tambourine", label: "tambourine"},
        {id: "bass", content: "bass", label: "bass"},
        {id: "steel", content: "steel", label: "steel"},
    ],
});

/** A paragraph with four empty blanks. */
export const Paragraph: Story = {
    args: paragraphArgs,
};

/** The same paragraph with every blank answered. */
export const ParagraphAnswered: Story = {
    args: {
        ...paragraphArgs,
        placements: {
            "blank 1": "bongo",
            "blank 2": "tambourine",
            "blank 3": "snare",
            "blank 4": "bass",
        },
    },
};
