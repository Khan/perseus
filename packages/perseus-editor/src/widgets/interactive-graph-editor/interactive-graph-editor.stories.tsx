import {
    generateInteractiveGraphQuestion,
    generateIGNoneGraph,
    generateIGLockedFunction,
} from "@khanacademy/perseus-core";
import * as React from "react";

import EditorPageWithStorybookPreview from "../../__docs__/editor-page-with-storybook-preview";
import {segmentWithLockedFigures} from "../../__testdata__/interactive-graph.testdata";
import {registerAllWidgetsAndEditorsForTesting} from "../../util/register-all-widgets-and-editors-for-testing";

import InteractiveGraphEditor from "./interactive-graph-editor";

import type {Meta} from "@storybook/react-vite";

// This is to address timing - Perseus widget editor registry accessed before initialization!
registerAllWidgetsAndEditorsForTesting();

const meta: Meta = {
    title: "Widgets/Interactive Graph/Editor Demo",
    component: InteractiveGraphEditor,
    tags: ["!autodocs"],
} satisfies Meta<typeof InteractiveGraphEditor>;
export default meta;

export const Default = (): React.ReactElement => {
    return (
        <EditorPageWithStorybookPreview
            question={generateInteractiveGraphQuestion({
                correct: generateIGNoneGraph(),
                lockedFigures: [
                    generateIGLockedFunction({
                        equation: "5*sin(x)",
                        color: "red",
                    }),
                ],
            })}
        />
    );
};

export const WithLockedFigures = (): React.ReactElement => {
    return (
        <EditorPageWithStorybookPreview question={segmentWithLockedFigures} />
    );
};
