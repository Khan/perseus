/* TODO(csilvers): fix these lint errors (http://eslint.org/docs/rules): */
/* eslint-disable no-var, react/jsx-closing-bracket-location, react/sort-comp */
/* To fix, remove an entry above, run ka-lint, and fix errors. */

const React = require("react");
const _ = require("underscore");

const ApiOptions = require("../perseus-api.jsx").Options;
const Changeable   = require("../mixins/changeable.jsx");
const EnabledFeatures = require("../enabled-features.jsx");
const Renderer = require("../renderer.jsx");
const Util = require("../util.js");

const Sequence = React.createClass({
    mixins: [Changeable],

    propTypes: {
        apiOptions: ApiOptions.propTypes,
        enabledFeatures: EnabledFeatures.propTypes,
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
            }],
        };
    },

    getInitialState: function() {
        return {
            visible: 1,
        };
    },

    shouldComponentUpdate: function(nextProps, nextState) {
        return nextProps !== this.props || nextState !== this.state;
    },

    render: function() {
        const icon = <div className="icon-ok" style={{color: "green"}} />;

        const content = _.chain(this.props.json)
                .first(this.state.visible)
                .map((step, i) => `[[${Util.snowman} group ${i}]]`)
                .join("\n\n")
                .value();

        const widgets = {};
        _.each(this.props.json, (step, i) => {
            const widgetId = `group ${i}`;
            widgets[widgetId] = {
                type: "group",
                graded: true,
                version: {major: 0, minor: 0},
                options: _.extend({}, step, {
                    icon: i < this.state.visible - 1 ? icon : null,
                }),
            };
        });

        return <div className="perseus-sequence">
            <Renderer
                ref="renderer"
                content={content}
                widgets={widgets}
                onInteractWithWidget={this._handleInteraction}
                apiOptions={this.props.apiOptions}
                enabledFeatures={this.props.enabledFeatures} />
        </div>;
    },

    _handleInteraction: function(groupWidgetId) {
        const step = parseInt(groupWidgetId.split(" ")[1]);
        if (step === this.state.visible - 1) {
            const widget = this.refs.renderer.getWidgetInstance("group " + step);
            const score = widget.simpleValidate();

            if (score.type === "points" && score.total === score.earned) {
                this.setState({
                    visible: this.state.visible + 1,
                });
                this.props.trackInteraction({
                    visible: this.state.visible + 1,
                });
            }
        }
    },
});

const traverseChildWidgets = function(
        props,
        traverseRenderer) {

    let oldJson = props.json;
    if (!_.isArray(oldJson)) {
        oldJson = [oldJson];
    }
    const json = _.map(oldJson, (rendererOptions) => {
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
