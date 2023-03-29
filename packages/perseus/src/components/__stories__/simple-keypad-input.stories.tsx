import * as React from "react";

import SimpleKeypadInput from '../simple-keypad-input';

type StoryArgs = Record<any, any>;

type Story = {
    title: string
};

const defaultObject = {
    onChange: () => {},
    onFocus: () => {},
    onBlur: () => {},
} as const;

export default {
    title: "Perseus/Components/Simple Keypad Input",
} as Story;

export const EmptyPropsObject: React.FC<StoryArgs> = (args): React.ReactElement => {
    return <SimpleKeypadInput {...defaultObject} />;
};

export const CustomValue: React.FC<StoryArgs> = (args): React.ReactElement => {
    return <SimpleKeypadInput {...defaultObject} value="Test value" />;
};
