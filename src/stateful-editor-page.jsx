const React = require('react');
const _ = require("underscore");

const EditorPage = require("./editor-page.jsx");

/* Renders an EditorPage (or an ArticleEditor) as a non-controlled component.
 *
 * Normally the parent of EditorPage must pass it an onChange callback and then
 * respond to any changes by modifying the EditorPage props to reflect those
 * changes. With StatefulEditorPage changes are stored in state so you can
 * query them with serialize.
 */
const StatefulEditorPage = React.createClass({

    propTypes: {
        componentClass: React.PropTypes.func,
    },

    getDefaultProps: function() {
        return {
            componentClass: EditorPage,
        };
    },

    getInitialState: function() {
        return _({}).extend(_.omit(this.props, 'componentClass'), {
            onChange: this.handleChange,
            ref: "editor",
        });
    },

    // getInitialState isn't called if the react component is re-rendered
    // in-place on the dom, in which case this is called instead, so we
    // need to update the state here.
    // (This component is currently re-rendered by the "Add image" button.)
    componentWillReceiveProps: function(nextProps) {
        this.setState(_(nextProps).pick(
            "apiOptions",
            "enabledFeatures",
            "imageUploader",
            "developerMode",
            "problemNum"
        ));
    },

    getSaveWarnings: function() {
        return this.refs.editor.getSaveWarnings();
    },

    serialize: function() {
        return this.refs.editor.serialize();
    },

    handleChange: function(newState, cb) {
        if (this.isMounted()) {
            this.setState(newState, cb);
        }
    },

    scorePreview: function() {
        return this.refs.editor.scorePreview();
    },

    render: function() {
        return <this.props.componentClass {...this.state} />;
    },
});

module.exports = StatefulEditorPage;
