import * as React from "react";

import {question1 as question} from "../../../../perseus/src/widgets/plotter/plotter.testdata";
import EditorPageWithStorybookPreview from "../../__docs__/editor-page-with-storybook-preview";

import PlotterEditor from "./plotter-editor";

import type {Meta, StoryObj} from "@storybook/react-vite";

const meta: Meta = {
    title: "Widgets/Plotter/Editor Demo",
    component: PlotterEditor,
    tags: ["!autodocs"],
} satisfies Meta<typeof PlotterEditor>;
export default meta;

type Story = StoryObj<typeof EditorPageWithStorybookPreview>;

export const EditorDemo: Story = {
    render: (): React.ReactElement => (
        <EditorPageWithStorybookPreview question={question} />
    ),
};
