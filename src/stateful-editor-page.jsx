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
            ref: "editor",
            onChange: this.handleChange,
            searchAndReplace: false
        });
    },

    // getInitialState isn't called if the react component is re-rendered
    // in-place on the dom, in which case this is called instead, so we
    // need to update the state here.
    // (This component is currently re-rendered by the "Add image" button.)
    componentWillReceiveProps: function(nextProps) {
        // be careful not to overwrite our onChange and ref
        this.setState(_(nextProps).omit("onChange", "ref"));
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

    toggleSearchAndReplace: function() {
        this.setState({ searchAndReplace: !this.state.searchAndReplace });
    }
});

module.exports = StatefulEditorPage;
