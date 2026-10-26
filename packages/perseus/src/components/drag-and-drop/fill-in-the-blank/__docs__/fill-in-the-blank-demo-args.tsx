import {
    generateBlankWidget,
    generateBlankOptions,
} from "@khanacademy/perseus-core";
import * as React from "react";

import {FillInTheBlank} from "../fill-in-the-blank";

import type {TilePlacements} from "../../tile-placements";
import type {FillInTheBlankProps} from "../fill-in-the-blank";

export type DemoProps = Omit<
    FillInTheBlankProps,
    "placements" | "onPlacementsChange"
> & {
    initialPlacements?: TilePlacements;
    /** Constrains the demo width, to show reflow. */
    maxWidth?: number;
};

/** Holds the controlled placements, as the real widget will. */
export function FillInTheBlankDemo(props: DemoProps): React.ReactElement {
    const {initialPlacements, maxWidth, ...fitbProps} = props;
    const [placements, setPlacements] = React.useState<TilePlacements>(
        initialPlacements ?? {},
    );
    return (
        <div style={maxWidth != null ? {maxWidth} : undefined}>
            <FillInTheBlank
                {...fitbProps}
                placements={placements}
                onPlacementsChange={setPlacements}
            />
        </div>
    );
}

/** The drums paragraph (Figma "Fill in the Blank Default"). */
export const drumsArgs: DemoProps = {
    content:
        "There are several different types of drums. The [[☃ blank 1]] " +
        "drum is a long-bodied drum typically held between the knees and " +
        "played with the fingers. A drum with small metal disks around " +
        "the edge played by being shaken is a [[☃ blank 2]]. Many years " +
        "ago, a [[☃ blank 3]] drum was used to announce an army's " +
        "arrival onto a battlefield. Finally, the biggest drum in a " +
        "marching band is a [[☃ blank 4]] drum.",
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
};

export const drumsAnsweredPlacements: TilePlacements = {
    "blank 1": "bongo",
    "blank 2": "tambourine",
    "blank 3": "snare",
    "blank 4": "bass",
};

/**
 * The chemical equation frame: a subscript blank on Cl, a superscript
 * blank on Br, and coefficient blanks before NaBr and NaCl. TeX
 * typesets after mount, so these args show the sizing modes best.
 */
export const chemicalEquationArgs: DemoProps = {
    content:
        "The following equation represents the reaction between " +
        "chlorine gas and aqueous sodium bromide.\n\n" +
        "**Balance the equation by filling in the correct " +
        "coefficients for each substance.**\n\n" +
        // The \, thin spaces keep the slots off the Cl and Br
        // glyphs. Authors add this spacing; it is not automatic.
        "$\\text{Cl}\\,$[[☃ blank 1]] $(g)\\ +$ [[☃ blank 2]] " +
        "$\\text{NaBr}(aq) \\rightarrow$ [[☃ blank 3]] " +
        "$\\text{NaCl}(aq)\\ + \\text{Br}\\,$[[☃ blank 4]] $(l)$",
    widgets: {
        "blank 1": generateBlankWidget({
            options: generateBlankOptions({displayType: "subscript"}),
        }),
        "blank 2": generateBlankWidget(),
        "blank 3": generateBlankWidget(),
        "blank 4": generateBlankWidget({
            options: generateBlankOptions({displayType: "superscript"}),
        }),
    },
    tiles: [
        {id: "empty", content: "", label: "empty"},
        {id: "one", content: "$1$", label: "1"},
        {id: "two", content: "$2$", label: "2"},
        {id: "three", content: "$3$", label: "3"},
    ],
    tileUsage: "multi",
};

export const chemicalEquationAnsweredPlacements: TilePlacements = {
    "blank 1": "two",
    "blank 2": "two",
    "blank 3": "two",
    "blank 4": "two",
};
