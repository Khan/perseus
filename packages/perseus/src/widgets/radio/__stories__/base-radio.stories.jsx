// @flow
import * as React from "react";

import Widget from "../base-radio.jsx";

type StoryArgs = {||};

type Story = {|
    title: string,
|};

export default ({
    title: "Perseus/Widgets/Radio/Base Radio",
}: Story);

const defaultObject = {
    apiOptions: {
        satStyling: false,
        styling: {
            radioStyleVersion: "final",
        },
    },
    choices: [
        {
            content: "Content 1",
            originalIndex: 0,
        },
        {
            content: "Content 2",
            originalIndex: 1,
        },
    ],
    onChange: () => {},
    trackInteraction: () => {},
    widgetId: "test-widget",
};

export const DefaultSettings = (args: StoryArgs): React.Node => {
    return <Widget {...defaultObject} />;
};
