/* TODO(csilvers): fix these lint errors (http://eslint.org/docs/rules): */
/* eslint-disable no-var */
/* To fix, remove an entry above, run ka-lint, and fix errors. */

/**
 * A component that displays its contents inside a device frame.
 */

var React = require("react");
const {devices} = require("./constants.js");

var SCREEN_SIZES = {
    phone: {
        width: 375,
        height: 667,
        framedWidth: 375,
    },
    tablet: {
        width: 768,
        height: 946,
        framedWidth: 768,
    },
    desktop: {
        width: 960,
        height: 600,
        framedWidth: 960,
    },
};

var DeviceFramer = React.createClass({
    propTypes: {
        children: React.PropTypes.element.isRequired,
        deviceType: React.PropTypes.oneOf([
            devices.PHONE,
            devices.TABLET,
            devices.DESKTOP,
            // TODO(shadaj): remove after webapp uses nochrome prop
            devices.NOFRAME,
            devices.NOFRAME_WIDE,
        ]).isRequired,
        nochrome: React.PropTypes.bool,
    },

    render: function() {
        const deviceType = this.props.deviceType;

        // TODO(shadaj): remove after switching webapp to use nochrome prop
        // The key is added to prevent rerenders of the contents of the screen
        if (deviceType === devices.NOFRAME) {
            return <div>
                <div
                    key="screen"
                    style={{border: "1px solid black", width: 540}}
                >
                    <div>
                        {this.props.children}
                    </div>
                </div>
            </div>;
        } else if (deviceType === devices.NOFRAME_WIDE) {
            return <div>
                <div
                    key="screen"
                    style={{border: "1px solid black", width: 800}}
                >
                    <div>
                        {this.props.children}
                    </div>
                </div>
            </div>;
        }

        if (this.props.nochrome) {
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
        }

        const scale = SCREEN_SIZES[deviceType].framedWidth /
            SCREEN_SIZES[deviceType].width;

        const scaled = <div
            style={{zoom: scale, height: '100%'}}
        >
            {this.props.children}
        </div>;

        const screenStyle = {
            backgroundColor: "white",
            color: "black",
            textAlign: "left",
        };

        const screen = <div
            key="screen"
            className="screen"
            style={screenStyle}
        >
            {scaled}
        </div>;

        if (deviceType === devices.DESKTOP) {
            return <div
                className="marvel-device macbook"
                style={{
                    marginLeft: 45,
                    marginRight: 45,
                }}
            >
                {screen}
                <div className="top-bar"></div>
                <div className="camera"></div>
                <div className="bottom-bar"></div>
            </div>;
        } else if (deviceType === devices.TABLET) {
            return <div
                className="marvel-device ipad silver"
            >
                {screen}
                <div className="camera"></div>
                <div className="home"></div>
            </div>;
        } else if (deviceType === devices.PHONE) {
            return <div className="marvel-device iphone6 silver">
                {screen}
                <div className="top-bar"></div>
                <div className="sleep"></div>
                <div className="volume"></div>
                <div className="camera"></div>
                <div className="sensor"></div>
                <div className="speaker"></div>
                <div className="home"></div>
                <div className="bottom-bar"></div>
            </div>;
        }
    },
});

module.exports = DeviceFramer;
