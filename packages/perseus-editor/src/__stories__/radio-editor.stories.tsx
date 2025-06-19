import * as React from "react";

import {
    question,
    multiChoiceQuestion,
} from "../../../perseus/src/widgets/radio/__tests__/radio.testdata";
import {registerAllWidgetsAndEditorsForTesting} from "../util/register-all-widgets-and-editors-for-testing";

import EditorPageWithStorybookPreview from "./editor-page-with-storybook-preview";

registerAllWidgetsAndEditorsForTesting(); // SIDE_EFFECTY!!!! :cry:

export default {
    title: "PerseusEditor/EditorPage/Widgets/Radio",
};

export const SingleChoice = (): React.ReactElement => (
    <EditorPageWithStorybookPreview question={question} />
);

export const MultiChoice = (): React.ReactElement => (
    <EditorPageWithStorybookPreview question={multiChoiceQuestion} />
);
