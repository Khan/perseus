import * as React from "react";

import {question1 as question} from "../../../../perseus/src/widgets/input-number/input-number.testdata";
import EditorPageWithStorybookPreview from "../../__docs__/editor-page-with-storybook-preview";

import InputNumberEditor from "./input-number-editor";

import type {Meta, StoryObj} from "@storybook/react-vite";

const meta: Meta = {
    title: "Widgets/Input Number/Editor Demo",
    component: InputNumberEditor,
    tags: ["!autodocs"],
} satisfies Meta<typeof InputNumberEditor>;
export default meta;

type Story = StoryObj<typeof EditorPageWithStorybookPreview>;

export const EditorDemo: Story = {
    render: (): React.ReactElement => (
        <EditorPageWithStorybookPreview question={question} />
    ),
};
