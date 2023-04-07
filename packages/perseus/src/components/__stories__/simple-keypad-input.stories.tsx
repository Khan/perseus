import * as React from "react";

import SimpleKeypadInput from "../simple-keypad-input";

type StoryArgs = Record<any, any>;

type Story = {
    title: string;
};

const defaultObject = {
    onChange: () => {},
    onFocus: () => {},
    onBlur: () => {},
} as const;

export default {
    title: "Perseus/Components/Simple Keypad Input",
} as Story;

export const EmptyPropsObject = (args: StoryArgs): React.ReactElement => {
    return <SimpleKeypadInput {...defaultObject} />;
};

export const CustomValue = (args: StoryArgs): React.ReactElement => {
    return <SimpleKeypadInput {...defaultObject} value="Test value" />;
};
