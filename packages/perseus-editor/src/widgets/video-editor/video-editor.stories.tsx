import * as React from "react";

import {question1 as question} from "../../../../perseus/src/widgets/video/video.testdata";
import EditorPageWithStorybookPreview from "../../__docs__/editor-page-with-storybook-preview";

import VideoEditor from "./video-editor";

import type {Meta, StoryObj} from "@storybook/react-vite";

const meta: Meta = {
    title: "Widgets/Video/Editor Demo",
    component: VideoEditor,
    tags: ["!autodocs"],
} satisfies Meta<typeof VideoEditor>;
export default meta;

type Story = StoryObj<typeof EditorPageWithStorybookPreview>;

export const EditorDemo: Story = {
    render: (): React.ReactElement => (
        <EditorPageWithStorybookPreview question={question} />
    ),
};
