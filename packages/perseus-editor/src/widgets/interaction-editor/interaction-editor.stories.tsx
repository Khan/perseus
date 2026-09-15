import * as React from "react";
import {action} from "storybook/actions";

import EditorPageWithStorybookPreview from "../../__docs__/editor-page-with-storybook-preview";
import {registerWidgetEditorDecorator} from "../../__docs__/register-widget-editor-decorator";
import {question} from "../../__testdata__/interaction.testdata";

import type {StoryObj} from "@storybook/react-vite";

import InteractionEditor, {interactionEditorRegistration} from "./index";

const meta = {
    title: "Widgets/Interaction/Editor Demo",
    component: InteractionEditor,
    decorators: [
        registerWidgetEditorDecorator([interactionEditorRegistration]),
    ],
    tags: ["!dev"],
};

export default meta;

type Story = StoryObj<typeof meta>;
export const Default: Story = {
    args: {
        onChange: action("onChange"),
        elements: [],
        graph: {
            box: [400, 400],
            labels: ["x", "y"],
            range: [
                [-10, 10],
                [-10, 10],
            ],
            tickStep: [1, 1],
            gridStep: [1, 1],
            markings: "grid",
            valid: true,
        },
    },
};

export const WithinEditorPage: StoryObj<typeof EditorPageWithStorybookPreview> =
    {
        render: (): React.ReactElement => (
            <EditorPageWithStorybookPreview question={question} />
        ),
    };
