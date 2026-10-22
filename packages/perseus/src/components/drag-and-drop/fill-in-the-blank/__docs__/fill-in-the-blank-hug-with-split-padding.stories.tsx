import {
    FillInTheBlankDemo,
    drumsArgs,
    drumsAnsweredPlacements,
    chemicalEquationArgs,
    chemicalEquationAnsweredPlacements,
} from "./fill-in-the-blank-demo-args";

import type {Meta, StoryObj} from "@storybook/react-vite";

/**
 * The hug-with-split-padding variant of Fill in the Blank, for design
 * comparison with the Fill in the Blank (Hug With Padding) page. While
 * the menu is hidden, a placed tile keeps half the menu's space as even
 * padding around its value and half as even margin outside the tile.
 * Hover or focus shows the menu, and the tile grows into its margin,
 * so the line does not reflow. The stories mirror the Fixed Width page.
 */
const meta: Meta<typeof FillInTheBlankDemo> = {
    title: "Components/Drag and Drop/Fill in the Blank (Hug With Split Padding)",
    component: FillInTheBlankDemo,
    tags: ["!manifest"],
    args: {
        filledBlankStyle: "hugWithSplitPadding",
    },
    argTypes: {
        blankSizing: {
            control: "radio",
            options: ["grow", "gate"],
        },
        filledBlankStyle: {
            control: "radio",
            options: ["hug", "hugWithPadding", "hugWithSplitPadding", "fixed"],
        },
    },
};

export default meta;

type Story = StoryObj<typeof FillInTheBlankDemo>;

/**
 * The drums paragraph. Empty blanks look the same in every treatment;
 * drag a tile in to see this one.
 */
export const Paragraph: Story = {
    args: drumsArgs,
};

/**
 * The drums paragraph with every blank answered. Each tile hugs its
 * value plus half the menu's space, with the other half as margin.
 * Hover or focus a tile: it grows into its margin to show the menu,
 * and the line does not move.
 */
export const ParagraphAnswered: Story = {
    args: {
        ...drumsArgs,
        initialPlacements: drumsAnsweredPlacements,
    },
};

/** The chemical equation with hug-with-split-padding coefficient blanks. */
export const ChemicalEquation: Story = {
    args: chemicalEquationArgs,
};

/**
 * The chemical equation with every blank answered. The coefficient
 * tiles split the menu's space. Sub/superscript chips keep their
 * compact behavior and still grow on hover or focus.
 */
export const ChemicalEquationAnswered: Story = {
    args: {
        ...chemicalEquationArgs,
        initialPlacements: chemicalEquationAnsweredPlacements,
    },
};

/**
 * Below the 504px breakpoint, blanks fill their own line, as on the
 * main page. Compare with the Fixed Width page's NarrowViewport, where
 * blanks keep the inline flow.
 */
export const NarrowViewport: Story = {
    args: {
        ...drumsArgs,
        initialPlacements: drumsAnsweredPlacements,
        maxWidth: 375,
    },
};
