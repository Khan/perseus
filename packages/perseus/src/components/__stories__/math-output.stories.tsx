import * as React from "react";

import MathOutput from "../math-output";

type StoryArgs = Record<any, any>;

type Story = {
    title: string;
};

export default {
    title: "Perseus/Components/Math Ouput",
} as Story;

export const EmptyPropsObject = (args: StoryArgs): React.ReactElement => {
    return <MathOutput />;
};
export const StringValue = (args: StoryArgs): React.ReactElement => {
    return <MathOutput value="Test string value" />;
};
export const NumericValue = (args: StoryArgs): React.ReactElement => {
    return <MathOutput value={1234567890} />;
};
