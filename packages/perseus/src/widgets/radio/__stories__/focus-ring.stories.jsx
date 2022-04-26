// @flow
import * as React from "react";

import FocusRing from "../focus-ring.jsx";

type StoryArgs = {||};

type Story = {|
    title: string,
|};

export default ({
    title: "Perseus/Widgets/Radio/Focus Ring",
}: Story);

export const EmptyPropsObject = (args: StoryArgs): React.Node => {
    return <FocusRing />;
};

export const VisibleSetToTrue = (args: StoryArgs): React.Node => {
    return <FocusRing visible={true} />;
};

export const VisibleSetToFalse = (args: StoryArgs): React.Node => {
    return <FocusRing visible={false} />;
};

export const ColorRed = (args: StoryArgs): React.Node => {
    return <FocusRing color="red" />;
};

export const SingleSpanChild = (args: StoryArgs): React.Node => {
    return (
        <FocusRing>
            <span>test</span>
        </FocusRing>
    );
};
