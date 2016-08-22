/**
 * A component that displays its contents inside a device frame.
 */

const React = require("react");

const {devices} = require("./constants.js");

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
            devices.PHONE,
            devices.TABLET,
            devices.DESKTOP,
        ]).isRequired,
        // TODO(kevinb) rename to variableHeight
        nochrome: React.PropTypes.bool,
    },

    render: function() {
        const deviceType = this.props.deviceType;

        if (this.props.nochrome) {
            // Render content inside a variable height iframe.  Used on the
            // "edit" table of the content editor.
            return <div>
                <div
                    key="screen"
                    style={{
                        border: "1px solid black",
                        width: SCREEN_SIZES[deviceType].framedWidth,
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
