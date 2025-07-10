import * as React from "react";

import * as styleConstants from "../../../styles/constants";
import FocusRing from "../focus-ring";

type StoryArgs = {
    children: React.ReactNode;
    color: string;
    visible: boolean;
    multipleSelect: boolean;
};

type Story = {
    title: string;
    args: StoryArgs;
};

export default {
    title: "Widgets/Radio/Focus Ring",
    args: {
        children: "",
        color: styleConstants.kaGreen,
        visible: true,
        multipleSelect: false,
    },
} as Story;

export const Interactive = (args: StoryArgs): React.ReactElement => {
    // faux choice is just for demonstration
    const fauxChoiceStyles = {
        height: "20px",
        width: "20px",
        background: args.color,
        borderRadius: args.multipleSelect ? "3px" : "50%",
    } as const;

    const customArgs = {
        ...args,
        // eslint-disable-next-line @typescript-eslint/strict-boolean-expressions
        children: args.children || <div style={fauxChoiceStyles} />,
    } as const;

    return <FocusRing {...customArgs} />;
};
