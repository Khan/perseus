const React = require("react");
const _ = require("underscore");

const Changeable   = require("../mixins/changeable.jsx");
const WidgetJsonifyDeprecated = require("../mixins/widget-jsonify-deprecated.jsx");
const Renderer = require("../renderer.jsx");

const PassageRefTarget = React.createClass({
    propTypes: {
        // We don't use ApiOptions.propTypes or EnabledFeatures.PropTypes here
        // because they require the props and they're optional for this
        // component.
        apiOptions: React.PropTypes.any,
        content: React.PropTypes.string,
        enabledFeatures: React.PropTypes.any,
    },

    mixins: [WidgetJsonifyDeprecated, Changeable],

    getDefaultProps: function() {
        return {
            content: "",
        };
    },

    simpleValidate: function(rubric) {
        return PassageRefTarget.validate(this.getUserInput(), rubric);
    },

    render: function() {
        return <Renderer
            content={this.props.content}
            inline={true}
            enabledFeatures={this.props.enabledFeatures}
            apiOptions={this.props.apiOptions}
        />;
    },
});

_.extend(PassageRefTarget, {
    validate: function(state, rubric) {
        return {
            type: "points",
            earned: 0,
            total: 0,
            message: null,
        };
    },
});

module.exports = {
    name: "passage-ref-target",
    displayName: "PassageRefTarget",
    defaultAlignment: "inline",
    widget: PassageRefTarget,
    hidden: true,
    transform: (editorProps) => {
        return _.pick(editorProps, "content");
    },
    version: {major: 0, minor: 0},
};
