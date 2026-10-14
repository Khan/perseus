import * as React from "react";

import {question1} from "../../../../perseus/src/widgets/matrix/matrix.testdata";
import EditorPageWithStorybookPreview from "../../__docs__/editor-page-with-storybook-preview";

import MatrixEditor from "./matrix-editor";

import type {Meta, StoryObj} from "@storybook/react-vite";

const meta: Meta = {
    title: "Widgets/Matrix/Editor Demo",
    component: MatrixEditor,
    tags: ["!autodocs"],
} satisfies Meta<typeof MatrixEditor>;
export default meta;

type Story = StoryObj<typeof EditorPageWithStorybookPreview>;

export const EditorDemo: Story = {
    render: (): React.ReactElement => (
        <EditorPageWithStorybookPreview question={question1} />
    ),
};
