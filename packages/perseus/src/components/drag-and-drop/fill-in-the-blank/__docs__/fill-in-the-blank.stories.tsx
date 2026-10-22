import {generateBlankWidget} from "@khanacademy/perseus-core";
import * as React from "react";

import {FillInTheBlank} from "../fill-in-the-blank";

import type {TilePlacements} from "../../tile-placements";
import type {FillInTheBlankProps} from "../fill-in-the-blank";
import type {Meta, StoryObj} from "@storybook/react-vite";

type DemoProps = Omit<
    FillInTheBlankProps,
    "placements" | "onPlacementsChange"
> & {
    initialPlacements?: TilePlacements;
};

/** Holds the controlled placements, as the real widget will. */
function FillInTheBlankDemo(props: DemoProps): React.ReactElement {
    const {initialPlacements, ...fitbProps} = props;
    const [placements, setPlacements] = React.useState<TilePlacements>(
        initialPlacements ?? {},
    );
    return (
        <FillInTheBlank
            {...fitbProps}
            placements={placements}
            onPlacementsChange={setPlacements}
        />
    );
}

/**
 * The Fill in the Blank render component. Drag tiles into the blanks,
 * or use each tile's menu.
 */
const meta: Meta<typeof FillInTheBlankDemo> = {
    title: "Components/Drag and Drop/Fill in the Blank",
    component: FillInTheBlankDemo,
    args: {
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
        tileUsage: "single",
    },
};

export default meta;

type Story = StoryObj<typeof FillInTheBlankDemo>;

/** A paragraph with four empty blanks. */
export const Paragraph: Story = {};

/** The same paragraph with every blank answered. */
export const ParagraphAnswered: Story = {
    args: {
        initialPlacements: {
            "blank 1": "bongo",
            "blank 2": "tambourine",
            "blank 3": "snare",
            "blank 4": "bass",
        },
    },
};
