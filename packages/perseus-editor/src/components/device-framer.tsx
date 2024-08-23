/**
 * A component that displays its contents inside a device frame.
 */

import {constants} from "@khanacademy/perseus";
import * as React from "react";

import type {DeviceType} from "@khanacademy/perseus";

const SCREEN_SIZES = {
    phone: {
        width: 320,
        height: 480,
        framedWidth: 320,
    },
    tablet: {
        width: 750,
        height: 920,
        framedWidth: 525,
    },
    desktop: {
        width: 688,
        height: 600,
        framedWidth: 688,
    },
} as const;

type Props = React.PropsWithChildren<{
    deviceType?: DeviceType;
    nochrome: boolean;
}>;

const DeviceFramer = ({
    children,
    deviceType = "phone",
    nochrome,
}: Props): React.ReactElement => {
    const scale = React.useMemo(
        () =>
            SCREEN_SIZES[deviceType].framedWidth /
            SCREEN_SIZES[deviceType].width,
        [deviceType],
    );

    // In this mode we draw our own border and don't reserve
    // space for a lint gutter.
    const withChromeStyle = React.useMemo(
        () => ({
            backgroundColor: "white",
            overflow: "scroll",
            color: "black",
            textAlign: "left",
            width: SCREEN_SIZES[deviceType].width,
            height: SCREEN_SIZES[deviceType].height,
            border: "solid 1px #CCC",
            margin: 8,
            zoom: scale,
        }),
        [deviceType, scale],
    );

    if (nochrome) {
        // Render content inside a variable height iframe.  Used on the
        // "edit" table of the content editor. In this mode, PerseusFrame
        // will draw the border and reserve space on the right for
        // lint indicators.
        return (
            <div
                key="screen"
                style={{
                    width:
                        SCREEN_SIZES[deviceType].framedWidth +
                        2 * constants.perseusFrameBorderWidth +
                        constants.lintGutterWidth,

                    position: "sticky",
                    top: 8,
                    maxHeight: "80vh",
                    overflowY: "auto",
                    overflowX: "hidden",
                }}
            >
                <div>{children}</div>
            </div>
        );
    }

    return (
        <div
            key="screen"
            className="screen"
            style={{...withChromeStyle, textAlign: "start"}}
        >
            {children}
        </div>
    );
};

export default DeviceFramer;
