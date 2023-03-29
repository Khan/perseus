import * as React from "react";

import InfoTip from '../info-tip';

type StoryArgs = Record<any, any>;

type Story = {
    title: string
};

export default {
    title: "Perseus/Components/Info Tip",
} as Story;

const svgUrl = "http://www.khanacademy.org/images/ohnoes-concerned.svg";

export const TextOnMouseover: React.FC<StoryArgs> = (args): React.ReactElement => {
    return (
        <InfoTip>
            <span>Sample text</span>
        </InfoTip>
    );
};

export const ImageOnMouseover: React.FC<StoryArgs> = (args): React.ReactElement => {
    return (
        <InfoTip>
            <img alt="" src={svgUrl} />
        </InfoTip>
    );
};
