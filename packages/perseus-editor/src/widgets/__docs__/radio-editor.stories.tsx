import * as React from "react";
import {action} from "storybook/actions";

import EditorPageWithStorybookPreview from "../../__docs__/editor-page-with-storybook-preview";
import {
    multiChoiceQuestion,
    singleSelectQuestion,
} from "../../__testdata__/radio.testdata";
import {registerAllWidgetsAndEditorsForTesting} from "../../util/register-all-widgets-and-editors-for-testing";
import RadioEditor from "../radio/editor";

import type {Meta, StoryObj} from "@storybook/react-vite";

// This is to address timing - Perseus widget editor registry accessed before initialization!
registerAllWidgetsAndEditorsForTesting();

const meta: Meta = {
    title: "Widgets/RadioNew/Editor Demo",
    component: RadioEditor,
    tags: ["!dev"],
} satisfies Meta<typeof RadioEditor>;
export default meta;

type Story = StoryObj<typeof meta>;
export const Default: Story = {
    args: {
        onChange: action("onChange"),
        apiOptions: Object.freeze({}),
        static: false,
    },
};

export const SingleChoice = (): React.ReactElement => (
    <EditorPageWithStorybookPreview question={singleSelectQuestion} />
);

export const MultiChoice = (): React.ReactElement => (
    <EditorPageWithStorybookPreview question={multiChoiceQuestion} />
);
