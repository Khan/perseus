import * as React from "react";

import FillInTheBlankTagEditor from "../fill-in-the-blank-tag-editor";

import type {Meta, StoryObj} from "@storybook/react-vite";

/**
 * PROTOTYPE: the "renderer-based, blank-tag" FITB authoring approach — the
 * alternative to the drag-and-drop card composer. The author writes content in
 * a text field and inserts `{{blank}}` tags; a live preview renders it through
 * the real Perseus <Renderer>, with per-blank settings + a choices bank, and
 * exports the same widget JSON. Use it to compare the *feel* of tag-authoring
 * against dragging cards.
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
                    "exports the widget JSON. Comparison piece for the drag-and-drop card editor.",
            },
        },
    },
};
export default meta;

type Story = StoryObj<typeof FillInTheBlankTagEditor>;

export const Prose: Story = {
    args: {
        initialContent:
            "SpongeBob lives in a {{blank}}, which sits under the {{blank}}.",
        initialChoices: [
            {id: "c1", text: "Pineapple"},
            {id: "c2", text: "Sea"},
            {id: "c3", text: "Ocean"},
        ],
    },
};

export const Equation: Story = {
    args: {
        initialContent:
            "{{blank}} $H_2$ + {{blank}} $O_2 \\rightarrow$ {{blank}} $H_2 O$",
        initialChoices: [
            {id: "c1", text: "1"},
            {id: "c2", text: "2"},
            {id: "c3", text: "3"},
        ],
    },
};

export const Empty: Story = {
    args: {
        initialContent: "",
        initialChoices: [],
    },
};
