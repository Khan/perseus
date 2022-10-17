// @flow
import * as React from "react";

import {generateChoice} from "../../__testdata__/base-radio_testdata.js";
import BaseRadio from "../base-radio.jsx";

type StoryArgs = {||};

type Story = {|
    title: string,
|};

export default ({
    title: "Perseus/Widgets/Radio/Base Radio",
}: Story);

const defaultProps = {
    apiOptions: {
        satStyling: false,
        styling: {
            radioStyleVersion: "final",
        },
    },
    choices: [
        generateChoice({
            content: "Content 1",
            originalIndex: 0,
        }),
        generateChoice({
            content: "Content 2",
            originalIndex: 1,
        }),
    ],
    deselectEnabled: false,
    editMode: false,
    labelWrap: false,
    countChoices: false,
    numCorrect: 1,
    multipleSelect: false,

    // A callback indicating that this choice has changed. Its argument is
    // an object with two keys: `checked` and `crossedOut`. Each contains
    // an array of boolean values, specifying the new checked and
    // crossed-out value of each choice.
    onChange: ({checked, crossedOut}) => {},

    // Whether this widget was the most recently used widget in this
    // Renderer. Determines whether we'll auto-scroll the page upon
    // entering review mode.
    isLastUsedWidget: false,
};

export const DefaultSettings = (args: StoryArgs): React.Node => {
    return <BaseRadio {...defaultProps} />;
};
