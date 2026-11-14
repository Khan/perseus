import * as React from "react";

import EditorPageWithStorybookPreview from "../../__docs__/editor-page-with-storybook-preview";
import {
    question,
    questionWithStartPositions,
} from "../../__testdata__/polar-graph.testdata";

import PolarGraphEditor from "./polar-graph-editor";

import type {Meta, StoryObj} from "@storybook/react-vite";

const meta: Meta = {
    title: "Widgets/Polar Graph/Editor Demo",
    component: PolarGraphEditor,
    tags: ["!autodocs"],
} satisfies Meta<typeof PolarGraphEditor>;
export default meta;

type Story = StoryObj<typeof EditorPageWithStorybookPreview>;

export const EditorDemo: Story = {
    render: (): React.ReactElement => (
        <EditorPageWithStorybookPreview question={question} />
    ),
};

export const WithStartPositions: Story = {
    render: (): React.ReactElement => (
        <EditorPageWithStorybookPreview question={questionWithStartPositions} />
    ),
};
