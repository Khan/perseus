import {
    generateExpressionOptions,
    generateExpressionAnswerForm,
    generateExpressionWidget,
    type PerseusRenderer,
} from "@khanacademy/perseus-core";
import * as React from "react";
import {action} from "storybook/actions";

import EditorPageWithStorybookPreview from "../../__docs__/editor-page-with-storybook-preview";
import {registerWidgetEditorDecorator} from "../../__docs__/register-widget-editor-decorator";

import type {Meta, StoryObj} from "@storybook/react-vite";

import ExpressionEditor, {expressionEditorRegistration} from "./index";

const meta: Meta = {
    title: "Widgets/Expression/Editor Demo",
    component: ExpressionEditor,
    decorators: [registerWidgetEditorDecorator([expressionEditorRegistration])],
    tags: ["!dev"],
} satisfies Meta<typeof ExpressionEditor>;
export default meta;

const question: PerseusRenderer = {
    content:
        "This is a cool expression question\n\n[[\u2603 expression 1]]\n\n",
    images: {},
    widgets: {
        "expression 1": generateExpressionWidget({
            options: generateExpressionOptions({
                answerForms: [
                    generateExpressionAnswerForm({
                        considered: "correct",
                        form: true,
                        value: "16+88i",
                        key: "0",
                    }),
                ],
            }),
        }),
    },
};

type Story = StoryObj<typeof meta>;
export const Default: Story = {
    args: {
        onChange: action("onChange"),
    },
};

export const WithinEditorPage: StoryObj<typeof EditorPageWithStorybookPreview> =
    {
        render: (): React.ReactElement => (
            <EditorPageWithStorybookPreview question={question} />
        ),
    };
