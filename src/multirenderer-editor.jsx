/**
 * Editor for a multi-item question.
 */
const {StyleSheet, css} = require("aphrodite");
const React = require("react");
const lens = require("../hubble/index.js");

const ApiOptions = require("./perseus-api.jsx").Options;
const Editor = require("./editor.jsx");
const JsonEditor = require("./json-editor.jsx");

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
                content={this.props.content}
                apiOptions={this.props.apiOptions}
            />
        </div>;
    },

    handleEditorChange(key, newValue) {
        this.props.onChange({
            content: lens(this.props.content).merge(key, newValue).freeze(),
        });
    },

    _renderEdit() {
        const apiOptions = {
            ...ApiOptions.defaults,
            ...this.props.apiOptions,
        };

        const content = this.props.content;
        const editor = <div>
            <div className={css(styles.editor)}>
                <div className="pod-title">Left</div>
                <Editor
                    {...content.left}
                    onChange={newVal => this.handleEditorChange(
                        ["left"], newVal
                    )}
                    apiOptions={apiOptions}
                />
            </div>
            <div className={css(styles.editor)}>
                <div className="pod-title">Right[0]</div>
                <Editor
                    {...content.right[0]}
                    onChange={newVal => this.handleEditorChange(
                        ["right", 0], newVal
                    )}
                    apiOptions={apiOptions}
                />
            </div>
        </div>;

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
});

module.exports = MultiRendererEditor;
