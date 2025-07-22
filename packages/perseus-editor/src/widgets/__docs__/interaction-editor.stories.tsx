import * as React from "react";
import {useState} from "react";

import InteractionEditor from "../interaction-editor";

type StoryArgs = Record<any, any>;

type Story = {
    title: string;
};

export default {
    title: "Widgets/Interaction/Editor Demo",
    component: InteractionEditor,
    tags: ["autodocs", "!dev"],
    parameters: {
        componentSubtitle:
            "An editor for adding an interaction widget that allows users to engage with interactive content.",
        // Since by default, we don't show all stories in autodocs; this will show all stories in autodocs only for this component.
        docs: {disable: false},
    },
} as Story;

export const Default = (args: StoryArgs): React.ReactElement => {
    const [elements, setElements] = useState();
    const [graph, setGraph] = useState();

    function handleChange(next) {
        if (next.graph) {
            setGraph(next.graph);
        }

        if (next.elements) {
            setElements(next.elements);
        }
    }

    return (
        <InteractionEditor
            onChange={handleChange}
            elements={elements}
            graph={graph}
        />
    );
};
