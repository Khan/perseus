/** @jsx React.DOM */

var React = require('react');
var cx = React.addons.classSet;

var WidgetContainer = React.createClass({
    propTypes: {
        shouldHighlight: React.PropTypes.bool,
    },

    render: function() {
        var className = cx({
            "perseus-widget-container": true,
            "widget-highlight": this.props.shouldHighlight,
            "widget-nohighlight": !this.props.shouldHighlight,
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
