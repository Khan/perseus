var React = require('react');
var classNames = require("classnames");

var WidgetContainer = React.createClass({
    propTypes: {
        shouldHighlight: React.PropTypes.bool,
    },

    render: function() {
        var className = classNames({
            "perseus-widget-container": true,
            "widget-highlight": this.props.shouldHighlight,
            "widget-nohighlight": !this.props.shouldHighlight,
        });

        var widgetType = this.props.type;
        if (widgetType == null) {
            // Just give up on invalid widget types
            return <div className={className} />;
        }
        if (widgetType.displayMode == null) {
            throw new Error("You didn't specify a displayMode in the " +
                          "statics for " + widgetClass.displayName + ".");
        }

        return <div className={className}
            style={{
                display: widgetType.displayMode
            }}>
            {this.props.children}
        </div>;
    }
});

module.exports = WidgetContainer;
