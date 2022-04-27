// @flow
import * as React from "react";

import MathOutput from "../math-output.jsx";

type StoryArgs = {||};

type Story = {|
    title: string,
|};

export default ({
    title: "Perseus/Components/Math Ouput",
}: Story);

export const EmptyPropsObject = (args: StoryArgs): React.Node => {
    return <MathOutput />;
};
export const StringValue = (args: StoryArgs): React.Node => {
    return <MathOutput value="Test string value" />;
};
export const NumericValue = (args: StoryArgs): React.Node => {
    return <MathOutput value={1234567890} />;
};
