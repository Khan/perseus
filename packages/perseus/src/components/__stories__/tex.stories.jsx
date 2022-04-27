// @flow
import * as React from "react";

import TeX from "../tex.jsx";

type StoryArgs = {||};

type Story = {|
    title: string,
|};

export default ({
    title: "Perseus/Components/Tex",
}: Story);

export const BasicOperation = (args: StoryArgs): React.Node => {
    return <TeX setAssetStatus={() => {}} children="f(x) = x + 1" />;
};
