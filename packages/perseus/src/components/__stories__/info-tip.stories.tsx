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
// @ts-expect-error [FEI-5003] - TS2786 - 'InfoTip' cannot be used as a JSX component.
        <InfoTip>
            <span>Sample text</span>
        </InfoTip>
    );
};

export const ImageOnMouseover: React.FC<StoryArgs> = (args): React.ReactElement => {
    return (
// @ts-expect-error [FEI-5003] - TS2786 - 'InfoTip' cannot be used as a JSX component.
        <InfoTip>
            <img alt="" src={svgUrl} />
        </InfoTip>
    );
};
