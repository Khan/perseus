import * as React from "react";
import {action} from "storybook/actions";

import {
    multiChoiceQuestion,
    question,
} from "../../../../perseus/src/widgets/radio/__tests__/radio.testdata";
import EditorPageWithStorybookPreview from "../../__docs__/editor-page-with-storybook-preview";
import {registerAllWidgetsAndEditorsForTesting} from "../../util/register-all-widgets-and-editors-for-testing";
import RadioEditor from "../radio/editor";

import type {Meta, StoryObj} from "@storybook/react-vite";

// This is to address timing - Perseus widget editor registry accessed before initialization!
registerAllWidgetsAndEditorsForTesting();

const meta: Meta = {
    title: "Widgets/Radio/Editor Demo",
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
    <EditorPageWithStorybookPreview question={question} />
);

export const MultiChoice = (): React.ReactElement => (
    <EditorPageWithStorybookPreview question={multiChoiceQuestion} />
);
