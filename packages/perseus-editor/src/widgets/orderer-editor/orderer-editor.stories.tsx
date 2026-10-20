import * as React from "react";

import {question1} from "../../../../perseus/src/widgets/orderer/orderer.testdata";
import EditorPageWithStorybookPreview from "../../__docs__/editor-page-with-storybook-preview";

import OrdererEditor from "./orderer-editor";

import type {Meta, StoryObj} from "@storybook/react-vite";

const meta: Meta = {
    title: "Widgets/Orderer/Editor Demo",
    component: OrdererEditor,
    tags: ["!autodocs"],
} satisfies Meta<typeof OrdererEditor>;
export default meta;

type Story = StoryObj<typeof EditorPageWithStorybookPreview>;

export const EditorDemo: Story = {
    render: (): React.ReactElement => (
        <EditorPageWithStorybookPreview question={question1} />
    ),
};
