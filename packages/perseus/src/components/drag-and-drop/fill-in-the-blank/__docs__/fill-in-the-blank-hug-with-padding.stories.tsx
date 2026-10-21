import {
    FillInTheBlankDemo,
    drumsArgs,
    drumsAnsweredPlacements,
    chemicalEquationArgs,
    chemicalEquationAnsweredPlacements,
} from "./fill-in-the-blank-demo-args";

import type {Meta, StoryObj} from "@storybook/react-vite";

/**
 * The hug-with-padding variant of Fill in the Blank, for design
 * comparison with the Fill in the Blank and Fill in the Blank (Fixed
 * Width) pages. A filled blank hugs its tile, as on the main page, but
 * while the menu is hidden the tile keeps the menu's space as even
 * padding around its value. Hover or focus shows the menu, and the
 * tile does not change size, so the line does not reflow. The stories
 * mirror the Fixed Width page.
 */
const meta: Meta<typeof FillInTheBlankDemo> = {
    title: "Components/Drag and Drop/Fill in the Blank (Hug With Padding)",
    component: FillInTheBlankDemo,
    tags: ["!manifest"],
    args: {
        filledBlankStyle: "hugWithPadding",
    },
    argTypes: {
        blankSizing: {
            control: "radio",
            options: ["grow", "gate"],
        },
        filledBlankStyle: {
            control: "radio",
            options: ["hug", "hugWithPadding", "fixed"],
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
 * The drums paragraph with every blank answered. Each blank hugs its
 * tile plus the menu's space. Hover or focus a tile: the menu shows
 * and nothing resizes.
 */
export const ParagraphAnswered: Story = {
    args: {
        ...drumsArgs,
        initialPlacements: drumsAnsweredPlacements,
    },
};

/** The chemical equation with hug-with-padding coefficient blanks. */
export const ChemicalEquation: Story = {
    args: chemicalEquationArgs,
};

/**
 * The chemical equation with every blank answered. The coefficient
 * tiles keep the menu's space. Sub/superscript chips keep their
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
