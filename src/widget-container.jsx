/** @jsx React.DOM */

var React = require('react');
var cx = React.addons.classSet;

var WidgetContainer = React.createClass({
    propTypes: {
        shouldHighlight: React.PropTypes.bool.isRequired,
        type: React.PropTypes.func.isRequired,
        initialProps: React.PropTypes.object.isRequired,
    },

    getInitialState: function() {
        return {widgetProps: this.props.initialProps};
    },

    render: function() {
        var className = cx({
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
                          "statics for " + widgetType.displayName + ".");
        }

        return <div className={className}
            style={{
                display: widgetType.displayMode
            }}>
            {widgetType(_.extend({}, this.state.widgetProps, {ref: "widget"}))}
        </div>;
    },

    componentWillReceiveProps: function(nextProps) {
        if (this.props.type !== nextProps.type) {
            throw new Error(
                "WidgetContainer can't change widget type; set a different " +
                "key instead to recreate the container."
            );
        }
    },

    shouldComponentUpdate: function(nextProps, nextState) {
        return (
            this.props.shouldHighlight !== nextProps.shouldHighlight ||
            this.props.type !== nextProps.type ||
            this.state.widgetProps !== nextState.widgetProps
        );
    },

    getWidget: function() {
        return this.refs.widget;
    },

    replaceWidgetProps: function(newWidgetProps) {
        this.setState({widgetProps: newWidgetProps});
    }
});

module.exports = WidgetContainer;
