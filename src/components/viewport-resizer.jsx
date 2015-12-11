/**
 * A component that displays controls for choosing a viewport size.
 * Renders three buttons: "Phone", "Tablet", and "Desktop".
 */

var React = require("react");

var ButtonGroup = require("react-components/button-group.jsx");

var DEFAULT_VIEWPORT = 'desktop';

// These values for screen sizes come from dominant screen sizes by device type
// according to screensiz.es and our own Google Analytics reporting (Nov 2015).
var SCREEN_SIZES = {
    phone: {
        width: 320,
        height: 480,
    },
    tablet: {
        width: 768,
        height: 1024,
    },
    desktop: {
        width: 1280,
        height: 768,
    },
};

var ViewportResizer = React.createClass({
    propTypes: {
        // A callback that is passed (width, height) as the dimensions of the
        // viewport to resize to.
        onViewportSizeChanged: React.PropTypes.func.isRequired,
    },

    getInitialState: function() {
        return {value: DEFAULT_VIEWPORT};
    },

    handleChange: function(value) {
        this.setState({value});

        var {width, height} = SCREEN_SIZES[value];
        this.props.onViewportSizeChanged(width, height);
    },

    render: function() {
        var phoneButtonContents = <span>
            <i className="icon-mobile-phone" />{" "}Phone
        </span>;
        var tabletButtonContents = <span>
            <i className="icon-tablet" />{" "}Tablet
        </span>;
        var desktopButtonContents = <span>
            <i className="icon-desktop" />{" "}Desktop
        </span>;

        // TODO(david): Allow input of custom viewport sizes.
        return <label className="viewport-resizer">
            Viewport:{" "}
            <ButtonGroup value={this.state.value}
                allowEmpty={false}
                buttons={[
                    {value: 'phone', content: phoneButtonContents},
                    {value: 'tablet', content: tabletButtonContents},
                    {value: 'desktop', content: desktopButtonContents},
                ]}
                onChange={this.handleChange}
            />
        </label>;
    },
});

ViewportResizer.DEFAULT_WIDTH = SCREEN_SIZES[DEFAULT_VIEWPORT].width;
ViewportResizer.DEFAULT_HEIGHT = SCREEN_SIZES[DEFAULT_VIEWPORT].height;

module.exports = ViewportResizer;
