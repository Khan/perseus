import * as React from "react";

import EditorPageWithStorybookPreview from "../../__docs__/editor-page-with-storybook-preview";
import {question} from "../../__testdata__/interaction.testdata";
import {registerAllWidgetsAndEditorsForTesting} from "../../util/register-all-widgets-and-editors-for-testing";

import InteractionEditor from "./interaction-editor";

import type {Meta, StoryObj} from "@storybook/react-vite";

// This is to address timing - Perseus widget editor registry accessed before initialization!
registerAllWidgetsAndEditorsForTesting();

const meta: Meta = {
    title: "Widgets/Interaction/Editor Demo",
    component: InteractionEditor,
    tags: ["!autodocs"],
};
export default meta;

type Story = StoryObj<typeof EditorPageWithStorybookPreview>;

export const EditorDemo: Story = {
    render: (): React.ReactElement => (
        <EditorPageWithStorybookPreview question={question} />
    ),
};
