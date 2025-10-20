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

const PROD_EDITOR_WIDTH = 330;

// This is to address timing - Perseus widget editor registry accessed before initialization!
registerAllWidgetsAndEditorsForTesting();

const meta: Meta = {
    title: "Widgets/RadioNew/Editor Demo",
    component: RadioEditor,
    tags: ["!autodocs"],
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
    <div style={{width: PROD_EDITOR_WIDTH}}>
        <EditorPageWithStorybookPreview question={singleSelectQuestion} />
    </div>
);

export const MultiChoice = (): React.ReactElement => (
    <div style={{width: PROD_EDITOR_WIDTH}}>
        <EditorPageWithStorybookPreview question={multiChoiceQuestion} />
    </div>
);
