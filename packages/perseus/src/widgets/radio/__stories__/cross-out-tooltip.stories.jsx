// @flow
import colors from "@khanacademy/wonder-blocks-color";
import * as React from "react";

import {colors as oldColors} from "../../../../shared-styles-package/global-styles.js";
import CrossOutTooltip from "../cross-out-tooltip.jsx";

type StoryArgs = {||};

type Story = {|
    title: string,
|};

export default ({
    title: "Perseus/Widgets/Radio/Cross Out Tooltip",
}: Story);

export const TooltipToCrossOutChoiceAGreen = (args: StoryArgs): React.Node => {
    return (
        <CrossOutTooltip
            dismissed={false}
            onDismiss={() => {}}
            buttonProps={{
                onClick: () => {},
                onFocus: () => {},
                onBlur: () => {},

                pos: 0,
                primaryProductColor: oldColors.kaGreen,
                crossedOut: false,
                usingKeyboardFocus: false,
                theme: "day",
            }}
        >
            <div style={{textAlign: "center"}}>Tooltip target!</div>
        </CrossOutTooltip>
    );
};
export const TooltipToCrossOutChoiceBBlue = (args: StoryArgs): React.Node => {
    return (
        <CrossOutTooltip
            dismissed={false}
            onDismiss={() => {}}
            buttonProps={{
                onClick: () => {},
                onFocus: () => {},
                onBlur: () => {},

                pos: 1,
                primaryProductColor: colors.blue,
                crossedOut: false,
                usingKeyboardFocus: false,
                theme: "day",
            }}
        >
            <div style={{textAlign: "center"}}>Tooltip target!</div>
        </CrossOutTooltip>
    );
};
