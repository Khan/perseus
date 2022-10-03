// @flow
import * as React from "react";

import * as styleConstants from "../../../styles/constants.js";
import FocusRing from "../focus-ring.jsx";

type StoryArgs = {|
    children: React.Node,
    color: string,
    visible: boolean,
|};

type Story = {|
    title: string,
    args: StoryArgs,
|};

export default ({
    title: "Perseus/Widgets/Radio/Focus Ring",
    args: {children: "", color: styleConstants.kaGreen, visible: true},
}: Story);

export const EmptyPropsObject = (args: StoryArgs): React.Node => {
    // circle is just for demonstration
    const circleStyles = {
        height: "20px",
        width: "20px",
        background: args.color,
        borderRadius: "50%",
    };

    const customArgs = {
        ...args,
        children: args.children || <div style={circleStyles} />,
    };

    return <FocusRing {...customArgs} />;
};
