/* TODO(csilvers): fix these lint errors (http://eslint.org/docs/rules): */
/* eslint-disable react/forbid-prop-types, react/jsx-closing-bracket-location, react/jsx-sort-prop-types, react/prop-types, react/sort-comp */
/* To fix, remove an entry above, run ka-lint, and fix errors. */

const React = require("react");
const _ = require("underscore");

const ApiOptions = require("../perseus-api.jsx").Options;
const Changeable   = require("../mixins/changeable.jsx");
const Editor = require("../editor.jsx");
const TextInput = require("../components/text-input.jsx");

const GradedGroupEditor = React.createClass({
    mixins: [Changeable],

    propTypes: {
        title: React.PropTypes.string,
        content: React.PropTypes.string,
        widgets: React.PropTypes.object,
        images: React.PropTypes.object,
        apiOptions: ApiOptions.propTypes,
    },

    getDefaultProps: function() {
        return {
            title: "",
            content: "",
            widgets: {},
            images: {},
        };
    },

    render: function() {
        return <div className="perseus-group-editor">
            <div className="perseus-widget-row"><label>
                Title: <TextInput
                    value={this.props.title}
                    onChange={this.change("title")} />
            </label></div>
            <Editor
                ref="editor"
                content={this.props.content}
                widgets={this.props.widgets}
                apiOptions={this.props.apiOptions}
                enabledFeatures={this.props.enabledFeatures}
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
        return {
            title: this.props.title,
            ...this.refs.editor.serialize(),
        };
    },
});

module.exports = GradedGroupEditor;
