import * as React from "react";

import EditorPageWithStorybookPreview from "../../__docs__/editor-page-with-storybook-preview";
import {singleSelectQuestion as question} from "../../__testdata__/radio.testdata";

import RadioEditor from "./radio-editor";

import type {Meta, StoryObj} from "@storybook/react-vite";

const meta: Meta = {
    title: "Widgets/Radio/Editor Demo",
    component: RadioEditor,
    tags: ["!autodocs"],
} satisfies Meta<typeof RadioEditor>;
export default meta;

type Story = StoryObj<typeof EditorPageWithStorybookPreview>;

export const EditorDemo: Story = {
    render: (): React.ReactElement => (
        <EditorPageWithStorybookPreview question={question} />
    ),
};
