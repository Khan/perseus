/* eslint-disable comma-dangle, no-var, react/jsx-closing-bracket-location, react/sort-comp */
/* TODO(csilvers): fix these lint errors (http://eslint.org/docs/rules): */
/* To fix, remove an entry above, run ka-lint, and fix errors. */

var React = require("react");
var _ = require("underscore");

var Changeable   = require("../mixins/changeable.jsx");
var WidgetJsonifyDeprecated = require("../mixins/widget-jsonify-deprecated.jsx");
var Renderer = require("../renderer.jsx");

const {linterContextProps, linterContextDefault} = require("../gorgon/proptypes.js");

var PassageRefTarget = React.createClass({
    propTypes: {
        ...Changeable.propTypes,
        content: React.PropTypes.string,
        linterContext: linterContextProps,
    },

    getDefaultProps: function() {
        return {
            content: "",
            linterContext: linterContextDefault,
        };
    },

    getUserInput: function() {
        return WidgetJsonifyDeprecated.getUserInput.call(this);
    },

    render: function() {
        return <Renderer
            content={this.props.content}
            inline={true}
            apiOptions={this.props.apiOptions}
            linterContext={this.props.linterContext}
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
    version: {major: 0, minor: 0},
    isLintable: true,
};
