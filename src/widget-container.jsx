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

        return <div className={className}>
            {this.props.children}
        </div>;
    }
});

module.exports = WidgetContainer;
