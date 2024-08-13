import * as React from "react";

import {registerAllWidgetsAndEditorsForTesting} from "../util/register-all-widgets-and-editors-for-testing";

import EditorPageWithStorybookPreview from "./editor-page-with-storybook-preview";

import type {Meta, StoryObj} from "@storybook/react";

registerAllWidgetsAndEditorsForTesting(); // SIDE_EFFECTY!!!! :cry:

const meta: Meta = {
    title: "PerseusEditor/EditorPage",
    component: EditorPageWithStorybookPreview,
    args: {developerMode: false},
};
export default meta;

type Story = StoryObj<typeof EditorPageWithStorybookPreview>;

export const Demo: Story = {};
