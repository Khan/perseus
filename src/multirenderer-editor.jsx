/**
 * Editor for a multi-item question.
 */
const {StyleSheet, css} = require("aphrodite");
const React = require("react");
const lens = require("../hubble/index.js");

const ApiOptions = require("./perseus-api.jsx").Options;
const Editor = require("./editor.jsx");
const JsonEditor = require("./json-editor.jsx");
const {traverseShape} = require("./multirenderer.jsx");

const EDITOR_MODES = ["edit", "preview", "json"];

/**
 * Component that displays the mode dropdown.
 *
 * The mode dropdown is the selector at the top of the editor that lets you
 * switch between edit, preview, and dev-only JSON mode.
 */
const ModeDropdown = React.createClass({
    propTypes: {
        currentMode: React.PropTypes.oneOf(EDITOR_MODES),

        // A function that takes in a string signifying the mode (ex: "edit")
        onChange: React.PropTypes.func,
    },

    _handleSelectMode: function(event) {
        if (this.props.onChange) {
            this.props.onChange(event.target.value);
        }
    },

    render: function() {
        return <label>
            Mode:{" "}
            <select
                value={this.props.currentMode}
                onChange={this._handleSelectMode}
            >
                <option value="edit">Edit</option>
                <option value="preview">Preview</option>
                <option value="json">Dev-only JSON</option>
            </select>
        </label>;
    },
});

const MultiRendererEditor = React.createClass({
    propTypes: {
        Layout: React.PropTypes.func,
        // TODO(emily): use ApiOptions.propTypes
        apiOptions: React.PropTypes.any.isRequired,

        content: React.PropTypes.any.isRequired,
        editorMode: React.PropTypes.oneOf(EDITOR_MODES).isRequired,

        onChange: React.PropTypes.func.isRequired,
    },

    _renderJson() {
        return <div>
            <ModeDropdown
                currentMode={this.props.editorMode}
                onChange={editorMode => this.props.onChange({editorMode})}
            />
            <JsonEditor
                multiLine
                value={this.props.content}
                onChange={content => this.props.onChange({content})}
            />
        </div>;
    },

    _renderPreview() {
        const {Layout} = this.props;

        return <div>
            <ModeDropdown
                currentMode={this.props.editorMode}
                onChange={editorMode => this.props.onChange({editorMode})}
            />
            <Layout
                ref={e => this.layout = e}
                content={this.props.content}
                apiOptions={this.props.apiOptions}
            />
        </div>;
    },

    handleEditorChange(path, newValue) {
        this.props.onChange({
            content: lens(this.props.content).merge(path, newValue).freeze(),
        });
    },

    _renderEdit() {
        const apiOptions = {
            ...ApiOptions.defaults,
            ...this.props.apiOptions,
        };

        function makeTitle(path) {
            if (path.length > 0) {
                return <div className="pod-title">
                    {/* TODO(emily): allow specifying a custom editor title */}
                    {path.join(".")}
                </div>;
            } else {
                return null;
            }
        }

        const renderItem = (data, path) => {
            return <div key={path.join("-")} className={css(styles.editor)}>
                {makeTitle(path)}
                <Editor
                    {...data}
                    onChange={
                        newVal => this.handleEditorChange(path, newVal)}
                    apiOptions={apiOptions}
                />
            </div>;
        };

        const renderCollection = (collection, shape, path) => {
            if (shape.type === "array") {
                return <div key={path.join("-")}>
                    {makeTitle(path)}
                    <div className={css(styles.level)}>
                        {collection}
                    </div>
                </div>;
            } else if (shape.type === "object") {
                return <div key={path.join("-")}>
                    {makeTitle(path)}
                    <div className={css(styles.level)}>
                        {Object.keys(shape.shape).map(key => collection[key])}
                    </div>
                </div>;
            }
        };

        const content = this.props.content;
        const itemShape = this.props.Layout.shape;
        const editor = traverseShape(
            itemShape, content, renderItem, renderCollection);

        return <div>
            <ModeDropdown
                currentMode={this.props.editorMode}
                onChange={editorMode => this.props.onChange({editorMode})}
            />
            <div className="perseus-editor-table">
                <div className="perseus-editor-row">
                    <div className="perseus-editor-left-cell">
                        {editor}
                    </div>
                </div>
            </div>
        </div>;
    },

    score() {
        if (this.props.editorMode === "preview") {
            return this.layout.score();
        }
    },

    getSerializedState() {
        if (this.props.editorMode === "preview") {
            return this.layout.getSerializedState();
        }
    },

    restoreSerializedState(state) {
        if (this.props.editorMode === "preview") {
            this.layout.restoreSerializedState(state);
        }
    },

    render() {
        switch (this.props.editorMode) {
            case "json": return this._renderJson();
            case "preview": return this._renderPreview();
            case "edit": return this._renderEdit();
            default:
                return <ModeDropdown
                    currentMode={this.props.editorMode}
                    onChange={editorMode => this.props.onChange({
                        editorMode,
                    })}
                />;
        }
    },
});

const styles = StyleSheet.create({
    editor: {
        marginBottom: 25,
    },

    level: {
        marginLeft: 10,
    },

    controls: {
        float: "right",
    },
});

module.exports = MultiRendererEditor;
