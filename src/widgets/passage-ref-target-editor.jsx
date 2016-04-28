const React = require("react");
const _ = require("underscore");

const Changeable   = require("../mixins/changeable.jsx");
const EditorJsonify = require("../mixins/editor-jsonify.jsx");

const PassageRefTargetEditor = React.createClass({
    propTypes: {
        content: React.PropTypes.string,
    },

    mixins: [EditorJsonify, Changeable],

    getDefaultProps: function() {
        return {
            content: "",
        };
    },

    handleContentChange: function(e) {
        this.change({content: e.target.value});
    },

    render: function() {
        return <div>
            Content:
            <input type="text"
                value={this.props.content}
                onChange={this.handleContentChange}
            />
        </div>;
    },
});

module.exports = PassageRefTargetEditor;
