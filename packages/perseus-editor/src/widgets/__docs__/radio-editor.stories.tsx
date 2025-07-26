import * as React from "react";
import {action} from "storybook/actions";

import {
    multiChoiceQuestion,
    question,
} from "../../../../perseus/src/widgets/radio/__tests__/radio.testdata";
import EditorPageWithStorybookPreview from "../../__docs__/editor-page-with-storybook-preview";
import {registerAllWidgetsAndEditorsForTesting} from "../../util/register-all-widgets-and-editors-for-testing";
import RadioEditor from "../radio/editor";

import type {Meta} from "@storybook/react-vite";

// This is to address timing - Perseus widget editor registry accessed before initialization!
registerAllWidgetsAndEditorsForTesting();

const meta: Meta = {
    title: "Widgets/Radio/Editor Demo",
    tags: ["!dev"],
    parameters: {
        docs: {
            description: {
                component:
                    "An editor for adding a radio widget that allows users to select a single option from multiple choices.",
            },
        },
    },
};
export default meta;

export const Default = (): React.ReactElement => {
    return (
        <RadioEditor
            apiOptions={Object.freeze({})}
            onChange={action("onChange")}
            static={false}
        />
    );
};

export const SingleChoice = (): React.ReactElement => (
    <EditorPageWithStorybookPreview question={question} />
);

export const MultiChoice = (): React.ReactElement => (
    <EditorPageWithStorybookPreview question={multiChoiceQuestion} />
);
