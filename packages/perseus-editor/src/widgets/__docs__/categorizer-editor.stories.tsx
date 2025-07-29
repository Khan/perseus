import {ApiOptions} from "@khanacademy/perseus";
import * as React from "react";
import {action} from "storybook/actions";

import EditorPageWithStorybookPreview from "../../__docs__/editor-page-with-storybook-preview";
import {question} from "../../__testdata__/categorizer.testdata";
import {registerAllWidgetsAndEditorsForTesting} from "../../util/register-all-widgets-and-editors-for-testing";
import CategorizerEditor from "../categorizer-editor";

import type {Meta, StoryObj} from "@storybook/react-vite";

// This is to address timing - Perseus widget editor registry accessed before initialization!
registerAllWidgetsAndEditorsForTesting();

const meta: Meta = {
    title: "Widgets/Categorizer/Editor Demo",
    component: CategorizerEditor,
    tags: ["!dev"],
} satisfies Meta<typeof CategorizerEditor>;
export default meta;

type Story = StoryObj<typeof meta>;
export const Default: Story = {
    args: {
        onChange: action("onChange"),
        apiOptions: ApiOptions.defaults,
    },
};

export const WithinEditorPage: StoryObj<typeof EditorPageWithStorybookPreview> =
    {
        render: (): React.ReactElement => (
            <EditorPageWithStorybookPreview question={question} />
        ),
    };
