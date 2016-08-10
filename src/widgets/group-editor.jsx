/* TODO(csilvers): fix these lint errors (http://eslint.org/docs/rules): */
/* eslint-disable comma-dangle, no-var, react/forbid-prop-types, react/jsx-closing-bracket-location, react/jsx-sort-prop-types, react/prop-types, react/sort-comp */
/* To fix, remove an entry above, run ka-lint, and fix errors. */

const React = require("react");
const _ = require("underscore");

const ApiOptions = require("../perseus-api.jsx").Options;
const Changeable   = require("../mixins/changeable.jsx");

const Editor = require("../editor.jsx");

const GroupEditor = React.createClass({
    mixins: [Changeable],

    propTypes: {
        content: React.PropTypes.string,
        widgets: React.PropTypes.object,
        images: React.PropTypes.object,
        metadata: React.PropTypes.any,
        apiOptions: ApiOptions.propTypes,
    },

    getDefaultProps: function() {
        return {
            content: "",
            widgets: {},
            images: {},
            // `undefined` instead of `null` so that getDefaultProps works for
            // `the GroupMetadataEditor`
            metadata: undefined
        };
    },

    render: function() {
        return <div className="perseus-group-editor">
            <div>
                {/* the metadata editor; used for tags on khanacademy.org */}
                {this._renderMetadataEditor()}
            </div>
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

    _renderMetadataEditor: function() {
        var GroupMetadataEditor = this.props.apiOptions.GroupMetadataEditor;
        return <GroupMetadataEditor
            value={this.props.metadata}
            onChange={this.change("metadata")} />;
    },

    getSaveWarnings: function() {
        return this.refs.editor.getSaveWarnings();
    },

    serialize: function() {
        return _.extend({}, this.refs.editor.serialize(), {
            metadata: this.props.metadata
        });
    },
});

module.exports = GroupEditor;
