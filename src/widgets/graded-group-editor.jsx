const React = require("react");
const _ = require("underscore");

const ApiOptions = require("../perseus-api.jsx").Options;
const Changeable   = require("../mixins/changeable.jsx");
const Editor = require("../editor.jsx");

const GradedGroupEditor = React.createClass({
    propTypes: {
        apiOptions: ApiOptions.propTypes,
        content: React.PropTypes.string,
        // TODO(JJC1138): This could be replaced with a more specific prop spec:
        images: React.PropTypes.any,
        onChange: React.PropTypes.func.isRequired,
        // TODO(JJC1138): This could be replaced with a more specific prop spec:
        widgets: React.PropTypes.any,
    },

    mixins: [Changeable],

    getDefaultProps: function() {
        return {
            content: "",
            images: {},
            widgets: {},
        };
    },

    getSaveWarnings: function() {
        return this.refs.editor.getSaveWarnings();
    },

    serialize: function() {
        return this.refs.editor.serialize();
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
            onChange={this.props.onChange}
        />
        </div>;
    },
});

module.exports = GradedGroupEditor;
