/* eslint-disable comma-dangle, react/jsx-closing-bracket-location, react/sort-comp */
/* TODO(csilvers): fix these lint errors (http://eslint.org/docs/rules): */
/* To fix, remove an entry above, run ka-lint, and fix errors. */

const React = require("react");
const _ = require("underscore");

const Changeable   = require("../mixins/changeable.jsx");
const EditorJsonify = require("../mixins/editor-jsonify.jsx");

const PassageRefTargetEditor = React.createClass({
    propTypes: {
        ...Changeable.propTypes,
        content: React.PropTypes.string
    },

    getDefaultProps: function() {
        return {
            content: ""
        };
    },

    change(...args) {
        return Changeable.change.apply(this, args);
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
    },

    serialize() {
        return EditorJsonify.serialize.call(this);
    },
});

module.exports = PassageRefTargetEditor;
