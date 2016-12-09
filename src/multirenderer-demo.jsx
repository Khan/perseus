/**
 * Demo for the multi-item multirenderer layout.
 */
/* eslint-disable no-console */
const {StyleSheet, css} = require("aphrodite");
const React = require("react");

const MultiRendererEditor = require("./multirenderer-editor.jsx");
const Util = require("./util.js");
const {MultiRenderer, shapes} = require("./multirenderer.jsx");

const DemoLayout = React.createClass({
    propTypes: {
        content: React.PropTypes.any.isRequired,
    },

    statics: {
        shape: shapes.shape({
            left: shapes.item,
            right: shapes.arrayOf(shapes.item),
        }),
    },

    score() {
        return this.multirenderer.score();
    },

    getSerializedState() {
        return this.multirenderer.getSerializedState();
    },

    restoreSerializedState(state) {
        this.multirenderer.restoreSerializedState(state);
    },

    render() {
        return <MultiRenderer
            ref={e => this.multirenderer = e}
            content={this.props.content}
            shape={DemoLayout.shape}
        >
            {({renderers}) =>
                <div>
                    <div className={css(demoStyles.left)}>
                        {renderers.left}
                    </div>
                    <ul className={css(demoStyles.right)}>
                        {renderers.right.map(
                            (r, i) => <li key={i}>{r}</li>
                        )}
                    </ul>
                </div>
            }
        </MultiRenderer>;
    },
});

const demoStyles = StyleSheet.create({
    left: {
        float: "left",
    },

    right: {
        float: "right",
    },
});

const defaultQuestion = {
    "left": {
        "content": "",
        "images": {},
        "widgets": {},
    },
    "right": [{
        "content": "",
        "images": {},
        "widgets": {},
    }],
};

const MultiRendererDemo = React.createClass({
    propTypes: {
        content: React.PropTypes.any.isRequired,
    },

    getDefaultProps() {
        return {
            content: defaultQuestion,
        };
    },

    getInitialState() {
        return {
            content: this.props.content,
            editorMode: "edit",
        };
    },

    getEditorProps() {
        return {
            Layout: DemoLayout,
            apiOptions: {
                onFocusChange: function(newPath, oldPath) {
                    console.log("onFocusChange", newPath, oldPath);
                },
                trackInteraction: function(trackData) {
                    console.log("Interaction with", trackData.type,
                                trackData);
                },
            },

            content: this.state.content,
            editorMode: this.state.editorMode,
        };
    },

    handleChange(newState) {
        this.setState(newState);
    },

    _getContentHash: function() {
        return Util.strongEncodeURIComponent(
            // TODO(emily): this.editor.serialize()
            JSON.stringify(this.state.content)
        );
    },

    handlePermalink(e) {
        window.location.hash = `content=${this._getContentHash()}`;
        e.preventDefault();
    },

    handleScore() {
        console.log(this.editor.score());
    },

    handleSerializeState() {
        this._state = this.editor.getSerializedState();
    },

    handleRestoreState() {
        this.editor.restoreSerializedState(this._state);
    },

    render() {
        const previewVisible = this.state.editorMode === "preview";

        return <div>
            <div id="extras">
                <button onClick={this.handlePermalink}>Permalink</button>
                {" "}
                <button
                    onClick={this.handleScore}
                    disabled={!previewVisible}
                >
                    Score
                </button>
                {" "}
                <button
                    onClick={this.handleSerializeState}
                    disabled={!previewVisible}
                >
                    Store state
                </button>
                {" "}
                <button
                    onClick={this.handleRestoreState}
                    disabled={!previewVisible}
                >
                    Restore state
                </button>
            </div>
            <div className="framework-perseus">
                <MultiRendererEditor
                    {...this.getEditorProps()}
                    onChange={this.handleChange}
                    ref={e => this.editor = e}
                />
            </div>
        </div>;
    },
});

module.exports = MultiRendererDemo;
