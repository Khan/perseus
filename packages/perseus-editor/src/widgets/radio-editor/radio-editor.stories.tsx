import * as React from "react";

import EditorPageWithStorybookPreview from "../../__docs__/editor-page-with-storybook-preview";
import {singleSelectQuestion as question} from "../../__testdata__/radio.testdata";
import {registerAllWidgetsAndEditorsForTesting} from "../../util/register-all-widgets-and-editors-for-testing";

import RadioEditor from "./radio-editor";

import type {Meta, StoryObj} from "@storybook/react-vite";

// This is to address timing - Perseus widget editor registry accessed before initialization!
registerAllWidgetsAndEditorsForTesting();

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
