/* TODO(csilvers): fix these lint errors (http://eslint.org/docs/rules): */
/* eslint-disable comma-dangle, react/forbid-prop-types, react/jsx-closing-bracket-location, react/jsx-indent-props, react/jsx-sort-prop-types, react/sort-comp */
/* To fix, remove an entry above, run ka-lint, and fix errors. */

const classNames = require('classnames');
const React = require('react');
const ReactDOM = require('react-dom');

const Widgets = require('./widgets.js');
const {
    containerSizeClass,
    getClassFromWidth,
} = require('./util/sizing-utils.js');

const WidgetContainer = React.createClass({
    propTypes: {
        shouldHighlight: React.PropTypes.bool.isRequired,
        type: React.PropTypes.string,
        initialProps: React.PropTypes.object.isRequired,
    },

    getInitialState: function() {
        return {
            // TODO(benkomalo): before we're mounted, we don't know how big
            // we're going to be, so just default to MEDIUM for now. :/ In the
            // future we can sniff with user-agents or something to get a
            // better approximation, to avoid flickers
            sizeClass: containerSizeClass.MEDIUM,
            widgetProps: this.props.initialProps,
        };
    },

    componentDidMount() {
        // Only relay size class changes for mobile right now.  We may want to
        // this for desktop as well at some point in the future.
        if (this.state.widgetProps.apiOptions.isMobile) {
            const containerWidth = ReactDOM.findDOMNode(this).offsetWidth;

            // NOTE(benkomalo): in the common case, this won't change anything.
            // Unfortunately, it will cause a flash and re-layout on mobile,
            // but until we have better SSR or a more drastic way change to our
            // APIs that hints at the available size, we do have to measure DOM
            // unfortunately.
            /* eslint-disable react/no-did-mount-set-state */
            this.setState({
                sizeClass: getClassFromWidth(containerWidth),
            });
            /* eslint-enable react/no-did-mount-set-state */
        }
    },

    render: function() {
        let className = classNames({
            "perseus-widget-container": true,
            "widget-highlight": this.props.shouldHighlight,
            "widget-nohighlight": !this.props.shouldHighlight,
        });

        const type = this.props.type;
        const WidgetType = Widgets.getWidget(type);
        if (WidgetType == null) {
            // Just give up on invalid widget types
            return <div className={className} />;
        }

        let alignment = this.state.widgetProps.alignment;
        if (alignment === "default") {
            alignment = Widgets.getDefaultAlignment(type);
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

        // Note: if you add more props here, please consider whether or not
        // it should be auto-serialized (e.g. used in scoreInput()). See
        // widget-jsonify-deprecated.jsx and widget-prop-blacklist.jsx

        // We default to an empty object for style instead of null
        // because of a strange bug where the static styles aren't applied
        // after toggling static mode.
        return <div className={className}
                style={isStatic ? staticContainerStyles : {}}>
            <WidgetType
                {...this.state.widgetProps}
                containerSizeClass={this.state.sizeClass}
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
            this.state.widgetProps !== nextState.widgetProps ||
            this.state.sizeClass !== nextState.sizeClass
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
