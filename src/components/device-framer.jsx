/**
 * A component that displays its contents inside a device frame.
 */

const React = require("react");

const constants = require("./constants.js");

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
};

const DeviceFramer = React.createClass({
    propTypes: {
        children: React.PropTypes.element.isRequired,
        deviceType: React.PropTypes.oneOf([
            constants.devices.PHONE,
            constants.devices.TABLET,
            constants.devices.DESKTOP,
        ]).isRequired,
        // TODO(kevinb) rename to variableHeight
        nochrome: React.PropTypes.bool,
    },

    render: function() {
        const deviceType = this.props.deviceType;

        if (this.props.nochrome) {
            // Render content inside a variable height iframe.  Used on the
            // "edit" table of the content editor. In this mode, PerseusFrame
            // will draw the border and reserve space on the right for
            // lint indicators.
            return <div>
                <div
                    key="screen"
                    style={{
                        width: SCREEN_SIZES[deviceType].framedWidth +
                            2 * constants.perseusFrameBorderWidth +
                            constants.lintGutterWidth,
                    }}
                >
                    <div>
                        {this.props.children}
                    </div>
                </div>
            </div>;
        } else {
            const scale = SCREEN_SIZES[deviceType].framedWidth /
                SCREEN_SIZES[deviceType].width;

            // In this mode we draw our own border and don't reserve
            // space for a lint gutter.
            const screenStyle = {
                backgroundColor: "white",
                color: "black",
                textAlign: "left",
                width: SCREEN_SIZES[deviceType].width,
                height: SCREEN_SIZES[deviceType].height,
                border: "solid 1px #CCC",
                margin: 8,
                zoom: scale,
            };

            return <div
                key="screen"
                className="screen"
                style={screenStyle}
            >
                {this.props.children}
            </div>;
        }
    },
});

module.exports = DeviceFramer;
