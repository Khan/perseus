/* TODO(csilvers): fix these lint errors (http://eslint.org/docs/rules): */
/* eslint-disable comma-dangle, react/forbid-prop-types, react/jsx-closing-bracket-location, react/jsx-indent-props, react/jsx-sort-prop-types, react/sort-comp */
/* To fix, remove an entry above, run ka-lint, and fix errors. */

const classNames = require("classnames");
const React = require('react');

const EnabledFeatures = require("./enabled-features.jsx");
const Widgets = require("./widgets.js");

const WidgetContainer = React.createClass({
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
        let className = classNames({
            "perseus-widget-container": true,
            "widget-highlight": this.props.shouldHighlight,
            "widget-nohighlight": !this.props.shouldHighlight,
        });

        const type = this.props.type;
        const WidgetType = Widgets.getWidget(type, this.props.enabledFeatures);
        if (WidgetType == null) {
            // Just give up on invalid widget types
            return <div className={className} />;
        }

        let alignment = this.state.widgetProps.alignment;
        if (alignment === "default") {
            alignment = Widgets.getDefaultAlignment(type,
                            this.props.enabledFeatures);
        }

        className += " widget-" + alignment;

        const apiOptions = this.state.widgetProps.apiOptions;

        // Hack to prevent interaction with static widgets: we overlay a big
        // div on top of the widget and overflow: hidden the container.
        // Ideally widgets themselves should know how to prevent interaction.
        const isStatic = this.state.widgetProps.static || apiOptions.readOnly;
        const staticContainerStyles = {
            position: 'relative',
            overflow: 'visible',
        };
        const staticOverlayStyles = {
            width: '100%',
            height: '100%',
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
            <WidgetType
                {...this.state.widgetProps}
                ref="widget"
            />
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
