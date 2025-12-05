import {
    generateExpressionOptions,
    generateExpressionAnswerForm,
    generateExpressionWidget,
    type PerseusRenderer,
} from "@khanacademy/perseus-core";
import * as React from "react";
import {action} from "storybook/actions";

import EditorPageWithStorybookPreview from "../../__docs__/editor-page-with-storybook-preview";
import {registerAllWidgetsAndEditorsForTesting} from "../../util/register-all-widgets-and-editors-for-testing";
import ExpressionEditor from "../expression-editor";

import type {Meta, StoryObj} from "@storybook/react-vite";

// This is to address timing - Perseus widget editor registry accessed before initialization!
registerAllWidgetsAndEditorsForTesting();

const meta: Meta = {
    title: "Widgets/Expression/Editor Demo",
    component: ExpressionEditor,
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
