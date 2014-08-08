/** @jsx React.DOM */

var Changeable   = require("../mixins/changeable.jsx");
var JsonifyProps = require("../mixins/jsonify-props.jsx");

var PassageRefTarget = React.createClass({
    mixins: [JsonifyProps, Changeable],

    propTypes: {
        content: React.PropTypes.string
    },

    getDefaultProps: function() {
        return {
            content: ""
        };
    },

    render: function() {
        return <span>
            {this.props.content}
        </span>;
    },

    simpleValidate: function(rubric) {
        return PassageRefTarget.validate(this.toJSON(), rubric);
    },

    statics: {
        displayMode: "inline"
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

var PassageRefTargetEditor = React.createClass({
    mixins: [JsonifyProps, Changeable],

    propTypes: {
        content: React.PropTypes.string
    },

    getDefaultProps: function() {
        return {
            content: ""
        };
    },

    render: function() {
        return <div>
            Content:
            <input type="text"
                value={this.props.content}
                onChange={this.handleContentChange} />
        </div>;
    },

    handleContentChange: function(e) {
        this.change({content: e.target.value});
    }
});

module.exports = {
    name: "passage-ref-target",
    displayName: "PassageRefTarget",
    widget: PassageRefTarget,
    editor: PassageRefTargetEditor,
    hidden: true,
    transform: (editorProps) => {
        return _.pick(editorProps, "content");
    },
    version: {major: 0, minor: 0}
};
