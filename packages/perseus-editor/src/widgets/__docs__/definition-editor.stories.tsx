import * as React from "react";
import {action} from "storybook/actions";

import {question} from "../../../../perseus/src/widgets/definition/definition.testdata";
import EditorPageWithStorybookPreview from "../../__docs__/editor-page-with-storybook-preview";
import {registerAllWidgetsAndEditorsForTesting} from "../../util/register-all-widgets-and-editors-for-testing";
import DefinitionEditor from "../definition-editor";

import type {Meta, StoryObj} from "@storybook/react-vite";

// This is to address timing - Perseus widget editor registry accessed before initialization!
registerAllWidgetsAndEditorsForTesting();

const meta: Meta = {
    title: "Widgets/Definition/Editor Demo",
    component: DefinitionEditor,
    tags: ["!dev"],
    parameters: {
        docs: {
            description: {
                component:
                    "An editor for adding an interactive definition widget that allow content\
                    editors to embed clickable terms with expandable explanations within content.",
            },
        },
    },
} satisfies Meta<typeof DefinitionEditor>;
export default meta;

type Story = StoryObj<typeof meta>;
export const Default: Story = {
    args: {
        onChange: action("onChange"),
    },
};

export const Preview: StoryObj<typeof EditorPageWithStorybookPreview> = {
    render: (): React.ReactElement => (
        <EditorPageWithStorybookPreview question={question} />
    ),
};
