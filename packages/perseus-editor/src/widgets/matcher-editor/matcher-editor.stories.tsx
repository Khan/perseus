import * as React from "react";

import {question1 as question} from "../../../../perseus/src/widgets/matcher/matcher.testdata";
import EditorPageWithStorybookPreview from "../../__docs__/editor-page-with-storybook-preview";
import {registerAllWidgetsAndEditorsForTesting} from "../../util/register-all-widgets-and-editors-for-testing";

import MatcherEditor from "./matcher-editor";

import type {Meta, StoryObj} from "@storybook/react-vite";

// This is to address timing - Perseus widget editor registry accessed before initialization!
registerAllWidgetsAndEditorsForTesting();

const meta: Meta = {
    title: "Widgets/Matcher/Editor Demo",
    component: MatcherEditor,
    tags: ["!autodocs"],
} satisfies Meta<typeof MatcherEditor>;
export default meta;

type Story = StoryObj<typeof EditorPageWithStorybookPreview>;

export const EditorDemo: Story = {
    render: (): React.ReactElement => (
        <EditorPageWithStorybookPreview question={question} />
    ),
};
