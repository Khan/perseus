import * as React from "react";
import {action} from "storybook/actions";

import EditorPageWithStorybookPreview from "../../__docs__/editor-page-with-storybook-preview";
import {registerWidgetEditorDecorator} from "../../__docs__/register-widget-editor-decorator";
import {
    multiChoiceQuestion,
    singleSelectQuestion,
} from "../../__testdata__/radio.testdata";
import {PROD_EDITOR_WIDTH} from "../storybook-constants";

import type {Meta, StoryObj} from "@storybook/react-vite";

import RadioEditor, {radioEditorRegistration} from "./index";

const meta: Meta = {
    title: "Widgets/Radio/Editor Demo",
    component: RadioEditor,
    decorators: [registerWidgetEditorDecorator([radioEditorRegistration])],
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
