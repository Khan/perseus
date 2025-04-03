import * as React from "react";

import {ServerItemRendererWithDebugUI} from "../../../../../testing/server-item-renderer-with-debug-ui";
import {generateTestPerseusItem} from "../../util/test-utils";

import {question1} from "./categorizer.testdata";

export default {
    title: "Perseus/Widgets/Categorizer",
};

type StoryArgs = Record<any, any>;

export const Question1 = (args: StoryArgs): React.ReactElement => {
    return (
        <ServerItemRendererWithDebugUI
            item={generateTestPerseusItem({question: question1})}
        />
    );
};
