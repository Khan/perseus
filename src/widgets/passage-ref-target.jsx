/* TODO(csilvers): fix these lint errors (http://eslint.org/docs/rules): */
/* eslint-disable comma-dangle, no-var, react/jsx-closing-bracket-location, react/prop-types, react/sort-comp */
/* To fix, remove an entry above, run ka-lint, and fix errors. */

var React = require("react");
var _ = require("underscore");

var Changeable   = require("../mixins/changeable.jsx");
var WidgetJsonifyDeprecated = require("../mixins/widget-jsonify-deprecated.jsx");
var Renderer = require("../renderer.jsx");

var PassageRefTarget = React.createClass({
    propTypes: {
        ...Changeable.propTypes,
        content: React.PropTypes.string
    },

    getDefaultProps: function() {
        return {
            content: ""
        };
    },

    getUserInfo() {
        return WidgetJsonifyDeprecated.getUserInfo.call(this);
    },

    render: function() {
        return <Renderer
            content={this.props.content}
            inline={true}
            apiOptions={this.props.apiOptions}
            />;
    },

    change(...args) {
        return Changeable.change.apply(this, args);
    },

    simpleValidate: function(rubric) {
        return PassageRefTarget.validate(this.getUserInput(), rubric);
    }
});

_.extend(PassageRefTarget, {
    validate: function(state, rubric) {
        return {
            type: "points",
            earned: 0,
            total: 0,
            message: null
        };
    }
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
    version: {major: 0, minor: 0}
};
