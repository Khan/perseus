import {ApiOptions} from "@khanacademy/perseus";
import * as React from "react";

import {texQuestion as question} from "../../../../perseus/src/widgets/sorter/sorter.testdata";
import EditorPageWithStorybookPreview from "../../__docs__/editor-page-with-storybook-preview";
import {getFeatureFlags} from "../../testing/feature-flags-util";

import SorterEditor from "./sorter-editor";

import type {Meta, StoryObj} from "@storybook/react-vite";

const meta: Meta = {
    title: "Widgets/Sorter/Editor Demo",
    component: SorterEditor,
    tags: ["!autodocs"],
} satisfies Meta<typeof SorterEditor>;
export default meta;

type Story = StoryObj<typeof EditorPageWithStorybookPreview>;

export const EditorDemo: Story = {
    render: (): React.ReactElement => (
        <EditorPageWithStorybookPreview question={question} />
    ),
};

// The legend fields only show with this flag on.
export const WithLegend: Story = {
    render: (): React.ReactElement => (
        <EditorPageWithStorybookPreview
            question={question}
            apiOptions={{
                ...ApiOptions.defaults,
                flags: getFeatureFlags({"dnd-widget-sorter": true}),
            }}
        />
    ),
};
