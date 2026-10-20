import * as React from "react";

import {question1 as question} from "../../../../perseus/src/widgets/python-program/python-program.testdata";
import EditorPageWithStorybookPreview from "../../__docs__/editor-page-with-storybook-preview";

import PythonProgramEditor from "./python-program-editor";

import type {Meta, StoryObj} from "@storybook/react-vite";

const meta: Meta = {
    title: "Widgets/Python Program/Editor Demo",
    component: PythonProgramEditor,
    tags: ["!autodocs"],
} satisfies Meta<typeof PythonProgramEditor>;
export default meta;

type Story = StoryObj<typeof EditorPageWithStorybookPreview>;

export const EditorDemo: Story = {
    render: (): React.ReactElement => (
        <EditorPageWithStorybookPreview question={question} />
    ),
};
