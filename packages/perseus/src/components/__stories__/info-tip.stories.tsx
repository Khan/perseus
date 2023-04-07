import * as React from "react";

import InfoTip from "../info-tip";

type StoryArgs = Record<any, any>;

type Story = {
    title: string;
};

export default {
    title: "Perseus/Components/Info Tip",
} as Story;

const svgUrl = "http://www.khanacademy.org/images/ohnoes-concerned.svg";

export const TextOnMouseover = (args: StoryArgs): React.ReactElement => {
    return (
        <InfoTip>
            <span>Sample text</span>
        </InfoTip>
    );
};

export const ImageOnMouseover = (args: StoryArgs): React.ReactElement => {
    return (
        <InfoTip>
            <img alt="" src={svgUrl} />
        </InfoTip>
    );
};
