import * as React from "react";

import InfoTip from "../info-tip";

type StoryArgs = Record<any, any>;

type Story = {
    title: string;
};

export default {
    title: "Perseus/Components/Info Tip",
} as Story;

export const TextOnMouseover = (args: StoryArgs): React.ReactElement => {
    return <InfoTip>Sample text</InfoTip>;
};

export const CodeInText = (args: StoryArgs): React.ReactElement => {
    return (
        <InfoTip>
            Settings that you add here are available to the program as an object
            returned by <code>Program.settings()</code>
        </InfoTip>
    );
};

export const MultipleElements = (args: StoryArgs): React.ReactElement => {
    return (
        <InfoTip>
            <p>First paragraph</p>
            <p>Second paragraph</p>
        </InfoTip>
    );
};
