/* TODO(csilvers): fix these lint errors (http://eslint.org/docs/rules): */
/* eslint-disable no-var */
/* To fix, remove an entry above, run ka-lint, and fix errors. */

/**
 * A component that displays controls for choosing a viewport size.
 * Renders three buttons: "Phone", "Tablet", and "Desktop".
 */

var React = require("react");

var ButtonGroup = require("react-components/button-group.jsx");

const {devices} = require("./constants.js");
const {iconDesktop, iconMobilePhone, iconTablet} = require("../icon-paths.js");
const InlineIcon = require("./inline-icon.jsx");

var ViewportResizer = React.createClass({
    propTypes: {
        // The current device type that is selected.
        deviceType: React.PropTypes.string.isRequired,
        // A callback that is passed (width, height) as the dimensions of the
        // viewport to resize to.
        onViewportSizeChanged: React.PropTypes.func.isRequired,
    },

    handleChange: function(value) {
        this.props.onViewportSizeChanged(value);
    },

    render: function() {
        var phoneButtonContents = <span>
            <InlineIcon {...iconMobilePhone} />{" "}Phone
        </span>;
        var tabletButtonContents = <span>
            <InlineIcon {...iconTablet} />{" "}Tablet
        </span>;
        var desktopButtonContents = <span>
            <InlineIcon {...iconDesktop} />{" "}Desktop
        </span>;

        // TODO(david): Allow input of custom viewport sizes.
        return <span className="viewport-resizer">
            Viewport:{" "}
            <ButtonGroup value={this.props.deviceType}
                allowEmpty={false}
                buttons={[
                    {value: devices.PHONE, content: phoneButtonContents},
                    {value: devices.TABLET, content: tabletButtonContents},
                    {value: devices.DESKTOP, content: desktopButtonContents},
                ]}
                onChange={this.handleChange}
            />
        </span>;
    },
});

module.exports = ViewportResizer;
