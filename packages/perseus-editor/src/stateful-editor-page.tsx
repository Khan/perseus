/* eslint-disable react/no-unsafe, react/sort-comp */
import createReactClass from "create-react-class";
import PropTypes from "prop-types";
import * as React from "react";
import _ from "underscore";

import EditorPage from "./editor-page";

/* Renders an EditorPage (or an ArticleEditor) as a non-controlled component.
 *
 * Normally the parent of EditorPage must pass it an onChange callback and then
 * respond to any changes by modifying the EditorPage props to reflect those
 * changes. With StatefulEditorPage changes are stored in state so you can
 * query them with serialize.
 */
const StatefulEditorPage = createReactClass({
    displayName: "StatefulEditorPage",

    propTypes: {
        componentClass: PropTypes.func,
    },

    getDefaultProps: function () {
        return {
            componentClass: EditorPage,
        };
    },

    render: function () {
        const Component = this.props.componentClass;
        return <Component {...this.state} />;
    },

    getInitialState: function () {
        return _({}).extend(_.omit(this.props, "componentClass"), {
            onChange: this.handleChange,
            ref: "editor",
        });
    },

    componentDidMount: function () {
        this._isMounted = true;
    },

    componentWillUnmount: function () {
        this._isMounted = false;
    },

    // getInitialState isn't called if the react component is re-rendered
    // in-place on the dom, in which case this is called instead, so we
    // need to update the state here.
    // (This component is currently re-rendered by the "Add image" button.)
    UNSAFE_componentWillReceiveProps: function (nextProps) {
        this.setState(
            _(nextProps).pick(
                "apiOptions",
                "imageUploader",
                "developerMode",
                "problemNum",
                "previewDevice",
                "frameSource",
            ),
        );
    },

    getSaveWarnings: function () {
        // eslint-disable-next-line react/no-string-refs
        return this.refs.editor.getSaveWarnings();
    },

    serialize: function () {
        // eslint-disable-next-line react/no-string-refs
        return this.refs.editor.serialize();
    },

    handleChange: function (newState, cb) {
        if (this._isMounted) {
            this.setState(newState, cb);
        }
    },

    scorePreview: function () {
        // eslint-disable-next-line react/no-string-refs
        return this.refs.editor.scorePreview();
    },
});

export default StatefulEditorPage;
