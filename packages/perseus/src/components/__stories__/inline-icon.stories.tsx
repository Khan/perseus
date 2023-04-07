import * as React from "react";

import InlineIcon from "../inline-icon";

type StoryArgs = Record<any, any>;

type Story = {
    title: string;
};

const defaultPath = {
    path: "M62.808 49.728q0 3.36-2.352 5.88l-41.72 41.664q-2.352 2.408-5.768 2.408t-5.768-2.408l-4.872-4.76q-2.352-2.52-2.352-5.88t2.352-5.712l31.08-31.136-31.08-31.024q-2.352-2.52-2.352-5.88t2.352-5.712l4.872-4.76q2.296-2.408 5.768-2.408t5.768 2.408l41.72 41.664q2.352 2.296 2.352 5.656z",
    height: 100,
    width: 64,
} as const;

export default {
    title: "Perseus/Components/Inline Icon",
} as Story;

export const BasicIconPathAndSizing = (args: StoryArgs): React.ReactElement => {
    return <InlineIcon {...defaultPath} />;
};

export const BasicIconWithAdditionalStyling = (
    args: StoryArgs,
): React.ReactElement => {
    return (
        <InlineIcon
            {...defaultPath}
            style={{
                color: "red",
            }}
        />
    );
};

export const BasicIconWithAriaTitle = (args: StoryArgs): React.ReactElement => {
    return <InlineIcon {...defaultPath} title="Sample ARIA title" />;
};
