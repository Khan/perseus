/* TODO(csilvers): fix these lint errors (http://eslint.org/docs/rules): */
/* eslint-disable comma-dangle, no-var, react/forbid-prop-types, react/jsx-closing-bracket-location, react/jsx-indent-props, react/jsx-sort-prop-types, react/sort-comp */
/* To fix, remove an entry above, run ka-lint, and fix errors. */

var classNames = require("classnames");
var React = require('react');

var EnabledFeatures = require("./enabled-features.jsx");
var Widgets = require("./widgets.js");

var WidgetContainer = React.createClass({
    propTypes: {
        shouldHighlight: React.PropTypes.bool.isRequired,
        type: React.PropTypes.string,
        enabledFeatures: EnabledFeatures.propTypes,
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

        var type = this.props.type;
        var WidgetType = Widgets.getWidget(type, this.props.enabledFeatures);
        if (WidgetType == null) {
            // Just give up on invalid widget types
            return <div className={className} />;
        }

        var alignment = this.state.widgetProps.alignment;
        if (alignment === "default") {
            alignment = Widgets.getDefaultAlignment(type,
                            this.props.enabledFeatures);
        }

        className += " widget-" + alignment;

        // Hack to prevent interaction with static widgets: we overlay a big
        // div on top of the widget and overflow: hidden the container.
        // Ideally widgets themselves should know how to prevent interaction.
        var isStatic = this.state.widgetProps.static;
        var staticContainerStyles = {
            position: 'relative',
            overflow: 'hidden',
        };
        var staticOverlayStyles = {
            width: 10000,
            height: 10000,
            position: 'absolute',
            top: 0,
            left: 0,
            // Since the zIndex is only relative to the nearest parent with a
            // position:, scratchpads are still able to draw over this overlay.
            zIndex: 100,
        };

        // We default to an empty object for style instead of null
        // because of a strange bug where the static styles aren't applied
        // after toggling static mode.
        return <div className={className}
                style={isStatic ? staticContainerStyles : {}}>
            <WidgetType {...this.state.widgetProps} ref="widget" />
            {isStatic && <div style={staticOverlayStyles} />}
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
