import * as React from "react";

import {article1 as question} from "../../../../perseus/src/widgets/graded-group-set/graded-group-set.testdata";
import EditorPageWithStorybookPreview from "../../__docs__/editor-page-with-storybook-preview";

import GradedGroupSetEditor from "./graded-group-set-editor";

import type {Meta, StoryObj} from "@storybook/react-vite";

const meta: Meta = {
    title: "Widgets/Graded Group Set/Editor Demo",
    component: GradedGroupSetEditor,
    tags: ["!autodocs"],
} satisfies Meta<typeof GradedGroupSetEditor>;
export default meta;

type Story = StoryObj<typeof EditorPageWithStorybookPreview>;

export const EditorDemo: Story = {
    render: (): React.ReactElement => (
        <EditorPageWithStorybookPreview question={question} />
    ),
};
