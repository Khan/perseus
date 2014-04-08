/** @jsx React.DOM */

var cx = React.addons.classSet;

var WidgetContainer = React.createClass({
    propTypes: {
        shouldHighlight: React.PropTypes.bool,
        // Whether the feature is enabled:
        enableHighlight: React.PropTypes.bool
    },

    render: function() {
        var shouldHighlight = this.props.enableHighlight &&
                this.props.shouldHighlight;
        var className = cx({
            "perseus-widget-container": true,
            "widget-highlight": shouldHighlight,
            "widget-nohighlight": !shouldHighlight,
        });

        if (_.flatten([this.props.children.constructor]).length !== 1) {
            throw new Error("WidgetContainer takes exactly one child.");
        }

        var widgetClass = this.props.children.constructor;
        if (widgetClass.displayMode == null) {
            throw new Error("You didn't specify a displayMode in the " +
                          "statics for " + widgetClass.displayName + ".");
        }

        return <div className={className}
            style={{
                display: widgetClass.displayMode
            }}>
            {this.props.children}
        </div>;
    }
});

module.exports = WidgetContainer;
