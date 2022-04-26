// @flow
import Color from "@khanacademy/wonder-blocks-color";
import {action} from "@storybook/addon-actions";
import * as React from "react";

import TooltipBubble from "../tooltip-bubble.jsx";

type StoryArgs = {||};

type Story = {|
    title: string,
|};

export default ({
    title: "Perseus/Components/Tooltip Bubble",
}: Story);

const defaultProps = {
    side: "top",
    offset: 0,
    offsetFrom: "bubble",
    tooltipMargin: 0,
    noPadding: false,
    color: Color.offBlack16,
    inverted: false,
    dismissOnClickClose: false,
    toggleOnHover: true,
    showOnMount: false,
};

const logDismissAction = (...args) => action("dismiss")(...args);

export const DefaultBubble = (args: StoryArgs): React.Node => {
    const params = {
        tooltipProps: {
            ...defaultProps,
            content: "Hello, world!",
            a11y: {title: "Default bubble"},
        },
        dismiss: logDismissAction,
    };
    return <TooltipBubble {...params} />;
};

export const DefaultBubbleWithCloseButton = (args: StoryArgs): React.Node => {
    const params = {
        tooltipProps: {
            ...defaultProps,
            content: "Hello, world!",
            dismissOnClickClose: true,
            a11y: {title: "Default bubble with close button"},
        },
        dismiss: logDismissAction,
    };
    return <TooltipBubble {...params} />;
};

export const BlueTextOnWhiteBubble = (args: StoryArgs): React.Node => {
    const params = {
        tooltipProps: {
            ...defaultProps,
            content: "Hello, world!",
            color: "blue",
            dismissOnClickClose: true,
            a11y: {title: "Blue text on white bubble"},
        },
        dismiss: logDismissAction,
    };
    return <TooltipBubble {...params} />;
};

export const WhiteTextOnBlueBubble = (args: StoryArgs): React.Node => {
    const params = {
        tooltipProps: {
            ...defaultProps,
            content: "Hello, world!",
            color: "blue",
            inverted: true,
            dismissOnClickClose: true,
            a11y: {title: "White text on blue bubble"},
        },
        dismiss: logDismissAction,
    };
    return <TooltipBubble {...params} />;
};

export const NoPaddingAroundContentInBubble = (args: StoryArgs): React.Node => {
    const params = {
        tooltipProps: {
            ...defaultProps,
            content: "Hello, world!",
            noPadding: true,
            a11y: {title: "No padding around content in bubble"},
        },
        dismiss: logDismissAction,
    };
    return <TooltipBubble {...params} />;
};
