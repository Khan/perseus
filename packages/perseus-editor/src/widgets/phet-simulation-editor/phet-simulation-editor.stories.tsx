import * as React from "react";

import {question1 as question} from "../../../../perseus/src/widgets/phet-simulation/phet-simulation.testdata";
import EditorPageWithStorybookPreview from "../../__docs__/editor-page-with-storybook-preview";

import PhetSimulationEditor from "./phet-simulation-editor";

import type {Meta, StoryObj} from "@storybook/react-vite";

const meta: Meta = {
    title: "Widgets/PhET Simulation/Editor Demo",
    component: PhetSimulationEditor,
    tags: ["!autodocs"],
} satisfies Meta<typeof PhetSimulationEditor>;
export default meta;

type Story = StoryObj<typeof EditorPageWithStorybookPreview>;

export const EditorDemo: Story = {
    render: (): React.ReactElement => (
        <EditorPageWithStorybookPreview question={question} />
    ),
};
