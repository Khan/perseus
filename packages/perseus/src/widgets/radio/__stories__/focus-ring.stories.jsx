// @flow
import * as React from "react";

import * as styleConstants from "../../../styles/constants.js";
import FocusRing from "../focus-ring.jsx";

type StoryArgs = {|
    children: React.Node,
    color: string,
    visible: boolean,
    multipleSelect: boolean,
|};

type Story = {|
    title: string,
    args: StoryArgs,
|};

export default ({
    title: "Perseus/Widgets/Radio/Focus Ring",
    args: {
        children: "",
        color: styleConstants.kaGreen,
        visible: true,
        multipleSelect: false,
    },
}: Story);

export const Interactive = (args: StoryArgs): React.Node => {
    // faux choice is just for demonstration
    const fauxChoiceStyles = {
        height: "20px",
        width: "20px",
        background: args.color,
        borderRadius: args.multipleSelect ? "3px" : "50%",
    };

    const customArgs = {
        ...args,
        children: args.children || <div style={fauxChoiceStyles} />,
    };

    return <FocusRing {...customArgs} />;
};
