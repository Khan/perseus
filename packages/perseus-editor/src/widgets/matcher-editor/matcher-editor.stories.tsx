import * as React from "react";

import {question1 as question} from "../../../../perseus/src/widgets/matcher/matcher.testdata";
import EditorPageWithStorybookPreview from "../../__docs__/editor-page-with-storybook-preview";

import MatcherEditor from "./matcher-editor";

import type {Meta, StoryObj} from "@storybook/react-vite";

const meta: Meta = {
    title: "Widgets/Matcher/Editor Demo",
    component: MatcherEditor,
    tags: ["!autodocs"],
} satisfies Meta<typeof MatcherEditor>;
export default meta;

type Story = StoryObj<typeof EditorPageWithStorybookPreview>;

export const EditorDemo: Story = {
    render: (): React.ReactElement => (
        <EditorPageWithStorybookPreview question={question} />
    ),
};
