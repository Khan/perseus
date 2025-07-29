import * as React from "react";
import {action} from "storybook/actions";

import {question1} from "../../../../perseus/src/widgets/interaction/interaction.testdata";
import EditorPageWithStorybookPreview from "../../__docs__/editor-page-with-storybook-preview";
import {registerAllWidgetsAndEditorsForTesting} from "../../util/register-all-widgets-and-editors-for-testing";
import InteractionEditor from "../interaction-editor";

import type {StoryObj} from "@storybook/react-vite";

// This is to address timing - Perseus widget editor registry accessed before initialization!
registerAllWidgetsAndEditorsForTesting();

const meta = {
    title: "Widgets/Interaction/Editor Demo",
    component: InteractionEditor,
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

export const Preview: StoryObj<typeof EditorPageWithStorybookPreview> = {
    render: (): React.ReactElement => (
        <EditorPageWithStorybookPreview question={question1} />
    ),
};
