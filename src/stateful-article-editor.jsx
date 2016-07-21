/* TODO(csilvers): fix these lint errors (http://eslint.org/docs/rules): */
/* eslint-disable object-curly-spacing */
/* To fix, remove an entry above, run ka-lint, and fix errors. */

"use strict";

/**
 * Renders an ArticleEditor as a non-controlled component.
 *
 * Normally the parent of ArticleEditor must pass it an onChange callback and
 * then respond to any changes by modifying the ArticleEditor props to reflect
 * those changes. With StatefulArticleEditor changes are stored in state so you
 * can query them with serialize.
 */

const React = require('react');
const _ = require("underscore");

const ArticleEditor = require("./article-editor.jsx");

const StatefulArticleEditor = React.createClass({
    getInitialState: function() {
        return _({}).extend(this.props, {
            mode: "edit",
            onChange: this.handleChange,
            ref: "editor",
            screen: "desktop",
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

    render: function() {
        const { mode, screen } = this.state;
        return <div>
            <div style={styles.controlBar}>
                <span style={styles.controls}>
                    Mode:{" "}
                    <span
                        onClick={() => this.setState({mode: "edit"})}
                        style={mode === "edit" ?
                            styles.controlSelected : styles.control}
                    >
                        EDIT
                    </span>
                    {" | "}
                    <span
                        onClick={() => this.setState({mode: "preview"})}
                        style={mode === "preview" ?
                            styles.controlSelected : styles.control}
                    >
                        PREVIEW
                    </span>
                    {" | "}
                    <span
                        onClick={() => this.setState({mode: "json"})}
                        style={mode === "json" ?
                            styles.controlSelected : styles.control}
                    >
                        JSON
                    </span>
                </span>
                <span style={styles.controls}>
                    Screen:{" "}
                    <span
                        onClick={() => this.setState({screen: "phone"})}
                        style={screen === "phone" ?
                            styles.controlSelected : styles.control}
                    >
                        PHONE
                    </span>
                    {" | "}
                    <span
                        onClick={() => this.setState({screen: "tablet"})}
                        style={screen === "tablet" ?
                            styles.controlSelected : styles.control}
                    >
                        TABLET
                    </span>
                    {" | "}
                    <span
                        onClick={() => this.setState({screen: "desktop"})}
                        style={screen === "desktop" ?
                            styles.controlSelected : styles.control}
                    >
                        DESKTOP
                    </span>
                </span>
            </div>
            <div style={styles.editor}>
                <ArticleEditor {...this.state} />
            </div>
        </div>;
    },
});

const styles = {
    controlBar: {
        marginBottom: 25,
        marginTop: 5,
    },
    controls: {
        marginRight: 10,
    },
    controlSelected: {
        cursor: "default",
        fontWeight: 700,
    },
    control: {
        cursor: "pointer",
    },
    editor: {
        marginTop: -20,
    },
};

module.exports = StatefulArticleEditor;
