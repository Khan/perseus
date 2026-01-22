/**
 * A component that displays controls for choosing a viewport size.
 * Renders three buttons: "Phone", "Tablet", and "Desktop".
 */
import {components} from "@khanacademy/perseus";
import * as React from "react";

import {devices} from "../styles/constants";
import {iconDesktop, iconMobilePhone, iconTablet} from "../styles/icon-paths";

import type {DeviceType} from "@khanacademy/perseus";

const {ButtonGroup, InlineIcon} = components;

type Props = {
    /** The current device type that is selected. */
    deviceType: DeviceType;
    /**
     * A callback that is passed (width, height) as the dimensions of the
     * viewport to resize to.
     */
    onViewportSizeChanged: (deviceType: DeviceType) => unknown;
};

const ViewportResizer = (props: Props) => {
    const phoneButtonContents = (
        <span>
            <InlineIcon {...iconMobilePhone} /> Phone
        </span>
    );
    const tabletButtonContents = (
        <span>
            <InlineIcon {...iconTablet} /> Tablet
        </span>
    );
    const desktopButtonContents = (
        <span>
            <InlineIcon {...iconDesktop} /> Desktop
        </span>
    );

    return (
        <span className="viewport-resizer">
            Viewport:{" "}
            <ButtonGroup
                value={props.deviceType}
                allowEmpty={false}
                buttons={[
                    {value: devices.PHONE, content: phoneButtonContents},
                    {value: devices.TABLET, content: tabletButtonContents},
                    {
                        value: devices.DESKTOP,
                        content: desktopButtonContents,
                    },
                ]}
                onChange={props.onViewportSizeChanged}
            />
        </span>
    );
};

export default ViewportResizer;
