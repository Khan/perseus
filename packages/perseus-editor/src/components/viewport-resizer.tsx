/**
 * A component that displays controls for choosing a viewport size.
 * Renders three buttons: "Phone", "Tablet", and "Desktop".
 */
import {components, constants, icons} from "@khanacademy/perseus";
import PropTypes from "prop-types";
import * as React from "react";

import type {DeviceType} from "@khanacademy/perseus";

const {ButtonGroup, InlineIcon} = components;
const {devices} = constants;
const {iconDesktop, iconMobilePhone, iconTablet} = icons;

type Props = {
    deviceType: DeviceType;
    onViewportSizeChanged: (arg1: DeviceType) => unknown;
};

class ViewportResizer extends React.Component<Props> {
    static propTypes = {
        // The current device type that is selected.
        deviceType: PropTypes.string.isRequired,
        // A callback that is passed (width, height) as the dimensions of the
        // viewport to resize to.
        onViewportSizeChanged: PropTypes.func.isRequired,
    };

    handleChange: (value: DeviceType) => void = (value: DeviceType) => {
        this.props.onViewportSizeChanged(value);
    };

    render(): React.ReactNode {
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

        // TODO(david): Allow input of custom viewport sizes.
        return (
            <span className="viewport-resizer">
                Viewport:{" "}
                <ButtonGroup
                    value={this.props.deviceType}
                    allowEmpty={false}
                    buttons={[
                        {value: devices.PHONE, content: phoneButtonContents},
                        {value: devices.TABLET, content: tabletButtonContents},
                        {
                            value: devices.DESKTOP,
                            content: desktopButtonContents,
                        },
                    ]}
                    onChange={this.handleChange}
                />
            </span>
        );
    }
}

export default ViewportResizer;
