// @flow
import * as React from "react";

import TooltipArrow from "../tooltip-arrow.jsx";

type StoryArgs = {||};

type Story = {|
    title: string,
|};

export default ({
    title: "Perseus/Components/Tooltip Arrow",
}: Story);

export const DownPointingArrow = (args: StoryArgs): React.Node => {
    const props = {
        tooltipProps: {
            inverted: false,
            color: "red", // this should have no effect because we're not inverted
            side: "top",
        },
    };

    return <TooltipArrow {...props} />;
};

export const BlueDownPointingArrow = (args: StoryArgs): React.Node => {
    const props = {
        tooltipProps: {
            inverted: true,
            color: "blue",
            side: "top",
        },
    };
    return <TooltipArrow {...props} />;
};

export const UpPointingArrow = (args: StoryArgs): React.Node => {
    const props = {
        tooltipProps: {
            inverted: false,
            color: "red", // this should have no effect because we're not inverted
            side: "bottom",
        },
    };
    return <TooltipArrow {...props} />;
};

export const RightPointingArrow = (args: StoryArgs): React.Node => {
    const props = {
        tooltipProps: {
            inverted: false,
            color: "red", // this should have no effect because we're not inverted
            side: "left",
        },
    };
    return <TooltipArrow {...props} />;
};

export const LeftPointingArrow = (args: StoryArgs): React.Node => {
    const props = {
        tooltipProps: {
            inverted: false,
            color: "red", // this should have no effect because we're not inverted
            side: "right",
        },
    };
    return <TooltipArrow {...props} />;
};
