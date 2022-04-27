// @flow
import * as React from "react";

import ToggleableRadioWidget from "../toggleable-radio-button.jsx";

type StoryArgs = {||};

type Story = {|
    title: string,
|};

const defaultObject = {
    onChecked: () => {},
    goToPrevChoice: () => {},
    goToNextChoice: () => {},
};

export default ({
    title: "Perseus/Widgets/Radio/Toggleable Radio Button",
}: Story);

export const Checked = (args: StoryArgs): React.Node => {
    return <ToggleableRadioWidget {...defaultObject} checked={true} />;
};

export const Unchecked = (args: StoryArgs): React.Node => {
    return <ToggleableRadioWidget {...defaultObject} checked={false} />;
};
