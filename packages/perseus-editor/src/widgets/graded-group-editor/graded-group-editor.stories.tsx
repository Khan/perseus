import * as React from "react";

import {question1 as question} from "../../../../perseus/src/widgets/graded-group/graded-group.testdata";
import EditorPageWithStorybookPreview from "../../__docs__/editor-page-with-storybook-preview";

import GradedGroupEditor from "./graded-group-editor";

import type {Meta, StoryObj} from "@storybook/react-vite";

const meta: Meta = {
    title: "Widgets/Graded Group/Editor Demo",
    component: GradedGroupEditor,
    tags: ["!autodocs"],
} satisfies Meta<typeof GradedGroupEditor>;
export default meta;

type Story = StoryObj<typeof EditorPageWithStorybookPreview>;

export const EditorDemo: Story = {
    render: (): React.ReactElement => (
        <EditorPageWithStorybookPreview question={question} />
    ),
};
