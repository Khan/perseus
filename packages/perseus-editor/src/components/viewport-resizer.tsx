/**
 * A component that displays controls for choosing a viewport size.
 * Renders three buttons: "Phone", "Tablet", and "Desktop".
 */
import {components, constants} from "@khanacademy/perseus";
import {PhosphorIcon} from "@khanacademy/wonder-blocks-icon";
import {LabelMedium} from "@khanacademy/wonder-blocks-typography";
import phosphorDesktop from "@phosphor-icons/core/regular/desktop.svg";
import phosphorPhone from "@phosphor-icons/core/regular/device-mobile.svg";
import phosphorTablet from "@phosphor-icons/core/regular/device-tablet.svg";
import * as React from "react";

import type {DeviceType} from "@khanacademy/perseus";

const {ButtonGroup} = components;
const {devices} = constants;

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
            <PhosphorIcon icon={phosphorPhone} /> Phone
        </span>
    );
    const tabletButtonContents = (
        <span>
            <PhosphorIcon icon={phosphorTablet} /> Tablet
        </span>
    );
    const desktopButtonContents = (
        <span>
            <PhosphorIcon icon={phosphorDesktop} /> Desktop
        </span>
    );

    return (
        <LabelMedium>
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
        </LabelMedium>
    );
};

export default ViewportResizer;
