/* TODO(csilvers): fix these lint errors (http://eslint.org/docs/rules): */
/* eslint-disable react/jsx-closing-bracket-location, react/sort-comp */
/* To fix, remove an entry above, run ka-lint, and fix errors. */

const React = require("react");
const _ = require("underscore");

const ApiOptions = require("../perseus-api.jsx").Options;
const Changeable   = require("../mixins/changeable.jsx");
const Editor = require("../editor.jsx");

const GradedGroupEditor = React.createClass({
    mixins: [Changeable],

    propTypes: {
        apiOptions: ApiOptions.propTypes,
        content: React.PropTypes.string,
        // TODO(JJC1138): This could be replaced with a more specific prop spec:
        images: React.PropTypes.any,
        onChange: React.PropTypes.func.isRequired,
        // TODO(JJC1138): This could be replaced with a more specific prop spec:
        widgets: React.PropTypes.any,
    },

    getDefaultProps: function() {
        return {
            content: "",
            images: {},
            widgets: {},
        };
    },

    render: function() {
        return <div className="perseus-group-editor">
        <Editor
            ref="editor"
            content={this.props.content}
            widgets={this.props.widgets}
            apiOptions={this.props.apiOptions}
            images={this.props.images}
            widgetEnabled={true}
            immutableWidgets={false}
            onChange={this.props.onChange} />
        </div>;
    },

    getSaveWarnings: function() {
        return this.refs.editor.getSaveWarnings();
    },

    serialize: function() {
        return this.refs.editor.serialize();
    },
});

module.exports = GradedGroupEditor;
