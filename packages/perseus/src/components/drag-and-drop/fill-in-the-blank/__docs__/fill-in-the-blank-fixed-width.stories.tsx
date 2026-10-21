import {
    FillInTheBlankDemo,
    drumsArgs,
    drumsAnsweredPlacements,
    chemicalEquationArgs,
    chemicalEquationAnsweredPlacements,
} from "./fill-in-the-blank-demo-args";

import type {Meta, StoryObj} from "@storybook/react-vite";

/**
 * The fixed-width variant of Fill in the Blank, for design comparison
 * with the Fill in the Blank page. A filled blank keeps the widest-tile
 * width and the placed tile stretches to fill it, with its text at the
 * start. The menu still hides at rest; hover or focus shows it, and the
 * blank does not change size. The stories mirror the main page where
 * the treatments differ.
 */
const meta: Meta<typeof FillInTheBlankDemo> = {
    title: "Components/Drag and Drop/Fill in the Blank (Fixed Width)",
    component: FillInTheBlankDemo,
    tags: ["!manifest"],
    args: {
        filledBlankStyle: "fixed",
    },
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

/** The drums paragraph with fixed-width blanks. */
export const Paragraph: Story = {
    args: drumsArgs,
};

/**
 * The drums paragraph with every blank answered. Each tile fills its
 * blank. Hover or focus a tile: the menu shows and nothing resizes.
 */
export const ParagraphAnswered: Story = {
    args: {
        ...drumsArgs,
        initialPlacements: drumsAnsweredPlacements,
    },
};

/** The chemical equation with fixed-width coefficient blanks. */
export const ChemicalEquation: Story = {
    args: chemicalEquationArgs,
};

/**
 * The chemical equation with every blank answered. Sub/superscript
 * chips keep their compact behavior in both treatments.
 */
export const ChemicalEquationAnswered: Story = {
    args: {
        ...chemicalEquationArgs,
        initialPlacements: chemicalEquationAnsweredPlacements,
    },
};

/**
 * Fixed-width blanks keep their size and inline flow at every width.
 * Compare with the main page's NarrowViewport, where blanks fill
 * their own line below the 504px breakpoint.
 */
export const NarrowViewport: Story = {
    args: {
        ...drumsArgs,
        initialPlacements: drumsAnsweredPlacements,
        maxWidth: 375,
    },
};
