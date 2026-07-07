import FillInTheBlankTagEditor from "../fill-in-the-blank-tag-editor";

import type {Meta, StoryObj} from "@storybook/react-vite";

/**
 * PROTOTYPE: the "renderer-based, blank-tag" FITB authoring approach — the
 * alternative to the drag-and-drop card composer. The author writes content in
 * a text field and inserts `{{blank}}` tags; a live preview renders it through
 * the real Perseus <Renderer>, with per-blank settings + a choices bank
 * (markdown or image choices), and exports the same widget JSON. Use it to
 * compare the *feel* of tag-authoring against dragging cards.
 */
const meta: Meta<typeof FillInTheBlankTagEditor> = {
    title: "Widgets/Fill in the Blank/Tag Editor Prototype",
    component: FillInTheBlankTagEditor,
    tags: ["!manifest"],
    parameters: {
        docs: {
            description: {
                component:
                    "Renderer-based (blank-tag) authoring prototype for Fill in the Blank. " +
                    "Type content + `{{blank}}` tags; preview renders via the Perseus Renderer; " +
                    "choices support markdown (text/TeX) or images; exports the widget JSON. " +
                    "Comparison piece for the drag-and-drop card editor.",
            },
        },
    },
};
export default meta;

type Story = StoryObj<typeof FillInTheBlankTagEditor>;

// Inline SVG data URIs so image choices render with no network dependency.
const svgTile = (inner: string): string =>
    `data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='48' height='48'>${inner}</svg>`;
const circle = svgTile("<circle cx='24' cy='24' r='18' fill='%235a54c9'/>");
const square = svgTile(
    "<rect x='8' y='8' width='32' height='32' rx='3' fill='%23348465'/>",
);
const triangle = svgTile("<path d='M24 8 L42 40 L6 40 Z' fill='%23c2560c'/>");

export const Prose: Story = {
    args: {
        initialContent:
            "Hello my name is SpongeBob, and I live in a {{blank 1}} under the {{blank 2}}. The sea is made out of {{blank 3}}.",
        initialChoices: [
            {id: "c1", type: "markdown", markdown: "pineapple"},
            {id: "c2", type: "markdown", markdown: "sea"},
            {id: "c3", type: "markdown", markdown: "$H_2O$"},
        ],
        // Blank 1 → pineapple, Blank 2 → sea, Blank 3 → H₂O (TeX).
        initialBlankSettings: [
            {correct: "c1", displayType: "normal"},
            {correct: "c2", displayType: "normal"},
            {correct: "c3", displayType: "normal"},
        ],
    },
};

export const Equation: Story = {
    args: {
        initialContent:
            "{{blank 1}} $H_2$ + {{blank 2}} $O_2 \\rightarrow$ {{blank 3}} $H_2 O$",
        initialChoices: [
            {id: "c1", type: "markdown", markdown: "1"},
            {id: "c2", type: "markdown", markdown: "2"},
            {id: "c3", type: "markdown", markdown: "3"},
        ],
    },
};

export const ImageChoices: Story = {
    args: {
        initialContent:
            "The pattern is circle, square, triangle, circle, square… so the next shape is {{blank 1}}.",
        initialChoices: [
            {
                id: "c1",
                type: "image",
                url: circle,
                alt: "circle",
                longDescription: "A purple circle.",
            },
            {
                id: "c2",
                type: "image",
                url: square,
                alt: "square",
                longDescription: "A green square.",
            },
            {
                id: "c3",
                type: "image",
                url: triangle,
                alt: "triangle",
                longDescription: "An orange triangle.",
            },
        ],
        // The next shape in circle→square→triangle→… is a triangle.
        initialBlankSettings: [{correct: "c3", displayType: "normal"}],
        initialImageHeight: 48,
    },
};

export const Empty: Story = {
    args: {
        initialContent: "",
        initialChoices: [],
    },
};
