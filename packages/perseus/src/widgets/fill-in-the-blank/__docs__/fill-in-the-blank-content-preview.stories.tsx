import * as React from "react";

import FillInTheBlankContentPreview from "../fill-in-the-blank-content-preview";

import type {FITBPreviewSegment} from "../fill-in-the-blank-content-preview";
import type {Meta, StoryObj} from "@storybook/react-vite";

/**
 * SPIKE for the Fill in the Blank editor prototype (LEMS-4311).
 *
 * These stories test ONE thing: can we place text, TeX, images, and blanks so
 * they flow inline (and wrap) by interleaving a real Perseus <Renderer> per
 * markdown run with our own inline blank/image elements — no blank widgets, no
 * custom renderer? Blanks here are static, non-interactive placeholders.
 */

// Inline SVG data URIs so image tiles render with no network dependency.
// NOTE: `#` must be written as `%23` inside a data URI.
const svgTile = (inner: string): string =>
    `data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='48' height='48'>${inner}</svg>`;
const pineapple = svgTile(
    "<rect x='8' y='14' width='32' height='30' rx='12' fill='%23f5a623'/><path d='M24 2 L18 14 L30 14 Z' fill='%234a7c2f'/>",
);
const circle = svgTile("<circle cx='24' cy='24' r='18' fill='%235a54c9'/>");
const square = svgTile(
    "<rect x='8' y='8' width='32' height='32' rx='3' fill='%23348465'/>",
);
const triangle = svgTile("<path d='M24 8 L42 40 L6 40 Z' fill='%23c2560c'/>");

// 1) Prose: plain text + an inline image + blanks.
const proseContent: ReadonlyArray<FITBPreviewSegment> = [
    {type: "markdown", id: "m1", markdown: "SpongeBob lives in a "},
    {type: "image", id: "i1", url: pineapple, alt: "pineapple"},
    {type: "markdown", id: "m2", markdown: " called a "},
    {type: "blank", id: "b1"},
    {type: "markdown", id: "m3", markdown: ", which sits under the "},
    {type: "blank", id: "b2"},
    {type: "markdown", id: "m4", markdown: "."},
];

// 2) Equation / chemistry: coefficient blanks next to TeX terms.
const equationContent: ReadonlyArray<FITBPreviewSegment> = [
    {type: "blank", id: "b1"},
    {type: "markdown", id: "m1", markdown: " $H_2$ + "},
    {type: "blank", id: "b2"},
    {type: "markdown", id: "m2", markdown: " $O_2 \\rightarrow$ "},
    {type: "blank", id: "b3"},
    {type: "markdown", id: "m3", markdown: " $H_2 O$"},
];

// 3) Everything at once, in a narrow container to show reflow/wrapping.
const mixedContent: ReadonlyArray<FITBPreviewSegment> = [
    {type: "markdown", id: "m1", markdown: "The pattern "},
    {type: "image", id: "i1", url: circle, alt: "circle"},
    {type: "image", id: "i2", url: square, alt: "square"},
    {type: "image", id: "i3", url: triangle, alt: "triangle"},
    {
        type: "markdown",
        id: "m2",
        markdown: " repeats. When $x = $ ",
    },
    {type: "blank", id: "b1"},
    {type: "markdown", id: "m3", markdown: " the area $x^2$ equals "},
    {type: "blank", id: "b2"},
    {type: "markdown", id: "m4", markdown: ", found near the "},
    {type: "image", id: "i4", url: pineapple, alt: "pineapple"},
    {type: "markdown", id: "m5", markdown: " under the sea."},
];

const meta: Meta<typeof FillInTheBlankContentPreview> = {
    title: "Widgets/Fill in the Blank/Content Placement Spike",
    component: FillInTheBlankContentPreview,
    tags: ["!manifest"],
    parameters: {
        docs: {
            description: {
                component:
                    "Render spike for the Fill in the Blank widget. Interleaves a real " +
                    "Perseus <Renderer> (per markdown run) with static, non-interactive " +
                    "blank placeholders and inline images. Tests inline flow of text, TeX, " +
                    "images, and blanks — no blank widgets, no custom renderer, no drag.",
            },
        },
    },
};
export default meta;

type Story = StoryObj<typeof FillInTheBlankContentPreview>;

export const Prose: Story = {args: {content: proseContent}};

export const EquationTeX: Story = {args: {content: equationContent}};

export const MixedContentReflow: Story = {
    args: {content: mixedContent, maxWidth: 340},
};
