import * as React from "react";

import {question1} from "../../../../perseus/src/widgets/number-line/number-line.testdata";
import EditorPageWithStorybookPreview from "../../__docs__/editor-page-with-storybook-preview";

import NumberLineEditor from "./number-line-editor";

import type {Meta, StoryObj} from "@storybook/react-vite";

const meta: Meta = {
    title: "Widgets/Number Line/Editor Demo",
    component: NumberLineEditor,
    tags: ["!autodocs"],
};
export default meta;

type Story = StoryObj<typeof EditorPageWithStorybookPreview>;

export const EditorDemo: Story = {
    render: (): React.ReactElement => (
        <EditorPageWithStorybookPreview question={question1} />
    ),
};
