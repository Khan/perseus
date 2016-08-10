/* TODO(csilvers): fix these lint errors (http://eslint.org/docs/rules): */
/* eslint-disable comma-dangle, no-var, react/sort-comp */
/* To fix, remove an entry above, run ka-lint, and fix errors. */

var React = require('react');
var _ = require("underscore");

var EditorPage = require("./editor-page.jsx");

/* Renders an EditorPage (or an ArticleEditor) as a non-controlled component.
 *
 * Normally the parent of EditorPage must pass it an onChange callback and then
 * respond to any changes by modifying the EditorPage props to reflect those
 * changes. With StatefulEditorPage changes are stored in state so you can
 * query them with serialize.
 */
var StatefulEditorPage = React.createClass({

    propTypes: {
        componentClass: React.PropTypes.func
    },

    getDefaultProps: function() {
        return {
            componentClass: EditorPage
        };
    },

    render: function() {
        return <this.props.componentClass {...this.state} />;
    },

    getInitialState: function() {
        return _({}).extend(_.omit(this.props, 'componentClass'), {
            onChange: this.handleChange,
            ref: "editor"
        });
    },

    // getInitialState isn't called if the react component is re-rendered
    // in-place on the dom, in which case this is called instead, so we
    // need to update the state here.
    // (This component is currently re-rendered by the "Add image" button.)
    componentWillReceiveProps: function(nextProps) {
        this.setState(_(nextProps).pick(
            "apiOptions",
            "imageUploader",
            "developerMode",
            "problemNum",
            "previewDevice",
            "frameSource"
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
    }
});

module.exports = StatefulEditorPage;
