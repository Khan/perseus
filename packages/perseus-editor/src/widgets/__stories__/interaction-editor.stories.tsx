import * as React from "react";
import {useState} from "react";

import InteractionEditor from "../interaction-editor";

type StoryArgs = Record<any, any>;

type Story = {
    title: string;
};

export default {
    title: "PerseusEditor/Widgets/Interaction Editor",
} as Story;

export const Default = (args: StoryArgs): React.ReactElement => {
    const [elements, setElements] = useState();
    const [graph, setGraph] = useState();

    function handleChange(next) {
        // eslint-disable-next-line @typescript-eslint/strict-boolean-expressions
        if (next.graph) {
            setGraph(next.graph);
        }
        // eslint-disable-next-line @typescript-eslint/strict-boolean-expressions
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
