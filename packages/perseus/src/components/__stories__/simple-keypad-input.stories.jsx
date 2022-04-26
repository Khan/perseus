// @flow
import * as React from "react";

import SimpleKeypadInput from "../simple-keypad-input.jsx";

type StoryArgs = {||};

type Story = {|
    title: string,
|};

const defaultObject = {
    onChange: () => {},
    onFocus: () => {},
    onBlur: () => {},
};

export default ({
    title: "Perseus/Components/Simple Keypad Input",
}: Story);

export const EmptyPropsObject = (args: StoryArgs): React.Node => {
    return <SimpleKeypadInput {...defaultObject} />;
};

export const CustomValue = (args: StoryArgs): React.Node => {
    return <SimpleKeypadInput {...defaultObject} value="Test value" />;
};
