import {generateBlankWidget} from "@khanacademy/perseus-core";

import {
    FillInTheBlankDemo,
    drumsArgs,
    drumsAnsweredPlacements,
    chemicalEquationArgs,
    chemicalEquationAnsweredPlacements,
} from "./fill-in-the-blank-demo-args";

import type {Meta, StoryObj} from "@storybook/react-vite";

/**
 * Demo of the Fill in the Blank render component, for design review.
 * Drag tiles into the blanks, or use each tile's menu. The examples
 * mirror the Figma frames. The `blankSizing` control compares the two
 * width-reveal modes: "grow" and "gate". The `filledBlankStyle` control
 * compares the "hug" treatment on this page with the "fixed" treatment
 * on the Fill in the Blank (Fixed Width) page. Plan and open questions:
 * widgets/fill-in-the-blank/notes/.
 */
const meta: Meta<typeof FillInTheBlankDemo> = {
    title: "Components/Drag and Drop/Fill in the Blank",
    component: FillInTheBlankDemo,
    tags: ["!manifest"],
    argTypes: {
        blankSizing: {
            control: "radio",
            options: ["grow", "gate"],
        },
        filledBlankStyle: {
            control: "radio",
            options: ["hug", "fixed"],
        },
    },
};

export default meta;

type Story = StoryObj<typeof FillInTheBlankDemo>;

/** The drums paragraph (Figma "Fill in the Blank Default"). */
export const Paragraph: Story = {
    args: drumsArgs,
};

/**
 * The drums paragraph with every blank answered. Hover or focus a
 * placed tile to show its menu.
 */
export const ParagraphAnswered: Story = {
    args: {
        ...drumsArgs,
        initialPlacements: drumsAnsweredPlacements,
    },
};

/**
 * The chemical equation frame: a subscript blank on Cl, a superscript
 * blank on Br, and coefficient blanks before NaBr and NaCl. TeX
 * typesets after mount, so this story shows the sizing modes best.
 */
export const ChemicalEquation: Story = {
    args: chemicalEquationArgs,
};

/**
 * The chemical equation with every blank answered. Hover or focus a
 * chip to restore its full size and reach its menu.
 */
export const ChemicalEquationAnswered: Story = {
    args: {
        ...chemicalEquationArgs,
        initialPlacements: chemicalEquationAnsweredPlacements,
    },
};

/**
 * The shape pattern frame. The shapes are TeX stand-ins; the demo has
 * no hosted shape assets. Image tiles live in the ImageTiles story.
 */
export const ShapePattern: Story = {
    args: {
        content:
            "**What will the 7th shape in the pattern be?**\n\n" +
            "$\\Large \\bigcirc \\enspace \\square \\enspace \\triangle " +
            "\\enspace \\bigcirc \\enspace \\square \\enspace \\triangle$ " +
            "[[☃ blank 1]]",
        widgets: {
            "blank 1": generateBlankWidget(),
        },
        tiles: [
            {id: "circle", content: "$\\Large\\bigcirc$", label: "circle"},
            {id: "triangle", content: "$\\Large\\triangle$", label: "triangle"},
            {id: "square", content: "$\\Large\\square$", label: "square"},
            {id: "star", content: "$\\Large\\star$", label: "star"},
        ],
        tileUsage: "single",
    },
};

/** Image tiles with a height preset, for the image mechanics. */
export const ImageTiles: Story = {
    args: {
        content: "Which image completes the pattern? [[☃ blank 1]]",
        widgets: {
            "blank 1": generateBlankWidget(),
        },
        tiles: [
            {
                id: "image-1",
                content:
                    "![a pattern piece](https://cdn.kastatic.org/ka-perseus-images/01f44d5b73290da6bec97c75a5316fb05ab61f12.jpg)",
                label: "pattern piece one",
                imageHeight: 48,
            },
            {
                id: "image-2",
                content:
                    "![another pattern piece](https://cdn.kastatic.org/ka-perseus-images/01f44d5b73290da6bec97c75a5316fb05ab61f12.jpg)",
                label: "pattern piece two",
                imageHeight: 48,
            },
        ],
        tileUsage: "single",
    },
};

/** Below the 504px breakpoint, blanks fill their own line. */
export const NarrowViewport: Story = {
    args: {
        ...drumsArgs,
        maxWidth: 375,
    },
};

/**
 * Small-value exception: tiles of three characters or fewer keep the
 * inline layout at every width. Compare with NarrowViewport.
 */
export const SmallValuesStayInline: Story = {
    args: {
        content: "$3 \\times 4 =$ [[☃ blank 1]] and $3 + 4 =$ [[☃ blank 2]]",
        widgets: {
            "blank 1": generateBlankWidget(),
            "blank 2": generateBlankWidget(),
        },
        tiles: [
            {id: "seven", content: "$7$", label: "7"},
            {id: "twelve", content: "$12$", label: "12"},
            {id: "twenty-one", content: "$21$", label: "21"},
        ],
        tileUsage: "single",
        maxWidth: 375,
    },
};

/**
 * Capped multi-use tiles: the bank keeps a tile until its uses run
 * out, with a screen-reader-only remaining count.
 */
export const MultiUseTiles: Story = {
    args: {
        content:
            "Add the missing punctuation.\n\n" +
            "We bought apples[[☃ blank 1]] pears[[☃ blank 2]] and plums" +
            "[[☃ blank 3]]",
        widgets: {
            "blank 1": generateBlankWidget(),
            "blank 2": generateBlankWidget(),
            "blank 3": generateBlankWidget(),
        },
        tiles: [
            {id: "comma", content: "$,$", label: "comma"},
            {id: "period", content: "$.$", label: "period"},
        ],
        tileUsage: "multi",
        maxUsesPerTile: 2,
    },
};

/** Gate sizing: the answer zone reveals after the first measurement. */
export const GateSizing: Story = {
    args: {
        ...chemicalEquationArgs,
        blankSizing: "gate",
    },
};
