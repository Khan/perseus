// @flow
import {action} from "@storybook/addon-actions";
import * as React from "react";

import {RendererWithDebugUI} from "../../../../../testing/renderer-with-debug-ui.jsx";
import {question1} from "../__testdata__/numeric-input_testdata.js";
import {NumericInput} from "../numeric-input.jsx";

type StoryArgs = {|
    currentValue: string,
|};

type Story = {|
    title: string,
    args: StoryArgs,
|};

function generateProps(overwrite) {
    const base = {
        alignment: "",
        answers: [],
        containerSizeClass: "medium",
        isLastUsedWidget: true,
        currentValue: "",
        problemNum: 0,
        reviewModeRubric: {
            answers: [],
            labelText: "",
            size: "medium",
            coefficient: false,
            static: false,
        },
        static: false,
        widgetId: "widgetId",
        findWidgets: action("findWidgets"),
        onBlur: action("onBlur"),
        onChange: action("onChange"),
        onFocus: action("onFocus"),
        trackInteraction: action("trackInteraction"),
    };

    return {...base, ...overwrite};
}

export default ({
    title: "Perseus/Widgets/NumericInput",
    args: {
        currentValue: "8675309",
    },
}: Story);

export const Question1 = (): React.Node => {
    return <RendererWithDebugUI question={question1} />;
};

export const Interactive = (args: StoryArgs): React.Node => {
    const props = generateProps(args);

    return <NumericInput {...props} />;
};
