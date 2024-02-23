import * as React from "react";

import InteractiveGraphEditor from "../interactive-graph-editor";

import InteractiveGraphEditorArgTypes from "./interactive-graph-editor.argtypes";

export default {
    title: "Perseus/Editor/Widgets/Interactive Graph Editor",
    component: InteractiveGraphEditor,
    argTypes: InteractiveGraphEditorArgTypes,
};

export const Default = (args): React.ReactElement => {
    return <InteractiveGraphEditor {...args} />;
};

Default.args = {
    // Separating the array props out because trying to editing them in
    // the controls panel without a default value causes the story to crash.
    box: [288, 288],
    gridStep: [1, 1],
    labels: ["x", "y"],
    range: [
        [-10, 10],
        [-10, 10],
    ],
    snapStep: [1, 1],
    step: [1, 1],
};
