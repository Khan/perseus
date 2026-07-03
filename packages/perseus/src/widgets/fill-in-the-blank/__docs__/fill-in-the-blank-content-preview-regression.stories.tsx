import * as React from "react";

import {themeModes} from "../../../../../../.storybook/modes";
import FillInTheBlankContentPreview from "../fill-in-the-blank-content-preview";

import type {FITBPreviewSegment} from "../fill-in-the-blank-content-preview";
import type {Meta, StoryObj} from "@storybook/react-vite";

/**
 * Visual-regression guard for the FITB inline content-placement spike.
 *
 * Inline flow here depends on the Perseus <Renderer>'s internal DOM (the
 * `.perseus-renderer` root + the QuestionParagraph div) via a small CSS
 * override. That DOM is being actively refactored — LEMS-4282 ("Refactor how
 * paragraphs and widgets are rendered in the DOM") and LEMS-3764 ("Rewrite
 * Perseus renderer to not wrap everything in a paragraph"). This snapshot exists
 * so that if a renderer change breaks inline flow, CI catches it immediately
 * instead of it regressing silently.
 */

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

const proseContent: ReadonlyArray<FITBPreviewSegment> = [
    {type: "markdown", id: "m1", markdown: "SpongeBob lives in a "},
    {type: "image", id: "i1", url: pineapple, alt: "pineapple"},
    {type: "markdown", id: "m2", markdown: " called a "},
    {type: "blank", id: "b1"},
    {type: "markdown", id: "m3", markdown: ", which sits under the "},
    {type: "blank", id: "b2"},
    {type: "markdown", id: "m4", markdown: "."},
];

const equationContent: ReadonlyArray<FITBPreviewSegment> = [
    {type: "blank", id: "b1"},
    {type: "markdown", id: "m1", markdown: " $H_2$ + "},
    {type: "blank", id: "b2"},
    {type: "markdown", id: "m2", markdown: " $O_2 \\rightarrow$ "},
    {type: "blank", id: "b3"},
    {type: "markdown", id: "m3", markdown: " $H_2 O$"},
];

const mixedContent: ReadonlyArray<FITBPreviewSegment> = [
    {type: "markdown", id: "m1", markdown: "The pattern "},
    {type: "image", id: "i1", url: circle, alt: "circle"},
    {type: "image", id: "i2", url: square, alt: "square"},
    {type: "image", id: "i3", url: triangle, alt: "triangle"},
    {type: "markdown", id: "m2", markdown: " repeats. When $x = $ "},
    {type: "blank", id: "b1"},
    {type: "markdown", id: "m3", markdown: " the area $x^2$ equals "},
    {type: "blank", id: "b2"},
    {type: "markdown", id: "m4", markdown: ", found near the "},
    {type: "image", id: "i4", url: pineapple, alt: "pineapple"},
    {type: "markdown", id: "m5", markdown: " under the sea."},
];

function Row({
    label,
    content,
    maxWidth,
}: {
    label: string;
    content: ReadonlyArray<FITBPreviewSegment>;
    maxWidth?: number;
}) {
    return (
        <div style={{marginBottom: 28}}>
            <div style={{fontWeight: 700, marginBottom: 8}}>{label}</div>
            <FillInTheBlankContentPreview
                content={content}
                maxWidth={maxWidth}
            />
        </div>
    );
}

const meta: Meta = {
    title: "Widgets/Fill in the Blank/Content Placement Spike (regression)",
    tags: ["!autodocs", "!manifest"],
    parameters: {
        chromatic: {disableSnapshot: false, modes: themeModes},
        docs: {
            description: {
                component:
                    "Visual regression guard for the FITB inline content-placement spike " +
                    "(text + TeX + images + blanks flowing inline). Guards against renderer " +
                    "DOM changes (LEMS-4282 / LEMS-3764) breaking inline flow.",
            },
        },
    },
};
export default meta;

type Story = StoryObj;

export const AllScenarios: Story = {
    render: () => (
        <div style={{padding: 24, maxWidth: 640}}>
            <Row label="Prose (text + image + blanks)" content={proseContent} />
            <Row
                label="Equation / TeX (coefficient blanks)"
                content={equationContent}
            />
            <Row
                label="Mixed content + reflow (narrow)"
                content={mixedContent}
                maxWidth={340}
            />
        </div>
    ),
};
