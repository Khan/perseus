import * as React from "react";

import {measurerQuestion} from "../../../../perseus/src/widgets/measurer/measurer.testdata";
import EditorPageWithStorybookPreview from "../../__docs__/editor-page-with-storybook-preview";

import MeasurerEditor from "./measurer-editor";

import type {Meta, StoryObj} from "@storybook/react-vite";

const meta: Meta = {
    title: "Widgets/Measurer/Editor Demo",
    component: MeasurerEditor,
    tags: ["!autodocs"],
} satisfies Meta<typeof MeasurerEditor>;
export default meta;

type Story = StoryObj<typeof EditorPageWithStorybookPreview>;

export const EditorDemo: Story = {
    render: (): React.ReactElement => (
        <EditorPageWithStorybookPreview
            question={measurerQuestion({showProtractor: true, showRuler: true})}
        />
    ),
};
