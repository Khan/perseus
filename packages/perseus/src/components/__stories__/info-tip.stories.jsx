// @flow

import * as React from "react";

import InfoTip from "../info-tip.jsx";

type StoryArgs = {||};

type Story = {|
    title: string,
|};

export default ({
    title: "Perseus/Components/Info Tip",
}: Story);

const svgUrl = "http://www.khanacademy.org/images/ohnoes-concerned.svg";

export const TextOnMouseover = (args: StoryArgs): React.Node => {
    return (
        <InfoTip>
            <span>Sample text</span>
        </InfoTip>
    );
};

export const ImageOnMouseover = (args: StoryArgs): React.Node => {
    return (
        <InfoTip>
            <img alt="" src={svgUrl} />
        </InfoTip>
    );
};
