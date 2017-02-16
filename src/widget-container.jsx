var React = require('react');
var classNames = require("classnames");

var WidgetContainer = React.createClass({
    propTypes: {
        shouldHighlight: React.PropTypes.bool,
        type: React.PropTypes.func,
        initialProps: React.PropTypes.object.isRequired,
    },

    getInitialState: function() {
        return {widgetProps: this.props.initialProps};
    },

    render: function() {
        var className = classNames({
            "perseus-widget-container": true,
            "widget-highlight": this.props.shouldHighlight,
            "widget-nohighlight": !this.props.shouldHighlight,
        });

        var WidgetType = this.props.type;
        if (WidgetType == null) {
            // Just give up on invalid widget types
            return <div className={className} />;
        }

        if (WidgetType.displayMode == null) {
            throw new Error("You didn't specify a displayMode in the " +
                          "statics for " + widgetClass.displayName + ".");
        }

        return <div className={className}
            style={{
                display: WidgetType.displayMode
            }}>
            <WidgetType {...this.state.widgetProps} ref="widget" />
        </div>;
    }
});

module.exports = WidgetContainer;
