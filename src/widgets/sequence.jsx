/* TODO(csilvers): fix these lint errors (http://eslint.org/docs/rules): */
/* eslint-disable comma-dangle, no-var, react/jsx-closing-bracket-location, react/prop-types, react/sort-comp */
/* To fix, remove an entry above, run ka-lint, and fix errors. */

var React = require("react");
var _ = require("underscore");

var ApiOptions = require("../perseus-api.jsx").Options;
var Changeable   = require("../mixins/changeable.jsx");
const {iconOk} = require("../icon-paths.js");
const InlineIcon = require("../components/inline-icon.jsx");
var Renderer = require("../renderer.jsx");
var Util = require("../util.js");

var Sequence = React.createClass({
    mixins: [Changeable],

    propTypes: {
        apiOptions: ApiOptions.propTypes,
        json:  React.PropTypes.arrayOf(React.PropTypes.shape({
            content: React.PropTypes.string,
            images: React.PropTypes.object,
            widgets: React.PropTypes.object,
        })),
        trackInteraction: React.PropTypes.func.isRequired,
    },

    getDefaultProps: function() {
        return {
            json: [{
                content: "",
                widgets: {},
                images: {},
            }]
        };
    },

    getInitialState: function() {
        return {
            visible: 1
        };
    },

    shouldComponentUpdate: function(nextProps, nextState) {
        return nextProps !== this.props || nextState !== this.state;
    },

    render: function() {
        var icon = <InlineIcon {...iconOk} style={{color: "green"}} />;

        var content = _.chain(this.props.json)
                .first(this.state.visible)
                .map((step, i) => `[[${Util.snowman} group ${i}]]`)
                .join("\n\n")
                .value();

        var widgets = {};
        _.each(this.props.json, (step, i) => {
            var widgetId = `group ${i}`;
            widgets[widgetId] = {
                type: "group",
                graded: true,
                version: {major: 0, minor: 0},
                options: _.extend({}, step, {
                    icon: i < this.state.visible - 1 ? icon : null
                })
            };
        });

        return <div className="perseus-sequence">
            <Renderer
                ref="renderer"
                content={content}
                widgets={widgets}
                onInteractWithWidget={this._handleInteraction}
                apiOptions={this.props.apiOptions}
                />
        </div>;
    },

    _handleInteraction: function(groupWidgetId) {
        var step = parseInt(groupWidgetId.split(" ")[1]);
        if (step === this.state.visible - 1) {
            var widget = this.refs.renderer.getWidgetInstance("group " + step);
            var score = widget.simpleValidate();

            if (score.type === "points" && score.total === score.earned) {
                this.setState({
                    visible: this.state.visible + 1
                });
                this.props.trackInteraction({
                    visible: this.state.visible + 1,
                });
            }
        }
    }
});

var traverseChildWidgets = function(
        props,
        traverseRenderer) {

    var oldJson = props.json;
    if (!_.isArray(oldJson)) {
        oldJson = [oldJson];
    }
    var json = _.map(oldJson, (rendererOptions) => {
        return traverseRenderer(rendererOptions);
    });

    return _.extend({}, props, {json: json});
};

module.exports = {
    name: "sequence",
    displayName: "Graded Sequence",
    widget: Sequence,
    traverseChildWidgets: traverseChildWidgets,
    tracking: "all",
};
